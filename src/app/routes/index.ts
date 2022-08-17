import { Request, Response, Application } from "express";
import UserControllers from "../controllers/userControllers";

import { middlewares } from "../middlewares/index";

const { responses, messages, codes } = middlewares;

const User = new UserControllers();

class Routes {
    public router = (app: Application): any => {
        app.get("/", (req: Request, res: Response) => {
            responses.ok(codes.ok(), messages.welcomeMessage(), res);
        });

        app.get("/users", User.findUsers);
        app.get("/users/:user_id", User.findOneUser);
        app.post("/create", User.createUser);
        app.put("/update/:user_id", User.updateUser);
        app.delete("/delete/:user_id", User.deleteUser);

        app.all("*", (req: Request, res: Response) => {
            responses.ok(codes.notFound(), messages.pageNotFound(), res);
        });
    };
}

export const route = new Routes().router;