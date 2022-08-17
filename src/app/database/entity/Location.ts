import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    location_id: number

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    adresse: string

    @ManyToOne((type) => User, (user) => user.locations)
    user: User
}