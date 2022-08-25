import { Router } from "express";
import AuthController from "../controllers/authControllers";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", [checkJwt],  AuthController.changePassword);

export default router;