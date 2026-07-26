import { Router } from "express";
import { getCategories, getProductBySlug, listProducts } from "../controllers/productController";

const router = Router();

router.get("/", listProducts);
router.get("/categories", getCategories); // <-- Buni doim :slug dan tepaga qo'yish shart!
router.get("/:slug", getProductBySlug);

export default router;