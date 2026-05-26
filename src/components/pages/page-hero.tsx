interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  compact?: boolean;
}

export function PageHero({ label, title, description, compact = false }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-white/[0.04] pt-28 sm:pt-32 ${
        compact ? "pb-12 sm:pb-14" : "pb-16 sm:pb-20 md:pb-24"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <p className="mb-4 font-brand text-[10px] tracking-[0.15em] text-accent/70">
          {label}
        </p>
        <h1 className="max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
