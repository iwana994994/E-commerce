import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories } from "../controllers/CategoryController.js";

const router = Router();

router.post("/create",createCategory)
router.get("/getAll",getAllCategories)
router.delete("/delete/:category",deleteCategory)

export default router;