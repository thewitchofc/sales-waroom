export type MessageType = "prospect" | "user" | "coach" | "analysis";

export type BehaviorMode = "leading" | "reactive" | "neutral";

export interface TranscriptMessage {
  id: number;
  type: MessageType;
  speaker: string;
  text: string;
  timestamp: string;
}

export interface CoachFeedback {
  id: number;
  type: "warning" | "critical" | "success" | "info";
  title: string;
  body: string;
  time: string;
}

export interface TimelineEvent {
  id: number;
  label: string;
  time: string;
  type: "objection" | "coach" | "drop" | "recovery";
  active?: boolean;
}

export interface PsychologyScores {
  confidence: number;
  objection: number;
  pressure: number;
  frameControl: number;
  authority: number;
  certainty: number;
}

export interface ClientPersona {
  id: string;
  name: string;
  title: string;
  dominance: "HIGH" | "CRIT";
  traits: string[];
  pressureLevel: number;
}

export interface PressureLevel {
  id: number;
  label: string;
  code: string;
  description: string;
}

export const INITIAL_PSYCHOLOGY_SCORES: PsychologyScores = {
  confidence: 91,
  objection: 88,
  pressure: 42,
  frameControl: 86,
  authority: 84,
  certainty: 89,
};

export const CLIENT_PERSONAS: ClientPersona[] = [
  {
    id: "authority-buyer",
    name: "קונה סמכותי",
    title: "שולט בתקציב, סגירה גבוהה",
    dominance: "CRIT",
    traits: ["שולט בפריים", "בוחן סמכות", "לוחץ על מחיר", "מחפש חולשה"],
    pressureLevel: 4,
  },
  {
    id: "procurement",
    name: "רכש עוין",
    title: "מנהל רכש, ארגוני",
    dominance: "HIGH",
    traits: ["מתנגד מוקדם", "מושווה תחרות", "מאיץ החלטות"],
    pressureLevel: 3,
  },
  {
    id: "founder",
    name: "יזם עייף",
    title: "יזם, סדרה B",
    dominance: "HIGH",
    traits: ["חסר סבלנות", "מחפש ROI", "לא סובל הסברים ארוכים"],
    pressureLevel: 3,
  },
];

export const ACTIVE_PERSONA = CLIENT_PERSONAS[0];

export const PRESSURE_LEVELS: PressureLevel[] = [
  {
    id: 1,
    label: "בסיסי",
    code: "BASE",
    description: "לקוח ידידותי, בניית ביטחון",
  },
  {
    id: 2,
    label: "מתקדם",
    code: "ADV",
    description: "התנגדויות מובנות, שמירת פריים",
  },
  {
    id: 3,
    label: "עילית",
    code: "ELITE",
    description: "לחץ פסיכולוגי, בדיקת סמכות",
  },
  {
    id: 4,
    label: "אינטנסיבי",
    code: "INTENSE",
    description: "קונה דומיננטי, אין מקום לחולשה",
  },
  {
    id: 5,
    label: "שטח",
    code: "COMBAT",
    description: "סימולציית סגירה תחת אש, אפס מרווח",
  },
];

export const DEMO_TRANSCRIPT: TranscriptMessage[] = [
  {
    id: 1,
    type: "prospect",
    speaker: "לקוח, קונה סמכותי",
    text: "יש לי 12 דקות. תגיד לי מה אתם עושים, ולמה שאשקיע בזה.",
    timestamp: "00:12",
  },
  {
    id: 2,
    type: "user",
    speaker: "אתה",
    text: "מצוין. לפני שאני מסביר, מה הכי עולה לכם היום כשעסקה נופלת?",
    timestamp: "00:28",
  },
  {
    id: 3,
    type: "prospect",
    speaker: "לקוח, קונה סמכותי",
    text: "זה נשמע יקר מדי כרגע.",
    timestamp: "01:04",
  },
  {
    id: 4,
    type: "coach",
    speaker: "מאמן שטח",
    text: "הלקוח הוביל אותך למחיר. ענית מתוך צורך להוכיח, לא מתוך שליטה.",
    timestamp: "01:06",
  },
  {
    id: 5,
    type: "user",
    speaker: "אתה",
    text: "אני מבין. בוא נדבר על הערך לפני המחיר...",
    timestamp: "01:18",
  },
  {
    id: 6,
    type: "prospect",
    speaker: "לקוח, קונה סמכותי",
    text: "תשלח לי פרטים. אני אחזור אליך.",
    timestamp: "01:42",
  },
  {
    id: 7,
    type: "analysis",
    speaker: "ניתוח פסיכולוגי",
    text: "איבדת שליטה בפריים ברגע שהתחלת להסביר. נשמעת לא בטוח, הלקוח הרגיש את זה.",
    timestamp: "01:44",
  },
];

