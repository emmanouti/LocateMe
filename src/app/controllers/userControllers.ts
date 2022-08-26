import { Request, Response } from "express";
import { validate } from "class-validator";
import { User } from "../database/entity/User"
import dataSourceInstance from "../database/data-source";


class UserControllers {
    static findUsers = async (req: Request, res: Response) => {
        const userRepository = dataSourceInstance.getRepository(User);
        const users = await userRepository.find({
            select: ["id", "mail", "role"]
        })
        res.send(users);
    };

    static findOneUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;
        const userRepository = dataSourceInstance.getRepository(User);
        console.log(user_id)
        try {
            const user = await userRepository.findOne( {where: {id: parseInt(user_id)}, relations: {
                locations: true,
                },});
            res.send(user)
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static createUser = async (req: Request, res: Response) => {
        const {
            mail,
            password,
            role
        }: {
            mail: string,
            password: string,
            role: string,
        } = req.body;

        let user = new User();
        user.mail = mail;
        user.password = password;
        user.role = role;
        console.log(user.locations)
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors)
            return;
        }
        user.hashPassword();

        const userRepository = dataSourceInstance.getRepository(User);

        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("Mail already in use");
            return;
        }
        res.status(201).send("User created");
    };

    static updateUser = async (req: Request, res: Response) => {
        const {user_id} = req.params;
        const {mail, role}: {mail: string, role: string} = req.body;

        const userRepository = dataSourceInstance.getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail({where: {id: parseInt(user_id)}});
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        user.mail = mail;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("Mail already in use");
            return;
        }
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;

        const userRepository = dataSourceInstance.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id: parseInt(user_id)}})
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        await userRepository.delete(user.id);
        res.status(204).send();
    };
}

export default UserControllers;