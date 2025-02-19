import { api, API_PATHS } from "./config";

export const getTotalSalesMan = async () => {
  const response = await api.get(API_PATHS.DASHBOARD.TOTAL_SALESMAN);
  console.log(response);

  return response.data;
};

export const getSalesmenVisitedToday = async () => {
  const response = await api.get(API_PATHS.DASHBOARD.VISITED_TODAY);
  return response.data;
};

export const getSalesmenNotVisitedToday = async () => {
  const response = await api.get(API_PATHS.DASHBOARD.NOT_VISITED_TODAY);
  return response.data;
};
