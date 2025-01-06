import { Router } from "express";
import { createLocation, getAllLocations, getLocationsByMannagerId } from "../../controller/admin/locationController";
import { validateAdmin } from "../../lib/validation/validateAdmin";

const router = Router();

router.post('/create/location', validateAdmin, createLocation)
router.get('/get/location/all', validateAdmin,  getAllLocations);
router.get('/get/location/my', validateAdmin,  getLocationsByMannagerId);

export default router;