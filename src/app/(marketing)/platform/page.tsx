import type { Metadata } from "next";
import { PlatformPageContent } from "@/components/pages/platform-page-content";

export const metadata: Metadata = {
  title: "פלטפורמה",
  description: "סקירת מערכת Sales Waroom — מודולים, ארכיטקטורה ויכולות.",
};

export default function PlatformPage() {
  return <PlatformPageContent />;
}
