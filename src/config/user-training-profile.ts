export type TrainingExperienceLevel = "beginner" | "intermediate" | "advanced";

export type TrainingSaleType =
  | "b2c_phone"
  | "b2b_meeting"
  | "inbound"
  | "outbound"
  | "high_ticket";

export type TrainingIndustry =
  | "general"
  | "insurance"
  | "websites"
  | "real_estate"
  | "coaching"
  | "saas"
  | "fitness";

export type TrainingWeakness =
  | "authority"
  | "pricing"
  | "qualification"
  | "follow_up"
  | "objections"
  | "urgency"
  | "emotional_control";

export interface UserTrainingProfile {
  industry: TrainingIndustry;
  experienceLevel: TrainingExperienceLevel;
  saleType: TrainingSaleType;
  weaknesses: TrainingWeakness[];
}

export const DEFAULT_USER_TRAINING_PROFILE: UserTrainingProfile = {
  industry: "general",
  experienceLevel: "intermediate",
  saleType: "b2c_phone",
  weaknesses: [],
};

export const TRAINING_INDUSTRY_OPTIONS: Record<
  TrainingIndustry,
  { label: string; buyerMindset: string; objections: string[] }
> = {
  general: {
    label: "כללי",
    buyerMindset: "קונה ישראלי סקפטי שלא אוהב להרגיש שנמכר לו.",
    objections: ["יקר לי", "אני צריך לחשוב", "תשלחי פרטים", "ראיתי זול יותר"],
  },
  insurance: {
    label: "ביטוחים",
    buyerMindset:
      "חושב שביטוח זה שוד, לא מאמין לסוכנים, מושוו לחברים ולפוליסות ישנות.",
    objections: [
      "יש לי כבר סוכן",
      "המחירים מנופחים",
      "אני בטוח שאפשר לקבל הנחה",
      "אחרי החגים נדבר",
      "מה יש לכם שאין לאחרים",
    ],
  },
  websites: {
    label: "אתרים / דיגיטל",
    buyerMindset:
      "חושב שאפשר לבנות לבד בוויקס, לא מבין למה לשלם, רוצה תוצאות מיידיות.",
    objections: [
      "חבר עושה לי בחינם",
      "ראיתי בפiverr בחצי מחיר",
      "אין לי תקציב לזה",
      "תשלחי הצעה במייל",
      "מה זה נותן לי בפועל",
    ],
  },
  real_estate: {
    label: 'נדל"ן',
    buyerMindset: "מפחד מטעות יקרה, לא סומך על מתווכים, משווה כל הצעה.",
    objections: [
      "אני רק מסתכל",
      "המחירים מטורפים",
      "יש לי חבר מתווך",
      "נדבר כשיהיה לי מימון",
      "למה אני צריך אתכם בכלל",
    ],
  },
  coaching: {
    label: "קורסים / אימון",
    buyerMindset:
      "שומע הרבה הבטחות ריקות, חושב שיוטיוב מספיק, מפחד להשקיע בעצמו.",
    objections: [
      "אין לי כסף לזה",
      "אני אעשה לבד",
      "שמעתי את זה כבר",
      "תשלחי תוכנית",
      "מה אם זה לא יעבוד",
    ],
  },
  saas: {
    label: "SaaS / B2B",
    buyerMindset:
      "צריך אישור מנהל, משווה features, רוצה POC, לא אוהב commitment.",
    objections: [
      "יש לנו כבר מערכת",
      "תשלחו deck",
      "אין תקציב השנה",
      "צריך IT לאשר",
      "מה ההבדל מול המתחרה",
    ],
  },
  fitness: {
    label: "כושר / בריאות",
    buyerMindset:
      "נכשל בעבר, לא מאמין שזה יחזיק, משווה מחיר חדר כושר.",
    objections: [
      "אין לי זמן",
      "יקר מדי",
      "אני אתחיל אחרי החגים",
      "ניסיתי הכל",
      "מה אם אני לא מתמיד",
    ],
  },
};

