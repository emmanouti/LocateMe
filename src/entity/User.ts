import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Location } from "./Location";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    mail: string

    @Column()
    password: string

    @OneToMany(() => Location, (location) => location.user)
    locations: Location[]
}