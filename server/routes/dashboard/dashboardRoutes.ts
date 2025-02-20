import { Router } from "express";
import { getDistributorSalesmenDetails, getSalesmenNotVisitedToday, getSalesmenVisitedToday, getTotalSalesmen, welcomeToDashboard } from "../../controller/dashboard/dashboardController";
import { getAllSalesMen } from "../../controller/admin/salesMenController";

const router = Router();

// dashboard routes
router.get("/", welcomeToDashboard);
router.get("/total-salesman", getTotalSalesmen);
router.get("/visited-today", getSalesmenVisitedToday)
router.get("/not-visited-today", getSalesmenNotVisitedToday)
router.get("/all-salesmen", getAllSalesMen)
router.get("/distributors", getDistributorSalesmenDetails)

export default router;
