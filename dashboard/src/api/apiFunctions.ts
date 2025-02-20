import { api, API_PATHS } from "./config";

export const getSalesmenCount = async () => {
  return await api.get(API_PATHS.DASHBOARD.SALESMEN_COUNT);
};

export const getStoreCount = async () => {
  return await api.get(API_PATHS.DASHBOARD.STORES_COUNT);
}

export const getAllSalesmen = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_SALESMEN);
}

export const getAllStores = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_STORES);
}

export const getVisited = async () => {
  return await api.get(API_PATHS.DASHBOARD.VISITED);
}

export const getSalesmanTimeAnalysis = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.SALESMAN_TIME_ANALYSIS(salesmanId));
}

export const getVisitedOutletsBySalesman = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.VISITED_OUTLETS(salesmanId));
}

export const getAssignedOutletsBySalesman = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.ASSIGNED_OUTLETS(salesmanId));
}

export const getAccuracyBySalesman = async (salesmanId: number) => {
  return await api.get(API_PATHS.DASHBOARD.ACCURACY_BY_SALESMAN(salesmanId));
}

export const getAllVisitedLocations = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_VISITED_LOCATIONS);
}

export const getAllAssignedLocations = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_ASSIGNED_LOCATIONS);
}

export const getAllSalesmenReport = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_SALESMEN_REPORT);
}

export const getAllDistributorsReport = async () => {
  return await api.get(API_PATHS.DASHBOARD.ALL_DISTRIBUTORS_REPORT);
}

export const getAccuracy = async () => {
  return await api.get(API_PATHS.DASHBOARD.ACCURACY);
}