export const COACH_FEEDBACK: CoachFeedback[] = [
  {
    id: 1,
    type: "critical",
    title: "איבוד פריים, מחיר",
    body: "הלקוח הוביל אותך למחיר. ענית מתוך צורך להוכיח את עצמך, לא מתוך סמכות.",
    time: "01:06",
  },
  {
    id: 2,
    type: "critical",
    title: "התנהגות ריאקטיבית",
    body: "איבדת שליטה ברגע שהתחלת להסביר. מי שמסביר, מגיב. מי שמוביל, שואל.",
    time: "01:18",
  },
  {
    id: 3,
    type: "warning",
    title: "ויתור על פריים",
    body: "הלקוח סגר אותך ב'תשלח פרטים'. לא ביקשת מחויבות, נתת לו בריחה.",
    time: "01:44",
  },
  {
    id: 4,
    type: "info",
    title: "טונality, ודאות",
    body: "נשמעת לא בטוחה כשהתחלת להסביר. האטה בקצב = חשיפת חולשה ללקוח.",
    time: "01:44",
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 1, label: "פתיחה, בדיקת סמכות", time: "00:00", type: "recovery" },
  {
    id: 2,
    label: "פריים: שאלת כאב",
    time: "00:28",
    type: "recovery",
    active: true,
  },
  { id: 3, label: "התנגדות, מחיר", time: "01:04", type: "objection" },
  { id: 4, label: "מאמן, איבוד פריים", time: "01:06", type: "coach" },
  { id: 5, label: "ירידת ודאות", time: "01:18", type: "drop" },
  { id: 6, label: "נכנעות, ריאקטיבי", time: "01:44", type: "drop" },
];

export interface CoachingInsight {
  id: number;
  category: string;
  insight: string;
  action: string;
  priority: "high" | "medium" | "low";
  time: string;
}

export const COACHING_INSIGHTS: CoachingInsight[] = [
  {
    id: 1,
    category: "שליטה בפריים",
    insight: "הלקוח העלה מחיר, אתה הגנת במקום להחזיר שליטה לשיחה",
    action: "אל תגן. שאל: 'מה העלות של לא לפתור את זה עכשיו?'",
    priority: "high",
    time: "01:06",
  },
  {
    id: 2,
    category: "שליטה רגשית",
    insight: "הלקוח ביקש 'תשלח פרטים', סימן שקנית התנהגות ריאקטיבית",
    action: "החזר סמכות: 'לפני שאשלח, מה חייב להיות בפתרון?'",
    priority: "high",
    time: "01:44",
  },
  {
    id: 3,
    category: "ניתוח סמכות",
    insight: "לא בדקת סמכות החלטה לפני הצעת מחיר, הלקוח לא היה מחויב",
    action: "בשיחה הבאה: גלה מי חותם ומה קритריון ההחלטה",
    priority: "medium",
    time: "01:50",
  },
  {
    id: 4,
    category: "רמת ודאות",
    insight: "נשמעת לא בטוחה כשהתחלת להסביר, טונality ירד ב 34%",
    action: "קצר. שאל. אל תמלא שקט בהסברים.",
    priority: "high",
    time: "01:18",
  },
];

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: "live" | "training" | "reviewing" | "idle";
  score: number;
  sessions: number;
  trend: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "דנה כהן",
    role: "מנהל/ת מכירות בכיר/ה",
    status: "live",
    score: 94,
    sessions: 12,
    trend: "+8",
  },
  {
    id: 2,
    name: "יוסי לוי",
    role: "נציג/ת מכירות",
    status: "training",
    score: 78,
    sessions: 8,
    trend: "+14",
  },
  {
    id: 3,
    name: "מיכל אברהם",
    role: "SDR",
    status: "reviewing",
    score: 86,
    sessions: 15,
    trend: "+6",
  },
  {
    id: 4,
    name: "אורי שפירא",
    role: "נציג/ת מכירות",
    status: "live",
    score: 91,
    sessions: 10,
    trend: "+11",
  },
  {
    id: 5,
    name: "נועה גולד",
    role: "ראש צוות",
    status: "reviewing",
    score: 97,
    sessions: 6,
    trend: "+3",
  },
  {
    id: 6,
    name: "עמית רוזן",
    role: "נציג/ת מכירות",
    status: "idle",
    score: 72,
    sessions: 4,
    trend: "+19",
  },
];

