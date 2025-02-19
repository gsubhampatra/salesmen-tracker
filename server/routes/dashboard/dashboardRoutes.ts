import { Router } from "express";
import { getSalesmenNotVisitedToday, getSalesmenVisitedToday, getTotalSalesmen, welcomeToDashboard } from "../../controller/dashboard/dashboardController";

const router = Router();

// dashboard routes
router.get("/", welcomeToDashboard);
router.get("/total-salesman", getTotalSalesmen);
router.get("/visited-today", getSalesmenVisitedToday)
router.get("/not-visited-today", getSalesmenNotVisitedToday)

export default router;
