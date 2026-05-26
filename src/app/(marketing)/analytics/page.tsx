import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { AnalyticsDashboard } from "@/components/sections/analytics-dashboard";

export const metadata: Metadata = {
  title: "אנליטיקה",
  description:
    "מרכז מודיעין AI לזאבים, ניתוח שיחות, תיקוני קרב ודירוג תחרותי בזמן אמת.",
};

export default function AnalyticsPage() {
  return (
    <>
      <PageHero
        label="מרכז מודיעין, SALES WAROOM"
        title="AI מנתח את הפסיכולוגיה שלך. עכשיו."
        description="העלאה. ניתוח. תיקון. כל שיחה היא קרב, וכל קרב נרשם."
      />
      <AnalyticsDashboard showHeader={false} />
    </>
  );
}
