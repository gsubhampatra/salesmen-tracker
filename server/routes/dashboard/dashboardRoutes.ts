import { Router } from "express";
import { welcomeToDashboard } from "../../controller/dashboard/dashboardController";

const router = Router();

// dashboard routes
router.get("/", welcomeToDashboard);

export default router;
