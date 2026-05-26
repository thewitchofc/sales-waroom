import type { Metadata } from "next";
import { DashboardPageContent } from "@/components/pages/dashboard-page-content";

export const metadata: Metadata = {
  title: "מרכז פיקוד",
  description: "דשבורד Sales Waroom, סימולציות, אנליטיקה, אימון ופיקוד צוות.",
};

export default function DashboardPage() {
  return <DashboardPageContent />;
}
