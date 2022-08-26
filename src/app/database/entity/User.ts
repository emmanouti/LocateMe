import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, Unique} from "typeorm"
import { Location } from "./Location";
import {IsNotEmpty, Length} from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["mail"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    mail: string

    @Column()
    @IsNotEmpty()
    @Length(4, 100)
    password: string

    @Column()
    @IsNotEmpty()
    role: string;

    @OneToMany(() => Location, (location) => location.user, {cascade: true})
    locations: Location[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}