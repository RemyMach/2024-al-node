import { DataSource } from "typeorm";
import { Product } from "../database/entities/product";

export interface ListProductFilter {
    limit: number
    page: number
    priceMax?: number
}

export class ProductUsecase {
    constructor(private readonly db: DataSource) { }

    async listProduct(listProductFilter: ListProductFilter): Promise<{ products: Product[]; totalCount: number; }> {
        console.log(listProductFilter)
        const query = this.db.createQueryBuilder(Product, 'product')
        if (listProductFilter.priceMax) {
            query.andWhere('product.price <= :priceMax', { priceMax: listProductFilter.priceMax })
        }
        query.skip((listProductFilter.page - 1) * listProductFilter.limit)
        query.take(listProductFilter.limit)

        const [products, totalCount] = await query.getManyAndCount()
        return {
            products,
            totalCount
        }
    }
}