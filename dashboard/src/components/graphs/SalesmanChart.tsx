

import {  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface SalesmanData {
  salesManType: string;
  count: number;
}
const COLORS = {
  store: ['#4F46E5', '#7C3AED', '#EC4899', '#06B6D4'],
  salesmen: ['#818CF8', '#A78BFA', '#F472B6', '#22D3EE']
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-indigo-600">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};
export const SalesmenChart: React.FC<{ data: SalesmanData[] }> = ({ data }) => {
  const RADIAN = Math.PI / 180;
  const CustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Salesmen Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomizedLabel}
              outerRadius={130}
              innerRadius={80}
              dataKey="count"
              nameKey="salesManType"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={COLORS.salesmen[index % COLORS.salesmen.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesmenChart;