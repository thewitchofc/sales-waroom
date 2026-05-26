"use client";

import { BrandLink } from "@/components/brand/brand-link";

const story = [
  "Sales Waroom נולדה מתוך כאב אמיתי שלי אחרי 5 שנים בעולם המכירות.",
  "במשך 3 שנים עבדתי במקום שבו הכסף באמת היה על הרצפה, וברגע שעברתי בין חברות ומוקדים הבנתי שרוב המקומות לא באמת יודעים להכשיר אנשי מכירות ברמה גבוהה. חלק מלמדים חצי כוח, חלק זורקים אנשים לקו בלי הכשרה בכלל, ורובם מצפים שתגיע עם כישורי מכירה \"מהבית\".",
  "אבל מכירות זאת לא מקריות. זאת פסיכולוגיה, טונציה, שליטה באנרגיה של השיחה והיכולת להבין מה באמת עומד מאחורי כל התנגדות של לקוח ולתת עליה מענה בשלוף. מתי להוביל, מתי ללחוץ, מתי לשתוק ומתי לגרום ללקוח להבין לבד.",
  "Sales Waroom נבנתה כדי לקחת אנשי מכירות לרמה שאף אחד לא מלמד באמת. אספתי שיטות, חשיבה וטכניקות מהמוחות הכי חזקים בעולם המכירות ובניתי מערכת אימון מבוססת AI שמדמה שיחות אמיתיות בלייב עם לקוחות קלים, לקוחות קשים, התנגדויות, לחץ ותגובות בזמן אמת.",
];

export function AboutPageContent() {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24">
      <p className="font-brand text-[10px] tracking-[0.15em] text-accent/70">אודות · SALES WAROOM</p>

      <div className="mt-6 space-y-5 text-base leading-[1.85] text-white/60 sm:text-lg">
        {story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <blockquote className="mt-10 border-s-2 border-accent/40 ps-5 text-base leading-[1.85] text-white/75 sm:text-lg">
        <p>זה לא עוד קורס. לא עוד סרטונים. ולא עוד תאוריות שאף אחד לא משתמש בהן בשטח.</p>
        <p className="mt-4 font-display font-bold text-white">
          זאת מערכת שנועדה להכין אנשי מכירות להגיע לקו מוכנים לטרוף אותו.
        </p>
      </blockquote>

      <p className="mt-10 font-display text-xl font-black leading-snug text-white sm:text-2xl">
        כי הכסף באמת נמצא על הרצפה.
        <span className="mt-2 block text-base font-normal text-white/50 sm:text-lg">
          רוב האנשים פשוט לא יודעים איך לקחת אותו.
        </span>
      </p>

      <p className="mt-8 text-sm leading-relaxed text-white/45 sm:text-base">
        כרגע אנחנו בישראל, אבל המטרה של Sales Waroom היא להפוך לסטנדרט החדש של הכשרת
        אנשי מכירות בעולם.
      </p>

      <footer className="mt-10 border-t border-white/[0.06] pt-10">
        <p className="text-base leading-[1.85] text-white/60 sm:text-lg">
          אנחנו ישראלים, הכרישים הכי גדולים במכירות בכל העולם — אבל בו־זמנית הלקוחות הכי
          קשים שיש בעולם, מלכי ההתמקחות והעקשנות.
        </p>
        <p className="mt-6 font-display text-2xl font-black text-accent sm:text-3xl">אין עלינו!</p>
        <p className="mt-6 text-sm leading-relaxed text-white/50 sm:text-base">
          מאחלת לכולכם השחזה נעימה.
          <br />
          מחכה לכם בזירה, אור.
        </p>
      </footer>

      <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-12 sm:flex-row">
        <BrandLink href="/demo" variant="command">
          צפו בדמו
        </BrandLink>
        <BrandLink href="/pricing" variant="secondary">
          חבילות ותמחור
        </BrandLink>
      </div>
    </article>
  );
}
