import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import location from "./locations";
import {checkJwt} from "../middlewares/checkJwt";


const routes = Router();

routes.use("/locations", checkJwt, location)
routes.use("/auth", auth);
routes.use("/user", user);

export default routes;