import React from "react";
import { useAllSalesmen } from "../api/apiHooks";
import SalesmanSummaryTable from "../components/graphs/analytics/SalesmanSummaryTable";

const SalesmanSummary: React.FC = () => {
  // const { data: salesmanSummaryData, isLoading: isLoadingSalesmanSummary } = useSalesmanSummary();
 const { data:SalesmanData,isLoading } = useAllSalesmen()
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">Loading...</div>;
  }
   const data = SalesmanData?.allSalesmen || []

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      {/* Heading with Icon */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 flex justify-center items-center gap-3">
          <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-transparent bg-clip-text drop-shadow-lg">
            Salesman Summary
          </span>
        </h1>
      </div>

      {/* Salesman Summary Table */}
      <div className="mt-8">
        <SalesmanSummaryTable data={data} />
      </div>
    </div>
  );
};

export default SalesmanSummary;