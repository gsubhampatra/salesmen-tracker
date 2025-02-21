// src/components/SalesmanTable.tsx
import React from 'react';
import { useAllSalesmen } from '../../api/apiHooks';

const SalesmanTable: React.FC = () => {
  const { data, isLoading, error } = useAllSalesmen();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Salesmen List</h2>
      <table className="min-w-full mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Can Login</th>
          </tr>
        </thead>
        <tbody>
          {data?.allSalesmen.map((salesman) => (
            <tr key={salesman.id}>
              <td className="border px-4 py-2">{salesman.name}</td>
              <td className="border px-4 py-2">{salesman.salesManType}</td>
              <td className="border px-4 py-2">{salesman.phone || 'N/A'}</td>
              <td className="border px-4 py-2">{salesman.canLogin ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesmanTable;