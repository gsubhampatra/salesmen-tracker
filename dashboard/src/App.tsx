// src/components/Dashboard.tsx
import React, { useState } from 'react';
import SalesmanCountChart from './components/ui/SalesmanCountChart';
import StoreCountChart from './components/ui/StoreCountChart';
import VisitedLocationsChart from './components/ui/VisitedLocationsChart';
import AccuracyChart from './components/ui/AccuracyChart';
import SalesmanTable from './components/ui/SalesmanTable';
import DatePicker from './components/ui/DatePicker';
import StoresTable from './components/ui/StoresTable';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  return (
    <div className="p-4 px-8  flex flex-col justify-center items-center md:mx-20">
      <h1 className="text-xl font-semibold mb-4">Salesman Track Dashboard</h1>
      <div className="flex justify-center mb-4 w-full h-full">
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
        <div className="bg-white p-4 rounded-lg shadow-md w-full h-1/2">
          <h2 className="text-lg font-semibold mb-2">Salesman Count</h2>
          <SalesmanCountChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-full h-1/2">
          <h2 className="text-lg font-semibold mb-2">Store Count</h2>
          <StoreCountChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-full h-1/2">
          <h2 className="text-lg font-semibold mb-2">Visited Locations</h2>
          <VisitedLocationsChart selectedDate={selectedDate} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-full h-1/2">
          <h2 className="text-lg font-semibold mb-2">Accuracy</h2>
          <AccuracyChart selectedDate={selectedDate} />
        </div>
      </div>
      <div className="mt-4 w-full h-1/2">
        <div className="bg-white p-4 rounded-lg shadow-md w-full h-full">
          <h2 className="text-lg font-semibold mb-2">Salesman Table</h2>
          <SalesmanTable />
        </div>
      </div>
      <div className="mt-4 w-full h-1/2">
        <div className="bg-white p-4 rounded-lg shadow-md w-full h-full">
          <h2 className="text-lg font-semibold mb-2">Stores Table</h2>
          <StoresTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;