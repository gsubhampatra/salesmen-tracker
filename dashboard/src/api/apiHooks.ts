import { useQuery } from "@tanstack/react-query";
import {
  Accuracy,
  mockAccuracy,
  mockAllSalesmen,
  mockAllStores,
  mockSalesmenCount,
  mockStoreCount,
  mockTimeAnalysis,
  mockVisitedLocations,
  SalesmanCountResponse,
  StoreCountResponse,
  TimeAnalysis,
  VisitedLocationResponse,
  AllSalesmenResponse,
  AllStoresResponse,
} from "../types/responseTypes";
import {
  getSalesmenCount,
  getVisited,
  getSalesmanTimeAnalysis,
  getAccuracy,
  getStoreCount,
  getAllSalesmen,
  getAllStores,
} from "./apiFunctions";

const useSalesmenCount = () => {
  return useQuery<SalesmanCountResponse>({
    queryKey: ["salesmenCount"],
    queryFn: async () => {
      try {
        const response = await getSalesmenCount();
        return response.data;
      } catch (error) {
        console.error("Error fetching salesmen count:", error);
        return mockSalesmenCount; // Provide mock data on error
      }
    },
  });
};

const useStoreCount = () => {
  return useQuery<StoreCountResponse>({
    queryKey: ["storeCount"],
    queryFn: async () => {
      try {
        const response = await getStoreCount();
        return response.data;
      } catch (error) {
        console.error("Error fetching store count:", error);
        return mockStoreCount; // Provide mock data on error
      }
    },
  });
};

const useAllSalesmen = () => {
  return useQuery<AllSalesmenResponse>({
    queryKey: ["allSalesmen"],
    queryFn: async () => {
      try {
        const response = await getAllSalesmen();
        return response.data;
      } catch (error) {
        console.error("Error fetching all salesmen:", error);
        return mockAllSalesmen; // Provide mock data on error
      }
    },
  });
};

const useAllStores = (date?: string) => {
  return useQuery<AllStoresResponse>({
    queryKey: ["allStores", date],
    queryFn: async () => {
      try {
        const response = await getAllStores();
        return response.data;
      } catch (error) {
        console.error("Error fetching all stores:", error);
        return mockAllStores; // Provide mock data on error
      }
    },
  });
};

const useVisitedLocations = (date?: string) => {
  return useQuery<VisitedLocationResponse>({
    queryKey: ["visitedLocations", date],
    queryFn: async () => {
      try {
        const response = await getVisited(date);
        return response.data;
      } catch (error) {
        console.error("Error fetching visited locations:", error);
        return mockVisitedLocations; // Provide mock data on error
      }
    },
  });
};

const useTimeAnalysis = (salesmanId: number, date?: string) => {
  return useQuery<TimeAnalysis>({
    queryKey: ["timeAnalysis", salesmanId, date],
    queryFn: async () => {
      try {
        const response = await getSalesmanTimeAnalysis(salesmanId, date);
        return response.data;
      } catch (error) {
        console.error(`Error fetching time analysis for salesman ${salesmanId}:`, error);
        return mockTimeAnalysis; // Provide mock data on error
      }
    },
  });
};

const useAccuracy = (startDate?: string, endDate?: string) => {
  return useQuery<Accuracy>({
    queryKey: ["accuracy", startDate, endDate],
    queryFn: async () => {
      try {
        const response = await getAccuracy(startDate, endDate);
        return response.data;
      } catch (error) {
        console.error("Error fetching accuracy:", error);
        return mockAccuracy; // Provide mock data on error
      }
    },
  });
};

export {
  useSalesmenCount,
  useStoreCount,
  useAllSalesmen,
  useAllStores,
  useVisitedLocations,
  useTimeAnalysis,
  useAccuracy,
};