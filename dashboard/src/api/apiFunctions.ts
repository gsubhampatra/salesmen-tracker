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

export const getVisited = async (date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.VISITED+`?date=${date}`);
}

export const getSalesmanTimeAnalysis = async (salesmanId: number, date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.SALESMAN_TIME_ANALYSIS(salesmanId)+`?date=${date}`);
}

export const getVisitedOutletsBySalesman = async (salesmanId: number, date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.VISITED_OUTLETS(salesmanId)+`?date=${date}`);
}

export const getAssignedOutletsBySalesman = async (salesmanId: number, date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.ASSIGNED_OUTLETS(salesmanId)+`?date=${date}`);
}

export const getAccuracyBySalesman = async (salesmanId: number, startDate?: string, endDate?: string) => {
  return await api.get(API_PATHS.DASHBOARD.ACCURACY_BY_SALESMAN(salesmanId), { params: { startDate, endDate } });
}

export const getAllVisitedLocations = async (date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.ALL_VISITED_LOCATIONS+`?date=${date}`);
}

export const getAllAssignedLocations = async (date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.ALL_ASSIGNED_LOCATIONS+`?date=${date}`);
}

export const getAllSalesmenReport = async (date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.ALL_SALESMEN_REPORT+`?date=${date}`);
}

export const getAllDistributorsReport = async (date?: string) => {
  return await api.get(API_PATHS.DASHBOARD.ALL_DISTRIBUTORS_REPORT+`?date=${date}`);
}

export const getAccuracy = async (startDate?: string, endDate?: string) => {
  return await api.get(API_PATHS.DASHBOARD.ACCURACY, { params: { startDate, endDate } });
}