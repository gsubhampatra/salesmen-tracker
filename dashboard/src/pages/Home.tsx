import React from "react";
import {
  useAccuracyPercentage,
  useAvgDailyVisits,
  useSalesmenCount,
  useStoreCount,
} from "../api/apiHooks";
import SalesmenChart from "../components/graphs/SalesmanChart";
import StoreChart from "../components/graphs/StoreChart";

import {
  useTotalSalesmen,
  useTotalLocationsManaged,
  useTotalVisitsMade,
} from "../hooks/detailedAnalyticsHooks";
import { useTotalOutletsAssigned } from "../api/apiHooks";
import {
  TotalSalesmenCard,
  TotalLocationsManagedCard,
  TotalVisitsMadeCard,
  TotalOutletsAssignedCard,
  AccuracyPercentageCard,
  AvgDailyVisitsCard,
} from "../components/cards/analyticsCard";

const Home: React.FC = () => {
  const { data: salesmenCountResponse, isLoading: isLoadingSalesmenCount } =
    useSalesmenCount();
  const { data: storeCountResponse, isLoading: isLoadingStoreCount } =
    useStoreCount();
  const { data: accuracyResponse } = useAccuracyPercentage();

  const { data: totalSalesmenData, isLoading: isLoadingTotalSalesmen } =
    useTotalSalesmen();
  const {
    data: totalLocationsManagedData,
    isLoading: isLoadingTotalLocationsManaged,
  } = useTotalLocationsManaged();
  const { data: totalVisitsMadeData, isLoading: isLoadingTotalVisitsMade } =
    useTotalVisitsMade();
  const {
    data: totalOutletsAssignedData,
    isLoading: isLoadingTotalOutletsAssigned,
  } = useTotalOutletsAssigned();
  const { data: avgDailyVisitsData } = useAvgDailyVisits();
  if (
    isLoadingSalesmenCount ||
    isLoadingStoreCount ||
    isLoadingTotalSalesmen ||
    isLoadingTotalLocationsManaged ||
    isLoadingTotalVisitsMade ||
    isLoadingTotalOutletsAssigned
  ) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  const salesmenCount = salesmenCountResponse?.salesmen.resData;
  const storeCount = storeCountResponse?.stores.resData;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl font-bold text-center text-blue-800">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <TotalSalesmenCard data={totalSalesmenData ?? { totalSalesmen: 0 }} />
        <TotalLocationsManagedCard
          data={totalLocationsManagedData ?? { totalLocations: 0 }}
        />
        <TotalVisitsMadeCard data={totalVisitsMadeData ?? { totalVisits: 0 }} />
        <TotalOutletsAssignedCard
          data={totalOutletsAssignedData ?? { totalOutletsAssigned: 0 }}
        />
        <AccuracyPercentageCard
          data={{
            accracyPercentage: String(accuracyResponse?.accuracyPercentage || 0),
          }}
        />
        <AvgDailyVisitsCard
          data={{ avgDailyVisits: avgDailyVisitsData?.avgDailyVisits }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SalesmenChart data={salesmenCount || []} />
        <StoreChart data={storeCount || []} />
      </div>
    </div>
  );
};

export default Home;
