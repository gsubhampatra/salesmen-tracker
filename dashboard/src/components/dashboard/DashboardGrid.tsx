import React from "react";
import DashboardCard from "./cards/DashboardCard";
import { useSalesmanStats } from "../../hooks/useSalesmanStats";
// import { useVisitStats } from "../../hooks/useVisitStats";

const DashboardGrid: React.FC = () => {
  const { totalSalesmen } = useSalesmanStats();
//   const { visitedToday, notVisitedToday } = useVisitStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <DashboardCard title="Total Salesmen" value={totalSalesmen} color="#4A90E2" link="/salesman" />
      {/* <DashboardCard title="Visited Today" value={visitedToday} color="#4CAF50" link="/visits" />
      <DashboardCard title="Not Visited Today" value={notVisitedToday} color="#F44336" link="/visits" /> */}
    </div>
  );
};

export default DashboardGrid;
