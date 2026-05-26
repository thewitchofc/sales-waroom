export type CorrectionSeverity = "HIGH" | "MED" | "CRIT";

export interface AnalyticsCorrection {
  id: number;
  severity: CorrectionSeverity;
  behavior: string;
  psychology: string;
  correction: string;
  improvedResponse: string;
  confidenceDelta: string;
  time: string;
}

export interface TimelineIntelligenceEvent {
  id: number;
  time: string;
  label: string;
  type: "drop" | "spike" | "panic" | "recovery" | "momentum" | "hesitation";
}

export interface DominanceMetric {
  id: string;
  label: string;
  score: number;
  trend?: string;
}

export interface PsychologicalSignal {
  id: number;
  time: string;
  signal: string;
  type: "fear" | "hesitation" | "collapse" | "spike" | "shift";
}

export const ANALYTICS_SESSION = {
  id: "4482",
  label: "סשן #4482",
  duration: "03:18",
};

export const AI_ANALYSIS_STEPS = [
  {
    step: "01",
    title: "העלאה / הקלטה",
    body: "שיחת מכירה נכנסת למערכת. AI מתחיל סריקה.",
    metrics: ["קול", "טון", "קצב"],
  },
  {
    step: "02",
    title: "ניתוח AI",
    body: "לחץ · סמכות · שליטה רגשית · ודאות · התנגדויות · טונality",
    metrics: ["לחץ", "סמכות", "ודאות"],
  },
  {
    step: "03",
    title: "תיקוני קרב",
    body: "משוב חד, מדורג, מוכן ליישום מיידי בשטח.",
    metrics: ["תיקון", "דלתא", "ביצוע"],
  },
];

export const CALL_TIMELINE_EVENTS: TimelineIntelligenceEvent[] = [
  { id: 1, time: "01:14", label: "ירידת ביטחון", type: "drop" },
  { id: 2, time: "01:44", label: "זיהוי פאניקת מחיר", type: "panic" },
  { id: 3, time: "02:07", label: "היסוס רגשי", type: "hesitation" },
  { id: 4, time: "02:55", label: "סמכות הוחזרה", type: "recovery" },
  { id: 5, time: "03:18", label: "מומנטום סגירה עלה", type: "momentum" },
];

export const ANALYTICS_CORRECTIONS: AnalyticsCorrection[] = [
  {
    id: 1,
    severity: "CRIT",
    behavior: "קריסת סמכות",
    psychology: "הלקוח חש חוסר ודאות ברגע שהגנת על המחיר",
    correction: "שאל בוודאות. אל תגן על מחיר רגשית.",
    improvedResponse: "מובן. לפני מחיר, מה העלות של לא לפתור את זה החודש?",
    confidenceDelta: "+12%",
    time: "01:44",
  },
  {
    id: 2,
    severity: "HIGH",
    behavior: "התנהגות ריאקטיבית",
    psychology: "מילוי שקט בהסברים חשף חולשה ללקוח",
    correction: "קצר. שאל. אל תמלא שקט במילים.",
    improvedResponse: "מה הכי חשוב שייפתר לפני סוף הרבעון?",
    confidenceDelta: "+9%",
    time: "01:18",
  },
  {
    id: 3,
    severity: "HIGH",
    behavior: "איבוד פריים · מחיר",
    psychology: "הלקוח הוביל אותך לדיון על עלות לפני ערך",
    correction: "החזר שליטה. אל תוכיח. תוביל.",
    improvedResponse: "לפני שאדבר על מחיר, מה כבר נכשל בפתרונות קודמים?",
    confidenceDelta: "+11%",
    time: "01:06",
  },
  {
    id: 4,
    severity: "MED",
    behavior: "ויתור על מחויבות",
    psychology: "הלקוח קיבל בריחה ב'תשלח פרטים' בלי התנגדות",
    correction: "סגור מחויבות לפני שאתה שולח כלום.",
    improvedResponse: "לפני שאשלח, מה חייב להיות במסמך כדי שתחתמו?",
    confidenceDelta: "+7%",
    time: "02:07",
  },
];

export const DOMINANCE_METRICS: DominanceMetric[] = [
  { id: "dominance", label: "מדד דומיננטיות", score: 78, trend: "+6" },
  { id: "closing", label: "מוכנות לסגירה", score: 84, trend: "+11" },
  { id: "pressure", label: "עמידות בלחץ", score: 71, trend: "+14" },
  { id: "authority", label: "רמת סמכות", score: 76, trend: "+8" },
  { id: "emotional", label: "שליטה רגשית", score: 82, trend: "+5" },
];

export const COMPETITION_INTEL = {
  outperform: 81,
  rank: 14,
  weeklyMovement: "+3",
  pressureRank: 9,
  closingStreak: 4,
};

export const PSYCHOLOGICAL_SIGNALS: PsychologicalSignal[] = [
  { id: 1, time: "00:52", signal: "עלייה בלחץ · בדיקת סמכות", type: "shift" },
  { id: 2, time: "01:14", signal: "ירידת ביטחון · האטה בקול", type: "collapse" },
  { id: 3, time: "01:44", signal: "סימן פחד · הגנה על מחיר", type: "fear" },
  { id: 4, time: "02:07", signal: "היסוס · מילוי שקט", type: "hesitation" },
  { id: 5, time: "02:55", signal: "קפיצת ביטחון · החזרת פריים", type: "spike" },
  { id: 6, time: "03:18", signal: "מומנטום סגירה · ודאות עלתה", type: "spike" },
];

export const severityLabels: Record<CorrectionSeverity, string> = {
  HIGH: "גבוה",
  MED: "בינוני",
  CRIT: "קריטי",
};

export const severityStyles: Record<CorrectionSeverity, string> = {
  CRIT: "border-red-500/40 bg-red-500/10 text-red-400",
  HIGH: "border-red-500/25 bg-red-500/5 text-red-400",
  MED: "border-accent/30 bg-accent/5 text-accent",
};
