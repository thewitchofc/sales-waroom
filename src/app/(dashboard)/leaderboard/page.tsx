import type { Metadata } from "next";
import { LeaderboardPageContent } from "@/components/pages/leaderboard-page-content";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Leaderboard חי, top closers, rank movement, streaks ו-badges.",
};

export default function LeaderboardPage() {
  return <LeaderboardPageContent />;
}
