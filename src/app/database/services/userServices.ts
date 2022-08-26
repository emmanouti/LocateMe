import { User } from "../entity/User";
import dataSourceInstance from "../data-source";
import {validate} from "class-validator";

class UserServices {
    findAllUsers = async (): Promise<any | null> => {
        const userRepository = dataSourceInstance.getRepository(User);
        const result = await userRepository.findAndCount({
            select: ["id", "mail", "role"]
        });

        if (!result) {
            return "no users found";
        }
        return result;
    };


    findOneUser = async (user_id: number): Promise<any | null> => {
        const userRepository = dataSourceInstance.getRepository(User);
        const result = await userRepository.find({select: {id: true, mail: true, role: true},relations: {locations: true}, where: {id: user_id}});
        if (!result) {
            return "user not found";
        }
        return result;
    };

    createUser = async (data): Promise<any | null> => {
        let user = new User();
        user.mail = data.mail;
        user.password = data.password;
        user.role = data.role;

        const errors = await validate(user);
        if (errors.length > 0) {
            return errors.map(e => e.constraints)
        }
        user.hashPassword();

        const userRepository = dataSourceInstance.getRepository(User);
        let result;
        try {
            result = await userRepository.save(user);
        } catch (e) {
            return "Mail already in use";
        }

        if (!result) {
            return null;
        }
        return result;
    };

    updateUser = async (user_id: number, data): Promise<any | null> => {
        const userRepository = dataSourceInstance.getRepository(User)
        let user;
        try {
            user = await userRepository.findOneOrFail({where: {id: user_id}});
        } catch (error) {
            return "User not found";
        }
        user.mail = data.mail;
        user.role = data.role;
        const errors = await validate(user);
        if (errors.length > 0) {
            return errors;
        }
        let result;
        try {
            result =  await userRepository.save(user);
        } catch (e) {
            return "Mail already in use";
        }

        if (!result) {
            return null;
        }
        return result;
    };

    deleteUser = async (user_id: number): Promise<any | null> => {
        const userRepository = dataSourceInstance.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id: user_id}})
        } catch (error) {
            return "user not found";
        }
        const result = await userRepository.delete(user.id);
        if (!result) {
            return null;
        }
        return result;
    };
}

export default UserServices;