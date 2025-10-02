import { Router } from "express";
import { SigninDto } from "./dtos/signin.dto";
import { validationMiddleware } from "../../shared/middlewares/validation.middleware";
import { AuthController } from "./auth.controller";

const authController = new AuthController();
const router = Router();

router.post(
  "/signin",
  validationMiddleware(SigninDto),
  authController.signin.bind(authController)
);

export default router;
