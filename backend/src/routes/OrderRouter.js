import {Router} from "express"
import {createOrder,checkoutSuccess} from "../controllers/OrderController.js"
const router = Router()

router.post("/createOrder",createOrder)
router.post("/checkout-success", checkoutSuccess);


export default router