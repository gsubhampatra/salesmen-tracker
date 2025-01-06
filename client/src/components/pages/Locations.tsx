import NavBar from "../ui/layout/NavBar";
import SafeArea from "../ui/layout/SafeArea";

export default function Locations() {
  return (
    <SafeArea>
      <NavBar />
      <div className="p-8">
        <h1>location</h1>
      </div>
    </SafeArea>
  )
}