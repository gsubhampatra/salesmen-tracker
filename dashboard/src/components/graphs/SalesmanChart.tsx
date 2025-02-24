import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SalesmanData {
  salesManType: string;
  count: number;
}

const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#06B6D4", "#FACC15", "#F43F5E"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-gray-900 p-4 rounded-lg shadow-lg border border-gray-300">
        <p className="font-semibold text-lg">{payload[0].name}</p>
        <p className="text-indigo-600">🔹 {payload[0].value} Salesmen</p>
      </div>
    );
  }
  return null;
};

export const SalesmenChart: React.FC<{ data: SalesmanData[] }> = ({ data }) => {
  return (
    <div className="relative p-6 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Dynamic Background (Gradient between white and violet/blue) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#e0e7ff] to-[#7C3AED] opacity-50"></div>

      <h2 className="relative text-2xl font-bold text-gray-800 text-center mb-6">
        📊 Salesmen Distribution
      </h2>

      <div className="h-80 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="count"
              nameKey="salesManType"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              stroke="white"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ transition: "all 0.3s ease-in-out" }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesmenChart;
