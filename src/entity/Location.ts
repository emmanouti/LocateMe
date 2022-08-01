import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    adresse: string

    @ManyToOne(() => User, (user) => user.locations)
    user: User
}