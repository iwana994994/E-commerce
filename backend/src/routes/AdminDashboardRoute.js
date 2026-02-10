import {Router} from 'express';
import {getDashboardData} from '../controllers/AdminDashboardController.js';
import {requireAdmin} from '../middleware.js';

const router = Router();

router.get("/dashboard", requireAdmin, getDashboardData);


export default router;