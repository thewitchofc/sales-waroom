import type { Metadata } from "next";
import { SeasonPageContent } from "@/components/pages/season-page-content";

export const metadata: Metadata = {
  title: "עונה",
  description: "דירוגי עונה, סולם דרגות, פרסי אליפות.",
};

export default function SeasonPage() {
  return <SeasonPageContent />;
}
