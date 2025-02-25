import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, API_PATHS } from "../api/config";
import * as XLSX from "xlsx";
import {
  Clock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  ClipboardList,
  Filter,
  User,
  UserCog,
  Timer,
  Building2,
  CheckCircle2,
  Download,
} from "lucide-react";

interface LocationAnalytics {
  salesmanType: string;
  inTime: string | null;
  outTime: string | null;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyPercentage: number;
  salesmanName: string;
}

type DataResponse = {
  success: boolean;
  data: LocationAnalytics[];
};

const fetchAnalytics = async (date: string) => {
  const response = await api.get(
    API_PATHS.DASHBOARD.GET_DETAILED_ANALYTICS_BY_DATE_RANGE,
    {
      params: {
        date,
      },
    }
  );
  return response.data;
};

const DetailedTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [allData, setAllData] = useState<LocationAnalytics[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [salesmanType, setSalesmanType] = useState("");

  const salesmanTypes = ["VANSALES", "PRESELLER", "MERCHANDISER", "DILIVERY"];

  const { data, isLoading, error, refetch } = useQuery<DataResponse>({
    queryKey: ["locationAnalytics", date],
    queryFn: () => fetchAnalytics(date),
  });

  useEffect(() => {
    if (data?.data) {
      setAllData(data.data);
      setPage(1); // Reset to first page when new data is loaded
    }
  }, [data]);

  // Apply salesman filter on the frontend
  const filteredData = allData
    ? salesmanType
      ? allData.filter((row) => row.salesmanType === salesmanType)
      : allData
    : [];

  // Calculate pagination
  const totalItems = filteredData.length;
  console.log(totalItems);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const startItem = totalItems > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(startIndex + paginatedData.length, totalItems);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSalesmanTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSalesmanType(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const clearFilters = () => {
    setDate("");
    setSalesmanType("");
    setPage(1);
    refetch();
  };

  // Function to determine color based on accuracy percentage
  const getAccuracyColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100 text-green-800";
    if (percentage >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Function to download data as Excel
  const downloadExcel = () => {
    // Create a workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    console.log(filteredData);

    // Create a Blob and download
    const blob = new Blob(
      [XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Create filename with date range if present
    let filename = "overall-analytics";

    if (date) {
      filename += `_${date}`;
    }

    if (salesmanType) {
      filename += `_${salesmanType}`;
    }

    link.href = url;
    link.setAttribute("download", `${filename}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-2 overflow-hidden bg-white border rounded-lg shadow-xl border-slate-200">
      <div className="flex flex-col justify-between p-6 border-b md:flex-row md:items-center border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="mb-4 text-xl font-bold text-slate-800 md:mb-0">
          <span className="text-blue-600">Detailed Analysis Report</span>
        </h2>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-slate-500">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="px-3 py-2 transition border rounded-md border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-xs font-medium text-slate-500">
              Salesman Type
            </label>
            <select
              value={salesmanType}
              onChange={handleSalesmanTypeChange}
              className="px-3 py-2 transition border rounded-md border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {salesmanTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 border-b bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {totalItems > 0 ? (
              <span>
                Showing{" "}
                <span className="font-medium">
                  {startItem}-{endItem}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> results
              </span>
            ) : (
              <span className="flex items-center">
                <Filter size={16} className="mr-1 text-slate-400" />
                Filter results by date range and salesman type
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {salesmanType && (
              <div className="inline-flex items-center px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                <span>{salesmanType}</span>
                <button
                  onClick={() => setSalesmanType("")}
                  className="ml-1.5 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {date && (
              <div className="inline-flex items-center px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                <span>Date Filter</span>
                <button
                  onClick={clearFilters}
                  className="ml-1.5 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Excel download button */}
            {filteredData.length > 0 && (
              <button
                onClick={downloadExcel}
                className="inline-flex items-center px-3 py-1 ml-2 text-xs text-green-800 transition bg-green-100 rounded-full hover:bg-green-200"
              >
                <Download size={14} className="mr-1" />
                Download Excel
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="py-8 text-center">
          <div className="inline-flex items-center px-4 py-2 text-red-700 rounded-lg bg-red-50">
            <AlertCircle size={20} className="mr-2" />
            Error fetching data. Please try again.
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ClipboardList size={48} className="mb-4 text-slate-300" />
          <h3 className="mb-1 text-lg font-medium text-slate-600">
            No results found
          </h3>
          <p className="max-w-md text-sm text-slate-500">
            Try adjusting your filters or selecting a different date range to
            see results.
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto ">
          <table className="w-full">
            <thead className="sticky top-0 bg-white shadow-sm">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Salesman Name
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <UserCog className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Salesman Type
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      In Time
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Out Time
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Outlets Assigned
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Outlets Visited
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Accuracy
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedData.map((row, index) => (
                <tr key={index} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-800">
                    {row.salesmanName}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                      {row.salesmanType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                    {row.inTime ? (
                      <span className="inline-flex items-center">
                        <Clock size={16} className="mr-1 text-green-500" />
                        {row.inTime}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                    {row.outTime ? (
                      <span className="inline-flex items-center">
                        <LogOut size={16} className="mr-1 text-red-500" />
                        {row.outTime}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                    {row.outletsAssigned}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600">
                    {row.outletsVisited}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccuracyColor(
                        row.accuracyPercentage
                      )}`}
                    >
                      {row.accuracyPercentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} className="mr-1" />
          Previous
        </button>

        <div className="flex items-center">
          <span className="px-4 py-2 mr-2 text-sm font-medium bg-white border rounded-lg shadow-sm border-slate-200 text-slate-700">
            Page {page} of {totalPages || 1}
          </span>

          {totalItems > 0 && (
            <span className="text-sm text-slate-500">
              ({startItem}-{endItem} of {totalItems})
            </span>
          )}
        </div>

        <button
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default DetailedTable;