export const TRAINING_SALE_TYPE_OPTIONS: Record<
  TrainingSaleType,
  { label: string; callContext: string }
> = {
  b2c_phone: {
    label: "B2C טלפוני",
    callContext: "שיחת טלפון פתאומית או שענית בלי ציפייה למכירה.",
  },
  b2b_meeting: {
    label: "B2B פגישה",
    callContext: "פגישת Zoom או פרונטלית — יש לך לוח זמנים צפוף.",
  },
  inbound: {
    label: "Inbound",
    callContext: "השארת פרטים בעבר — אבל כבר לא בטוח שאתה רוצה את זה.",
  },
  outbound: {
    label: "Outbound",
    callContext: "שיחה יוזמת שלא ביקשת. אתה על הגנתי מהשנייה הראשונה.",
  },
  high_ticket: {
    label: "High ticket",
    callContext: "השקעה גבוהה — כל טעות מרגישה יקרה, אתה בודק מי מדבר אליך.",
  },
};

export const TRAINING_EXPERIENCE_OPTIONS: Record<
  TrainingExperienceLevel,
  { label: string; difficultyHint: string }
> = {
  beginner: {
    label: "מתחיל/ה",
    difficultyHint: "לקוחות פשוטים יותר — עדיין קשים, לא מניפולטיביים.",
  },
  intermediate: {
    label: "בינוני",
    difficultyHint: "לקוחות ריאליים עם התנגדויות ולחץ.",
  },
  advanced: {
    label: "מתקדם/ת",
    difficultyHint: "לקוחות חדים, לחוצים, מניפולטיביים וציניים.",
  },
};

export const TRAINING_WEAKNESS_OPTIONS: Record<
  TrainingWeakness,
  { label: string; coachFocus: string }
> = {
  authority: {
    label: "סמכות",
    coachFocus: "העדפת נוחות על פני פריים ומובנה.",
  },
  pricing: {
    label: "מחיר",
    coachFocus: "הצדקות מחיר, הנחות מפחד, קיפול מול 'יקר'.",
  },
  qualification: {
    label: "העמקה",
    coachFocus: "דילוג על שאלות לפני pitch.",
  },
  follow_up: {
    label: "מעקב",
    coachFocus: "מעקב נואש, 'רק בודק', בקשת רשות.",
  },
  objections: {
    label: "התנגדויות",
    coachFocus: "הגנה במקום חקירה.",
  },
  urgency: {
    label: "דחיפות",
    coachFocus: "קבלת 'אחרי החגים' בלי חקירה.",
  },
  emotional_control: {
    label: "שליטה רגשית",
    coachFocus: "תגובה רגשית ללחץ או עצבנות.",
  },
};

export function sanitizeUserTrainingProfile(
  input: unknown,
): UserTrainingProfile {
  if (!input || typeof input !== "object") {
    return { ...DEFAULT_USER_TRAINING_PROFILE };
  }

  const raw = input as Partial<UserTrainingProfile>;
  const industry = raw.industry;
  const experienceLevel = raw.experienceLevel;
  const saleType = raw.saleType;
  const weaknesses = raw.weaknesses;

  return {
    industry:
      industry && industry in TRAINING_INDUSTRY_OPTIONS
        ? industry
        : DEFAULT_USER_TRAINING_PROFILE.industry,
    experienceLevel:
      experienceLevel && experienceLevel in TRAINING_EXPERIENCE_OPTIONS
        ? experienceLevel
        : DEFAULT_USER_TRAINING_PROFILE.experienceLevel,
    saleType:
      saleType && saleType in TRAINING_SALE_TYPE_OPTIONS
        ? saleType
        : DEFAULT_USER_TRAINING_PROFILE.saleType,
    weaknesses: Array.isArray(weaknesses)
      ? weaknesses.filter(
          (item): item is TrainingWeakness =>
            typeof item === "string" && item in TRAINING_WEAKNESS_OPTIONS,
        )
      : [],
  };
}
