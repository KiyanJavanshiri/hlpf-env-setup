import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from 'src/common/enums/role.enum';
import { OrderQueryDto } from './dto/order-query.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import type { Cache } from 'cache-manager';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly productRepo;
    private readonly dataSource;
    private readonly cacheManager;
    constructor(orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, productRepo: Repository<Product>, dataSource: DataSource, cacheManager: Cache);
    create(dto: CreateOrderDto, userId: number): Promise<Order>;
    private clearProductsCache;
    findAll(query: OrderQueryDto, userId: number, userRole: Role): Promise<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, userId: number, userRole: Role): Promise<Order>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<Order>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
