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
  },
};
