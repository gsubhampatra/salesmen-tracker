import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Types
interface StoreData {
  storeType: string;
  count: number;
}

const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#06B6D4", "#22D3EE", "#FACC15"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-indigo-600">🏪 {payload[0].value} Stores</p>
      </div>
    );
  }
  return null;
};

export const StoreChart: React.FC<{ data: StoreData[] }> = ({ data }) => {
  return (
    <div className="relative p-6 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Dynamic Background (Gradient between white, blue, and violet) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#e0e7ff] to-[#7C3AED] opacity-50"></div>

      <h2 className="relative text-2xl font-bold text-gray-800 text-center mb-6">
        🏪 Store Distribution
      </h2>

      <div className="h-80 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
            <XAxis dataKey="storeType" tick={{ fill: "#4B5563" }} axisLine={{ stroke: "#9CA3AF" }} />
            <YAxis tick={{ fill: "#4B5563" }} axisLine={{ stroke: "#9CA3AF" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="count" name="Number of Stores" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StoreChart;
