import { Router } from "express";
import {
  welcomeToDashboard,
  getSalesmenCount,
  getStoreCount,
  getAllSalesmen,
  getAllStores,
  getSalesmenVisitedByDate,
  getSalesmanInTimeOutTime,
  getVisitedOutletsBySalesman,
  getAssignedOutletsBySalesman,
  getAccuracyAnalysis,
  getAllVisitedLocations,
} from "../../controller/dashboard/dashboardController";

const router = Router();

router.get("/", welcomeToDashboard);
router.get("/salesmen-count", getSalesmenCount);
router.get("/stores-count", getStoreCount);
router.get("/salesmen", getAllSalesmen);
router.get("/stores", getAllStores);
router.get("/visited", getSalesmenVisitedByDate);
router.get("/salesman/:salesmanId/time-analysis", getSalesmanInTimeOutTime);
router.get(
  "/salesman/:salesmanId/visited-outlets",
  getVisitedOutletsBySalesman
);
router.get(
  "/salesman/:salesmanId/assigned-outlets",
  getAssignedOutletsBySalesman
);
router.get("/accuracy", getAccuracyAnalysis);
router.get("/accuracy/:salesmanId", getAccuracyAnalysis);

//testing
router.get("/getallvisits", getAllVisitedLocations);
router.get("/getAllAssignedLocations", getAllSalesmen);

export default router;
