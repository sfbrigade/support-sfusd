import type { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "Support SF Schools - How It Works",
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
