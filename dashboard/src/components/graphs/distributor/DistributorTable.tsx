import React from "react";
import { ArrowUpDown,  Clock } from "lucide-react";

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
    <div className="p-1 overflow-x-auto bg-white shadow-lg rounded-xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
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
                Type
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
                Location
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
                Market
                <ArrowUpDown size={16} className="text-gray-400" />
              </div>
            </th>
            <th className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-600 uppercase">
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
              className="transition-colors duration-150 ease-in-out hover:bg-gray-50"
            >
              <td className="p-4 text-sm text-gray-600">{row.region}</td>
              <td className="p-4 text-sm text-gray-600">{row.state}</td>
              <td className="p-4">
                <span className="px-3 py-1 text-xs font-medium text-blue-600 rounded-full bg-blue-50">
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
              <td className="p-4 text-sm text-gray-600">{row.locationName}</td>
              <td className="p-4 text-sm text-gray-600">{row.marketName}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
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