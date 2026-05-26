import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";

export const metadata: Metadata = {
  title: "אודות",
  description: "המניפסט, הפילוסופיה והתרבות של Sales Waroom, תנועת הקלוזרים העילית.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
