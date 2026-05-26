export const siteConfig = {
  name: "SALES WAROOM",
  nameHe: "SALES WAROOM",
  description:
    "סימולציות מכירה מבוססות AI שמאתגרות את הביטחון, ההתנגדויות ויכולת הסגירה שלכם בזמן אמת.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "he-IL",
  direction: "rtl" as const,
  links: {
    demo: "#live-demo",
    pricing: "#pricing",
  },
  nav: [
    { label: "דמו חי", href: "#live-demo" },
    { label: "סימולטור", href: "#simulator" },
    { label: "אימון קולי", href: "#voice" },
    { label: "אנליטיקה", href: "#analytics" },
    { label: "תמחור", href: "#pricing" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
