import { Router } from "express";
import {
  createUserController,
  LoginUserController,
  UserController,
} from "../controllers/authController";

const authRouter = Router();
const createUser = new createUserController();
const loginUser = new LoginUserController();
const userController = new UserController();

authRouter.post("/signup", createUser.createAttendant);
authRouter.post("/login", loginUser.loginUser);
authRouter.get("/user/:userId", userController.getUserWithServices);

export { authRouter };
