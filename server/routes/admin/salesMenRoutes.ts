import { Router } from 'express';
import { createSalesMen, getAllSalesMen, getSalesMenByMannagerId, getVisitedLocationBySalesManId } from '../../controller/admin/salesMenController';
import { validateAdmin } from '../../lib/validation/validateAdmin';
import { assignSalesman } from '../../controller/admin/assignController';

const router = Router();

router.post('/create/salesmen', validateAdmin, createSalesMen)
router.get('/get/salesmen/all', validateAdmin, getAllSalesMen);
router.get('/get/salesmen/my', validateAdmin, getSalesMenByMannagerId);
router.post('/assign', validateAdmin, assignSalesman);
router.get('/get/salesmen/visitedlocation', validateAdmin, getVisitedLocationBySalesManId);

export default router;