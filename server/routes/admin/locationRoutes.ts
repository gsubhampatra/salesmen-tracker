import { Router } from "express";
import { createLocation, getAllLocations } from "../../controller/admin/locationController";
import { validateAdmin } from "../../lib/validation/validateAdmin";

const router = Router();

router.post('/create/location', validateAdmin, createLocation)
router.get('/get/location/all', validateAdmin,  getAllLocations);

export default router;