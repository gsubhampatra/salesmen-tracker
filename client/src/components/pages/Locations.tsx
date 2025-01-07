import { useState } from "react";
import NavBar from "../ui/layout/NavBar";
import SafeArea from "../ui/layout/SafeArea";
import LocationForm from "../ui/location/LocationForm";
import Modal from "../ui/layout/Modal";
import LocationList from "../ui/location/LocationList";

export default function Locations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [v, setV] = useState("");

  return (
    <SafeArea>
      <NavBar />

      {
        isModalOpen && (
          <Modal>
            <LocationForm setIsModalOpen={setIsModalOpen} setV={setV}/>
          </Modal>
        )
      }

      <div className="p-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Location</h1>
            <button className="px-4 py-2 bg-black text-white rounded-md" onClick={() => setIsModalOpen(true) }>Add Location</button>
          </div>
          <LocationList v={v}/>
        </div>
      </div>
    </SafeArea>
  )
}