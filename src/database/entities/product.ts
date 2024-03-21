import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(id: number, name: string, price: number, createdAt: Date) {
        this.id = id
        this.name = name
        this.price = price
        this.createdAt = createdAt
    }
}