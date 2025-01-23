import { Router } from 'express';
import { validateUser } from '../../lib/validation/validateAdmin';
import { addToVisitedLoation, getVisitedLocation } from '../../controller/user/salesMenController';
const router = Router();

router.post('/visit/location', validateUser,  addToVisitedLoation);
router.get('/get/my/visited/location', validateUser,  getVisitedLocation);


export default router;