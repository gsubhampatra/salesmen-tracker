import { Router } from 'express';
import { validateUser } from '../../lib/validation/validateAdmin';
import { addToVisitedLoation } from '../../controller/user/salesMenController';
const router = Router();

// admin routes
router.post('/visit/location', validateUser,  addToVisitedLoation);


export default router;