import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface MostVisitedLocationsProps {
  data: {
    mostVisitedLocations?: {
      locationName: string;
      visitCount: number;
    }[];
  };
}

const MostVisitedLocations: React.FC<MostVisitedLocationsProps> = ({ data }) => {
  const locations = data.mostVisitedLocations || [];

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Most Visited Locations</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={locations} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="locationName"
              width={120}
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="visitCount" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MostVisitedLocations;
