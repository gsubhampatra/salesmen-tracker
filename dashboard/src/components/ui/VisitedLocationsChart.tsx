// src/components/VisitedLocationsChart.tsx
import React from 'react';
import { useVisitedLocations } from '../../api/apiHooks';

interface VisitedLocationsChartProps {
  selectedDate: string;
}

const VisitedLocationsChart: React.FC<VisitedLocationsChartProps> = ({ selectedDate }) => {
  const { data, isLoading, error } = useVisitedLocations(selectedDate);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;


  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Total Location Visited</h2>
      <p>{data?.totalVisited}</p>
    </div>
  );
};

export default VisitedLocationsChart;