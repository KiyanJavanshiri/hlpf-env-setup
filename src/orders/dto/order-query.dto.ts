import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { OrderStatus } from 'src/common/enums/order-status.enum';

export class OrderQueryDto {
  @ApiProperty({
    example: 1,
    description: 'Сторінка замовлень',
    default: 1,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Кількість замовлень на сторінку',
    default: 1,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @ApiProperty({
    example: OrderStatus.PENDING,
    description: 'Пошук за статусом замовлення',
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;
}
