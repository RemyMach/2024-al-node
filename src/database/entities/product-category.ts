import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity({ name: "product_category" })
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]

    constructor(id: number, name: string, products: Product[]) {
        this.id = id
        this.name = name
        this.products = products
    }
}