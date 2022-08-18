import { Router, Request, Response } from "express";
import auth from "./auth";
import { user } from "./user";
import { location } from "./locations"
import {middlewares} from "../middlewares";

const { responses, messages, codes } = middlewares;

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
    responses.ok(codes.ok(), messages.welcomeMessage(), res);
});
routes.use("/location", location)
routes.use("/auth", auth);
routes.use("/user", user);

export default routes;