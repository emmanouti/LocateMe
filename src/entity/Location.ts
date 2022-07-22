import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    latitude: string

    @Column()
    longitude: string

    @Column()
    adresse: string

    @Column()
    user_id: number
}