import React, { JSX } from "react";
import { BarChart, MapPin, Clock, Users, Target, Activity } from "lucide-react";

interface CardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, bgColor }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg ${bgColor} flex items-center gap-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
    >
      <div className="p-3 bg-white/10 rounded-full transform transition-transform duration-300 group-hover:rotate-12">
        {React.cloneElement(icon, { 
          size: 28, 
          strokeWidth: 2, 
          className: "text-white transition-all duration-300 group-hover:scale-110" 
        })}
      </div>
      <div className="transform transition-all duration-300 group-hover:translate-x-2">
        <h3 className="text-sm uppercase tracking-wider font-medium text-white/80 mb-1">
          {title}
        </h3>
        <p className="text-3xl font-bold text-white tracking-tight leading-none">
          {value}
        </p>
      </div>
    </div>
  );
};

export const TotalOutletsAssignedCard: React.FC<{ totalOutletsAssigned: number }> = ({ totalOutletsAssigned }) => (
  <Card 
    title="Total Outlets Assigned" 
    value={totalOutletsAssigned.toLocaleString()} 
    icon={<MapPin />} 
    bgColor="bg-blue-600" 
  />
);

export const TotalOutletsVisitedCard: React.FC<{ totalOutletsVisited: number }> = ({ totalOutletsVisited }) => (
  <Card 
    title="Total Outlets Visited" 
    value={totalOutletsVisited.toLocaleString()} 
    icon={<BarChart />} 
    bgColor="bg-indigo-600" 
  />
);

export const OverallAccuracyCard: React.FC<{ overallAccuracy: string }> = ({ overallAccuracy }) => (
  <Card 
    title="Overall Accuracy" 
    value={`${overallAccuracy}%`} 
    icon={<Target />} 
    bgColor="bg-emerald-600" 
  />
);

export const AvgVisitDurationCard: React.FC<{ avgVisitDuration: string }> = ({ avgVisitDuration }) => (
  <Card 
    title="Avg Visit Duration" 
    value={`${avgVisitDuration} min`} 
    icon={<Clock />} 
    bgColor="bg-violet-600" 
  />
);

export const MaxDistanceTraveledCard: React.FC<{ maxDistanceTraveled: string }> = ({ maxDistanceTraveled }) => (
  <Card 
    title="Max Distance Traveled" 
    value={`${maxDistanceTraveled} km`} 
    icon={<Activity />} 
    bgColor="bg-cyan-600" 
  />
);

export const TotalSalesmenCard: React.FC<{ totalSalesmen: number }> = ({ totalSalesmen }) => (
  <Card 
    title="Total Salesmen" 
    value={totalSalesmen.toLocaleString()} 
    icon={<Users />} 
    bgColor="bg-purple-600" 
  />
);

export default Card;