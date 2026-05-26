interface PageGuideProps {
  title: string;
  children: React.ReactNode;
}

/** הסבר קצר בראש דף. מה קורה כאן */
export function PageGuide({ title, children }: PageGuideProps) {
  return (
    <div className="mb-8 max-w-2xl border-s-2 border-accent/30 ps-4 sm:mb-10">
      <p className="text-sm font-medium text-white/85">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-white/45">{children}</p>
    </div>
  );
}
