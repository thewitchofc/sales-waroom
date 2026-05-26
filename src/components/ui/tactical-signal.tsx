interface TacticalSignalProps {
  active?: boolean;
  intense?: boolean;
  className?: string;
}

/** Minimal signal bars — static telemetry only. */
export function TacticalSignalBars({
  active = true,
  intense = false,
  className = "",
}: TacticalSignalProps) {
  const heights = intense ? [35, 65, 50, 80, 45] : [25, 40, 30, 50, 35];

  return (
    <div className={`flex h-4 items-end gap-0.5 ${className}`} aria-hidden>
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-0.5 bg-accent/40"
          style={{ height: `${active ? h : h * 0.35}%`, opacity: active ? 0.7 : 0.25 }}
        />
      ))}
    </div>
  );
}

export function TacticalStatusChip({
  label,
  active = true,
  variant = "default",
}: {
  label: string;
  active?: boolean;
  variant?: "default" | "accent" | "danger";
}) {
  const colors = {
    default: "border-white/8 text-white/45",
    accent: "border-accent/15 text-accent/70",
    danger: "border-red-500/15 text-red-400/70",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border bg-black/30 px-2 py-1 font-brand text-[8px] tracking-wide ${colors[variant]}`}
    >
      <span
        className={`size-1 rounded-full ${
          active
            ? variant === "danger"
              ? "bg-red-500/80"
              : "bg-accent/70"
            : "bg-white/20"
        }`}
      />
      {label}
    </span>
  );
}

export function TacticalScanLine({ className = "" }: { className?: string }) {
  return <div className={`h-px bg-white/[0.06] ${className}`} />;
}
