import React, { useRef } from 'react';
import { 
  MapPin, 
  User, 
  Clock, 
  Store,
  Building2,
  Globe,
  Map,
  UserCircle,
  Home,
  Navigation,
  Calendar,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface DataRow {
  region: string;
  state: string;
  address: string;
  storeType: string;
  salesmanName: string;
  salesmanType: string;
  locationName: string;
  marketName: string;
  inTime: number;
  outTime: number;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyDistance: number;
}

interface LocationAnalyticsTableProps {
  data: DataRow[];
}

const LocationAnalyticsTable: React.FC<LocationAnalyticsTableProps> = ({ data }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const formatTime = (minutes: number): string => {
    if (!minutes && minutes !== 0) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const getAccuracyStatus = (distance: number) => {
    if (distance <= 10) return { bg: 'bg-blue-50', text: 'text-blue-700', indicator: '●●●' };
    if (distance <= 20) return { bg: 'bg-indigo-50', text: 'text-indigo-700', indicator: '●●○' };
    return { bg: 'bg-slate-50', text: 'text-slate-700', indicator: '●○○' };
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100/50">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Summary Dashboard
        </h2>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollContainerRef} 
          className="overflow-x-auto max-h-[600px] scroll-smooth scrollbar-hide"
          style={{ 
            scrollBehavior: 'smooth',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <table className="w-full min-w-[1200px] relative">
            <thead className="sticky top-0 bg-white shadow-sm z-10">
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
                    Type
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Home className="w-4 h-4" />
                    Location
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
                    Time
                  </div>
                </th>
                <th className="p-4 relative bg-white">
                  <div className="flex items-center gap-2 text-cyan-700">
                    <Calendar className="w-4 h-4" />
                    Outlets
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
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 bg-gray-50/30">
                    <span className="font-medium text-blue-800">{row.region}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-indigo-800">{row.state}</span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      {row.storeType}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                        {row.salesmanName.charAt(0)}
                      </div>
                      <span className="font-medium">{row.salesmanName}</span>
                    </div>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="px-3 py-1 rounded-full text-xs bg-teal-100 text-teal-800">
                      {row.salesmanType}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-emerald-800">{row.locationName}</span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="text-sm text-gray-600">{row.address}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-indigo-600">{row.marketName}</span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg shadow-sm">
                        <span className="text-sm font-medium text-gray-600">Duration</span>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                          <span className="text-sm font-semibold text-gray-800">
                            {formatTime(row.outTime - row.inTime)}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center px-2 py-1 bg-gray-50 rounded">
                          <div className="text-gray-500">In</div>
                          <div className="font-medium text-gray-700">{formatTime(row.inTime)}</div>
                        </div>
                        <div className="text-center px-2 py-1 bg-gray-50 rounded">
                          <div className="text-gray-500">Out</div>
                          <div className="font-medium text-gray-700">{formatTime(row.outTime)}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="relative w-24 h-24 flex items-center justify-center z-0">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" className="stroke-gray-200" strokeWidth="3"/>
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="15" 
                          fill="none" 
                          className="stroke-blue-500" 
                          strokeWidth="3"
                          strokeDasharray={`${(row.outletsVisited / row.outletsAssigned) * 94.2} 94.2`}
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-gray-800">{row.outletsVisited}</span>
                        <span className="text-xs text-gray-500">of {row.outletsAssigned}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    {(() => {
                      const status = getAccuracyStatus(row.accuracyDistance);
                      return (
                        <div className={`${status.bg} px-4 py-3 rounded-lg`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${status.text} font-medium`}>
                              {row.accuracyDistance}m
                            </span>
                            <span className={`text-xs tracking-widest ${status.text}`}>
                              {status.indicator}
                            </span>
                          </div>
                          <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${Math.max(0, 100 - (row.accuracyDistance * 5))}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="absolute left-0 right-0 bottom-0 flex justify-between p-4 bg-gradient-to-t from-white to-transparent pointer-events-none">
          <button 
            onClick={() => handleScroll('left')}
            className="p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 text-gray-600 transition-colors pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleScroll('right')}
            className="p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 text-gray-600 transition-colors pointer-events-auto"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationAnalyticsTable;