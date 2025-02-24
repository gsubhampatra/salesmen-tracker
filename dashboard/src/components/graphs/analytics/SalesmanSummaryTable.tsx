import React, { useState } from "react";
import { Building2, MapPin, Timer, User, UserCog } from "lucide-react";

export interface SalesmanReport {
  state: string;
  storeType: string;
  salesmanName: string;
  salesmanType: string;
  storeName: string;
  address: string;
  market: string;
  intime: Date | null;
  visited: string;
  scanDistance: number | null;
}

interface SalesmanReportTableProps {
  data: SalesmanReport[];
}

const LocationAnalyticsTable: React.FC<SalesmanReportTableProps> = ({
  data,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SalesmanReport;
    direction: "asc" | "desc";
  }>({ key: "salesmanName", direction: "asc" });

  const formatTime = (time: Date | null) => {
    if (!time) return "—";
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSort = (key: keyof SalesmanReport) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const key = sortConfig.key!;
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === null || bValue === null) {
        return 0;
      }
      return (
        (aValue < bValue ? -1 : 1) * (sortConfig.direction === "asc" ? 1 : -1)
      );
    });
  }, [data, sortConfig]);

  return (
    <div className="bg-white border rounded-lg shadow-lg border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800">
          Detailed Reports
        </h2>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white shadow-sm">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    State
                  </span>
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    Store Name
                  </span>
                </div>
              </th>

              <th className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    Salesman Name
                  </span>
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <UserCog className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    Salesman Type
                  </span>
                </div>
              </th>
              <th
                onClick={() => handleSort("intime")}
                className="px-6 py-3 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    In Time
                  </span>
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Visited
                  </span>
                </div>
              </th>
              <th className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Scan Distance
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-3">
                  <span className="font-medium text-slate-900">
                    {row.state}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="font-medium text-slate-900">
                    {row.storeName}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="font-medium text-slate-900">
                    {row.salesmanName}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-full bg-slate-100 text-slate-700">
                    {row.salesmanType}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="font-medium text-slate-700">
                    {formatTime(row.intime)}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="font-medium text-slate-700">
                    {row.visited}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="font-medium text-slate-700">
                    {row.scanDistance
                      ? row.scanDistance.toFixed(2) + " meters"
                      : "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationAnalyticsTable;
