import React from "react";
import { Loader2 } from "lucide-react";
import DistributorAnalyticsTable from "../components/graphs/distributor/DistributorTable";
import {
  useDistributorAnalytics,
  useTotalOutletsAssigned,
  useTotalOutletsVisited,
  useOverallAccuracy,
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
  OverallAccuracyCard,
  AvgVisitDurationCard,
  MaxDistanceTraveledCard,
  TotalSalesmenCard,
} from "../components/cards/distributorCard";
// import AccuracyOverTime from "../components/graphs/distributor/AccuracyGraph";
// import SalesmanProductivity from "../components/graphs/distributor/ProductivityGraph";
// import AverageVisitDuration from "../components/graphs/distributor/AvgVistitGraph";

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    <span className="ml-2 text-lg text-gray-700">Loading dashboard data...</span>
  </div>
);

const ErrorState: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="text-xl text-red-600 font-semibold mb-2">Error Loading Data</p>
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
  const overallAccuracyQuery = useOverallAccuracy();
  const averageVisitDurationQuery = useAverageVisitDuration();
  const maxDistanceTraveledQuery = useMaxDistanceTraveled();
  const uniqueSalesmanQuery = useUniqueSalesman();

  // Consolidated Loading & Error States
  const isLoading =
    distributorAnalyticsQuery.isLoading ||
    totalOutletsAssignedQuery.isLoading ||
    totalOutletsVisitedQuery.isLoading ||
    overallAccuracyQuery.isLoading ||
    averageVisitDurationQuery.isLoading ||
    maxDistanceTraveledQuery.isLoading ||
    uniqueSalesmanQuery.isLoading;

  const hasError =
    distributorAnalyticsQuery.error ||
    totalOutletsAssignedQuery.error ||
    totalOutletsVisitedQuery.error ||
    overallAccuracyQuery.error ||
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Distributor Dashboard</h1>
          <p className="text-gray-600">Overview of distributor performance and analytics</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <TotalOutletsAssignedCard
            totalOutletsAssigned={totalOutletsAssignedQuery.data?.totalOutletsAssigned ?? 0}
          />
          <TotalOutletsVisitedCard
            totalOutletsVisited={totalOutletsVisitedQuery.data?.totalOutletsVisited ?? 0}
          />
          <OverallAccuracyCard
            overallAccuracy={overallAccuracyQuery.data?.overallAccuracy ?? ""}
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
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Analytics</h2>
          <DistributorAnalyticsTable data={distributorAnalyticsQuery.data.data} />
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;
