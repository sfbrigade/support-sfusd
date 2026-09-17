import type { Metadata } from "next";
import VolunteerYourWayClient from "./volunteer-your-way";

export const metadata: Metadata = {
  title: "Support SF Schools - Volunteer Your Way",
};

export default function HowItWorksPage() {
  return <VolunteerYourWayClient />;
}
