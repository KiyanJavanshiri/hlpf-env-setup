import { OrderStatus } from 'src/common/enums/order-status.enum';
export declare class OrderQueryDto {
    page: number;
    pageSize: number;
    status: OrderStatus;
}
