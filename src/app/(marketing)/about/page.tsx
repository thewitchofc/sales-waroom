import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "Sales Waroom נולדה מתוך 5 שנים בשטח. מערכת AI שמכינה אנשי מכירות לקו, לא עוד קורס או תאוריה.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
