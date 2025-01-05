import { Router } from 'express';
import { createSalesMen, getAllSalesMen } from '../../controller/admin/salesMenController';
import { validateAdmin } from '../../lib/validation/validateAdmin';

const router = Router();

router.post('/create/salesmen', validateAdmin, createSalesMen)
router.get('/get/salesmen/all', validateAdmin,  getAllSalesMen);

export default router;