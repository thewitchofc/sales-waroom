import { BrandLink } from "@/components/brand/brand-link";

export function FinalCTA() {
  return (
    <section className="border-t border-white/[0.04] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
          מוכנים להיכנס?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/45 sm:text-base">
          התחילו מהדמו אם אתם לא בטוחים. כניסה למערכת. כשאתם מוכנים להימדד.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <BrandLink
            href="/demo"
            variant="command"
            size="lg"
            className="justify-center"
          >
            צפו בדמו
          </BrandLink>
          <BrandLink
            href="/dashboard"
            variant="secondary"
            size="lg"
            className="justify-center"
          >
            כניסה למערכת
          </BrandLink>
        </div>

        <p className="mt-4 text-[11px] text-white/35">
          14 יום ניסיון, ללא כרטיס אשראי
        </p>
      </div>
    </section>
  );
}
