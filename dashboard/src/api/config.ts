import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/dashboard`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API_PATHS = {
  DASHBOARD: {
    ROOT: "/",
    SALESMEN_COUNT: "/salesmen-count",
    STORES_COUNT: "/stores-count",
    ALL_SALESMEN: "/salesmen",
    ALL_STORES: "/stores",
    VISITED: "/visited",
    SALESMAN_TIME_ANALYSIS: (salesmanId: number) =>
      `/salesman/${salesmanId}/time-analysis`,
    VISITED_OUTLETS: (salesmanId: number) =>
      `/salesman/${salesmanId}/visited-outlets`,
    ASSIGNED_OUTLETS: (salesmanId: number) =>
      `/salesman/${salesmanId}/assigned-outlets`,
    ACCURACY: "/accuracy",
    ACCURACY_BY_SALESMAN: (salesmanId: number) => `/accuracy/${salesmanId}`,
    ALL_VISITED_LOCATIONS: "/getallvisits",
    ALL_ASSIGNED_LOCATIONS: "/getAllAssignedLocations",
    ALL_SALESMEN_REPORT: "/getallsalesmansReport",
    ALL_DISTRIBUTORS_REPORT: "/getdistributorReport",

    DISTRIBUTOR: {
      ROOT: "/",
      GET_DISTRIBUTORS: "/getDistributors",
      GET_DISTRIBUTOR_ANALYTICS: "/getDistributorAnalytics",
      GET_TOTAL_DISTRIBUTORS: "/gettotaldistributors",
      GET_ACCURACY_PERCENTAGE: "/getAccuracyPercentage",
      GET_AVERAGE_VISIT_DURATION: "/getAverageVisitDuration",
      GET_MAX_DISTANCE_TRAVELED: "/getMaxDistanceTravelled",
      GET_UNIQUE_SALESMAN: "/getUniqueSalesman",
      GET_VISITS_PER_DISTRIBUTOR: "/getVisitsPerDistributor",
      GET_MOST_ACTIVE_SALESMAN: "/getMostActiveSalesman",
      GET_DISTRIBUTOR_WITH_NO_VISITS: "/getDistributorwithNoVisits",
      GET_PEAK_VISITING_HOURS: "/getPeakVisitingHours",
      GET_SALESMAN_ACCURACY: "/getSalesmanAccuracy",
      GET_ACCURACY_OVER_TIME: "/getaccuracyOverTime",
      GET_SALESMAN_PRODUCTIVITY: "/getSalesmanProductivity",
      GET_AVG_VISIT_DURATION_OVERTIME: "/getAvgVisitDurationOvertime",
    },

    DETAILED_ANALYTICS: {
      ROOT: "/",
      GET_TOTAL_SALESMEN: "/getTotalSalesmen",
      GET_TOTAL_LOCATIONS_MANAGED: "/getTotalLocationsManaged",
      GET_TOTAL_VISITS_MADE: "/getTotalVisitsMade",
      GET_OVERALL_ACCURACY: "/getOverallAccuracy",
      GET_PEAK_VISITING_HOURS: "/getPeakVisitingHours",
      GET_MOST_VISITED_LOCATIONS: "/getMostVisitedLocations",
      GET_MOST_VISITED_LOCATION: "/getMostVisitedLocation",
      GET_AVERAGE_VISIT_DURATION: "/getAverageVisitDuration",
      GET_REGION_WISE_SALESMEN: "/getRegionWiseSalesmen",
      GET_STATE_WISE_VISIT_DISTRIBUTION: "/getStateWiseVisitDistribution",
      GET_TOTAL_OUTLETS_ASSIGNED: "/getTotalOutletsAssigned",
      GET_TOTAL_OUTLETS_VISITED: "/getTotalOutletsVisited",
      GET_LOCATION_ANALYTICS: "/getLocationAnalytics",
    },

    GET_DETAILED_ANALYTICS_BY_DATE_RANGE: "/getLocationAnalyticsByDateRange",
    GET_AVG_DAILY_VISITS: "/getAvgDailyVisits",

    SALESMAN_SUMMARY: {
      ROOT: "/",
      GET_SALESMAN_SUMMARY: "/getSalesmanSummary",
    },
  },
};
