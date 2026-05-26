import type { Metadata } from "next";
import { ArenaPageContent } from "@/components/pages/arena-page-content";

export const metadata: Metadata = {
  title: "הזירה",
  description: "זירת תחרות AI, אתגר שבועי, דירוג חי וטורנירים עילית.",
};

export default function ArenaPage() {
  return <ArenaPageContent />;
}
