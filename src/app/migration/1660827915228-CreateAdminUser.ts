import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../database/entity/User";
import dataSourceInstance from "../database/data-source";

export class CreateAdminUser1660827915228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.mail = "admin"
        user.password = "admin";
        user.hashPassword();
        user.role = "ADMIN";
        const userRepository = dataSourceInstance.getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
