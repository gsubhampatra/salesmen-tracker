import React from "react";
import { useSalesmenCount, useStoreCount, useAccuracyOverTime } from "../api/apiHooks";
import SalesmenChart from "../components/graphs/SalesmanChart";
import StoreChart from "../components/graphs/StoreChart";
import AccuracyOverTime from "../components/graphs/distributor/AccuracyGraph";

import {
  useTotalSalesmen,
  useTotalLocationsManaged,
  useTotalVisitsMade,
  useMostVisitedLocation,
} from "../hooks/detailedAnalyticsHooks";
import { useTotalOutletsAssigned, useTotalOutletsVisited } from "../api/apiHooks";
import {
  TotalSalesmenCard,
  TotalLocationsManagedCard,
  TotalVisitsMadeCard,
  TotalOutletsAssignedCard,
  TotalOutletsVisitedCard,
  MostVisitedLocationCard,
} from "../components/cards/analyticsCard";

const Home: React.FC = () => {
  const { data: salesmenCountResponse, isLoading: isLoadingSalesmenCount } = useSalesmenCount();
  const { data: storeCountResponse, isLoading: isLoadingStoreCount } = useStoreCount();
  const { data: accuracyResponse, isLoading: isLoadingAccuracy } = useAccuracyOverTime();
  const { data: totalSalesmenData, isLoading: isLoadingTotalSalesmen } = useTotalSalesmen();
  const { data: totalLocationsManagedData, isLoading: isLoadingTotalLocationsManaged } = useTotalLocationsManaged();
  const { data: totalVisitsMadeData, isLoading: isLoadingTotalVisitsMade } = useTotalVisitsMade();
  const { data: mostVisitedLocationData, isLoading: isLoadingMostVisitedLocation } = useMostVisitedLocation();
  const { data: totalOutletsAssignedData, isLoading: isLoadingTotalOutletsAssigned } = useTotalOutletsAssigned();
  const { data: totalOutletsVisitedData, isLoading: isLoadingTotalOutletsVisited } = useTotalOutletsVisited();

  if (
    isLoadingSalesmenCount ||
    isLoadingStoreCount ||
    isLoadingAccuracy ||
    isLoadingTotalSalesmen ||
    isLoadingTotalLocationsManaged ||
    isLoadingTotalVisitsMade ||
    isLoadingMostVisitedLocation ||
    isLoadingTotalOutletsAssigned ||
    isLoadingTotalOutletsVisited
  ) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">Loading...</div>;
  }

  const salesmenCount = salesmenCountResponse?.salesmen.resData;
  const storeCount = storeCountResponse?.stores.resData;
  const accuracyData = accuracyResponse?.data;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <TotalSalesmenCard data={totalSalesmenData ?? { totalSalesmen: 0 }} />
        <TotalLocationsManagedCard data={totalLocationsManagedData ?? { totalLocations: 0 }} />
        <TotalVisitsMadeCard data={totalVisitsMadeData ?? { totalVisits: 0 }} />
        <TotalOutletsAssignedCard data={totalOutletsAssignedData ?? { totalOutletsAssigned: 0 }} />
        <TotalOutletsVisitedCard data={totalOutletsVisitedData ?? { totalOutletsVisited: 0 }} />
        <MostVisitedLocationCard data={mostVisitedLocationData?.mostVisitedLocation ?? { locationId: 0, locationName: "Unknown", visitCount: 0 }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SalesmenChart data={salesmenCount || []} />
        <StoreChart data={storeCount || []} />
        <AccuracyOverTime data={accuracyData || []} />
      </div>
    </div>
  );
};

export default Home;