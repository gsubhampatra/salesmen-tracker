import { Router } from 'express';
import { validateAdmin, validateUser } from '../../lib/validation/validateAdmin';
import { getMe } from '../../controller/user/authController';
import { salesManLogin } from '../../controller/user/authController';
const router = Router();

// admin routes
router.post('/login', salesManLogin);
router.get('/me',validateUser, getMe);


export default router;