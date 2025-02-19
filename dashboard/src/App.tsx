import React from "react";
import { Chart, registerables } from "chart.js";
import SalesManAnalysis from "./components/ui/SalesManAnalysis";

Chart.register(...registerables);

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <SalesManAnalysis />
      </div>
    </div>
  );
};

export default App;
