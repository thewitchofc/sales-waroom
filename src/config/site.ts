import { mainNav } from "@/config/navigation";

export const siteConfig = {
  name: "SALES WAROOM",
  nameHe: "SALES WAROOM",
  description:
    "סימולציות מכירה מבוססות AI שמאתגרות את הביטחון, ההתנגדויות ויכולת הסגירה שלכם בזמן אמת.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "he-IL",
  direction: "rtl" as const,
  links: {
    demo: "/demo",
    dashboard: "/dashboard",
    login: "/login",
    pricing: "/pricing",
  },
  nav: mainNav,
} as const;

export type SiteConfig = typeof siteConfig;
