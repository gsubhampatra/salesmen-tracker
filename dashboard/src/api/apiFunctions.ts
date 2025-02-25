import { api, API_PATHS } from "./config";

export const getSalesmenCount = async () => {
  return await api.get(API_PATHS.DASHBOARD.SALESMEN_COUNT);
};

export const getStoreCount = async () => {
  return await api.get(API_PATHS.DASHBOARD.STORES_COUNT);
};

export const getAllSalesmen = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_SALESMEN);
};

export const getAllStores = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_STORES);
};

export const getVisited = async () => {
  return await api.get(API_PATHS.DASHBOARD.VISITED);
};

export const getSalesmanTimeAnalysis = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.SALESMAN_TIME_ANALYSIS(salesmanId));
};

export const getVisitedOutletsBySalesman = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.VISITED_OUTLETS(salesmanId));
};

export const getAssignedOutletsBySalesman = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.ASSIGNED_OUTLETS(salesmanId));
};

export const getAccuracyBySalesman = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.ACCURACY_BY_SALESMAN(salesmanId));
};

export const getAllVisitedLocations = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_VISITED_LOCATIONS);
};

export const getAllAssignedLocations = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_ASSIGNED_LOCATIONS);
};

export const getAllSalesmenReport = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_SALESMEN_REPORT);
};

export const getAllDistributorsReport = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_DISTRIBUTORS_REPORT);
};

export const getAccuracy = async () => {
  return await api.get(API_PATHS.DASHBOARD.ACCURACY);
};
// Distributor Routes
export const getDistributors = async () => {
  return await api.get(API_PATHS.DASHBOARD.DISTRIBUTOR.GET_DISTRIBUTORS);
};

export const getDistributorAnalytics = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_DISTRIBUTOR_ANALYTICS
  );
};

export const getTotalDistributors = async () => {
  return await api.get(API_PATHS.DASHBOARD.DISTRIBUTOR.GET_TOTAL_DISTRIBUTORS);
};

export const getAccuracyPercentage = async () => {
  return await api.get(API_PATHS.DASHBOARD.DISTRIBUTOR.GET_ACCURACY_PERCENTAGE);
};

export const getAverageVisitDuration = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_AVERAGE_VISIT_DURATION
  );
};

export const getMaxDistanceTraveled = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_MAX_DISTANCE_TRAVELED
  );
};

export const getUniqueSalesman = async () => {
  return await api.get(API_PATHS.DASHBOARD.DISTRIBUTOR.GET_UNIQUE_SALESMAN);
};

export const getVisitsPerDistributor = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_VISITS_PER_DISTRIBUTOR
  );
};

export const getMostActiveSalesman = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_MOST_ACTIVE_SALESMAN
  );
};

export const getDistributorWithNoVisits = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_DISTRIBUTOR_WITH_NO_VISITS
  );
};

export const getPeakVisitingHours = async () => {
  return await api.get(API_PATHS.DASHBOARD.DISTRIBUTOR.GET_PEAK_VISITING_HOURS);
};

export const getSalesmanAccuracy = async () => {
  return await api.get(API_PATHS.DASHBOARD.DISTRIBUTOR.GET_SALESMAN_ACCURACY);
};

export const getAccuracyOverTime = async () => {
  return await api.get(API_PATHS.DASHBOARD.DISTRIBUTOR.GET_ACCURACY_OVER_TIME);
};

export const getSalesmanProductivity = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_SALESMAN_PRODUCTIVITY
  );
};

export const getAvgVisitDurationOvertime = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DISTRIBUTOR.GET_AVG_VISIT_DURATION_OVERTIME
  );
};

// Detailed Analytics Routes
export const getTotalSalesmen = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_TOTAL_SALESMEN
  );
};

export const getTotalLocationsManaged = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_TOTAL_LOCATIONS_MANAGED
  );
};

export const getTotalVisitsMade = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_TOTAL_VISITS_MADE
  );
};

export const getPeakVisitingHour = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_PEAK_VISITING_HOURS
  );
};

export const getMostVisitedLocations = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_MOST_VISITED_LOCATIONS
  );
};

export const getMostVisitedLocation = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_MOST_VISITED_LOCATION
  );
};

export const getAverageVisitDurations = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_AVERAGE_VISIT_DURATION
  );
};

export const getRegionWiseSalesmen = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_REGION_WISE_SALESMEN
  );
};

export const getStateWiseVisitDistribution = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_STATE_WISE_VISIT_DISTRIBUTION
  );
};

export const gettotalOutletsAssigned = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_TOTAL_OUTLETS_ASSIGNED
  );
};

export const gettotalOutletsVisited = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_TOTAL_OUTLETS_VISITED
  );
};

export const getLocationAnalytics = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.DETAILED_ANALYTICS.GET_LOCATION_ANALYTICS
  );
};

export const getSalesmanSummary = async () => {
  return await api.get(
    API_PATHS.DASHBOARD.SALESMAN_SUMMARY.GET_SALESMAN_SUMMARY
  );
};

export const getAvgDailyVisits = async () => {
  return await api.get(API_PATHS.DASHBOARD.GET_AVG_DAILY_VISITS);
};
