import { Router } from "express";
import postRouter from "./post.route";
import authRouter from "./auth.route";

const router = Router();

router.use("/posts", postRouter);
router.use("/auth", authRouter);

export default router;
