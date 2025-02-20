// Dashboard.tsx
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  useAccuracy,
  useAllSalesmen,
  useAllStores,
  useSalesmenCount,
  useStoreCount,
  useTimeAnalysis,
  useVisitedLocations,
} from "../../api/apiHooks";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard: React.FC = () => {
  const {
    data: salesmenCountResponse,
    isLoading: isLoadingSalesmenCount,
    error: errorSalesmenCount,
  } = useSalesmenCount();
  const {
    data: storeCountResponse,
    isLoading: isLoadingStoreCount,
    error: errorStoreCount,
  } = useStoreCount();
  const {
    data: allSalesmenResponse,
    isLoading: isLoadingAllSalesmen,
    error: errorAllSalesmen,
  } = useAllSalesmen();
  const {
    data: allStoresResponse,
    isLoading: isLoadingAllStores,
    error: errorAllStores,
  } = useAllStores();
  const {
    data: visitedLocationsResponse,
    isLoading: isLoadingVisitedLocations,
    error: errorVisitedLocations,
  } = useVisitedLocations();
  const {
    data: timeAnalysis,
    isLoading: isLoadingTimeAnalysis,
    error: errorTimeAnalysis,
  } = useTimeAnalysis(5); // Example salesmanId
  const {
    data: accuracy,
    isLoading: isLoadingAccuracy,
    error: errorAccuracy,
  } = useAccuracy();

  if (
    isLoadingSalesmenCount ||
    isLoadingStoreCount ||
    isLoadingAllSalesmen ||
    isLoadingAllStores ||
    isLoadingVisitedLocations ||
    isLoadingTimeAnalysis ||
    isLoadingAccuracy
  ) {
    return <div>Loading...</div>;
  }

  if (
    errorSalesmenCount ||
    errorStoreCount ||
    errorAllSalesmen ||
    errorAllStores ||
    errorVisitedLocations ||
    errorTimeAnalysis ||
    errorAccuracy
  ) {
    return <div>Error loading data.</div>;
  }

  // Extract data from responses
  const salesmenCount = salesmenCountResponse?.salesmen.resData;
  const storeCount = storeCountResponse?.stores.resData;
  const allSalesmen = allSalesmenResponse?.allSalesmen;
  const allStores = allStoresResponse?.allStores;
  const totalVisited = visitedLocationsResponse?.totalVisited;

  // Data for Pie Chart (Salesmen Count)
  const salesmenChartData = {
    labels: salesmenCount?.map((item) => item.salesManType),
    datasets: [
      {
        label: "Salesmen Count",
        data: salesmenCount?.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Bar Chart (Store Count)
  const storeChartData = {
    labels: storeCount?.map((item) => item.storeType),
    datasets: [
      {
        label: "Store Count",
        data: storeCount?.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Salesmen Count Chart */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Salesmen Count</h2>
          {salesmenCount && <Pie data={salesmenChartData} />}
        </div>

        {/* Store Count Chart */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Store Count</h2>
          {storeCount && <Bar data={storeChartData} />}
        </div>

        {/* Accuracy Card */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Accuracy</h2>
          {accuracy && (
            <div>
              <p>Accuracy Percentage: {accuracy.accuracyPercentage}%</p>
              <p>Total Visits: {accuracy.totalVisits}</p>
              <p>Accurate Visits: {accuracy.accurateVisits}</p>
            </div>
          )}
        </div>
      </div>

      {/* All Salesmen List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">All Salesmen</h2>
        <ul className="list-disc pl-5">
          {allSalesmen?.map((salesman) => (
            <li key={salesman.id}>{salesman.name}</li>
          ))}
        </ul>
      </div>

      {/* All Stores List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">All Stores</h2>
        <ul className="list-disc pl-5">
          {allStores?.map((store) => (
            <li key={store.id}>{store.name}</li>
          ))}
        </ul>
      </div>

      {/* Time Analysis */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Time Analysis</h2>
        {timeAnalysis && (
          <div>
            <p>In Time: {timeAnalysis.inTime || "N/A"}</p>
            <p>Out Time: {timeAnalysis.outTime || "N/A"}</p>
          </div>
        )}
      </div>

      {/* Visited Location Count */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Visited Location Count</h2>
        <p>Total Visited: {totalVisited}</p>
      </div>
    </div>
  );
};

export default Dashboard;
