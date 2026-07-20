import { Router } from "express";
// Mana bu yerda fayl yo'liga .js qo'shildi
import { createCheckout } from "../controllers/checkoutController.js";

const router = Router();

router.post("/", createCheckout);

export default router;