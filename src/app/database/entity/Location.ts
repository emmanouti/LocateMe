import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { User } from "./User";

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

    @ManyToOne((type) => User, (user) => user.locations, {cascade: ['insert']})
    userId: User

}