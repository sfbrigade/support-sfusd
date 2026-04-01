import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Support SF Schools - Home",
};

export default function HomePage() {
  return <HomeClient />;
}
