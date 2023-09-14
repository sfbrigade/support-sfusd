// import CounterComponent from "../components/counter"; // example for redux
import Navbar from "../components/NavBar";
import MapComponent from "@/components/Map";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <MapComponent />
      <main>{/* Your main content goes here */}</main>
    </div>
  );
}
