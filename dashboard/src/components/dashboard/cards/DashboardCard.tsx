import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  value: number;
  color: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, color, link }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`p-6 rounded-lg shadow-md text-white cursor-pointer`}
      style={{ backgroundColor: color }}
      onClick={() => navigate(link)}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
