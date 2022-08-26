import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { User } from "./User";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "decimal", precision: 6, scale: 3 })
    latitude: number

    @Column({type: "decimal", precision: 6, scale: 3})
    longitude: number

    @Column()
    adresse: string

    @ManyToOne((type) => User, (user) => user.locations)
    @IsNotEmpty()
    user: User

}