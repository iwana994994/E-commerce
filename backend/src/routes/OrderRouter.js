import {Router} from "express"
import { protectRoute } from "../middleware.js"
import {fetchOrderForUser,createOrder,checkoutSuccess, fetchOrder,getOrderStats,getOrderChartData,getIncomeLast3Months} from "../controllers/OrderController.js"
const router = Router()

router.post("/createOrder",createOrder)
router.post("/checkout-success", checkoutSuccess);
router.get("/allOrders",fetchOrder)
router.get("/stats", getOrderStats);
router.get("/chart",getOrderChartData)
router.get("/pie",getIncomeLast3Months)
router.get("/userOrders/",protectRoute,fetchOrderForUser)



export default router