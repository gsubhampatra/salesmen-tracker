// src/components/SalesmanCountChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSalesmenCount } from '../../api/apiHooks';



const SalesmanCountChart: React.FC = () => {
  const { data, isLoading, error } = useSalesmenCount();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const chartData = {
    labels: data?.salesmen.resData.map((item) => item.salesManType) || [],
    datasets: [
      {
        label: 'Salesmen Count',
        data: data?.salesmen.resData.map((item) => item.count) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Salesmen Count by Type</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default SalesmanCountChart;