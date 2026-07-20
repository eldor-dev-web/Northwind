import { Router } from "express";
import {
  createAdminProducts, // Sening controller faylingdagi funksiya nomi shunday: createAdminProducts
  getImageKitAuth,
  listAdminProducts,
  requireAdmin,
  updateAdminProduct
  // deleteAdminProduct ni qo'shishni unutma
} from "../controllers/adminController.js";

const router = Router();

router.use(requireAdmin);

router.get("/imagekit/auth", getImageKitAuth);
router.get("/products", listAdminProducts);
router.post("/products", createAdminProducts); // Bu yerda ham 'createAdminProducts'
router.patch("/products/:id", updateAdminProduct);

export default router;