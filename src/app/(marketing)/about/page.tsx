import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";

export const metadata: Metadata = {
  title: "אודות",
  description: "הסיפור, המission והחזון של Sales Waroom.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
