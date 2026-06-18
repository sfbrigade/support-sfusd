import type { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "Support SF Schools - How It Works",
  description:
    "How Support SF Schools connects volunteers with schools through a simple survey, organization matching, and volunteer placement.",
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}