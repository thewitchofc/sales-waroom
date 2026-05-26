"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CinematicBackground({ intense = false }: { intense?: boolean }) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const showExtras = !reduced && !isMobile && intense;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 command-grid opacity-[0.12]" />
      {!reduced && (
        <>
          <div
            className="absolute start-1/2 top-1/3 size-[min(80vw,640px)] -translate-x-1/2 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,85,0.06) 0%, transparent 65%)",
            }}
          />
          {intense && (
            <>
              <div
                className="absolute end-0 top-1/4 size-[min(50vw,420px)] rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,85,0.1) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute start-0 bottom-1/4 size-[min(40vw,320px)] rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
                }}
              />
            </>
          )}
        </>
      )}
      {showExtras && <HorizonGlow subtle />}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      <div className="absolute inset-0 vignette opacity-50" />
    </div>
  );
}

function HorizonGlow({ subtle }: { subtle?: boolean }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 h-[30%]"
      style={{
        background: subtle
          ? "linear-gradient(to top, rgba(212,175,85,0.04) 0%, transparent 100%)"
          : "linear-gradient(to top, rgba(212,175,85,0.06) 0%, transparent 100%)",
      }}
    />
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
    </div>
  );
}
