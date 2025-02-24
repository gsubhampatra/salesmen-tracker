import React, { useState } from 'react';
import { 
 Building2, 
  Timer,
  CheckCircle2,
  User,
  UserCog
} from 'lucide-react';

interface LocationAnalytics {
  salesmanType: string;
  inTime: string | null;
  outTime: string | null;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyPercentage: number;
  salesmanName: string;
}

interface LocationAnalyticsTableProps {
  data: LocationAnalytics[];
}

const LocationAnalyticsTable: React.FC<LocationAnalyticsTableProps> = ({ data }) => {
  const [sortConfig, _] = useState<{
    key: keyof LocationAnalytics | '';
    direction: 'asc' | 'desc';
  }>({ key: '', direction: 'asc' });

  const formatTime = (time: string | null) => {
    if (!time) return "—";
    const date = new Date(time);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata' 
    });
  };

 

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
  
    return [...data].sort((a, b) => {
      const key = sortConfig.key!;
      const aValue = key ? a[key] : '';
      const bValue = key ? b[key] : '';
  
      if (aValue === null || bValue === null) {
        return 0;
      }
      return (aValue < bValue ? -1 : 1) * (sortConfig.direction === 'asc' ? 1 : -1);
    });
  }, [data, sortConfig]);

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800">Analytics Table</h2>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white shadow-sm">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Salesman Name</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <UserCog className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Salesman Type</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">In Time</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Out Time</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Outlets Assigned</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Outlets Visited</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Accuracy</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900">{row.salesmanName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-slate-100 text-slate-700">
                    {row.salesmanType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="p-3 rounded-lg bg-slate-100">
                    <span className="text-sm font-medium text-slate-700">{formatTime(row.inTime)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="p-3 rounded-lg bg-slate-100">
                    <span className="text-sm font-medium text-slate-700">{formatTime(row.outTime)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="p-3 rounded-lg bg-slate-100">
                    <span className="text-sm font-medium text-slate-700">{row.outletsAssigned}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="p-3 rounded-lg bg-slate-100">
                    <span className="text-sm font-medium text-slate-700">{row.outletsVisited}</span>
                    <div className="w-full h-2 mt-2 rounded-full bg-slate-200">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{ width: `${(row.outletsVisited / row.outletsAssigned) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="p-3 rounded-lg bg-slate-100">
                    <span className="text-sm font-medium text-slate-700">{row.accuracyPercentage}%</span>
                    <div className="w-full h-2 mt-2 rounded-full bg-slate-200">
                      <div 
                        className={`h-2 rounded-full ${getProgressBarColor(row.accuracyPercentage)}`}
                        style={{ width: `${row.accuracyPercentage}%` }}
                      />
                    </div>
                  </div>
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