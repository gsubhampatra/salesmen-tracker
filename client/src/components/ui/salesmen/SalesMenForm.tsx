import api from "@/lib/http/api";
import { API_ROUTES } from "@/lib/http/rest";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

async function addSalesMan({ name, userid }: { name: string, userid: string }) {
  const res = await api.post(API_ROUTES.SALESMEN.CREATE, { name, userid });
  return res.data;
}

export default function SalesMenForm({ setIsModalOpen, setV }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; setV: React.Dispatch<React.SetStateAction<string>> }) {

  const [name, setName] = useState("");
  const [userid, setUid] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value);
  }

  const mutation = useMutation(addSalesMan, {
    onSuccess: () => {
      setIsModalOpen(false);
      setV(userid);
      setName("N/A");
      setUid("N/A");
    }
  })

  return (
    <div className="flex flex-col gap-4 min-w-[360px]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Add Salesman</h1>
        <button className="p-2 text-red-400" onClick={() => setIsModalOpen(false)}>X</button>
      </div>
      <input type="text" placeholder="name" className="p-2 border text-black font-semibold rounded-sm" onChange={handleNameChange}/>
      <input type="text" placeholder="userid" className="p-2 border text-black font-semibold rounded-sm" onChange={handleUidChange}/>
      <button className="px-4 py-2 bg-black text-white rounded-md" onClick={() => mutation.mutate({name, userid})}> Submit </button>
    </div>
  )
}