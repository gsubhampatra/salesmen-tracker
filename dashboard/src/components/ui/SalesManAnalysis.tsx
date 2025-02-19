import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getSalesmenVisitedToday,
  getSalesmenNotVisitedToday,
  getTotalSalesMan,
} from "../../api/apiFunctions";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesManAnalysis: React.FC = () => {
  const {
    data: visitedResponse,
    isLoading: loadingVisited,
    isError: errorVisited,
  } = useQuery({
    queryKey: ["visitedToday"],
    queryFn: () => getSalesmenVisitedToday(),
  });

  const {
    data: notVisitedResponse,
    isLoading: loadingNotVisited,
    isError: errorNotVisited,
  } = useQuery({
    queryKey: ["notVisitedToday"],
    queryFn: () => getSalesmenNotVisitedToday(),
  });

  const {
    data: totalResponse,
    isLoading: loadingTotal,
    isError: errorTotal,
  } = useQuery({
    queryKey: ["totalSalesmen"],
    queryFn: () => getTotalSalesMan(),
  });

  if (loadingVisited || loadingNotVisited || loadingTotal) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (errorVisited || errorNotVisited || errorTotal) {
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching data. Please try again.
      </div>
    );
  }

  const visited = visitedResponse?.totalVisited || 0;
  const notVisited = notVisitedResponse?.notVisited || 0;
  const total = totalResponse?.totalSalesmen || 0;

  const data = {
    labels: ["Visited Today", "Not Visited Today"],
    datasets: [
      {
        label: "Number of Salesmen",
        data: [visited, notVisited],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-xl font-bold">Salesmen Analysis</h2>
      <Bar data={data} options={options} />
      <div className="mt-4 text-sm text-gray-600">Total Salesmen: {total}</div>
    </div>
  );
};

export default SalesManAnalysis;
