import React from "react";
import { useSalesmenCount, useStoreCount , useAccuracyOverTime} from "../api/apiHooks";
import SalesmenChart from "../components/graphs/SalesmanChart";
import StoreChart from "../components/graphs/StoreChart";
import AccuracyOverTime from "../components/graphs/distributor/AccuracyGraph";
const Home: React.FC = () => {
  const { data: salesmenCountResponse, isLoading: isLoadingSalesmenCount } = useSalesmenCount();
  const { data: storeCountResponse, isLoading: isLoadingStoreCount } = useStoreCount();
  const { data: accuracyResponse, isLoading: isLoadingAccuracy } = useAccuracyOverTime();

  if (isLoadingSalesmenCount || isLoadingStoreCount || isLoadingAccuracy) {
    return <div>Loading...</div>;
  }

  const salesmenCount = salesmenCountResponse?.salesmen.resData;
  const storeCount = storeCountResponse?.stores.resData;
  const accuracyData = accuracyResponse?.data; 

  return (
    <div className="p-4">
       <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SalesmenChart data={salesmenCount || []} />
        <StoreChart data={storeCount || []} />
        <AccuracyOverTime data={accuracyData || []} /> 
      </div>
    </div>
  );
};

export default Home;
