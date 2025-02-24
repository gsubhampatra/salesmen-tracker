import React from "react";
import { BarChart3 } from "lucide-react";

// import {
//   // useTotalSalesmen,
//   // useTotalLocationsManaged,
//   // useTotalVisitsMade,
//   // useOverallAccuracy,
//   // usePeakVisitingHour,
//   // useMostVisitedLocation,
//   // useAverageVisitDurations,
//   // useTotalOutletsAssigned,
//   // useTotalOutletsVisited,
//   useLocationAnalytics
// } from "../hooks/detailedAnalyticsHooks";
// import {
//   TotalSalesmenCard,
//   TotalLocationsManagedCard,
//   TotalVisitsMadeCard,
//   OverallAccuracyCard,
//   PeakVisitingHourCard,
//   AverageVisitDurationsCard,
//   TotalOutletsAssignedCard,
//   TotalOutletsVisitedCard,
//   MostVisitedLocationCard,
// } from "../components/cards/analyticsCard";
// import LocationAnalyticsTable from "../components/graphs/analytics/AnalyticsTable";
import DetailedTable from "../components/DetailedTable";

const DetailedAnalysis: React.FC = () => {
  // const { data: totalSalesmenData, isLoading: isLoadingTotalSalesmen } = useTotalSalesmen();
  // const { data: totalLocationsManagedData, isLoading: isLoadingTotalLocationsManaged } = useTotalLocationsManaged();
  // const { data: totalVisitsMadeData, isLoading: isLoadingTotalVisitsMade } = useTotalVisitsMade();
  // const { data: overallAccuracyData, isLoading: isLoadingOverallAccuracy } = useOverallAccuracy();
  // const { data: peakVisitingHourData, isLoading: isLoadingPeakVisitingHour } = usePeakVisitingHour();
  // const { data: mostVisitedLocationData, isLoading: isLoadingMostVisitedLocation } = useMostVisitedLocation();
  // const { data: averageVisitDurationsData, isLoading: isLoadingAverageVisitDurations } = useAverageVisitDurations();
  // const { data: totalOutletsAssignedData, isLoading: isLoadingTotalOutletsAssigned } = useTotalOutletsAssigned();
  // const { data: totalOutletsVisitedData, isLoading: isLoadingTotalOutletsVisited } = useTotalOutletsVisited();
  // const { data: locationAnalyticsData, isLoading: isLoadingLocationAnalytics } = useLocationAnalytics();

  // if (
  //   // isLoadingTotalSalesmen ||
  //   // isLoadingTotalLocationsManaged ||
  //   // isLoadingTotalVisitsMade ||
  //   // isLoadingOverallAccuracy ||
  //   // isLoadingPeakVisitingHour ||
  //   // isLoadingMostVisitedLocation ||
  //   // isLoadingAverageVisitDurations ||
  //   // isLoadingTotalOutletsAssigned ||
  //   // isLoadingTotalOutletsVisited ||
  //   // isLoadingLocationAnalytics
  // ) {
  //   return <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">Loading...</div>;
  // }

  return (
    <div className="min-h-screen p-6 bg-gray-100 md:p-10">
      {/* Heading with Icon */}
      <div className="mb-8 text-center">
      <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-blue-800 md:text-5xl">
  <BarChart3 className="w-10 h-10 text-yellow-500 animate-pulse" />
  <span className="text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500 bg-clip-text drop-shadow-lg">
    Detailed Analysis
  </span>
</h1>

      </div>

      {/* Cards Grid */}
      {/* <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <TotalSalesmenCard data={totalSalesmenData ?? { totalSalesmen: 0 }} />
        <TotalLocationsManagedCard data={totalLocationsManagedData ?? { totalLocations: 0 }} />
        <TotalVisitsMadeCard data={totalVisitsMadeData ?? { totalVisits: 0 }} />
        <OverallAccuracyCard data={overallAccuracyData ?? { accuracyPercentage: "0.00" }} />
        <PeakVisitingHourCard data={peakVisitingHourData ?? { peakHours: [] }} />
        <AverageVisitDurationsCard data={averageVisitDurationsData ?? { averageVisitDuration: "0.00" }} />
        <TotalOutletsAssignedCard data={totalOutletsAssignedData ?? { totalOutletsAssigned: 0 }} />
        <TotalOutletsVisitedCard data={totalOutletsVisitedData ?? { totalOutletsVisited: 0 }} />
        <MostVisitedLocationCard data={mostVisitedLocationData?.mostVisitedLocation ?? { locationId: 0, locationName: "Unknown", visitCount: 0 }} />
      </div> */}

      {/* Location Analytics Table */}
      
       
        {/* <LocationAnalyticsTable data={locationAnalyticsData?.data ?? []} /> */}
        <DetailedTable />
      
    </div>
  );
};

export default DetailedAnalysis;
