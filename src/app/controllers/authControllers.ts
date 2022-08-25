import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import dataSourceInstance from "../database/data-source";
import {validate} from "class-validator";
import {User} from "../database/entity/User";
import config from "../config";

class AuthController {
    static login = async (req: Request, res: Response) => {
        let {mail, password} = req.body;
        if (!(mail && password)) {
            res.status(400).send();
        }

        const userRepository = dataSourceInstance.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {mail}});
            console.log("mail found")
        } catch (error) {
            res.status(401).send();
        }
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        const token = jwt.sign(
            {userId: user.id, username: user.mail},
            config.jwtSecret,
            {expiresIn: "1h"}
        );

        res.send(token);
    };

    static changePassword = async (req: Request, res: Response) => {
        console.log(req.headers);
        const id = res.locals.jwtPayload.userId;
        console.log(id)
        const {oldPassword, newPassword} = req.body;
        if (!(newPassword)) {
            res.status(400).send();
        }
        console.log(newPassword, "new password")
        const userRepository = dataSourceInstance.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {id}});
        } catch (e) {
            res.status(401).send(e.message);
        }
        console.log(user.checkIfUnencryptedPasswordIsValid(oldPassword))

        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send("Ce n'est pas l'ancien password");
            return;
        }

        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        user.hashPassword();
        await userRepository.save(user);

        res.status(204).send({message: "Succès le mdp a été modifié"});
    };
}

export default AuthController;