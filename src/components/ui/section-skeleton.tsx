export function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse space-y-6 px-6 py-20 ${className}`}>
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="mx-auto h-3 w-32 bg-white/5" />
        <div className="mx-auto h-10 w-2/3 max-w-lg bg-white/5" />
        <div className="mx-auto h-4 w-1/2 max-w-md bg-white/5" />
        <div className="mt-12 h-64 border border-white/5 bg-white/[0.02]" />
      </div>
    </div>
  );
}
