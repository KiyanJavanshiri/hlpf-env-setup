import { OrdersService } from './orders.service';
import { Role } from 'src/common/enums/role.enum';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderQueryDto } from './dto/order-query.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto, user: User): Promise<import("./entities/order.entity").Order>;
    findAll(query: OrderQueryDto, userId: number, role: Role): Promise<{
        data: import("./entities/order.entity").Order[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, userId: number, role: Role): Promise<import("./entities/order.entity").Order>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<import("./entities/order.entity").Order>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
