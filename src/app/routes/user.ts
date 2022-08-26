import { Router } from "express";
import UserControllers from "../controllers/userControllers";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRoles";

    const router = Router();

    router.get("/", [checkJwt, checkRole(["ADMIN"])], UserControllers.findUsers);
    router.get("/:user_id", [checkJwt, checkRole(["ADMIN"])],  UserControllers.findOneUser);
    router.post("/create", [checkJwt, checkRole(["ADMIN"])],   UserControllers.createUser);
    router.put("/update/:user_id", [checkJwt, checkRole(["ADMIN"])],  UserControllers.updateUser);
    router.delete("/delete/:user_id", [checkJwt, checkRole(["ADMIN"])],  UserControllers.deleteUser);


export default router;