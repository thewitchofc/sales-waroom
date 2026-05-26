"use client";

import { useEffect, useState } from "react";

export function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemaining(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return remaining;
}

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const total = diff;

  return { days, hours, minutes, seconds, total, expired: total === 0 };
}

export function formatCountdown(r: ReturnType<typeof getRemaining>, compact = false) {
  if (r.expired) return compact ? "00:00:00" : "הסתיים";
  if (compact) {
    return `${pad(r.hours + r.days * 24)}:${pad(r.minutes)}:${pad(r.seconds)}`;
  }
  if (r.days > 0) return `${r.days}d ${pad(r.hours)}h ${pad(r.minutes)}m`;
  return `${pad(r.hours)}h ${pad(r.minutes)}m ${pad(r.seconds)}s`;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}
