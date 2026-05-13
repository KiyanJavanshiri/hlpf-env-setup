"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const ds = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});
async function seed() {
    await ds.initialize();
    const cats = ['Electronics', 'Accessories', 'Clothing'];
    for (const name of cats) {
        await ds.query(`INSERT INTO categories (name) VALUES ($1)
   	ON CONFLICT DO NOTHING`, [name]);
    }
    const products = [
        { name: 'iPhone 16', price: 999, stock: 50, cat: 1 },
        { name: 'Galaxy S24', price: 849, stock: 40, cat: 1 },
        { name: 'MacBook Pro', price: 2499, stock: 15, cat: 1 },
        { name: 'iPad Air', price: 599, stock: 30, cat: 1 },
        { name: 'AirPods Pro', price: 249, stock: 100, cat: 2 },
        { name: 'USB-C Cable', price: 19, stock: 500, cat: 2 },
        { name: 'MagSafe Charger', price: 39, stock: 80, cat: 2 },
        { name: 'Laptop Sleeve', price: 49, stock: 60, cat: 2 },
        { name: 'T-Shirt Dev', price: 25, stock: 200, cat: 3 },
        { name: 'Hoodie NestJS', price: 55, stock: 75, cat: 3 },
    ];
    for (let i = 0; i < 3; i++) {
        for (const p of products) {
            const suffix = i > 0 ? ` v${i + 1}` : '';
            await ds.query(`INSERT INTO products
       	(name, price, stock, "categoryId")
     	VALUES ($1, $2, $3, $4)
     	ON CONFLICT DO NOTHING`, [`${p.name}${suffix}`, p.price + i * 10, p.stock, p.cat]);
        }
    }
    console.log('Seed complete: 3 categories, 30 products');
    await ds.destroy();
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map