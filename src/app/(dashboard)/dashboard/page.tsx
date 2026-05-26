import type { Metadata } from "next";
import { DashboardPageContent } from "@/components/pages/dashboard-page-content";

export const metadata: Metadata = {
  title: "Command Center",
  description: "דשבורד Sales Waroom — סימולציות, analytics, coaching ופיקוד צוות.",
};

export default function DashboardPage() {
  return <DashboardPageContent />;
}
