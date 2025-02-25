import React from "react";
import { BarChart, MapPin, Clock, Users, Target } from "lucide-react";

interface AnalyticsData {
  totalSalesmen?: number;
  totalLocations?: number;
  totalVisits?: number;
  accuracyPercentage?: string;
  averageVisitDuration?: string;
  totalOutletsAssigned?: number;
  totalOutletsVisited?: number;
  peakHours?: number[];
  mostVisitedLocation?: MostVisitedLocation;
}

export interface MostVisitedLocation {
  locationId: number;
  locationName: string;
  visitCount: number;
}

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
}

const StatCard: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group">
      {/* Animated background elements */}
      <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-blue-50/20 group-hover:opacity-100" />
      <div className="absolute transition-opacity duration-700 opacity-0 -inset-1 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-blue-100/20 blur-xl group-hover:opacity-100 animate-gradient" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full bg-blue-500/5 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-8 translate-y-8 rounded-full bg-purple-500/5 blur-2xl" />

      {/* Card content */}
      <div className="relative flex items-start gap-4">
        {/* Icon container */}
        <div className="relative flex-shrink-0 group">
          <div className="absolute inset-0 transition-all duration-500 transform rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/10 blur-lg group-hover:scale-110" />
          <div className="relative p-3 border rounded-full shadow-md bg-gradient-to-br from-white to-blue-50 border-blue-100/50">
            {React.cloneElement(icon as React.ReactElement<any>, {
              width: 24,
              height: 24,
              strokeWidth: 1.5,
              className:
                "text-blue-600 transform transition-transform duration-500 group-hover:scale-110",
            })}
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 flex-1 space-y-1">
          <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold text-transparent bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text">
            {value || "—"}
          </h3>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
};

// Add animation keyframes to your CSS

export const TotalSalesmenCard: React.FC<{
  data: { totalSalesmen?: number };
}> = ({ data }) => (
  <StatCard
    title="Total Salesmen"
    value={data.totalSalesmen?.toLocaleString() || "—"}
    icon={<Users />}
  />
);

export const TotalLocationsManagedCard: React.FC<{
  data: { totalLocations?: number };
}> = ({ data }) => (
  <StatCard
    title="Total Locations"
    value={data.totalLocations?.toLocaleString() || "—"}
    icon={<MapPin />}
  />
);

export const TotalVisitsMadeCard: React.FC<{
  data: { totalVisits?: number };
}> = ({ data }) => (
  <StatCard
    title="Total Outlets Visited"
    value={data.totalVisits?.toLocaleString() || "—"}
    icon={<BarChart />}
  />
);

export const OverallAccuracyCard: React.FC<{
  data: { accuracyPercentage?: string };
}> = ({ data }) => (
  <StatCard
    title="Overall Accuracy"
    value={data.accuracyPercentage ? `${data.accuracyPercentage}%` : "—"}
    icon={<Target />}
  />
);

export const AvgVisitDurationCard: React.FC<{
  data: { averageVisitDuration?: string };
}> = ({ data }) => (
  <StatCard
    title="Avg Visit Duration"
    value={data.averageVisitDuration ? `${data.averageVisitDuration} min` : "—"}
    icon={<Clock />}
  />
);

export const TotalOutletsAssignedCard: React.FC<{
  data: { totalOutletsAssigned?: number };
}> = ({ data }) => (
  <StatCard
    title="Total Outlets Assigned"
    value={data.totalOutletsAssigned?.toLocaleString() || "—"}
    icon={<MapPin />}
  />
);

export const PeakVisitingHourCard: React.FC<{
  data: { peakHours?: number[] };
}> = ({ data }) => (
  <StatCard
    title="Peak Visiting Hours"
    value={data.peakHours?.length ? data.peakHours.join(", ") : "—"}
    icon={<Clock />}
  />
);

export const AverageVisitDurationsCard: React.FC<{
  data: { averageVisitDuration?: string };
}> = ({ data }) => (
  <StatCard
    title="Avg Visit Duration"
    value={data.averageVisitDuration ? `${data.averageVisitDuration} min` : "—"}
    icon={<Clock />}
  />
);

export const AccuracyPercentageCard: React.FC<{
  data: { accracyPercentage?: string };
}> = ({ data }) => (
  <StatCard
    title="Accuracy Percentage"
    value={data.accracyPercentage ? `${data.accracyPercentage}%` : "—"}
    icon={<Target />}
  />
);
export const AvgDailyVisitsCard: React.FC<{ data: { avgDailyVisits?: number } }> = ({ data }) => (
  <StatCard
    title="Avg Daily Visits"
    value={data.avgDailyVisits?.toLocaleString() || "—"}
    icon={<BarChart />}
  />
);

const AnalyticsDashboard: React.FC<{
  data: AnalyticsData & { mostVisitedLocation?: MostVisitedLocation };
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <TotalSalesmenCard data={data} />
      <TotalLocationsManagedCard data={data} />
      <TotalVisitsMadeCard data={data} />
      <OverallAccuracyCard data={data} />
      <AvgVisitDurationCard data={data} />
      <TotalOutletsAssignedCard data={data} />
      <PeakVisitingHourCard data={data} />
      <AverageVisitDurationsCard data={data} />
    </div>
  );
};

export default AnalyticsDashboard;
