import type { Metadata } from "next";
import { TheoryQuizPageContent } from "@/components/pages/theory-quiz-page-content";

export const metadata: Metadata = {
  title: "מבחן תיאוריה",
  description:
    "שאלון אמריקאי על מכירות, התנגדויות, פתיחת שיחה וסגירה. עם ציון והסבר מיידי.",
};

export default function TheoryQuizPage() {
  return <TheoryQuizPageContent />;
}
