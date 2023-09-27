import { AbstractEntity } from "@scraping-app/database";
import { Column, Entity } from "typeorm";

@Entity()
export class UserEntity extends AbstractEntity<UserEntity>{
    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column({nullable: true})
    accessToken?: string;
    
    @Column({nullable: true})
    refreshToken?: string;
}