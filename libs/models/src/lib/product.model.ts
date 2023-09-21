import { AbstractEntity } from "@scraping-app/database";
import { Column, Entity } from "typeorm";

@Entity()
export class ProductEntity extends AbstractEntity<ProductEntity>{
    @Column()
    name: string;

    @Column()
    picture: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    createDate: Date;
}