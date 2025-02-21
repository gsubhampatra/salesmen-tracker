import React from 'react';
import { BarChart, Bar,  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Types
interface StoreData {
  storeType: string;
  count: number;
}

// interface SalesmanData {
//   salesManType: string;
//   count: number;
// }

const COLORS = {
  store: ['#4F46E5', '#7C3AED', '#EC4899', '#06B6D4'],
  salesmen: ['#818CF8', '#A78BFA', '#F472B6', '#22D3EE']
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-indigo-600">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// Store Chart Component
export const StoreChart: React.FC<{ data: StoreData[] }> = ({ data }) => {
  return (
    <div className="p-6 transition-shadow duration-300 bg-white shadow-xl rounded-xl hover:shadow-2xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Store Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="storeType" 
              tick={{ fill: '#4B5563' }}
              axisLine={{ stroke: '#9CA3AF' }}
            />
            <YAxis 
              tick={{ fill: '#4B5563' }}
              axisLine={{ stroke: '#9CA3AF' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Bar 
              dataKey="count" 
              name="Number of Stores"
              radius={[8, 8, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS.store[index % COLORS.store.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StoreChart;


