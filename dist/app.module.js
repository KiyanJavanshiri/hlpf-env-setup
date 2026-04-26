"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const category_entity_1 = require("./categories/category.entity");
const product_entity_1 = require("./products/product.entity");
const categories_module_1 = require("./categories/categories.module");
const products_module_1 = require("./products/products.module");
const _1700000001000_CreateTables_1 = require("./migrations/1700000001000-CreateTables");
const _1775400342713_AddIsActiveToProducts_1 = require("./migrations/1775400342713-AddIsActiveToProducts");
const user_entity_1 = require("./users/user.entity");
const users_module_1 = require("./users/users.module");
const _1777205801467_CreateUsers_1 = require("./migrations/1777205801467-CreateUsers");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT, 10),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities: [category_entity_1.Category, product_entity_1.Product, user_entity_1.User],
                synchronize: false,
                migrationsRun: true,
                migrations: [
                    _1700000001000_CreateTables_1.CreateTables1700000001000,
                    _1775400342713_AddIsActiveToProducts_1.AddIsActiveToProducts1775400342713,
                    _1777205801467_CreateUsers_1.CreateUsers1777205801467,
                ],
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async () => ({
                    store: await (0, cache_manager_redis_yet_1.redisStore)({
                        socket: {
                            host: process.env.REDIS_HOST,
                            port: parseInt(process.env.REDIS_PORT, 10),
                        },
                    }),
                    ttl: 60 * 1000,
                }),
            }),
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map