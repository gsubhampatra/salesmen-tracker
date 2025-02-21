import React from "react";
import { ArrowUpDown, Check, Clock } from "lucide-react";

interface DistributorData {
  region: string;
  state: string;
  salesmanType: string;
  inTime: number | null;
  outTime: number | null;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyPercentage: number;
  locationName: string;
  marketName: string;
  salesmanName: string;
}

interface Props {
  data: DistributorData[];
}

const DistributorAnalyticsTable: React.FC<Props> = ({ data }) => {
  const formatTime = (time: number | null) => {
    if (time === null) return "N/A";
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-1">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Region
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                State
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Type
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                In Time
                <Clock size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Out Time
                <Clock size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Visited/Assigned
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Accuracy
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Location
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Market
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Salesman
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
            >
              <td className="p-4 text-sm text-gray-600">{row.region}</td>
              <td className="p-4 text-sm text-gray-600">{row.state}</td>
              <td className="p-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                  {row.salesmanType}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-600">{formatTime(row.inTime)}</td>
              <td className="p-4 text-sm text-gray-600">{formatTime(row.outTime)}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{row.outletsVisited}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-sm text-gray-600">{row.outletsAssigned}</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${row.accuracyPercentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {row.accuracyPercentage}%
                  </span>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-600">{row.locationName}</td>
              <td className="p-4 text-sm text-gray-600">{row.marketName}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {row.salesmanName.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {row.salesmanName}
                  </span>
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