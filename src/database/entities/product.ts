import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product-category";

@Entity({ name: "product" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @CreateDateColumn({type: "datetime"})
    createdAt: Date

    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
    category: ProductCategory;

    constructor(id: number, name: string, price: number, createdAt: Date, category: ProductCategory) {
        this.id = id
        this.name = name
        this.price = price
        this.createdAt = createdAt
        this.category = category
    }
}