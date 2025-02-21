import { useQuery } from "@tanstack/react-query";
import { getTotalSalesMan } from "../api/apiFunctions";

export const useSalesmanStats = () => {
  const { data } = useQuery({
    queryKey: ["totalSalesmen"],
    queryFn: getTotalSalesMan,
  });

  return {
    totalSalesmen: data?.totalSalesmen || 0,
  };
};
