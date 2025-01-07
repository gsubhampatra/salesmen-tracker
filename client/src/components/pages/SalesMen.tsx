import { useState } from "react";
import Modal from "../ui/layout/Modal";
import NavBar from "../ui/layout/NavBar";
import SafeArea from "../ui/layout/SafeArea";
import SalesMenForm from "../ui/salesmen/SalesMenForm";
import SalesMenList from "../ui/salesmen/SalesMenList";

export default function SalesMen() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [v, setV] = useState("");

  return (
    <SafeArea>
      <NavBar />

      {
        isModalOpen && (
          <Modal>
            <SalesMenForm setIsModalOpen={setIsModalOpen} setV={setV}/>
          </Modal>
        )
      }

      <div className="p-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">SalesMen</h1>
            <button className="px-4 py-2 bg-black text-white rounded-md" onClick={() => setIsModalOpen(true) }>Add SalesMen</button>
          </div>
          <SalesMenList v={v}/>
        </div>
      </div>
    </SafeArea>
  )
}