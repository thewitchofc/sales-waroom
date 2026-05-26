"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CinematicBackground({ intense: _intense = false }: { intense?: boolean }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      {!reduced && !isMobile && (
        <div
          className="absolute start-1/2 top-1/3 size-[min(80vw,640px)] -translate-x-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(212,175,85,0.04) 0%, transparent 65%)",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
    </div>
  );
}

export function ScanLine() {
  return null;
}

export function FloatingGlows() {
  return null;
}

export function SectionAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
    </div>
  );
}
