// src/components/AccuracyChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useAccuracy } from '../../api/apiHooks';

interface AccuracyChartProps {
  selectedDate: string;
}

const AccuracyChart: React.FC<AccuracyChartProps> = ({ selectedDate }) => {
  const { data, isLoading, error } = useAccuracy(selectedDate);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
    const accuracyPercentage = data?.accuracyPercentage;
    const totalVisits = data?.totalVisits;
    const accurateVisits = data?.accurateVisits;
  

    const chartData = {
      labels: ['Accurate Visits', 'Inaccurate Visits'],
      datasets: [
        {
          data: [accurateVisits || 0, (totalVisits || 0) - (accurateVisits || 0)],
          backgroundColor: ['#4CAF50', '#FF5722'],
        },
      ],
    };
    const accuracyPercentageText = `${accuracyPercentage}%`;

    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Visit Accuracy</h2>
        <Doughnut data={chartData} />
        <p>Accuracy Percentage: {accuracyPercentageText}</p>
      </div>
    );
  }

export default AccuracyChart;