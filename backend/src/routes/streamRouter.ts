import { Router } from "express";
// Importdagi imlo xatosini to'g'rilaymiz: 'Strem' emas, 'Stream' bo'lishi kerak
import { createStreamToken } from "../controllers/streamController"; 

const router = Router();

router.post("/token", createStreamToken);

export default router;