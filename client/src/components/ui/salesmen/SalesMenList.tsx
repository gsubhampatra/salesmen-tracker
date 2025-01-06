import api from "@/lib/http/api"
import { API_ROUTES } from "@/lib/http/rest"
import { useQuery } from "@tanstack/react-query";

interface SalesMen {
  id: number;
  name: string;
  uid: string;
  phone: string;
  managerId: number;
}

interface SalesMenData {
  data: SalesMen[];
}

async function getSalesMenById(): Promise<SalesMenData> {
  const res = await api.get(API_ROUTES.SALESMEN.GET_BY_MANAGER_ID);
  return res.data;
}

export default function SalesMenList() {

  const { data, isLoading, isError } = useQuery<SalesMenData>({
    queryKey: ["salesmen"],
    queryFn: getSalesMenById
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (data) console.log(data)

  if (data) {
    return (
        <table className="w-full border-b border-l border-r">
          <thead>
            <tr className="border bg-gray-100">
              <th className="p-4 border-l text-center">id</th>
              <th className="p-4 border-l">name</th>
              <th className="p-4 border-l">uid</th>
              <th className="p-4 border-l">phone</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((salesman, index) => (
              <tr key={salesman.id} className={`${index % 2 == 0 ? 'bg-white' : null}`}>
                <td className="p-4 text-center">{salesman?.id}</td>
                <td className="p-4 border-l">{salesman?.name}</td>
                <td className="p-4 border-l">{salesman?.uid}</td>
                <td className="p-4 border-l">{
                  salesman.phone ? salesman.phone : "N/A"
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    )
  }

}