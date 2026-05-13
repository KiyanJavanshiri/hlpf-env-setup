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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
let ProductsService = class ProductsService {
    productRepo;
    cacheManager;
    constructor(productRepo, cacheManager) {
        this.productRepo = productRepo;
        this.cacheManager = cacheManager;
    }
    async findAll(query) {
        const cacheKey = `products:${JSON.stringify(query)}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const { page = 1, pageSize = 10, sort = 'createdAt', order = 'desc', categoryId, minPrice, maxPrice, search, } = query;
        const qb = this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category');
        if (categoryId) {
            qb.andWhere('category.id = :categoryId', { categoryId });
        }
        if (minPrice !== undefined) {
            qb.andWhere('product.price >= :minPrice', { minPrice });
        }
        if (maxPrice !== undefined) {
            qb.andWhere('product.price <= :maxPrice', { maxPrice });
        }
        if (search) {
            qb.andWhere('product.name ILIKE :search', { search: `%${search}%` });
        }
        qb.orderBy(`product.${sort}`, order.toUpperCase());
        const skip = (page - 1) * pageSize;
        qb.skip(skip).take(pageSize);
        const [items, total] = await qb.getManyAndCount();
        const result = {
            items,
            meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
        };
        await this.cacheManager.set(cacheKey, result, 60_000);
        return result;
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product #${id} not found`);
        }
        return product;
    }
    async create(dto) {
        const product = this.productRepo.create({
            name: dto.name,
            description: dto.description,
            price: dto.price,
            stock: dto.stock ?? 0,
            category: dto.categoryId ? { id: dto.categoryId } : null,
        });
        const saved = await this.productRepo.save(product);
        await this.clearProductsCache();
        return saved;
    }
    async update(id, dto) {
        const product = await this.findOne(id);
        if (dto.name !== undefined)
            product.name = dto.name;
        if (dto.description !== undefined)
            product.description = dto.description;
        if (dto.price !== undefined)
            product.price = dto.price;
        if (dto.stock !== undefined)
            product.stock = dto.stock;
        if (dto.categoryId !== undefined) {
            product.category = { id: dto.categoryId };
        }
        const saved = await this.productRepo.save(product);
        await this.clearProductsCache();
        return saved;
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepo.remove(product);
        await this.clearProductsCache();
    }
    async clearProductsCache() {
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map