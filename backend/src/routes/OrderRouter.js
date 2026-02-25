import {Router} from "express"

import {top5Products,top5WorstProducts,fetchOrderForUser,createOrder,checkoutSuccess, fetchOrder,getOrderStats,getOrderChartData,getIncomeLast3Months} from "../controllers/OrderController.js"
const router = Router()

router.post("/createOrder",createOrder)
router.post("/checkout-success", checkoutSuccess);
router.get("/allOrders",fetchOrder)
router.get("/stats", getOrderStats);
router.get("/chart",getOrderChartData)
router.get("/pie",getIncomeLast3Months)
router.get("/userOrders",fetchOrderForUser)
router.get("/top5BestProducts",top5Products)
router.get("/top5WorstProducts",top5WorstProducts)


export default router