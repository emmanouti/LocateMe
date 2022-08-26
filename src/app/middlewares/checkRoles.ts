import { Request, Response, NextFunction } from "express";
import dataSourceInstance from "../database/data-source";
import { User } from "../database/entity/User";

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const id = res.locals.jwtPayload.userId;
        const userRepository = dataSourceInstance.getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOne({where: {id}});
        } catch (id) {
            res.status(401).send();
        }
        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
    };
};