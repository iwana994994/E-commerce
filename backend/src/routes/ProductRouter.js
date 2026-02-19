import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts,editProduct } from "../controllers/ProductController.js";
import {upload} from "../lib/upload.js"
const router = Router();

router.post("/create",upload.single("image"),createProduct)
router.get("/getAll",getAllProducts)
router.delete("/delete/:id",deleteProduct)
router.patch("/edit/:id",editProduct)

export default router;