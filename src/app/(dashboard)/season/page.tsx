import type { Metadata } from "next";
import { SeasonPageContent } from "@/components/pages/season-page-content";

export const metadata: Metadata = {
  title: "Season",
  description: "Season rankings, tier ladder, championship rewards.",
};

export default function SeasonPage() {
  return <SeasonPageContent />;
}
