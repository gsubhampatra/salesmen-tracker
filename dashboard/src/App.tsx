import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const App: React.FC = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const pieData = {
    labels: ["Electronics", "Clothing", "Groceries"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="mb-3 text-lg font-semibold">Sales Overview</h2>
          <Bar data={barData} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="mb-3 text-lg font-semibold">Category Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default App;
