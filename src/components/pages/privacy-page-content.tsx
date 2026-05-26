import Link from "next/link";
import { privacyPolicy } from "@/config/privacy";
import { accessibilityStatement } from "@/config/accessibility";

export function PrivacyPageContent() {
  const { lastUpdated, company, sections } = privacyPolicy;
  const { coordinator } = accessibilityStatement;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <header className="mb-12 border-b border-white/[0.06] pb-10">
        <p className="text-sm text-accent/70">{company}</p>
        <h1 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
          מדיניות פרטיות
        </h1>
        <p className="mt-4 text-sm text-white/45">
          עודכן לאחרונה: {lastUpdated}
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-white/60">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 font-display text-lg font-bold text-white/90">
              {section.title}
            </h2>
            {"body" in section && section.body && (
              <p>
                {section.title === "יצירת קשר" ? (
                  <>
                    {section.body}{" "}
                    <a
                      href={`https://wa.me/${coordinator.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent/80 underline-offset-2 hover:text-accent hover:underline"
                      dir="ltr"
                    >
                      {coordinator.phone}
                    </a>
                  </>
                ) : (
                  section.body
                )}
              </p>
            )}
            {"items" in section && section.items && (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent/60">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-12 text-xs text-white/30">
        <Link href="/" className="hover:text-white/50">
          ← חזרה לדף הבית
        </Link>
      </p>
    </article>
  );
}
