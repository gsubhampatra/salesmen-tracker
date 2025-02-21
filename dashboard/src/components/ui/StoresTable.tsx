// src/components/ui/StoresTable.tsx
import React, { useState } from 'react';
import { useAllStores } from '../../api/apiHooks';

const ITEMS_PER_PAGE = 5; // Number of items to display per page

const StoresTable: React.FC = () => {
  const { data, isLoading, error } = useAllStores();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  // Calculate total pages
  const totalPages = Math.ceil((data?.allStores.length || 0) / ITEMS_PER_PAGE);

  // Get the current stores to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStores = data?.allStores.slice(startIndex, endIndex) || [];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Stores List</h2>
      <table className="min-w-full mt-2 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Store Name</th>
            <th className="border px-4 py-2">Market Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Store Type</th>
            <th className="border px-4 py-2">Region</th>
            <th className="border px-4 py-2">State</th>
          </tr>
        </thead>
        <tbody>
          {currentStores.map((store) => (
            <tr key={store.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{store.name}</td>
              <td className="border px-4 py-2">{store.market_name}</td>
              <td className="border px-4 py-2">{store.address}</td>
              <td className="border px-4 py-2">{store.storeType}</td>
              <td className="border px-4 py-2">{store.region}</td>
              <td className="border px-4 py-2">{store.state}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoresTable;