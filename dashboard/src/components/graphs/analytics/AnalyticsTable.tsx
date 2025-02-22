import React, { useState, useMemo } from "react";
import { LocationAnalytics } from "../../../types/detailedResponseType";

interface LocationAnalyticsTableProps {
  data: LocationAnalytics[];
}

// Enum for Salesman Type
enum SalesManType {
  VANSALES = "VANSALES",
  PRESELLER = "PRESELLER",
  MERCHANDISER = "MERCHANDISER",
  DELIVERY = "DELIVERY",
}

// Enum for Store Type
enum StoreType {
  RETAILER = "RETAILER",
  DISTRIBUTOR = "DISTRIBUTOR",
  WHOLESALER = "WHOLESALER",
}

const LocationAnalyticsTable: React.FC<LocationAnalyticsTableProps> = ({ data }) => {
  const [filters, setFilters] = useState({
    salesmanType: "",
    storeType: "",
    state: "",
    region: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter(
      (row) =>
        (!filters.salesmanType ||
          row.assignedSalesmans?.some((s) => s.salesManType === filters.salesmanType)) &&
        (!filters.storeType || row.storeType === filters.storeType) &&
        (!filters.state || row.state === filters.state) &&
        (!filters.region || row.region === filters.region)
    );
  }, [data, filters]);

  return (
    <div className="overflow-hidden bg-white border rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800">
          Location Analytics
        </h2>
        <div className="flex gap-4">
          {/* Salesman Type Filter */}
          <select
            onChange={(e) => handleFilterChange("salesmanType", e.target.value)}
            className="px-3 py-2 text-sm bg-white border rounded-lg shadow-sm"
          >
            <option value="">All Salesman Types</option>
            {Object.values(SalesManType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Store Type Filter */}
          <select
            onChange={(e) => handleFilterChange("storeType", e.target.value)}
            className="px-3 py-2 text-sm bg-white border rounded-lg shadow-sm"
          >
            <option value="">All Store Types</option>
            {Object.values(StoreType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* State Filter */}
          <select
            onChange={(e) => handleFilterChange("state", e.target.value)}
            className="px-3 py-2 text-sm bg-white border rounded-lg shadow-sm"
          >
            <option value="">All States</option>
            {[...new Set(data.map((row) => row.state))].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {/* Region Filter */}
          <select
            onChange={(e) => handleFilterChange("region", e.target.value)}
            className="px-3 py-2 text-sm bg-white border rounded-lg shadow-sm"
          >
            <option value="">All Regions</option>
            {[...new Set(data.map((row) => row.region))].map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto max-h-[600px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white shadow-md">
            <tr className="border-b bg-slate-100">
              {[
                "Store Name",
                "Store Type",
                "Region",
                "State",
                "Salesmen Assigned",
                "Salesmen Visited",
                "In Time",
                "Out Time",
                "Outlets",
                "Accuracy",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-sm font-semibold text-left text-slate-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className="transition duration-200 hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {row.storeName}
                </td>
                <td className="px-4 py-3 text-blue-700">{row.storeType}</td>
                <td className="px-4 py-3">{row.region}</td>
                <td className="px-4 py-3">{row.state}</td>
                <td className="px-4 py-3">
                  {(row.assignedSalesmans?.length ?? 0) === 0 ? "—" : row.assignedSalesmans?.map((s) => s.name).join(", ") ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {(row.visitedSalesmans?.length ?? 0) === 0 ? "—" : row.visitedSalesmans?.map((s) => s.name).join(", ") ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {row.inTime ? new Date(row.inTime).toLocaleTimeString() : "—"}
                </td>
                <td className="px-4 py-3">
                  {row.outTime ? new Date(row.outTime).toLocaleTimeString() : "—"}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.outletsVisited} / {row.outletsAssigned}
                </td>
                <td className="px-4 py-3 font-semibold text-center">
                  {row.accuracyPercentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Data Message */}
      {filteredData.length === 0 && (
        <div className="py-6 text-center text-gray-500">No data found.</div>
      )}
    </div>
  );
};

export default LocationAnalyticsTable;
