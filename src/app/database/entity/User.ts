import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm"
import { Location } from "./Location";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mail: string

    @Column()
    password: string

    @OneToMany((type) => Location, (location) => location.user)
    locations: Promise<Location[]>;
}