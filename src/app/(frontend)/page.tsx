import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const revalidate = 3600; // cache page for 1 hour

export const metadata: Metadata = {
  title: "Support SF Schools - Home",
};

export default function HomePage() {
  return <HomeClient />;
}
