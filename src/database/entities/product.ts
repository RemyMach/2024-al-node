import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductDB {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    constructor(id: number, name: string, price: number) {
        this.id = id
        this.name = name
        this.price = price
    }
}