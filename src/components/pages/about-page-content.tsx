"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { Waveform } from "@/components/ui/waveform";
import { fadeUp } from "@/components/ui/section";

const principles = [
  {
    num: "01",
    title: "לחץ לפני שטח",
    body: "אם אתה לא רגיל ללחץ בסימולציה, תקרוס בשיחה האמיתית.",
  },
  {
    num: "02",
    title: "AI שלא מרחם",
    body: "מאמן שמזהה חולשה לפני שהלקוח מרגיש אותה. לא משוב נחמד. משוב מדויק.",
  },
  {
    num: "03",
    title: "דירוג או דעיכה",
    body: "בהזירה אין מקום לאמצע. אתה עולה, או שאתה נעלם מהלוח.",
  },
  {
    num: "04",
    title: "מערכת הפעלה של 1% העליון",
    body: "לא טיפים. לא תסריטים. מערכת הפעלה שרצה בכל שיחה.",
  },
];

const failureReasons = [
  "מתאמנים על מידע, לא על לחץ.",
  "מחפשים ביטחון במקום ביצוע.",
  "נמנעים מהתנגדות עד שהיא מגיעה בשטח.",
  "לא מודדים. לא מתחרים. לא משתפרים.",
];

function ManifestoQuote({
  lines,
  accent,
  className = "",
}: {
  lines: string[];
  accent?: boolean;
  className?: string;
}) {
  return (
    <blockquote className={`manifesto-quote ${className}`}>
      {lines.map((line, i) => (
        <p
          key={line}
          className={
            i === 0 && accent
              ? "font-display text-2xl font-black leading-snug text-white sm:text-3xl md:text-4xl"
              : i === 0
                ? "font-display text-2xl font-black leading-snug text-white sm:text-3xl"
                : "mt-3 text-base leading-relaxed text-white/45 sm:text-lg"
          }
        >
          {line}
        </p>
      ))}
    </blockquote>
  );
}

