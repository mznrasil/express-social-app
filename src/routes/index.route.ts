import { Router } from "express";
import postRouter from "./post.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const router = Router();

router.use("/posts", postRouter);
router.use("/auth", authRouter);
router.use("/users/", userRouter);

export default router;
