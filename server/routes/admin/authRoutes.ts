import { Router } from 'express';
import { managerLogin, managerSignup } from '../../controller/admin/authController';
const router = Router();

// admin routes
router.post('/signup', managerSignup)
router.post('/login', managerLogin);

// user routes

export default router;