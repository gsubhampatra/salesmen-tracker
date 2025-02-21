// src/components/StoreCountChart.tsx   
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useStoreCount } from '../../api/apiHooks';



const StoreCountChart: React.FC = () => {
  const { data, isLoading, error } = useStoreCount();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const chartData = {
    labels: data?.stores.resData.map((item) => item.storeType) || [],
    datasets: [
      {
        data: data?.stores.resData.map((item) => item.count) || [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Store Count by Type</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default StoreCountChart;