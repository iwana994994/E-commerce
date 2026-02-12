import {Router} from "express"
import {createOrder,checkoutSuccess, fetchOrder,getOrderStats,getOrderChartData,getIncomeLast3Months} from "../controllers/OrderController.js"
const router = Router()

router.post("/createOrder",createOrder)
router.post("/checkout-success", checkoutSuccess);
router.get("/allOrders",fetchOrder)
router.get("/stats", getOrderStats);
router.get("/chart",getOrderChartData)
router.get("/pie",getIncomeLast3Months)



export default router