import {Router} from "express"
import {createCart,getAllItems,removeProducts,changeProducts,clearCart} from "../controllers/CartController.js"
const router= Router()

router.post("/create",createCart)
router.get("/allItems",getAllItems)
router.delete("/remove/:id",removeProducts)
router.patch("/changeProducts",changeProducts)
router.delete("/clear",clearCart)

export default router