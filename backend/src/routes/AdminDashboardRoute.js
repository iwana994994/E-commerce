import {Router} from 'express';
import { Insights } from '../controllers/AdminDashboardController.js';

const router = Router();

router.get("/insights",Insights)


export default router;