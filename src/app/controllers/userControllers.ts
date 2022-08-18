import { Request, Response } from "express";
import { middlewares } from "../middlewares";
import { Location } from "../database/entity/Location"
import Service from "../database/services";

const { responses, messages, codes } = middlewares;

const { User } = Service;
class UserControllers {
    findUsers = async (req: Request, res: Response) => {
        const response = await User.findUsers();
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

        const response = await User.findOneUser(parseInt(user_id));

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        return responses.success(codes.ok(), messages.ok(), response, res);
    };

    createUser = async (req: Request, res: Response) => {
        const {
            mail,
            password,
            locations
        }: {
            mail: string;
            password: string,
            locations: Promise<Location[]>;
        } = req.body;

        const response = await User.createUser({
            mail,
            password,
            locations
        });

        if (!response) {
            return responses.error(codes.error(), messages.notFound(), res);
        }

        const user_id = response.raw.insertId;

        return responses.success(
            codes.created(),
            messages.created(),
            { user_id, mail, password, locations },
            res
        );
    };

    updateUser = async (req: Request, res: Response) => {
        const {
            mail,
            password,
            locations
        }: {
            mail: string;
            password: string,
            locations: Promise<Location[]>;
        } = req.body;

        const { user_id } = req.params;

        const response = await User.updateUser(parseInt(user_id), {
            mail,
            password,
            locations
        });

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.success(
            codes.ok(),
            messages.ok(),
            { user_id, mail, password, locations },
            res
        );
    };


    deleteUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;

        const response = await User.deleteUser(parseInt(user_id));

        if (!response) {
            return responses.error(codes.error(), messages.error(), res);
        }

        return responses.ok(codes.ok(), messages.ok(), res);
    };
}

export default UserControllers;