import React, { useState } from "react";
import { ArrowUpDown, Clock } from "lucide-react";

interface Props {
  data: {
    storeName: string;
    marketName: string;
    managerName: string;
    region: string;
    state: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    inTime: number | null;
    outTime: number | null;
    outletsVisited: number;
    outletsAssigned: number;
    accuracyPercentage: number;
    assignedSalesmans: number[];
  }[];
}

const DistributorAnalyticsTable: React.FC<Props> = ({ data }) => {
  const [selectedState, setSelectedState] = useState<string>("");

  const filteredData = data.filter(
    (row) => selectedState === "" || row.state === selectedState
  );

  const formatTime = (time: number | null) => {
    if (time === null) return "N/A";
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const states = Array.from(new Set(data.map((row) => row.state))).sort();

  return (
    <div className="p-1 overflow-x-auto bg-white shadow-lg rounded-xl">
      <div className="flex items-center justify-between gap-4 mb-4">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Store Name
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Market Name
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Manager Name
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Region
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                State
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Address
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Latitude
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Longitude
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                In Time
                <Clock size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Out Time
                <Clock size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Visited/Assigned
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Accuracy
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Assigned Salesmen
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredData.map((row, index) => (
            <tr
              key={index}
              className="transition-colors duration-150 ease-in-out hover:bg-gray-50"
            >
              <td className="p-4 text-sm text-gray-600">{row.storeName}</td>
              <td className="p-4 text-sm text-gray-600">{row.marketName}</td>
              <td className="p-4 text-sm text-gray-600">{row.managerName}</td>
              <td className="p-4 text-sm text-gray-600">
                {row.region === "" ? "N/A" : row.region}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {row.state === "" ? "N/A" : row.state}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {row.address || "N/A"}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {row.latitude === null ? "N/A" : row?.latitude}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {row.longitude === null ? "N/A" : row?.longitude}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {formatTime(row.inTime)}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {formatTime(row.outTime)}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {row.outletsVisited}
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-sm text-gray-600">
                    {row.outletsAssigned}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: `${row.accuracyPercentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {row.accuracyPercentage}%
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {row.assignedSalesmans.map((salesman, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full"
                    >
                      {salesman.toString()}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorAnalyticsTable;
