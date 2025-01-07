import api from "@/lib/http/api";
import { API_ROUTES } from "@/lib/http/rest";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

async function addLocation({name, address, latitude, longitude}: {name: string, address: string, latitude: number, longitude: number}) {
  const res = await api.post(API_ROUTES.LOCATION.CREATE, { name, address, latitude, longitude });
  console.log(res.data);
  return res.data;
}

export default function LocationForm({ setIsModalOpen, setV }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; setV: React.Dispatch<React.SetStateAction<string>> }) {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(parseInt(e.target.value));
  }
  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(parseInt(e.target.value));
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }

  const mutation = useMutation(addLocation, {
    onSuccess: () => {
      setIsModalOpen(false);
      setV(Math.random().toString());
      setLatitude(0);
      setLongitude(0);
    }
  })

  return (
    <div className="flex flex-col gap-4 min-w-[360px]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Add Location</h1>
        <button className="p-2 text-red-400" onClick={() => setIsModalOpen(false)}>X</button>
      </div>
      <input type="text" placeholder="name" className="p-2 border text-black font-semibold rounded-sm" onChange={handleNameChange}/>
      <input type="text" placeholder="address" className="p-2 border text-black font-semibold rounded-sm" onChange={handleAddressChange}/>
      <input type="text" placeholder="latitude" className="p-2 border text-black font-semibold rounded-sm" onChange={handleLatitudeChange}/>
      <input type="text" placeholder="longitude" className="p-2 border text-black font-semibold rounded-sm" onChange={handleLongitudeChange}/>
      <button className="px-4 py-2 bg-black text-white rounded-md" onClick={() => mutation.mutate({ name, address, latitude, longitude })}> Submit </button>
    </div>
  )
}