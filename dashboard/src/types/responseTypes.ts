// ==============================================================
// Data Types
// ==============================================================

export interface SalesmanCountData {
  salesManType: string;
  count: number;
}

export interface SalesmanCountResponse {
  msg: string;
  salesmen: {
    resData: SalesmanCountData[];
    total: number;
  };
}

export interface StoreCountData {
  storeType: string;
  count: number;
}

export interface StoreCountResponse {
  msg: string;
  stores: {
    resData: StoreCountData[];
    total: number;
  };
}

export interface Salesman {
  id: number;
  name: string;
  uid: string;
  phone?: string | null; // Modified to accept null
  canLogin: boolean;
  salesManType: string;
  managerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AllSalesmenResponse {
  msg: string;
  allSalesmen: Salesman[];
}

export interface Store {
  id: number;
  name: string;
  market_name: string;
  address: string;
  latitude: number;
  longitude: number;
  region: string;
  state: string;
  storeType: string;
  managerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AllStoresResponse {
  msg: string;
  allStores: Store[];
}

export interface VisitedLocation {
  id: number;
  date: string;
  locationId: number;
  salesManId: number;
  UserLatitude: number;
  UserLongitude: number;
  scanDistance: number;
}

export interface VisitedLocationResponse {
  msg: string;
  totalVisited: number;
  date: string;
}

export interface TimeAnalysis {
  salesmanId: number;
  date: string;
  inTime: string | null; // Allow null
  outTime: string | null; // Allow null
}

export interface Accuracy {
  accuracyPercentage: number;
  accuracyThreshold: number;
  totalVisits: number;
  accurateVisits: number;
}

export interface DistributorReport {
  storeName: string;
  marketName: string;
  address: string;
  latitude: number;
  longitude: number;
  managerName: string;
  region: string;
  state: string;
  inTime: number | null;
  outTime: number | null;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyPercentage: number;
  assignedSalesmans: number[];
}

export interface DistributorReportResponse {
  success: boolean;
  data: DistributorReport[];
}

export interface DistributorAnalytics {
  region: string;
  state: string;
  salesmanType: string;
  inTime: number | null;
  outTime: number | null;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyPercentage: number;
  locationName: string;
  marketName: string;
  salesmanName: string;
}

export interface DistributorAnalyticsResponse {
  success: boolean;
  data: DistributorAnalytics[];
  debug?: {
    dateQueried: Date;
    totalDistributors: number;
    distributorsWithVisits: number;
  };
}

export interface TotalOutletsAssignedResponse {
  success: boolean;
  totalOutletsAssigned: number;
}

export interface TotalOutletsVisitedResponse {
  success: boolean;
  totalOutletsVisited: number;
}

export interface OverallAccuracyPercentageResponse {
  success: boolean;
  overallAccuracy: string; // percentage as string with 2 decimal places
}

export interface AverageVisitDurationResponse {
  success: boolean;
  avgVisitDuration: string; // duration as string with 2 decimal places
}

export interface MaxDistanceTraveledResponse {
  success: boolean;
  maxDistanceTraveled: string; // distance as string with 2 decimal places
}

export interface UniqueSalesmenResponse {
  success: boolean;
  totalSalesmen: number;
}

export interface VisitsPerDistributor {
  locationName: string;
  totalVisits: number;
}

export interface VisitsPerDistributorResponse {
  success: boolean;
  visitsPerDistributor: VisitsPerDistributor[];
}

export interface MostActiveSalesman {
  name: string;
  totalVisits: number;
}

export interface MostActiveSalesmanResponse {
  success: boolean;
  mostActiveSalesman: MostActiveSalesman | null;
}

export interface DistributorsWithNoVisitsResponse {
  success: boolean;
  distributorsWithNoVisits: number;
}

export interface PeakVisitingHour {
  hour: string;
  visits: number;
}

export interface PeakVisitingHoursResponse {
  success: boolean;
  peakVisitingHours: PeakVisitingHour[];
}

export interface SalesmanAccuracy {
  salesmanName: string;
  accuracyPercentage: number;
}

export interface SalesmanAccuracyResponse {
  success: boolean;
  salesmanAccuracy: SalesmanAccuracy[];
}
export interface SalesmanProductivity {
  date: string;
  salesman: string;
  visits: number;
}

export interface SalesmanProductivityResponse {
  success: boolean;
  data: SalesmanProductivity[];
}

export interface AverageVisitDurationOverTime {
  date: string;
  avgDuration: number;
}

export interface AverageVisitDurationOverTimeResponse {
  success: boolean;
  data: AverageVisitDurationOverTime[];
}

export interface AccuracyOverTime {
  date: string;
  accuracy: number;
}

export interface AccuracyOverTimeResponse {
  success: boolean;
  data: AccuracyOverTime[];
}


//Mock Data Interfaces
export interface AccuracyResponse {
    accuracyPercentage: number;
    accuracyThreshold: number;
    totalVisits: number;
    accurateVisits: number;
}

// ==============================================================
// Mock Data
// ==============================================================

export const mockSalesmenCount: SalesmanCountResponse = {
  msg: "all salesmen fetched",
  salesmen: {
    resData: [
      { salesManType: "PRESELLER", count: 1 },
      { salesManType: "VANSALES", count: 3 },
      { salesManType: "MERCHANDISER", count: 11 },
    ],
    total: 15,
  },
};

export const mockStoreCount: StoreCountResponse = {
  msg: "managers locations fetched",
  stores: {
    resData: [
      { storeType: "WHOLESALER", count: 44 },
      { storeType: "RETAILER", count: 98 },
      { storeType: "DISTRIBUTOR", count: 8 },
    ],
    total: 150,
  },
};

export const mockAllSalesmen: AllSalesmenResponse = {
  msg: "all salesmen fetched",
  allSalesmen: [
    {
      id: 1,
      name: "Honeybunny",
      uid: "9337318873",
      phone: null,
      canLogin: true,
      salesManType: "PRESELLER",
      managerId: 4,
      createdAt: "2025-02-01T12:37:57.752Z",
      updatedAt: "2025-02-03T09:33:34.505Z",
    },
    {
      id: 2,
      name: "Amith",
      uid: "933731872",
      phone: null,
      canLogin: true,
      salesManType: "PRESELLER",
      managerId: 4,
      createdAt: "2025-02-01T12:37:57.752Z",
      updatedAt: "2025-02-03T09:33:34.505Z",
    },
  ],
};

export const mockAllStores: AllStoresResponse = {
  msg: "all stores fetched",
  allStores: [
    {
      id: 9,
      name: "Austin Gold Store",
      market_name: "Bariga Market ",
      address: "Jegunmolu Street -J14",
      latitude: 6.5388091,
      longitude: 3.3927582,
      region: "",
      state: "Lagos ",
      storeType: "RETAILER",
      managerId: 6,
      createdAt: "2025-02-04T10:34:23.263Z",
      updatedAt: "2025-02-04T10:34:23.263Z",
    },
    {
      id: 10,
      name: "Ideal Store",
      market_name: "Bariga Market ",
      address: "Abu Street, No.5",
      latitude: 6.539256,
      longitude: 3.3930545,
      region: "",
      state: "Lagos ",
      storeType: "RETAILER",
      managerId: 6,
      createdAt: "2025-02-04T10:34:23.263Z",
      updatedAt: "2025-02-04T10:34:23.263Z",
    },
  ],
};

export const mockVisitedLocations: VisitedLocationResponse = {
  msg: "salesmen visited fetched",
  totalVisited: 0,
  date: "2025-02-20T08:44:19.657Z",
};

export const mockTimeAnalysis: TimeAnalysis = {
  salesmanId: 1,
  date: "2025-02-19T18:30:00.000Z",
  inTime: null,
  outTime: null,
};

export const mockAccuracy: Accuracy = {
  accuracyPercentage: 14.285714285714285,
  accuracyThreshold: 100,
  totalVisits: 7,
  accurateVisits: 1,
};

