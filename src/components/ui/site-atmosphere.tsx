"use client";

/** Global fixed background — luxury tactical atmosphere on every page */
export function SiteAtmosphere() {
  return (
    <div className="site-atmosphere pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="site-atmosphere-base absolute inset-0" />
      <div className="site-atmosphere-grid absolute inset-0" />
      <div className="site-atmosphere-glow site-atmosphere-glow-a absolute rounded-full" />
      <div className="site-atmosphere-glow site-atmosphere-glow-b absolute rounded-full" />
      <div className="site-atmosphere-horizon absolute inset-x-0 bottom-0" />
      <div className="site-atmosphere-noise absolute inset-0" />
      <div className="site-atmosphere-vignette absolute inset-0" />
    </div>
  );
}
