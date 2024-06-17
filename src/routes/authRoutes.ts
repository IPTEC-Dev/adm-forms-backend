import { Router } from "express";
import {
  createUserController,
  LoginUserController,
} from "../controllers/authController";

const authRouter = Router();
const createUser = new createUserController();
const loginUser = new LoginUserController();

authRouter.post("/signup", createUser.createAttendant);
authRouter.post("/login", loginUser.loginUser);

export { authRouter };
