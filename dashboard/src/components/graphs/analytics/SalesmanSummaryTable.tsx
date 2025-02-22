import React, { useRef, useState } from "react";
import {
  MapPin,
  User,
  Store,
  Building2,
  Globe,
  UserCircle,
  Home,
  Navigation,
  ArrowLeft,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useTimeAnalysis } from "../../../api/apiHooks";

interface Salesman {
  id: number;
  name: string;
  uid: string;
  phone?: string | null;
  canLogin: boolean;
  salesManType: string;
  managerId: number;
  createdAt: string;
  updatedAt: string;
}

interface SalesmanSummaryTableProps {
  data: Salesman[];
}

const SalesmanSummaryTable: React.FC<SalesmanSummaryTableProps> = ({
  data,
}) => {
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const filteredData = data.filter(
    (salesman) => typeFilter === "" || salesman.salesManType === typeFilter
  );

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100/50">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Building2 className="w-5 h-5 text-blue-600" />
          Salesmans Report
        </h2>
        <div className="flex gap-4 mt-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-md"
          >
            <option value="">All Types</option>
            <option value="PRESELLER">Preseller</option>
            <option value="VANSALES">Vansales</option>
            <option value="MERCHANDISER">Merchandiser</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto max-h-[600px] scroll-smooth scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <table className="w-full min-w-[1200px] relative">
            <thead className="sticky top-0 z-10 bg-white shadow-sm">
              <tr className="text-left">
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Globe className="w-4 h-4" />
                    Name
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Store className="w-4 h-4" />
                    Phone
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-cyan-700">
                    <User className="w-4 h-4" />
                    Can Login
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
                    Manager ID
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-blue-700">
                    <MapPin className="w-4 h-4" />
                    Created At
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <Navigation className="w-4 h-4" />
                    Updated At
                  </div>
                </th>
                <th className="p-4 bg-gray-50/80">
                  <div className="flex items-center gap-2 text-red-700">
                    <Clock className="w-4 h-4" />
                    Time In/Out
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <tr
                  key={index}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="p-4 bg-gray-50/30">
                    <span className="font-medium text-blue-800">
                      {row.name}
                    </span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="px-3 py-1 text-xs text-purple-800 bg-purple-100 rounded-full">
                      {row.phone || "-"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-cyan-800">
                      {row.canLogin ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="px-3 py-1 text-xs text-teal-800 bg-teal-100 rounded-full">
                      {row.salesManType}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-emerald-800">
                      {row.managerId}
                    </span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <span className="text-sm text-gray-600">
                      {row.createdAt}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-indigo-600">
                      {row.updatedAt}
                    </span>
                  </td>
                  <td className="p-4 bg-gray-50/30">
                    <SalesManInTimeOutTime
                      salesManId={row.uid}
                      date={dateFilter}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4 pointer-events-none bg-gradient-to-t from-white to-transparent">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 text-gray-600 transition-colors bg-white rounded-lg shadow-lg pointer-events-auto hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-2 text-gray-600 transition-colors bg-white rounded-lg shadow-lg pointer-events-auto hover:bg-gray-50"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesmanSummaryTable;

const SalesManInTimeOutTime = ({
  salesManId,
  date,
}: {
  salesManId: string;
  date: string;
}) => {
  const { data, isLoading } = useTimeAnalysis(Number(salesManId), date);
  if (isLoading) {
    return <span>Loading...</span>;
  }
  const dateObj = new Date(date);
  const inTime =
    data?.inTime &&
    new Date(data.inTime).toDateString() === dateObj.toDateString();
  const outTime =
    data?.outTime &&
    new Date(data.outTime).toDateString() === dateObj.toDateString();
  return (
    <div>
      <p>{inTime ? data.inTime : "No Entry"}</p>
      <p>{outTime ? data.outTime : "No Entry"}</p>
    </div>
  );
};
