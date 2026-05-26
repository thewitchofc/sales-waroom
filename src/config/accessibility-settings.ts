export type AccessibilitySettings = {
  fontScale: 0 | 1 | 2;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  reduceMotion: boolean;
  lineSpacing: boolean;
};

export const defaultAccessibilitySettings: AccessibilitySettings = {
  fontScale: 0,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  reduceMotion: false,
  lineSpacing: false,
};

export const A11Y_STORAGE_KEY = "sw-a11y-settings";

export const accessibilityTools = [
  {
    id: "fontIncrease" as const,
    label: "הגדלת טקסט",
    description: "מגדיל את גודל הגופן באתר",
  },
  {
    id: "fontDecrease" as const,
    label: "הקטנת טקסט",
    description: "מקטין את גודל הגופן באתר",
  },
  {
    id: "highContrast" as const,
    label: "ניגודיות גבוהה",
    description: "מגביר ניגוד בין טקסט לרקע",
  },
  {
    id: "highlightLinks" as const,
    label: "הדגשת קישורים",
    description: "מסמן קישורים בבירור",
  },
  {
    id: "readableFont" as const,
    label: "גופן קריא",
    description: "מחליף לגופן פשוט וברור",
  },
  {
    id: "lineSpacing" as const,
    label: "ריווח שורות",
    description: "מגדיל מרווח בין שורות",
  },
  {
    id: "reduceMotion" as const,
    label: "ביטול אנימציות",
    description: "עוצר תנועות ואפקטים",
  },
] as const;

export type AccessibilityToolId = (typeof accessibilityTools)[number]["id"];
