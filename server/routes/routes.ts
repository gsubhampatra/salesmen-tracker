import { Router } from 'express';
const router = Router();
import ManagerAuthRoutes from './admin/authRoutes';
import SalesManRoutes from './admin/salesMenRoutes';
import LocationRoutes from './admin/locationRoutes';

// admin routes
router.use('/admin', ManagerAuthRoutes);
router.use('/admin', SalesManRoutes);
router.use('/admin', LocationRoutes);

// user routes

export default router;