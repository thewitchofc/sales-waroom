import Link from "next/link";
import { productRoutes } from "@/config/navigation";

export function ProductPreviewGrid() {
  return (
    <section className="border-t border-white/[0.04] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center font-display text-2xl font-black text-white sm:text-3xl">
          לאן ללכת?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/45">
          שלוש אפשרויות. אם אתם לא בטוחים. התחילו מהדמו.
        </p>

        <div className="mt-10 space-y-3">
          {productRoutes.map((route, i) => (
            <Link
              key={route.href}
              href={route.href}
              className={`block border p-5 transition-colors hover:border-white/12 sm:p-6 ${
                i === 0
                  ? "border-accent/20 bg-accent/[0.03]"
                  : "border-white/[0.06] bg-white/[0.01]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-white/35">{route.label}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">
                    {route.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/45">
                    {route.description}
                  </p>
                </div>
                <span className="shrink-0 text-accent/60">←</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
