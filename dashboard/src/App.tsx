import React from "react";
import { Chart, registerables } from "chart.js";
import Dashboard from "./components/ui/SalesManAnalysis";

Chart.register(...registerables);

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
        <Dashboard />
    </div>
  );
};

export default App;
