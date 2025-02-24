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
  getAllAssignedLocations,
  getAllSalesmens,
  getDistributorSalesmenDetails,
} from "../../controller/dashboard/dashboardController";
import {
  getAccuracyOverTime,
  getAverageVisitDuration,
  getAverageVisitDurationOverTime,
  getDistributorAnalytics,
  getDistributors,
  getDistributorsWithNoVisits,
  getMaxDistanceTraveled,
  getMostActiveSalesman,
  getOverallAccuracyPercentage,
  getPeakVisitingHours,
  getSalesmanAccuracy,
  getSalesmanProductivity,
  getTotalDistributors,
  getTotalOutletsAssigned,
  getTotalOutletsVisited,
  getUniqueSalesmen,
  getVisitsPerDistributor,
} from "../../controller/dashboard/distributorController";
import {
  getOverallAccuracy,
  getTotalLocationsManaged,
  getTotalSalesmen,
  getTotalVisitsMade,
  getMostVisitedLocations,
  getRegionWiseSalesmanCount,
  getStateWiseVisitDistribution,
  gettotalOutletsAssigned,
  getLocationAnalytics,
  getMostVisitedLocation,
  gettotalOutletsVisited,
  getLocationAnalyticsByDateRange,
} from "../../controller/dashboard/detailedAnalysisController";
import { getSalesmanVisits } from "../../controller/dashboard/summeryController";

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
router.get("/getAllAssignedLocations", getAllAssignedLocations);

router.get("/getallsalesmansReport", getAllSalesmens);
router.get("/getdistributorReport", getDistributorSalesmenDetails);

// Distributor Routes
router.get("/getDistributors", getDistributors);
router.get("/getDistributorAnalytics", getDistributorAnalytics);
router.get("/gettotaldistributors", getTotalDistributors);

router.get("/getOverallAccuracy", getOverallAccuracyPercentage);
router.get("/getAverageVisitDuration", getAverageVisitDuration);
router.get("/getMaxDistanceTravelled", getMaxDistanceTraveled);
router.get("/getUniqueSalesman", getUniqueSalesmen);
router.get("/getVisitsPerDistributor", getVisitsPerDistributor);
router.get("/getMostActiveSalesman", getMostActiveSalesman);
router.get("/getDistributorwithNoVisits", getDistributorsWithNoVisits);
router.get("/getPeakVisitingHours", getPeakVisitingHours);
router.get("/getSalesmanAccuracy", getSalesmanAccuracy);
router.get("/getaccuracyOverTime", getAccuracyOverTime);
router.get("/getSalesmanProductivity", getSalesmanProductivity);
router.get("/getAvgVisitDurationOvertime", getAverageVisitDurationOverTime);

//Detailed Analysis
router.get("/getTotalSalesmen", getTotalSalesmen);
router.get("/getTotalLocationsManaged", getTotalLocationsManaged);
router.get("/getTotalVisitsMade", getTotalVisitsMade);
router.get("/getOverallAccuracy", getOverallAccuracy);
router.get("/getMostVisitedLocations", getMostVisitedLocations);
router.get("/getRegionWiseSalesmen", getRegionWiseSalesmanCount);
router.get("/getStateWiseVisitDistribution", getStateWiseVisitDistribution);
router.get("/getTotalOutletsAssigned", gettotalOutletsAssigned);
router.get("/getTotalOutletsVisited", gettotalOutletsVisited);
router.get("/getMostVisitedLocation", getMostVisitedLocation);

router.get("/getLocationAnalytics", getLocationAnalytics);
router.get("/getSalesmanSummary", getSalesmanVisits);

router.get("/getLocationAnalyticsByDateRange", getLocationAnalyticsByDateRange);

export default router;
