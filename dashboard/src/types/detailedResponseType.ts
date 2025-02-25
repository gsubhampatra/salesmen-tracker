
export interface TotalSalesmenResponse {
    totalSalesmen: number;
  }
  
  export interface TotalLocationsManagedResponse {
    totalLocations: number;
  }
  
  export interface TotalVisitsMadeResponse {
    totalVisits: number;
  }
  
  export interface OverallAccuracyResponse {
    accuracyPercentage: string; // percentage as string with 2 decimal places
  }
  
  export interface PeakVisitingHourResponse {
    peakHours: number[];
  }
  
  export interface MostVisitedLocation {
    locationId: number;
    locationName: string;
    visitCount: number;
  }
  
  export interface MostVisitedLocationsResponse {
    mostVisitedLocations: MostVisitedLocation[];
  }
  
  export interface AverageVisitDurationsResponse {
    averageVisitDuration: string; // duration as string with 2 decimal places
  }
  
  export interface RegionWiseSalesmanCount {
    region: string;
    _count: {
      id: number;
    };
  }
  
  export interface RegionWiseSalesmanCountResponse {
    regionSalesmanCount: RegionWiseSalesmanCount[];
  }
  
  export interface StateWiseVisitDistribution {
    state: string;
    _count: {
      id: number;
    };
  }
  
  export interface StateWiseVisitDistributionResponse {
    stateVisitDistribution: StateWiseVisitDistribution[];
  }
  
  export interface TotalOutletsAssignedResponse {
    totalOutletsAssigned: number;
  }
  
  export interface TotalOutletsVisitedResponse {
    totalOutletsVisited: number;
  }

  export interface LocationAnalytics {
    storeType: string;
    region: string;
    state: string[];
    salesmanType: string;
    inTime: string | null;
    outTime: string | null;
    outletsVisited: number;
    outletsAssigned: number;
    accuracyPercentage: number;
    locationName: string;
    marketName: string;
    salesmanName: string;
  }
  
  export interface LocationAnalyticsResponse {
    success: boolean;
    data: LocationAnalytics[];
    debug: {
      dateQueried: Date;
      totalLocations: number;
      locationsWithVisits: number;
    };
  }

  export interface MostVisitedLocation {
    locationId: number;
    locationName: string;
    visitCount: number;
  }
  
  export interface MostVisitedLocationResponse {
    mostVisitedLocation: MostVisitedLocation | null;
  }

  export interface LocationAnalytic {
    storeType: string;
    region: string;
    state: string;
    address: string; 
    salesmanType: string;
    inTime: number | null;
    outTime: number | null;
    outletsVisited: number;
    outletsAssigned: number;
    accuracyPercentage: number;
    accuracyDistance: string | null;
    visited: string;
    locationName: string;
    marketName: string;
    salesmanName: string;
  }
  
  export interface LocationAnalyticResponse {
    success: boolean;
    data: LocationAnalytic[];
    debug: {
      dateQueried: Date;
      totalLocations: number;
      locationsWithVisits: number;
    };
  }

  export interface AvgDailyVisitResponse{
    avgDailyVisits: number;
  }