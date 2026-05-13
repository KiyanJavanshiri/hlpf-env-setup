export declare class ProductQueryDto {
    page?: number;
    pageSize?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}
