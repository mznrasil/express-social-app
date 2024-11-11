import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser
} from "../controllers/auth";
import { verifyJwt } from "../middlewares/verifyJwt";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshUser);
authRouter.post("/logout", verifyJwt, logoutUser);

export default authRouter;
