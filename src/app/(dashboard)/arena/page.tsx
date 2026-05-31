import type { Metadata } from "next";
import { ArenaPageContent } from "@/components/pages/arena-page-content";

export const metadata: Metadata = {
  title: "AI Simulation",
  description:
    "סימולציית מכירות AI מרכזית. לקוח קשה, ניתוח בזמן אמת, חדר אימון עילית.",
};

export default function ArenaPage() {
  return <ArenaPageContent />;
}