export interface ObjectionScenario {
  id: number;
  type: string;
  text: string;
  severity: "HIGH" | "MED" | "CRIT";
  analysis: string;
  suggestedResponse: string;
  scoreImpact: number;
  psychology: string;
}

export const OBJECTION_SCENARIOS: ObjectionScenario[] = [
  {
    id: 1,
    type: "מחיר",
    text: "זה נשמע יקר מדי כרגע",
    severity: "HIGH",
    analysis: "הלקוח בודק אם תיגע, לא באמת על מחיר. זו בדיקת פריים.",
    psychology: "בדיקת פריים, הלקוח מחפש מי מוביל את השיחה",
    suggestedResponse: "מובן. לפני מחיר, מה העלות של להמשיך עם הבעיה?",
    scoreImpact: -18,
  },
  {
    id: 2,
    type: "תזמון",
    text: "אנחנו לא מוכנים לקבל החלטה ברבעון הזה",
    severity: "MED",
    analysis: "התנגדות תזמון, לרוב מסווה חוסר conviction או חוסר ROI",
    psychology: "הימנעות, הלקוח בורח ממחויבות",
    suggestedResponse: "מה צריך לקרות כדי שזה יהיה עדיפות, לא רבעון הבא?",
    scoreImpact: -8,
  },
  {
    id: 3,
    type: "סמכות",
    text: "אני צריך להעביר את זה ל CEO לפני שממשיכים",
    severity: "HIGH",
    analysis: "בדיקת סמכות, האם אתה מדבר עם מקבל החלטות אמיתי?",
    psychology: "פער סמכות, אתה מאבד מינוף",
    suggestedResponse: "מעולה. מה ה CEO חייב לראה, ומה יהרוס את העסקה?",
    scoreImpact: -12,
  },
  {
    id: 4,
    type: "תחרות",
    text: "אנחנו כבר מדברים עם המתחרה שלכם",
    severity: "CRIT",
    analysis: "איום תחרותי, הלקוח בודק ודאות וconfidence שלך",
    psychology: "משחק דומיננטיות, אל תתפשר על פריים",
    suggestedResponse: "טוב שאתם בודקים. מה חסר לכם שם, שאנחנו חייבים לפתור?",
    scoreImpact: -22,
  },
];

export const BEHAVIOR_LABELS: Record<
  BehaviorMode,
  { label: string; labelHe: string; color: string }
> = {
  leading: { label: "מוביל", labelHe: "מוביל", color: "text-white/70" },
  neutral: { label: "ניטרלי", labelHe: "ניטרלי", color: "text-accent/80" },
  reactive: {
    label: "ריאקטיבי",
    labelHe: "ריאקטיבי",
    color: "text-red-400/80",
  },
};
