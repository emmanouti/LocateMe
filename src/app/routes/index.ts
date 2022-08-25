import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import { location } from "./locations"


const routes = Router();

routes.use("/location", location)
routes.use("/auth", auth);
routes.use("/user", user);

export default routes;