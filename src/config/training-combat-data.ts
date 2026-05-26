export interface TrainingReplayEvent {
  id: number;
  time: string;
  label: string;
  type: "drop" | "panic" | "recovery" | "momentum" | "hesitation";
}

export interface ScenarioCombatIntel {
  behavior: string;
  threat: string;
  correction: string;
}

export const TRAINING_SESSION = {
  id: "3291",
  label: "סשן #3291",
};

export const TRAINING_LIVE_SIGNALS = [
  { label: "סשן חי", value: "פעיל", pulse: true },
  { label: "קול", value: "דפוס קולי זוהה", pulse: true },
  { label: "לחץ", value: "זיהוי קפיצת לחץ", pulse: false },
  { label: "AI", value: "מאמן AI מחובר", pulse: true },
];

export const TRAINING_REPLAY_EVENTS: TrainingReplayEvent[] = [
  { id: 1, time: "01:14", label: "סמכות נחלשה", type: "drop" },
  { id: 2, time: "01:42", label: "זיהוי פאניקת מחיר", type: "panic" },
  { id: 3, time: "02:11", label: "ביטחון הוחזר", type: "recovery" },
  { id: 4, time: "02:38", label: "היסוס רגשי", type: "hesitation" },
  { id: 5, time: "03:04", label: "מומנטום סגירה עלה", type: "momentum" },
];

export const TRAINING_COMPETITION = {
  dominance: 76,
  weeklyRank: 11,
  winStreak: 3,
  closingStreak: 4,
  pressureResistance: 71,
  outperform: 84,
};

export const SCENARIO_COMBAT_INTEL: Record<number, ScenarioCombatIntel> = {
  1: {
    behavior: "הגנה על מחיר",
    threat: "קריסת סמכות",
    correction: "שאל בוודאות. אל תגן על מחיר רגשית.",
  },
  2: {
    behavior: "הימנעות ממחויבות",
    threat: "אובדן שליטה בלקוח",
    correction: "החזר פריים. אל תקבל דחייה בשקט.",
  },
  3: {
    behavior: "פער סמכות",
    threat: "היסוס, טון לא בטוח",
    correction: "אמת סמכות החלטה לפני כל הצעה.",
  },
  4: {
    behavior: "כניעה לתחרות",
    threat: "כישלון לחץ, ודאות נפלה",
    correction: "אל תתפשר על פריים. הובל, אל תגיב.",
  },
};

export const COACH_COMMENTARY = [
  "המאמן זיהה חולשה, סמכות",
  "תיקון מומלץ נטען",
  "לחץ עולה, שמור על פריים",
  "הלקוח בודק dominance, אל תיכנע",
  "קפיצת ביטחון אפשרית, שאל עכשיו",
];

export const PSYCHOLOGY_ALERTS = [
  { label: "קריסת סמכות", severity: "CRIT" as const },
  { label: "כישלון לחץ", severity: "HIGH" as const },
  { label: "היסוס רגשי", severity: "HIGH" as const },
  { label: "אובדן שליטה", severity: "CRIT" as const },
  { label: "טון לא בטוח", severity: "MED" as const },
  { label: "הגנה על מחיר", severity: "HIGH" as const },
];
