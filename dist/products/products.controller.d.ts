import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: ProductQueryDto): Promise<{}>;
    findOne(id: number): Promise<import("./product.entity").Product>;
    create(dto: CreateProductDto): Promise<import("./product.entity").Product>;
    update(id: number, dto: UpdateProductDto): Promise<import("./product.entity").Product>;
    remove(id: number): Promise<void>;
}
