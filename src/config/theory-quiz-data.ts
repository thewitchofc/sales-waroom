export type TheoryQuizCategory =
  | "opening"
  | "objection"
  | "mistake"
  | "followup"
  | "frame"
  | "closing";

export interface TheoryQuizQuestion {
  id: string;
  category: TheoryQuizCategory;
  prompt: string;
  context?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const THEORY_QUIZ_CATEGORY_LABELS: Record<
  TheoryQuizCategory,
  { label: string; description: string }
> = {
  opening: {
    label: "פתיחת שיחה",
    description: "איך פותחים, מגדירים פריים, ומובילים מההתחלה",
  },
  objection: {
    label: "התנגדויות",
    description: "מחיר, זמן, \"תשלח לי פרטים\", ועוד",
  },
  mistake: {
    label: "זיהוי טעות",
    description: "מה לא לומר ולמה זה הורג את השיחה",
  },
  followup: {
    label: "מעקב",
    description: "איך לא מאבדים ליד חם אחרי \"אני צריך לחשוב\"",
  },
  frame: {
    label: "פריים וטון",
    description: "מי מוביל, מתי ללחוץ, מתי לשתוק",
  },
  closing: {
    label: "סגירה",
    description: "איך מגיעים להחלטה בלי לדחוף יותר מדי",
  },
};

export const THEORY_QUIZ_QUESTIONS: TheoryQuizQuestion[] = [
  {
    id: "open-01",
    category: "opening",
    prompt: "לקוח חדש ענה ב DM. מה הצעד הנכון לפני שמדברים על מחיר?",
    options: [
      "לשלוח מיד את המחיר ולחסוך זמן",
      "לשאול שאלה קצרה שמבהירה מה הוא מחפש",
      "לשלוח קישור לדף נחיתה ארוך",
      "לחכות שהוא יבקש שיחה בעצמו",
    ],
    correctIndex: 1,
    explanation:
      "קודם מבינים צורך. שאלה קצרה שומרת על פריים של שיחה, לא קטלוג.",
  },
  {
    id: "open-02",
    category: "opening",
    prompt: "איך נכון לפתוח שיחת מכירה טלפונית?",
    context: "הלקוח לא מכיר אותך.",
    options: [
      "\"שלום, יש לי הצעה מדהימה בשבילך\"",
      "\"שלום, רציתי לוודא שזה זמן נוח לשתי דקות\"",
      "\"שלום, אני חייב לספר לך על המבצע שלנו\"",
      "להתחיל ישר בהסבר על המוצר",
    ],
    correctIndex: 1,
    explanation:
      "מבקשים רשות קצרה. זה מוריד התנגדות ונותן לך פריים של מקצועיות.",
  },
  {
    id: "open-03",
    category: "opening",
    prompt: "לקוח שואל \"כמה זה עולה?\" בשנייה הראשונה. מה עושים?",
    options: [
      "עונים במספר מדויק מיד",
      "אומרים שזה תלוי וממשיכים בלי להסביר",
      "מחזירים שאלה: \"כדי לדייק, מה חשוב לך לפתור?\"",
      "מסבירים למה המחיר שלכם הוגן",
    ],
    correctIndex: 2,
    explanation:
      "מחיר מוקדם מדי בלי הקשר = התנגדות. קודם מגדירים ערך וצורך.",
  },
  {
    id: "obj-01",
    category: "objection",
    prompt: "הלקוח אומר: \"יוקר לי.\" מה התשובה הכי נכונה?",
    options: [
      "\"אבל אצלנו הכי טוב בשוק\"",
      "\"אני מבין. יקר ביחס למה?\"",
      "\"יש לנו הנחה אם תחליט היום\"",
      "\"אז אולי זה לא בשבילך\"",
    ],
    correctIndex: 1,
    explanation:
      "לא נלחמים במחיר. חוקרים: יקר לעומת מה? לפעמים זה תזמון, לא כסף.",
  },
  {
    id: "obj-02",
    category: "objection",
    prompt: "הלקוח אומר: \"תשלח לי פרטים במייל.\" מה עושים?",
    options: [
      "שולחים מיד ומסיימים",
      "שואלים: \"מה חשוב שיהיה במייל כדי שזה יעזור לך?\"",
      "מסרבים ואומרים שזה לא עובד ככה",
      "שולחים ומבקשים לחזור בעוד שבוע",
    ],
    correctIndex: 1,
    explanation:
      "\"שלח פרטים\" לרוב מסווה. שאלה אחת יכולה להשאיר אתכם בשיחה.",
  },
  {
    id: "obj-03",
    category: "objection",
    prompt: "הלקוח אומר: \"אני צריך לחשוב על זה.\" מה הצעד הבא?",
    options: [
      "להסביר שוב את כל היתרונות",
      "לשאול: \"על מה בדיוק אתה חושב?\"",
      "ללחוץ: \"המבצע נגמר היום\"",
      "לסיים בנימוס ולחכות",
    ],
    correctIndex: 1,
    explanation:
      "\"צריך לחשוב\" זה לא סוף. מבודדים את החשש האמיתי ואז מטפלים בו.",
  },
  {
    id: "obj-04",
    category: "objection",
    prompt: "הלקוח אומר: \"אין לי זמן עכשיו.\" מה הכי נכון?",
    options: [
      "\"אין בעיה, אז לא בשבילך\"",
      "\"רק דקה, זה חשוב\"",
      "\"מתי יותר נוח? נקבע 10 דקות ונעמוד בזה\"",
      "ממשיכים לדבר עד שהוא נשאר",
    ],
    correctIndex: 2,
    explanation:
      "מכבדים זמן וקובעים מסגרת קצרה. follow up מתוזמן שומר על הליד חם.",
  },
  {
    id: "mist-01",
    category: "mistake",
    prompt: "מה הטעות במשפט הזה?",
    context: "\"אני יודע שאתה עסוק, אבל תן לי רק דקה לספר לך על המוצר המדהים שלנו.\"",
    options: [
      "אמר \"מדהים\", זה לא מקצועי",
      "ביקש זמן ואז דיבר על עצמו, לא על הלקוח",
      "היה קצר מדי",
      "לא הזכיר מחיר",
    ],
    correctIndex: 1,
    explanation:
      "פתיחה טובה מתמקדת בלקוח. \"תן לי לספר\" = פריים של דוחר, לא של יועץ.",
  },
  {
    id: "mist-02",
    category: "mistake",
    prompt: "מה הטעות כאן?",
    context: "הלקוח אמר \"יוקר לי\" והנציג ענה: \"אבל אנחנו הכי זולים.\"",
    options: [
      "לא הזכיר הנחה",
      "התווכח במקום לחקור",
      "דיבר מהר מדי",
      "לא שלח הצעה בכתב",
    ],
    correctIndex: 1,
    explanation:
      "\"אבל\" יוצר מלחמה. במקום להוכיח, שואלים מה ההשוואה בראש של הלקוח.",
  },
  {
    id: "mist-03",
    category: "mistake",
    prompt: "מה הטעות במשפט?",
    context: "\"אני לא רוצה ללחוץ עליך, אבל...\" ואז 3 דקות של לחץ.",
    options: [
      "אמר \"לא רוצה ללחוץ\" ואז לחץ בכל זאת, זה שובר אמון",
      "דיבר יותר מדי",
      "לא סגר",
      "לא הזכיר תחרות",
    ],
    correctIndex: 0,
    explanation:
      "הלקוח שומע את הפעולה, לא את המילים. עקביות בפריים חשובה יותר מנימוס ריק.",
  },
  {
    id: "follow-01",
    category: "followup",
    prompt: "שיחה נגמרה בלי סגירה. כמה זמן מקסימום לחכות לפני follow up?",
    options: [
      "שבוע, שלא ירגישו לחץ",
      "48 שעות, הליד נשאר חם",
      "חודש, לתת מרחק",
      "רק אם הם חוזרים בעצמם",
    ],
    correctIndex: 1,
    explanation:
      "אחרי 48 שעות הליד מתקרר. מעקב קצר ואישי = טעימה מהשירות שיקבלו.",
  },
  {
    id: "follow-02",
    category: "followup",
    prompt: "מה הדרך הטובה ביותר לקבוע follow up?",
    options: [
      "לשלוח \"היי, מה נשמע?\" בלי הקשר",
      "לקבוע תאריך ושעה עוד על השיחה",
      "לשלוח קישור לתשלום",
      "לחכות שהם יגיבו לבד",
    ],
    correctIndex: 1,
    explanation:
      "סגירה זמנית = תאריך ביומן. כך follow up קורה בפועל, לא \"מתישהו\".",
  },
  {
    id: "frame-01",
    category: "frame",
    prompt: "הלקוח שותק אחרי שאלה שלכם. מה עושים?",
    options: [
      "ממלאים את השקט מיד בהסבר ארוך",
      "שותקים ונותנים לו לענות",
      "שואלים \"שומעים?\"",
      "מורידים מחיר",
    ],
    correctIndex: 1,
    explanation:
      "שקט לוחץ. מי שממלא אותו ראשון מאבד פריים. לפעמים השתיקה סוגרת.",
  },
  {
    id: "frame-02",
    category: "frame",
    prompt: "מתי נכון \"להוביל\" ולא \"להגיב\"?",
    options: [
      "כשהלקוח כועס",
      "כשהוא שואל שאלה כללית ואתם קובעים את כיוון השיחה",
      "תמיד, בלי יוצא מן הכלל",
      "רק בסוף השיחה",
    ],
    correctIndex: 1,
    explanation:
      "הובלה = מגדירים agenda. לא דומיננטיות, אלא כיוון ברור לשיחה.",
  },
  {
    id: "frame-03",
    category: "frame",
    prompt: "הלקוח מדבר מהר וקוטע. מה עוזר?",
    options: [
      "לדבר יותר מהר ממנו",
      "להוריד טון, לדבר לאט, ולהחזיר שאלה קצרה",
      "לסיים את השיחה",
      "לשלוח הצעה בכתב",
    ],
    correctIndex: 1,
    explanation:
      "טון-calm מוריד לחץ. שאלה קצרה מחזירה אתכם למרכז השיחה.",
  },
  {
    id: "close-01",
    category: "closing",
    prompt: "מתי הזמן הנכון לבקש החלטה?",
    options: [
      "בתחילת השיחה, \"כדי לא לבזבז זמן\"",
      "אחרי שהלקוח אמר בבירור מה חשוב לו ואיך זה פותר לו",
      "רק אחרי הנחה",
      "אף פעם, הם יחליטו לבד",
    ],
    correctIndex: 1,
    explanation:
      "סגירה = סיכום ערך + שאלת החלטה. לא לפני שיש alignment.",
  },
  {
    id: "close-02",
    category: "closing",
    prompt: "איזו שאלת סגירה הכי נכונה?",
    options: [
      "\"אז, מה אתה אומר?\"",
      "\"רוצה שנתקדם עם X או Y?\"",
      "\"למה אתה לא סוגר?\"",
      "\"יש לך כסף?\"",
    ],
    correctIndex: 1,
    explanation:
      "סגירה אלטרנטיבית מניחה החלטה ומציעה בחירה, לא כן/לא.",
  },
  {
    id: "close-03",
    category: "closing",
    prompt: "הלקוח אמר \"כן\" בעל פה אבל לא מתקדם. מה הצעד הבא?",
    options: [
      "לחגוג ולסיים",
      "לחדד: \"מעולה, נתחיל ב...\" עם צעד קונקרטי אחד",
      "לשלוח הצעה ולחכות",
      "להתקשר שוב בעוד חודש",
    ],
    correctIndex: 1,
    explanation:
      "\"כן\" רך לא סגירה. צעד קונקרטי אחד הופך החלטה לפעולה.",
  },
  {
    id: "open-04",
    category: "opening",
    prompt: "מה המטרה של 30 השניות הראשונות?",
    options: [
      "להסביר את כל המוצר",
      "לבנות אמון ולהבין אם שווה להמשיך",
      "לסגור מהר לפני שהם מתנתקים",
      "להזכיר את שם החברה 3 פעמים",
    ],
    correctIndex: 1,
    explanation:
      "התחלה = qualification + rapport. לא pitch מלא.",
  },
  {
    id: "obj-05",
    category: "objection",
    prompt: "הלקוח משווה למתחרה זול יותר. מה עושים?",
    options: [
      "מדברים רע על המתחרה",
      "שואלים: \"מה חשוב לך מעבר למחיר?\"",
      "מורידים מחיר מיד",
      "אומרים שהם לא באמת זולים",
    ],
    correctIndex: 1,
    explanation:
      "השוואת מחיר = הזדמנות להבין ערך. לא מלחמת מחירים.",
  },
];

export const THEORY_QUIZ_OPTION_LABELS = ["א", "ב", "ג", "ד"] as const;

export const THEORY_QUIZ_SESSION_SIZE = 10;

export function getQuestionsByCategory(
  category: TheoryQuizCategory | "all",
): TheoryQuizQuestion[] {
  if (category === "all") return THEORY_QUIZ_QUESTIONS;
  return THEORY_QUIZ_QUESTIONS.filter((q) => q.category === category);
}

export function shuffleQuestionOptions(
  question: TheoryQuizQuestion,
): TheoryQuizQuestion {
  const entries = question.options.map((text, index) => ({ text, index }));

  for (let i = entries.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }

  const newCorrectIndex = entries.findIndex(
    (entry) => entry.index === question.correctIndex,
  ) as 0 | 1 | 2 | 3;

  return {
    ...question,
    options: entries.map((entry) => entry.text) as [
      string,
      string,
      string,
      string,
    ],
    correctIndex: newCorrectIndex,
  };
}

export function shuffleQuestions(
  questions: TheoryQuizQuestion[],
): TheoryQuizQuestion[] {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
