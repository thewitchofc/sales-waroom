import type { Metadata } from "next";
import { LeaderboardPageContent } from "@/components/pages/leaderboard-page-content";

export const metadata: Metadata = {
  title: "לוח דירוג",
  description: "לוח דירוג חי, זאבים מובילים, דירוג movement, רצףs וbadges.",
};

export default function LeaderboardPage() {
  return <LeaderboardPageContent />;
}
