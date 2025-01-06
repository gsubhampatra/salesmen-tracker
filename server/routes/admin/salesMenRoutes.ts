import { Router } from 'express';
import { createSalesMen, getAllSalesMen, getSalesMenByMannagerId } from '../../controller/admin/salesMenController';
import { validateAdmin } from '../../lib/validation/validateAdmin';

const router = Router();

router.post('/create/salesmen', validateAdmin, createSalesMen)
router.get('/get/salesmen/all', validateAdmin,  getAllSalesMen);
router.get('/get/salesmen/my', validateAdmin,  getSalesMenByMannagerId);

export default router;