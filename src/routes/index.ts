import { Router } from "express";
import postRouter from "./post";
import authRouter from "./auth";

const router = Router();

router.use("/posts", postRouter);
router.use("/auth", authRouter);

export default router;
