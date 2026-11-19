import type { Metadata } from "next";
import QuestionsClient from "./QuestionsClient";

export const metadata: Metadata = {
  title: "Support SF Schools - Volunteer Survey",
  description:
    "Answer a few short questions and we'll match you with the volunteer opportunity that best fits your goals.",
};

export default function SurveyQuestionsPage() {
  return <QuestionsClient />;
}
