import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllSalesmen } from "../../api/apiFunctions";

interface Salesman {
  id: number;
  name: string;
  uid: string;
  phone: string | null;
  canLogin: boolean;
  salesManType: "VANSALES" | "PRESELLER" | "MERCHANDISER";
  managerId: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: Salesman[];
}

const SalesmanList: React.FC = () => {
  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["salesmen"],
    queryFn: getAllSalesmen,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-3 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
        Failed to load salesmen data
      </div>
    );
  }

  const salesmen = data?.data || [];

  return (
    <div className="container mx-auto px-4 mt-4">
      <h2 className="text-2xl font-bold mb-3 text-center">Salesman List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">UID</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Can Login</th>
              <th className="px-4 py-2 border">Manager ID</th>
              <th className="px-4 py-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {salesmen.map((salesman) => (
              <tr key={salesman.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{salesman.name}</td>
                <td className="px-4 py-2 border">{salesman.uid}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded text-sm ${
                    salesman.salesManType === 'VANSALES' 
                      ? 'bg-blue-100 text-blue-800'
                      : salesman.salesManType === 'PRESELLER'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {salesman.salesManType}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  <span className={`px-2 py-1 rounded ${
                    salesman.canLogin
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {salesman.canLogin ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">{salesman.managerId}</td>
                <td className="px-4 py-2 border text-sm">
                  {new Date(salesman.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesmanList;