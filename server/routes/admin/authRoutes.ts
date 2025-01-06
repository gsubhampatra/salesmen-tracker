import { Router } from 'express';
import { getMe, managerLogin, managerLogout, managerSignup } from '../../controller/admin/authController';
import { validateAdmin } from '../../lib/validation/validateAdmin';
const router = Router();

// admin routes
router.post('/signup', managerSignup)
router.post('/login', managerLogin);
router.post('/logout',validateAdmin, managerLogout);
router.get('/me',validateAdmin, getMe);

// user routes

export default router;