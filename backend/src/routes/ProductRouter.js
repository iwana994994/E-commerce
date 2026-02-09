import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts } from "../controllers/ProductController.js";

const router = Router();

router.post("/create",createProduct)
router.get("/getAll",getAllProducts)
router.delete("/delete/:product",deleteProduct)

export default router;