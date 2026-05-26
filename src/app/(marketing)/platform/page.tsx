import type { Metadata } from "next";
import { PlatformPageContent } from "@/components/pages/platform-page-content";

export const metadata: Metadata = {
  title: "פלטפורמה",
  description: "מערכת הפעלה AI למכירות, מודולים טקטיים, תשתית פיקוד חיה.",
};

export default function PlatformPage() {
  return <PlatformPageContent />;
}
