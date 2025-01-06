import NavBar from "../ui/layout/NavBar";
import SafeArea from "../ui/layout/SafeArea";
import SalesMenList from "../ui/salesmen/SalesMenList";

export default function SalesMen() {


  return (
    <SafeArea>
      <NavBar />
      <div className="p-8">
        <SalesMenList />
      </div>
    </SafeArea>
  )
}