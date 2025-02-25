import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  Globe,
  Map,
  Store,
  User,
  UserCircle,
  Home,
  MapPin,
  Navigation,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { api, API_PATHS } from "../api/config";

type filters = {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
  storeType: string;
  salesmanType: string;
};

type DataRow = {
  region: string;
  state: string;
  storeType: string;
  salesmanName: string;
  salesmanType: string;
  storeName: string;
  address: string;
  market: string;
  intime: string;
  visited: string;
  scanDistance: number;
  date: string;
};

const fetchSalesmanVisits = async () => {
  const response = await api.get(
    API_PATHS.DASHBOARD.SALESMAN_SUMMARY.GET_SALESMAN_SUMMARY
  );
  return response.data;
};

const SalesmanTable = () => {
  const [filters, setFilters] = useState<filters>({
    startDate: "",
    endDate: "",
    storeType: "",
    salesmanType: "",
    page: 1,
    limit: 5,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["salesmanVisits"],
    queryFn: () => fetchSalesmanVisits(),
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 })); // Reset to first page on filter change
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const extractTime = (intime: string) => {
    if (!intime) return "_";
    const date = new Date(intime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (isError) return <div>Error fetching data</div>;

  // Frontend filtering
  const allSalesmanVisits: DataRow[] = data?.data || [];
  console.log(data?.data);

  const filteredData = allSalesmanVisits.filter((row) => {
    let valid = true;
    if (filters.startDate) {
      valid = valid && new Date(row.date) >= new Date(filters.startDate);
    }
    if (filters.endDate) {
      valid = valid && new Date(row.date) <= new Date(filters.endDate);
    }
    if (filters.storeType) {
      valid = valid && row.storeType === filters.storeType;
    }
    if (filters.salesmanType) {
      valid = valid && row.salesmanType === filters.salesmanType;
    }
    return valid;
  });

  // Frontend pagination
  const totalPages = Math.ceil(filteredData.length / filters.limit);
  const startIndex = (filters.page - 1) * filters.limit;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + filters.limit
  );

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100/50">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Building2 className="w-5 h-5 text-blue-600" />
          Summary Dashboard
        </h2>
        <div className="flex gap-4 mt-4">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <select
            name="storeType"
            value={filters.storeType}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Store Types</option>
            <option value="RETAILER">Retailer</option>
            <option value="DISTRIBUTOR">Distributor</option>
            <option value="WHOLESALER">Wholesaler</option>
          </select>
          <select
            name="salesmanType"
            value={filters.salesmanType}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Salesman Types</option>
            <option value="VANSALES">Van Sales</option>
            <option value="PRESELLER">Preseller</option>
            <option value="MERCHANDISER">Merchandiser</option>
            <option value="DELIVERY">Delivery</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-white shadow-sm">
              <tr className="text-left">
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Globe className="w-4 h-4" />
                    Region
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <Map className="w-4 h-4" />
                    State
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Store className="w-4 h-4" />
                    Store Type
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-cyan-700">
                    <User className="w-4 h-4" />
                    Salesman
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-teal-700">
                    <UserCircle className="w-4 h-4" />
                    Salesman Type
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Home className="w-4 h-4" />
                    Store Name
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-blue-700">
                    <MapPin className="w-4 h-4" />
                    Address
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <Navigation className="w-4 h-4" />
                    Market
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Clock className="w-4 h-4" />
                    In Time
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    Visited
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-teal-700">
                    <MapPin className="w-4 h-4" />
                    Accuracy
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading && (
                <tr>
                  <td className="p-4 text-center" colSpan={11}>
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  </td>
                </tr>
              )}
              {currentData.map((row: DataRow, index: number) => (
                <tr
                  key={index}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="p-4 bg-gray-50/30">
                    <span className="font-medium text-blue-800">
                      {row.region ? row.region : "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-indigo-800">
                      {row.state}
                    </span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="px-3 py-1 text-xs text-purple-800 bg-purple-100 rounded-full">
                      {row.storeType}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{row.salesmanName}</span>
                    </div>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="px-3 py-1 text-xs text-teal-800 bg-teal-100 rounded-full">
                      {row.salesmanType}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-emerald-800">
                      {row.storeName}
                    </span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="text-sm text-gray-600">{row.address}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-indigo-600">
                      {row.market}
                    </span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <div className="px-4 py-3 bg-white rounded-lg shadow-sm">
                      <span className="font-medium text-center text-gray-700">
                        {extractTime(row.intime)}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    {row.visited === "yes" ? (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-green-800 bg-green-100 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          Yes
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-red-800 bg-red-100 rounded-full">
                          <XCircle className="w-4 h-4" />
                          No
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <div className="px-4 py-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-black">
                          {row.scanDistance === null
                            ? "0m"
                            : `${row.scanDistance}m`}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && currentData.length === 0 && (
                <tr>
                  <td className="p-4 text-center" colSpan={11}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => handlePageChange(filters.page - 1)}
          disabled={filters.page === 1}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span>
          Page {filters.page} of {totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(filters.page + 1)}
          disabled={filters.page >= totalPages}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SalesmanTable;
