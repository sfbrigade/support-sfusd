// import CounterComponent from "../components/counter"; // example for redux
import Navbar from "../components/NavBar/NavBar";
import MapComponent from "@/components/Map/MapMain/Map";
import Image from "next/image";
import MapCard from "../components/MapCard/MapCard"

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Lato:wght@300&display=swap" rel="stylesheet" />
            <title>Support SF Schools</title>
      </head>
      <body>
      <nav>
        <Navbar />
      </nav>
        <main>
          <MapComponent />
          <MapCard /> 
        </main>
      </body>
    </div>
  );
}
