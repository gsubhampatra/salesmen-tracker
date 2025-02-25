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
  DistributorAnalyticsResponse,
  TotalOutletsAssignedResponse,
  TotalOutletsVisitedResponse,
  OverallAccuracyPercentageResponse,
  AverageVisitDurationResponse,
  MaxDistanceTraveledResponse,
  UniqueSalesmenResponse,
  VisitsPerDistributorResponse,
  MostActiveSalesmanResponse,
  DistributorsWithNoVisitsResponse,
  PeakVisitingHoursResponse,
  SalesmanAccuracyResponse,
  SalesmanProductivityResponse,
  AverageVisitDurationOverTimeResponse,
  AccuracyOverTimeResponse,
} from "../types/responseTypes";
import {
  getSalesmenCount,
  getVisited,
  getSalesmanTimeAnalysis,
  getAccuracy,
  getStoreCount,
  getAllSalesmen,
  getAllStores,
  getDistributorAnalytics,
  gettotalOutletsAssigned,
  gettotalOutletsVisited,
  getAverageVisitDuration,
  getMaxDistanceTraveled,
  getUniqueSalesman,
  getVisitsPerDistributor,
  getMostActiveSalesman,
  getDistributorWithNoVisits,
  getPeakVisitingHours,
  getSalesmanAccuracy,
  getSalesmanProductivity,
  getAvgVisitDurationOvertime,
  getAccuracyOverTime,
  getSalesmanSummary,
  getAccuracyPercentage,
  getAvgDailyVisits,
} from "./apiFunctions";
import { AvgDailyVisitResponse, LocationAnalyticResponse } from "../types/detailedResponseType";

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

