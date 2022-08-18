import { Request, Response } from "express";
import { middlewares } from "../middlewares";
import { Location } from "../database/entity/Location"
import Service from "../database/services";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../database/entity/User"

const { responses, messages, codes } = middlewares;

const { userService } = Service;
class UserControllers {
    findUsers = async (req: Request, res: Response) => {
        const response = await userService.findUsers();
        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.success(
            codes.ok(),
            messages.ok(),
            {
                count: response[1],
                data: response[0],
            },
            res
        );
    };

    findOneUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;

        const response = await userService.findOneUser(parseInt(user_id));

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        return responses.success(codes.ok(), messages.ok(), response, res);
    };

    createUser = async (req: Request, res: Response) => {
        const {
            mail,
            password,
            role
        }: {
            mail: string;
            password: string,
            role: string,
        } = req.body;

        let user = new User();
        user.mail = mail;
        user.password = password;
        user.role = role;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors)
            return;
        }
        user.hashPassword();

        const response = await userService.createUser(
            {user}
        );

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        const user_id = response.raw.insertId;

        return responses.success(
            codes.created(),
            messages.created(),
            { user_id, mail, password },
            res
        );
    };

    updateUser = async (req: Request, res: Response) => {
        const {
            mail,
            password,
            role,
            locations
        }: {
            mail: string;
            password: string,
            role: string,
            locations: Promise<Location[]>;
        } = req.body;

        let user;
        const { user_id } = req.params;
        user.mail = mail;
        user.password = password
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const response = await userService.updateUser(parseInt(user_id), {user});

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.success(
            codes.ok(),
            messages.ok(),
            { user_id, mail, password, role, locations },
            res
        );
    };


    deleteUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;

        const response = await userService.deleteUser(parseInt(user_id));

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.ok(codes.ok(), messages.ok(), res);
    };
}

export default UserControllers;