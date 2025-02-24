import React from "react";

import SalesmanTable from "../components/SalesmanTable";

const SalesmanSummary: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Heading with Icon */}
      <div className="m-2 text-center">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-blue-800 md:text-5xl">
          <span className="text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 bg-clip-text drop-shadow-lg">
            Salesman Summary
          </span>
        </h1>
      </div>

      {/* Salesman Summary Table */}
      <div className="mt-4">
        <SalesmanTable />
      </div>
    </div>
  );
};

export default SalesmanSummary;
