import { Router } from "express";
import { authController } from "../controllers/authController";
import { validate } from "../middlewares/validationMiddleware";
import { RegisterSchema } from "../utils/validation/registerValidation";
import { LoginSchema } from "../utils/validation/loginValidation";

const authRouter = Router();

authRouter.post("/register", validate(RegisterSchema), authController.register);
authRouter.post("/login", validate(LoginSchema), authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.get("/activate/:activateLink", authController.activate);

export default authRouter;
