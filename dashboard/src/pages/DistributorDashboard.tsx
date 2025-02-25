import React from "react";
import { Loader2 } from "lucide-react";
import DistributorAnalyticsTable from "../components/graphs/distributor/DistributorTable";
import {
  useDistributorAnalytics,
  useTotalOutletsAssigned,
  useTotalOutletsVisited,
  useAverageVisitDuration,
  useMaxDistanceTraveled,
  useUniqueSalesman,
  // useAccuracyOverTime,
  // useSalesmanProductivity,
  // useAvgVisitDurationOvertime,
} from "../api/apiHooks";
import {
  TotalOutletsAssignedCard,
  TotalOutletsVisitedCard,
  AvgVisitDurationCard,
  MaxDistanceTraveledCard,
  TotalSalesmenCard,
} from "../components/cards/distributorCard";
// import AccuracyOverTime from "../components/graphs/distributor/AccuracyGraph";
// import SalesmanProductivity from "../components/graphs/distributor/ProductivityGraph";
// import AverageVisitDuration from "../components/graphs/distributor/AvgVistitGraph";

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    <span className="ml-2 text-lg text-gray-700">Loading dashboard data...</span>
  </div>
);

const ErrorState: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <p className="mb-2 text-xl font-semibold text-red-600">Error Loading Data</p>
      <p className="text-gray-600">
        Please try refreshing the page or contact support if the issue persists.
      </p>
    </div>
  </div>
);

const DistributorDashboard: React.FC = () => {
  // Fetching data
  const distributorAnalyticsQuery = useDistributorAnalytics();
  const totalOutletsAssignedQuery = useTotalOutletsAssigned();
  const totalOutletsVisitedQuery = useTotalOutletsVisited();
  // const overallAccuracyQuery = useOverallAccuracy();
  const averageVisitDurationQuery = useAverageVisitDuration();
  const maxDistanceTraveledQuery = useMaxDistanceTraveled();
  const uniqueSalesmanQuery = useUniqueSalesman();

  // Consolidated Loading & Error States
  const isLoading =
    distributorAnalyticsQuery.isLoading ||
    totalOutletsAssignedQuery.isLoading ||
    totalOutletsVisitedQuery.isLoading ||
    averageVisitDurationQuery.isLoading ||
    maxDistanceTraveledQuery.isLoading ||
    uniqueSalesmanQuery.isLoading;

  const hasError =
    distributorAnalyticsQuery.error ||
    totalOutletsAssignedQuery.error ||
    totalOutletsVisitedQuery.error ||
    averageVisitDurationQuery.error ||
    maxDistanceTraveledQuery.error ||
    uniqueSalesmanQuery.error;

  if (isLoading) return <LoadingSpinner />;
  if (hasError || !distributorAnalyticsQuery.data?.data) return <ErrorState />;

  // const accuracyData = useAccuracyOverTime();
  // const productivityData = useSalesmanProductivity();
  // const visitDurationData = useAvgVisitDurationOvertime();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Distributor Dashboard</h1>
          <p className="text-gray-600">Overview of distributor performance and analytics</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          <TotalOutletsAssignedCard
            totalOutletsAssigned={totalOutletsAssignedQuery.data?.totalOutletsAssigned ?? 0}
          />
          <TotalOutletsVisitedCard
            totalOutletsVisited={totalOutletsVisitedQuery.data?.totalOutletsVisited ?? 0}
          />
        
          <AvgVisitDurationCard
            avgVisitDuration={averageVisitDurationQuery.data?.avgVisitDuration ?? ""}
          />
          <MaxDistanceTraveledCard
            maxDistanceTraveled={maxDistanceTraveledQuery.data?.maxDistanceTraveled ?? ""}
          />
          <TotalSalesmenCard
            totalSalesmen={uniqueSalesmanQuery.data?.totalSalesmen ?? 0}
          />
        </div>
        {/* <div>
        <AccuracyOverTime data={accuracyData.data?.data ?? []} />
          <SalesmanProductivity data={productivityData.data?.data ?? []} />
          <AverageVisitDuration data={visitDurationData.data?.data ?? []} />
    </div> */}

        {/* Detailed Analytics Table */}
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Detailed Analytics</h2>
          <DistributorAnalyticsTable data={distributorAnalyticsQuery.data.data} />
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;
