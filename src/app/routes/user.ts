import { Request, Response, Application } from "express";
import UserControllers from "../controllers/userControllers";
import { middlewares } from "../middlewares";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRoles";

const { responses, messages, codes } = middlewares;

const User = new UserControllers();

class Routes {
    public router = (app: Application): any => {
        app.get("/users", [checkJwt,  checkRole(["ADMIN"])], User.findUsers);
        app.get("/users/:user_id", [checkJwt, checkRole(["ADMIN"])], User.findOneUser);
        app.post("/create", [checkJwt, checkRole(["ADMIN"])], User.createUser);
        app.put("/update/:user_id", [checkJwt, checkRole(["ADMIN"])], User.updateUser);
        app.delete("/delete/:user_id", [checkJwt, checkRole(["ADMIN"])], User.deleteUser);

        app.all("*", (req: Request, res: Response) => {
            responses.ok(codes.notFound(), messages.pageNotFound(), res);
        });
    };
}

export const user = new Routes().router;