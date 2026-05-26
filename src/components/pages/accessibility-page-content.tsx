import Link from "next/link";
import { accessibilityStatement } from "@/config/accessibility";

export function AccessibilityPageContent() {
  const {
    lastUpdated,
    standard,
    coordinator,
    accessibleFeatures,
    knownLimitations,
  } = accessibilityStatement;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <header className="mb-12 border-b border-white/[0.06] pb-10">
        <p className="text-sm text-accent/70">Sales Waroom</p>
        <h1 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
          הצהרת נגישות
        </h1>
        <p className="mt-4 text-sm text-white/45">
          עודכן לאחרונה: {lastUpdated}
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-white/60">
        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-white/90">
            תפריט נגישות
          </h2>
          <p>
            בכל דף באתר מופיע כפתור נגישות צף (פינה שמאלית תחתונה). לחיצה עליו
            פותחת תפריט עם הגדרות: הגדלת/הקטנת טקסט, ניגודיות גבוהה, הדגשת
            קישורים, גופן קריא, ריווח שורות וביטול אנימציות. ההגדרות נשמרות בין
            ביקורים.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-white/90">
            מחויבות לנגישות
          </h2>
          <p>
            Sales Waroom מחויבת להנגיש את שירותיה לכלל המשתמשים, כולל אנשים עם
            מוגבלות. אנו פועלים לשיפור מתמשך של חוויית השימוש באתר ובמערכת.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-white/90">
            תקן נגישות
          </h2>
          <p>
            האתר נבנה בהתאם ל{standard}. ייתכנו אזורים שטרם הושלמה הנגשתם
            במלואה.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-white/90">
            התאמות שבוצעו
          </h2>
          <ul className="space-y-2">
            {accessibleFeatures.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent/60">·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-white/90">
            מגבלות ידועות
          </h2>
          <ul className="space-y-2">
            {knownLimitations.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-white/30">·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-white/90">
            פנייה בנושא נגישות
          </h2>
          <p className="mb-4">
            נתקלתם בבעיית נגישות? נשמח לעזור. ניתן לפנות אלינו:
          </p>
          <ul className="space-y-2 border border-white/[0.06] bg-white/[0.02] p-5">
            <li>
              <span className="text-white/40">שם: </span>
              {coordinator.name}
            </li>
            <li>
              <span className="text-white/40">טלפון: </span>
              <a
                href={`https://wa.me/${coordinator.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/80 underline-offset-2 hover:text-accent hover:underline"
                dir="ltr"
              >
                {coordinator.phone}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-white/45">
            נשתדל לטפל בפנייה ולחזור אליכם בהקדם האפשרי.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-white/90">
            דפדפנים ועזרים
          </h2>
          <p>
            האתר נבדק בדפדפנים מודרניים (Chrome, Safari, Firefox, Edge) ובשילוב
            עם תוכנות קורא מסך נפוצות. מומלץ להשתמש בגרסה עדכנית של הדפדפן.
          </p>
        </section>
      </div>

      <p className="mt-12 text-xs text-white/30">
        <Link href="/" className="hover:text-white/50">
          ← חזרה לדף הבית
        </Link>
      </p>
    </article>
  );
}
