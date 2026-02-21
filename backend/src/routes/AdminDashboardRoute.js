import {Router} from 'express';
import {getDashboardData} from '../controllers/AdminDashboardController.js';


const router = Router();

router.get("/dashboard",  getDashboardData);


export default router;