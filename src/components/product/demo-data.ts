export type MessageType = "prospect" | "user" | "coach" | "analysis";

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

export const DEMO_TRANSCRIPT: TranscriptMessage[] = [
  {
    id: 1,
    type: "prospect",
    speaker: "לקוח",
    text: "שלום, אני רוצה להבין מה הפתרון שלכם נותן לנו",
    timestamp: "00:12",
  },
  {
    id: 2,
    type: "user",
    speaker: "אתה",
    text: "בטח. לפני שאני מסביר — מה הכי כואב לכם היום בתהליך המכירה?",
    timestamp: "00:28",
  },
  {
    id: 3,
    type: "prospect",
    speaker: "לקוח",
    text: "זה נשמע יקר מדי כרגע",
    timestamp: "01:04",
  },
  {
    id: 4,
    type: "coach",
    speaker: "AI Coach",
    text: "היית צריך לשאול שאלת כאב במקום להגן על המחיר",
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
    speaker: "לקוח",
    text: "תשלח לי פרטים",
    timestamp: "01:42",
  },
  {
    id: 7,
    type: "analysis",
    speaker: "AI Analysis",
    text: "איבדת שליטה בפריים של השיחה",
    timestamp: "01:44",
  },
];

export const COACH_FEEDBACK: CoachFeedback[] = [
  {
    id: 1,
    type: "critical",
    title: "הגנה על מחיר",
    body: "התגובה שלך הפעילה מצב הגנה. חזור לשאלת כאב.",
    time: "01:06",
  },
  {
    id: 2,
    type: "warning",
    title: "איבוד פריים",
    body: "הלקוח הוביל את השיחה. אתה עוקב במקום לכוון.",
    time: "01:44",
  },
  {
    id: 3,
    type: "info",
    title: "הזדמנות שהוחמצה",
    body: "לא חקרת תקציב לפני הצגת מחיר. סיכון גבוה.",
    time: "01:50",
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 1, label: "פתיחת שיחה", time: "00:00", type: "recovery" },
  { id: 2, label: "שאלת גילוי", time: "00:28", type: "recovery", active: true },
  { id: 3, label: "התנגדות: מחיר", time: "01:04", type: "objection" },
  { id: 4, label: "משוב AI Coach", time: "01:06", type: "coach" },
  { id: 5, label: "ירידה בביטחון", time: "01:18", type: "drop" },
  { id: 6, label: "איבוד שליטה", time: "01:44", type: "drop" },
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
    category: "טיפול במחיר",
    insight: "הלקוח העלה התנגדות מחיר — אתה הגנת במקום לחקור כאב",
    action: "שאל: 'מה העלות של לא לפתור את הבעיה הזו?'",
    priority: "high",
    time: "01:06",
  },
  {
    id: 2,
    category: "שליטה בפריים",
    insight: "הלקוח ביקש 'תשלח פרטים' — סימן לאיבוד שליטה",
    action: "החזר שליטה: 'לפני שאשלח — מה חשוב שיהיה בפתרון?'",
    priority: "high",
    time: "01:44",
  },
  {
    id: 3,
    category: "גילוי תקציב",
    insight: "לא נחקר תקציב לפני הצגת מחיר — סיכון גבוה לעסקה",
    action: "בשיחה הבאה: גלה תקציב לפני שלב ההצעה",
    priority: "medium",
    time: "01:50",
  },
  {
    id: 4,
    category: "טון דיבור",
    insight: "זוהה האטה בקצב דיבור ב-01:18 — סימן לחוסר ביטחון",
    action: "שמור על קצב יציב ושאל שאלות קצרות",
    priority: "low",
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
  { id: 1, name: "דנה כהן", role: "Senior AE", status: "live", score: 94, sessions: 12, trend: "+8" },
  { id: 2, name: "יוסי לוי", role: "AE", status: "training", score: 78, sessions: 8, trend: "+14" },
  { id: 3, name: "מיכל אברהם", role: "SDR", status: "reviewing", score: 86, sessions: 15, trend: "+6" },
  { id: 4, name: "אורי שפירא", role: "AE", status: "live", score: 91, sessions: 10, trend: "+11" },
  { id: 5, name: "נועה גולד", role: "Team Lead", status: "reviewing", score: 97, sessions: 6, trend: "+3" },
  { id: 6, name: "עמית רוזן", role: "AE", status: "idle", score: 72, sessions: 4, trend: "+19" },
];

export interface ObjectionScenario {
  id: number;
  type: string;
  text: string;
  severity: "HIGH" | "MED" | "CRIT";
  analysis: string;
  suggestedResponse: string;
  scoreImpact: number;
}

export const OBJECTION_SCENARIOS: ObjectionScenario[] = [
  {
    id: 1,
    type: "מחיר",
    text: "זה נשמע יקר מדי כרגע",
    severity: "HIGH",
    analysis: "התנגדות מחיר מוקדמת — סימן שלא נבנה ערך מספיק לפני הצעת מחיר",
    suggestedResponse: "אני מבין. לפני שנדבר על מחיר — מה העלות של להמשיך עם הבעיה?",
    scoreImpact: -18,
  },
  {
    id: 2,
    type: "תזמון",
    text: "אנחנו לא מוכנים לקבל החלטה ברבעון הזה",
    severity: "MED",
    analysis: "התנגדות תזמון — לרוב מסווה חוסר עדיפות או חוסר ROI",
    suggestedResponse: "מה צריך לקרות כדי שזה יהיה עדיפות ברבעון הבא?",
    scoreImpact: -8,
  },
  {
    id: 3,
    type: "סמכות",
    text: "אני צריך להעביר את זה ל-CEO לפני שממשיכים",
    severity: "HIGH",
    analysis: "התנגדות סמכות — לא זוהה decision maker אמיתי",
    suggestedResponse: "מעולה. מה חשוב שה-CEO יראה כדי לאשר?",
    scoreImpact: -12,
  },
  {
    id: 4,
    type: "תחרות",
    text: "אנחנו כבר מדברים עם המתחרה שלכם",
    severity: "CRIT",
    analysis: "איום תחרותי — דורש differentiation מיידי",
    suggestedResponse: "מצוין שאתם בודקים. מה חסר לכם בפתרון הנוכחי?",
    scoreImpact: -22,
  },
];
