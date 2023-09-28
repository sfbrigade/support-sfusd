// import CounterComponent from "../components/counter"; // example for redux
import Navbar from "../components/NavBar/NavBar";
import MapComponent from "../components/Map";
import MapCard from "../components/MapCard/MapCard"
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen z-0">
      
      <main>
        <Navbar />
        <MapComponent />
      </main>
    </div>
  );
}
