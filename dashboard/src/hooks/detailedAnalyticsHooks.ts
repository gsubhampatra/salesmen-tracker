import { useQuery } from "@tanstack/react-query";
import {
  getTotalSalesmen,
  getTotalLocationsManaged,
  getTotalVisitsMade,
  getOverallAccuracy,
  getPeakVisitingHour,
  getMostVisitedLocations,
  getMostVisitedLocation,
  getAverageVisitDurations,
  getRegionWiseSalesmen,
  getStateWiseVisitDistribution,
  gettotalOutletsAssigned,
  gettotalOutletsVisited,
  getLocationAnalytics,
} from "../api/apiFunctions";
import {
  TotalSalesmenResponse,
  TotalLocationsManagedResponse,
  TotalVisitsMadeResponse,
  OverallAccuracyResponse,
  PeakVisitingHourResponse,
  MostVisitedLocationsResponse,
  MostVisitedLocationResponse,
  AverageVisitDurationsResponse,
  RegionWiseSalesmanCountResponse,
  StateWiseVisitDistributionResponse,
  TotalOutletsAssignedResponse,
  TotalOutletsVisitedResponse,
  LocationAnalyticsResponse,
} from "../types/detailedResponseType";

const useTotalSalesmen = () => {
  return useQuery<TotalSalesmenResponse>({
    queryKey: ["totalSalesmen"],
    queryFn: async () => {
      const response = await getTotalSalesmen();
      return response.data;
    },
  });
};

const useTotalLocationsManaged = () => {
  return useQuery<TotalLocationsManagedResponse>({
    queryKey: ["totalLocationsManaged"],
    queryFn: async () => {
      const response = await getTotalLocationsManaged();
      return response.data;
    },
  });
};

const useTotalVisitsMade = () => {
  return useQuery<TotalVisitsMadeResponse>({
    queryKey: ["totalVisitsMade"],
    queryFn: async () => {
      const response = await getTotalVisitsMade();
      return response.data;
    },
  });
};

const useOverallAccuracy = () => {
  return useQuery<OverallAccuracyResponse>({
    queryKey: ["overallAccuracy"],
    queryFn: async () => {
      const response = await getOverallAccuracy();
      return response.data;
    },
  });
};

const usePeakVisitingHour = () => {
  return useQuery<PeakVisitingHourResponse>({
    queryKey: ["peakVisitingHour"],
    queryFn: async () => {
      const response = await getPeakVisitingHour();
      return response.data;
    },
  });
};

const useMostVisitedLocations = () => {
  return useQuery<MostVisitedLocationsResponse>({
    queryKey: ["mostVisitedLocations"],
    queryFn: async () => {
      const response = await getMostVisitedLocations();
      return response.data;
    },
  });
};

const useMostVisitedLocation = () => {
  return useQuery<MostVisitedLocationResponse>({
    queryKey: ["mostVisitedLocation"],
    queryFn: async () => {
      const response = await getMostVisitedLocation();
      return response.data;
    },
  });
};

const useAverageVisitDurations = () => {
  return useQuery<AverageVisitDurationsResponse>({
    queryKey: ["averageVisitDurations"],
    queryFn: async () => {
      const response = await getAverageVisitDurations();
      return response.data;
    },
  });
};

const useRegionWiseSalesmanCount = () => {
  return useQuery<RegionWiseSalesmanCountResponse>({
    queryKey: ["regionWiseSalesmanCount"],
    queryFn: async () => {
      const response = await getRegionWiseSalesmen();
      return response.data;
    },
  });
};

const useStateWiseVisitDistribution = () => {
  return useQuery<StateWiseVisitDistributionResponse>({
    queryKey: ["stateWiseVisitDistribution"],
    queryFn: async () => {
      const response = await getStateWiseVisitDistribution();
      return response.data;
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

const useLocationAnalytics = (date?: string) => {
  return useQuery<LocationAnalyticsResponse>({
    queryKey: ["locationAnalytics", date],
    queryFn: async () => {
      const response = await getLocationAnalytics();
      return response.data;
    },
  });
};

export {
  useTotalSalesmen,
  useTotalLocationsManaged,
  useTotalVisitsMade,
  useOverallAccuracy,
  usePeakVisitingHour,
  useMostVisitedLocations,
  useMostVisitedLocation,
  useAverageVisitDurations,
  useRegionWiseSalesmanCount,
  useStateWiseVisitDistribution,
  useTotalOutletsAssigned,
  useTotalOutletsVisited,
  useLocationAnalytics,
};