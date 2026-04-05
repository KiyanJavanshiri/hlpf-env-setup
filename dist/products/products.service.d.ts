import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductsService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(data: {
        name: string;
        description?: string;
        price: number;
        stock?: number;
        categoryId?: number;
    }): Promise<Product>;
    update(id: number, data: Partial<{
        name: string;
        description: string;
        price: number;
        stock: number;
        isActive: boolean;
        categoryId: number;
    }>): Promise<Product>;
    remove(id: number): Promise<void>;
}
