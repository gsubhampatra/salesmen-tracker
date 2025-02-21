import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Timer,
  CheckCircle2,
  Store,
  User,
  UserCog
} from 'lucide-react';

interface LocationAnalytics {
  storeType: string;
  region: string;
  state: string;
  salesmanType: string;
  inTime: number | null;
  outTime: number | null;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyPercentage: number;
  salesmanName: string;
}

interface LocationAnalyticsTableProps {
  data: LocationAnalytics[];
}

const LocationAnalyticsTable: React.FC<LocationAnalyticsTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LocationAnalytics | '';
    direction: 'asc' | 'desc';
  }>({ key: '', direction: 'asc' });

  const formatTime = (time: number | null) => {
    if (!time) return "—";
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSort = (key: keyof LocationAnalytics) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
  
    return [...data].sort((a, b) => {
      const key = sortConfig.key!; // Assert that key is not null
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
    <div className="bg-white rounded-lg shadow-lg border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800">Analytics Table</h2>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white shadow-sm">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-4">
                <div className="flex items-center gap-2 " >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Region/State</span>
                 
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Store Type</span>
                </div>
              </th>
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
                  <span className="text-sm font-semibold text-slate-700">Timing</span>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Outlets</span>
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
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{row.region}</span>
                    <span className="text-sm text-slate-500">{row.state}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {row.storeType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900">{row.salesmanName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                    {row.salesmanType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-slate-100 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">IN</span>
                      <span className="text-sm font-medium text-slate-700">{formatTime(row.inTime)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">OUT</span>
                      <span className="text-sm font-medium text-slate-700">{formatTime(row.outTime)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-slate-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        {row.outletsVisited} / {row.outletsAssigned}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(row.outletsVisited / row.outletsAssigned) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-slate-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">{row.accuracyPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
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