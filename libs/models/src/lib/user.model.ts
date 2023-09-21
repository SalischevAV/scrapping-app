import { AbstractEntity } from "@scraping-app/database";
import { Column, Entity } from "typeorm";

@Entity()
export class UserEntity extends AbstractEntity<UserEntity>{
    @Column()
    email: string;

    @Column()
    login: string;
}