const useAllStores = () => {
  return useQuery<AllStoresResponse>({
    queryKey: ["allStores"],
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

const useVisitedLocations = () => {
  return useQuery<VisitedLocationResponse>({
    queryKey: ["visitedLocations"],
    queryFn: async () => {
      try {
        const response = await getVisited();
        return response.data;
      } catch (error) {
        console.error("Error fetching visited locations:", error);
        return mockVisitedLocations; // Provide mock data on error
      }
    },
  });
};

const useTimeAnalysis = (salesmanId: number) => {
  return useQuery<TimeAnalysis>({
    queryKey: ["timeAnalysis", salesmanId],
    queryFn: async () => {
      try {
        const response = await getSalesmanTimeAnalysis(salesmanId);
        return response.data;
      } catch (error) {
        console.error(`Error fetching time analysis for salesman ${salesmanId}:`, error);
        return mockTimeAnalysis; // Provide mock data on error
      }
    },
  });
};

const useAccuracy = () => {
  return useQuery<Accuracy>({
    queryKey: ["accuracy"],
    queryFn: async () => {
      try {
        const response = await getAccuracy();
        return response.data;
      } catch (error) {
        console.error("Error fetching accuracy:", error);
        return mockAccuracy; // Provide mock data on error
      }
    },
  });
};

const useDistributorAnalytics = () => {
  return useQuery<DistributorAnalyticsResponse>({
    queryKey: ["distributorAnalytics"],
    queryFn: async () => {
      try {
        const response = await getDistributorAnalytics();
        return response.data;
      } catch (error) {
        console.error("Error fetching distributor analytics:", error);
        return  // Provide mock data on error
      }
    },
  });
};

const useTotalOutletsAssigned = () => {
  return useQuery<TotalOutletsAssignedResponse>({
    queryKey: ["totalOutletsAssigned"],
    queryFn: async () => {
      const response = await gettotalOutletsAssigned();
      return response.data;
    },
  });
};

const useTotalOutletsVisited = () => {
  return useQuery<TotalOutletsVisitedResponse>({
    queryKey: ["totalOutletsVisited"],
    queryFn: async () => {
      const response = await gettotalOutletsVisited();
      return response.data;
    },
  });
};

export const useAccuracyPercentage = () => {
  return useQuery<OverallAccuracyPercentageResponse>({
    queryKey: ["accuracyPercentage"],
    queryFn: async () => {
      const response = await getAccuracyPercentage();
      return response.data;
    },
  });
};

const useAverageVisitDuration = () => {
  return useQuery<AverageVisitDurationResponse>({
    queryKey: ["averageVisitDuration"],
    queryFn: async () => {
      const response = await getAverageVisitDuration();
      return response.data;
    },
  });
};

const useMaxDistanceTraveled = () => {
  return useQuery<MaxDistanceTraveledResponse>({
    queryKey: ["maxDistanceTraveled"],
    queryFn: async () => {
      const response = await getMaxDistanceTraveled();
      return response.data;
    },
  });
};

const useUniqueSalesman = () => {
  return useQuery<UniqueSalesmenResponse>({
    queryKey: ["uniqueSalesman"],
    queryFn: async () => {
      const response = await getUniqueSalesman();
      return response.data;
    },
  });
};

const useVisitsPerDistributor = () => {
  return useQuery<VisitsPerDistributorResponse>({
    queryKey: ["visitsPerDistributor"],
    queryFn: async () => {
      const response = await getVisitsPerDistributor();
      return response.data;
    },
  });
};

const useMostActiveSalesman = () => {
  return useQuery<MostActiveSalesmanResponse>({
    queryKey: ["mostActiveSalesman"],
    queryFn: async () => {
      const response = await getMostActiveSalesman();
      return response.data;
    },
  });
};

const useDistributorWithNoVisits = () => {
  return useQuery<DistributorsWithNoVisitsResponse>({
    queryKey: ["distributorWithNoVisits"],
    queryFn: async () => {
      const response = await getDistributorWithNoVisits();
      return response.data;
    },
  });
};

const usePeakVisitingHours = () => {
  return useQuery<PeakVisitingHoursResponse>({
    queryKey: ["peakVisitingHours"],
    queryFn: async () => {
      const response = await getPeakVisitingHours();
      return response.data;
    },
  });
};

const useSalesmanAccuracy = () => {
  return useQuery<SalesmanAccuracyResponse>({
    queryKey: ["salesmanAccuracy"],
    queryFn: async () => {
      const response = await getSalesmanAccuracy();
      return response.data;
    },
  });
};

const useSalesmanProductivity = () => {
  return useQuery<SalesmanProductivityResponse>({
    queryKey: ["salesmanProductivity"],
    queryFn: async () => {
      const response = await getSalesmanProductivity();
      return response.data;
    },
  });
};

const useAvgVisitDurationOvertime = () => {
  return useQuery<AverageVisitDurationOverTimeResponse>({
    queryKey: ["averageVisitDurationOverTime"],
    queryFn: async () => {
      const response = await getAvgVisitDurationOvertime();
      return response.data;
    },
  });
};

const useAccuracyOverTime = () => {
  return useQuery<AccuracyOverTimeResponse>({
    queryKey: ["accuracyOverTime"],
    queryFn: async () => {
      const response = await getAccuracyOverTime();
      return response.data;
    },
  });
};

const useSalesmanSummary = (date?: string) => {
  return useQuery<LocationAnalyticResponse>({
    queryKey: ["salesmanSummary", date],
    queryFn: async () => {
      const response = await getSalesmanSummary();
      return response.data;
    },
  });
};

export const useAvgDailyVisits = () => {
  return useQuery<AvgDailyVisitResponse>({
    queryKey: ["avgDailyVisits"],
    queryFn: async () => {
      const response = await getAvgDailyVisits();
      return response.data;
    }
  } );
};



export {
  useSalesmenCount,
  useStoreCount,
  useAllSalesmen,
  useAllStores,
  useVisitedLocations,
  useTimeAnalysis,
  useAccuracy,
  useDistributorAnalytics,
  useTotalOutletsAssigned,
  useTotalOutletsVisited,
  useAverageVisitDuration,
  useMaxDistanceTraveled,
  useUniqueSalesman,
  useVisitsPerDistributor,
  useMostActiveSalesman,
  useDistributorWithNoVisits,
  usePeakVisitingHours,
  useSalesmanAccuracy,
  useSalesmanProductivity,
  useAvgVisitDurationOvertime,
  useAccuracyOverTime,
  useSalesmanSummary,
};