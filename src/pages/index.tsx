// import CounterComponent from "../components/counter"; // example for redux
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/NavBar/NavBar";
import MapView from "../components/MapView/MapView";

export default function Home() {
  return (
    <div className="flex flex-col h-screen z-0">
      <main>
        <Navbar />
        <MapView />
      </main>
    </div>
  );
}
