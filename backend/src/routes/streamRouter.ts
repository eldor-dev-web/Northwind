import { Router } from "express";
import { createStremToken } from "../controllers/streamController";

const router = Router();

router.post("/token",createStreamToken)

export default router;