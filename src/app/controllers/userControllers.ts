import { Request, Response } from "express";
import Service from "../database/services";
import { middlewares } from "../middlewares";

const { responses, messages, codes } = middlewares;
const { userService } = Service;

class UserControllers {
    static findUsers = async (req: Request, res: Response) => {
        const response = await userService.findAllUsers();
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
        )
    };

    static findOneUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;
        const response = await userService.findOneUser(parseInt(user_id))
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
        const response = await userService.createUser({mail, password, role});
        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        return responses.success(codes.ok(), messages.ok(), response, res);
    };

    static updateUser = async (req: Request, res: Response) => {
        const {user_id} = req.params;

        const {mail, role}: {mail: string, role: string} = req.body;

        const response = await userService.updateUser(parseInt(user_id), {mail, role})

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.success(
            codes.ok(),
            messages.ok(),
            {
                mail, role
            },
            res
        );
    };

    static deleteUser = async (req: Request, res: Response) => {
        const {user_id} = req.params;
        const response = await userService.deleteUser(parseInt(user_id));
        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.ok(codes.ok(), messages.ok(), res);
    }
}

export default UserControllers;