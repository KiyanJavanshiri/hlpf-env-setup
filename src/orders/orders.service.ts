import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from 'src/common/enums/role.enum';
import { OrderQueryDto } from './dto/order-query.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import type { Cache } from 'cache-manager';

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    private readonly dataSource: DataSource,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateOrderDto, userId: number): Promise<Order> {
    const qr = this.dataSource.createQueryRunner();

    await qr.connect();

    await qr.startTransaction();

    try {
      let totalPrice = 0;

      const orderItems: OrderItem[] = [];

      for (const item of dto.items) {
        const product = await qr.manager.findOne(Product, {
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new NotFoundException(`Product #${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for "${product.name}": ` +
              `available ${product.stock}, ` +
              `requested ${item.quantity}`,
          );
        }

        product.stock -= item.quantity;

        await qr.manager.save(product);

        const orderItem = qr.manager.create(OrderItem, {
          product,
          quantity: item.quantity,
          price: product.price,
        });

        orderItems.push(orderItem);

        totalPrice += Number(product.price) * item.quantity;
      }

      const order = qr.manager.create(Order, {
        user: { id: userId } as User,
        items: orderItems,
        totalPrice,
        status: OrderStatus.PENDING,
      });

      const savedOrder = await qr.manager.save(order);

      await qr.commitTransaction();

      await this.clearProductsCache();

      return savedOrder;
    } catch (error) {
      await qr.rollbackTransaction();

      throw error;
    } finally {
      await qr.release();
    }
  }

  private async clearProductsCache() {
    // const keys: string[] = await this.cacheManager.store.keys('products:*');
    // if (keys.length > 0) {
    //   await Promise.all(keys.map((key) => this.cacheManager.del(key)));
    // }
  }

  async findAll(query: OrderQueryDto, userId: number, userRole: Role) {
    const qb = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'item')
      .leftJoinAndSelect('item.product', 'product')
      .leftJoinAndSelect('order.user', 'user');

    if (userRole !== Role.ADMIN) {
      qb.andWhere('order.userId = :userId', { userId });
    }

    if (query.status) {
      qb.andWhere('order.status = :status', { status: query.status });
    }

    const page = query.page || 1;
    const limit = query.pageSize || 10;

    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [orders, total] = await qb.getManyAndCount();

    return {
      data: orders,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number, userId: number, userRole: Role): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    if (userRole !== Role.ADMIN && order.user.id !== userId) {
      throw new ForbiddenException('You can only view your own orders');
    }

    return order;
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<Order> {
    const qr = this.dataSource.createQueryRunner();

    await qr.connect();
    await qr.startTransaction();

    try {
      const order = await qr.manager.findOne(Order, {
        where: { id },
        relations: ['items', 'items.product'],
      });

      if (!order) {
        throw new NotFoundException(`Order #${id} not found`);
      }

      const currentStatus = order.status;
      const nextStatus = dto.status;

      if (
        currentStatus === OrderStatus.DELIVERED ||
        currentStatus === OrderStatus.CANCELLED
      ) {
        throw new BadRequestException(`Order is already final`);
      }

      const allowed = allowedTransitions[currentStatus];

      if (!allowed.includes(nextStatus)) {
        throw new BadRequestException(
          `Invalid transition ${currentStatus} → ${nextStatus}`,
        );
      }

      if (nextStatus === OrderStatus.CANCELLED) {
        for (const item of order.items) {
          const product = await qr.manager.findOne(Product, {
            where: { id: item.product.id },
          });

          if (product) {
            product.stock += item.quantity;
            await qr.manager.save(product);
          }
        }
      }

      order.status = nextStatus;

      const saved = await qr.manager.save(order);

      await qr.commitTransaction();

      return saved;
    } catch (error) {
      await qr.rollbackTransaction();
      throw error;
    } finally {
      await qr.release();
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const qr = this.dataSource.createQueryRunner();

    await qr.connect();
    await qr.startTransaction();

    try {
      const order = await qr.manager.findOne(Order, {
        where: { id },
        relations: ['items', 'items.product'],
      });

      if (!order) {
        throw new NotFoundException(`Order #${id} not found`);
      }

      for (const item of order.items) {
        const product = await qr.manager.findOne(Product, {
          where: { id: item.product.id },
        });

        if (product) {
          product.stock += item.quantity;
          await qr.manager.save(product);
        }
      }

      await qr.manager.delete(Order, id);

      await qr.commitTransaction();

      return {
        message: `Order #${id} deleted successfully`,
      };
    } catch (error) {
      await qr.rollbackTransaction();
      throw error;
    } finally {
      await qr.release();
    }
  }
}
