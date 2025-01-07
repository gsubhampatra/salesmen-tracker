import api from "@/lib/http/api"
import { API_ROUTES } from "@/lib/http/rest"
import { useQuery } from "@tanstack/react-query";

interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationData {
  data: Location[];
}

async function getLocationById(): Promise<LocationData> {
  const res = await api.get(API_ROUTES.LOCATION.GET_BY_MANAGER_ID);
  return res.data;
}

export default function LocationList({v}: {v: string}) {

  const { data, isLoading, isError } = useQuery<LocationData>({
    queryKey: ["salesmen", v],
    queryFn: getLocationById
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
              <th className="p-4 border-l">address</th>
              <th className="p-4 border-l">lat-long</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((salesman) => (
              <tr key={salesman.id}>
                <td className="p-4 text-center border-b">{salesman?.id}</td>
                <td className="p-4 border-l border-b">{salesman?.name}</td>
                <td className="p-4 border-l border-b">{salesman?.address}</td>
                <td className="p-4 border-l border-b">{
                  `${salesman.latitude , salesman.longitude}`
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    )
  }

}