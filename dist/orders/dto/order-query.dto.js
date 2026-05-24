"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const order_status_enum_1 = require("../../common/enums/order-status.enum");
class OrderQueryDto {
    page = 1;
    pageSize = 10;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number, default: 1, minimum: 1, minimum: 1 }, pageSize: { required: true, type: () => Number, default: 10, minimum: 1, maximum: 100, minimum: 1 }, status: { required: true, enum: require("../../common/enums/order-status.enum").OrderStatus } };
    }
}
exports.OrderQueryDto = OrderQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Сторінка замовлень',
        default: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Кількість замовлень на сторінку',
        default: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: order_status_enum_1.OrderStatus.PENDING,
        description: 'Пошук за статусом замовлення',
        enum: order_status_enum_1.OrderStatus,
    }),
    (0, class_validator_1.IsEnum)(order_status_enum_1.OrderStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderQueryDto.prototype, "status", void 0);
//# sourceMappingURL=order-query.dto.js.map