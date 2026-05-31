export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

/** תפריט ראשי. רק מה שצריך להחלטה ראשונה */
export const mainNav: NavItem[] = [
  { label: "דמו", href: "/demo", description: "לנסות שיחה עם AI" },
  { label: "חבילות", href: "/pricing", description: "מחירים ותוכניות" },
  { label: "אודות", href: "/about", description: "מה זה Sales Waroom" },
];

export const dashboardNav: NavItem[] = [
  { label: "סימולציה", href: "/arena" },
  { label: "תרגול", href: "/dashboard" },
  { label: "מבחן תיאוריה", href: "/theory-quiz" },
  { label: "דירוג", href: "/leaderboard" },
  { label: "עונה", href: "/season" },
  { label: "פרופיל", href: "/profile" },
];

export const footerNav: NavItem[] = [
  { label: "דמו", href: "/demo" },
  { label: "חבילות", href: "/pricing" },
  { label: "אודות", href: "/about" },
  { label: "התחברות", href: "/login" },
];

export const footerPlatformLinks: NavItem[] = [
  { label: "תרגול", href: "/dashboard" },
  { label: "מבחן תיאוריה", href: "/theory-quiz" },
  { label: "אימון", href: "/training" },
  { label: "אנליטיקה", href: "/analytics" },
  { label: "פלטפורמה", href: "/platform" },
];

export const footerCommandLinks: NavItem[] = [
  { label: "סימולציה", href: "/arena" },
  { label: "דירוג", href: "/leaderboard" },
  { label: "עונה", href: "/season" },
];

export const footerAccessLinks: NavItem[] = [
  { label: "חבילות", href: "/pricing" },
  { label: "התחברות", href: "/login" },
  { label: "פרטיות", href: "/privacy" },
  { label: "נגישות", href: "/accessibility" },
  { label: "אודות", href: "/about" },
];

export const productRoutes = [
  {
    title: "AI Simulation",
    href: "/arena",
    label: "מרכזי",
    description: "לקוח AI קשה. ניתוח בזמן אמת. חדר אימון עילית.",
  },
  {
    title: "דמו",
    href: "/demo",
    label: "התחלה",
    description: "שיחת AI קצרה. רואים איך זה עובד.",
  },
  {
    title: "מבחן תיאוריה",
    href: "/theory-quiz",
    label: "תיאוריה",
    description: "שאלון אמריקאי עם ציון. התנגדויות, פתיחה, סגירה.",
  },
  {
    title: "תרגול",
    href: "/dashboard",
    label: "מאמן",
    description: "מאמן AI. ניתוח חד ותשובות מומלצות.",
  },
] as const;
