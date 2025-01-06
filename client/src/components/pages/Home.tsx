import NavBar from "../ui/layout/NavBar";
import SafeArea from "../ui/layout/SafeArea";

export default function Home() {
  return (
    <SafeArea>
      <NavBar />
      <div className="p-8">
        <h1>charts</h1>
      </div>
    </SafeArea>
  )
}