function SectionAtmosphere({ variant = "default" }: { variant?: "default" | "arena" | "pressure" }) {
  const gradients = {
    default:
      "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(212,175,85,0.06) 0%, transparent 70%)",
    arena:
      "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(239,68,68,0.05) 0%, transparent 65%), radial-gradient(ellipse 40% 35% at 85% 40%, rgba(212,175,85,0.08) 0%, transparent 70%)",
    pressure:
      "radial-gradient(ellipse 55% 45% at 50% 80%, rgba(239,68,68,0.07) 0%, transparent 65%)",
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 command-grid opacity-[0.06]" />
      <div
        className="absolute inset-0"
        style={{ background: gradients[variant] }}
      />
      <div className="about-operator-ghost" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export function AboutPageContent() {
  return (
    <>
      {/* Manifesto hero */}
      <section className="relative min-h-[85vh] overflow-hidden border-b border-white/5 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <CinematicBackground intense />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 15% 70%, rgba(239,68,68,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-30">
          <Waveform bars={64} active intense className="h-16 w-full opacity-40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-6 font-brand text-[10px] tracking-[0.25em] text-accent"
              >
                מניפסט · SALES WAROOM
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
              >
                <span className="hero-headline-accent">לא בנינו עוד CRM.</span>
                <span className="mt-4 block text-white/90">בנינו שדה קרב.</span>
              </motion.h1>

              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-10 max-w-xl space-y-4 border-s-2 border-accent/40 ps-6"
              >
                <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                  רוב המוכרים מתאמנים על תסריטים.
                </p>
                <p className="font-display text-xl font-bold text-white sm:text-2xl">
                  אנחנו מאמנים תגובת מערכת עצבים.
                </p>
              </motion.div>
            </div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5"
            >
              <div className="manifesto-panel relative p-6 sm:p-8">
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-br" />
                <p className="font-brand text-[9px] tracking-[0.2em] text-accent/80">
                  סטטוס מפעיל
                </p>
                <p className="mt-4 font-display text-lg font-bold text-white">
                  מכירה היא לא מידע.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  היא הכשרת לחץ. כל שיחה היא עימות. כל התנגדות היא מבחן. כל סגירה היא
                  ניצחון או דעיכה.
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <span className="pressure-pulse size-2 rounded-full bg-red-500/80" />
                  <span className="font-brand text-[10px] text-white/40">
                    847 לוחמים פעילים · הזירה חיה
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative px-5 py-20 sm:px-8 sm:py-28 md:py-32 lg:px-12">
        <SectionAtmosphere />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <p className="font-brand text-[10px] tracking-[0.2em] text-accent">
                פילוסופיה
              </p>
              <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
                פילוסופיית
                <span className="mt-1 block text-accent/90">Sales Waroom</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8"
            >
              <ManifestoQuote
                accent
                lines={[
                  "Sales Waroom נולד מתוך תסכול.",
                  "כלים כלליים שלא מכינים אותך ללקוח עוין, לדדליין, או ל'תשלח לי פרטים'.",
                  "ראינו קלוזרים עם ידע מושלם שקרסו בשיחה אחת. ראינו צוותים עם CRM מלא ואפס לחץ.",
                  "הבנו: הבעיה לא בידע. הבעיה בהכנה.",
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative border-y border-white/5 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 metallic-texture opacity-50"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col gap-4 sm:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-brand text-[10px] tracking-[0.2em] text-accent">עקרונות</p>
              <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
                העקרונות
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/40 md:text-end">
              ארבעה חוקים. אין פשרות. אין קיצורי דרך.
            </p>
          </div>

          <div className="grid gap-px bg-white/5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="manifesto-principle-cell group relative bg-black p-8 sm:p-10"
              >
                <span className="font-brand text-[10px] text-accent/60">{p.num}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-white transition-colors group-hover:text-accent sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside The Arena */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionAtmosphere variant="arena" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-brand text-[10px] tracking-[0.2em] text-accent">הזירה</p>
              <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
                בתוך הזירה
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg">
                הזירה היא לא משחק. היא לחץ חברתי שמכריח אותך להשתפר.
                דירוגים חיים. עונות. אתגרים שבועיים. כל קלוזר רואה איפה הוא עומד.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "לוח דירוג שמפריד בין מפעילים לצופים",
                  "אתגר CFO שבועי, לחץ אמיתי, תוצאות מדידות",
                  "עונות שמאפסות ego ומחדשות מוטיבציה",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <span className="mt-1.5 size-1 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <BrandLink href="/arena" variant="command">
                  כניסה להזירה
                </BrandLink>
              </div>
            </div>

            <div className="manifesto-arena-panel relative aspect-[4/3] overflow-hidden border border-white/8">
              <div className="absolute inset-0 command-grid opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <Waveform bars={48} active intense className="mb-6 h-12 opacity-60" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-brand text-[9px] text-accent">דירוג שבועי</p>
                    <p className="font-display text-3xl font-black text-white">#7</p>
                  </div>
                  <div className="text-end">
                    <p className="font-brand text-[9px] text-red-400/80">לחץ</p>
                    <p className="font-display text-3xl font-black text-white">68</p>
                  </div>
                  <div className="text-end">
                    <p className="font-brand text-[9px] text-white/40">פעילים</p>
                    <p className="font-display text-3xl font-black text-accent">847</p>
                  </div>
                </div>
              </div>
              <div className="about-operator-ghost about-operator-ghost--arena" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* Why Closers Fail */}
      <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionAtmosphere variant="pressure" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <p className="font-brand text-[10px] tracking-[0.2em] text-red-400/80">
                ניתוח כשלון
              </p>
              <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
                למה קלוזרים
                <span className="mt-1 block gradient-text-danger">נכשלים</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/45">
                לא בגלל חוסר ידע. בגלל חוסר הכנה פסיכולוגית.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="space-y-0 border border-white/8">
                {failureReasons.map((reason, i) => (
                  <div
                    key={reason}
                    className="flex items-center gap-6 border-b border-white/5 px-6 py-5 last:border-b-0 sm:px-8 sm:py-6"
                  >
                    <span className="font-brand text-xs text-red-400/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-base font-semibold text-white/80 sm:text-lg">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pressure Creates Closers */}
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <CinematicBackground intense />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-20">
          <Waveform bars={80} active className="h-24 w-full" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-brand text-[10px] tracking-[0.25em] text-accent"
          >
            אמונה מרכזית
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-6 font-display text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl"
          >
            לחץ יוצר
            <span className="mt-2 block hero-headline-accent">קלוזרים</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg"
          >
            לא כל אחד נכנס ל-Warroom. רק מי שמוכן להיות נמדד, להיכשל בפומבי, ולחזור
            חזק יותר. זו לא פלטפורמה. זו תרבות.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <BrandLink href="/dashboard" variant="command" size="lg">
              הצטרפו לתנועה
              <svg className="size-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </BrandLink>
            <BrandLink href="/demo" variant="secondary" size="lg">
              צפו בדמו לפני כניסה
            </BrandLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
