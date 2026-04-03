import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Support SF Schools - About",
  description:
    "Support SF Schools is a diverse group of teachers, designers, engineers, researchers, and curious community members dedicated to making it easier for people who live, work, and hang out in San Francisco to support our public schools.",
};

export default function AboutPage() {
  return <AboutClient />;
}
