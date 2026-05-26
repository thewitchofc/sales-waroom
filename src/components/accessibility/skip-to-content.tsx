"use client";

import Link from "next/link";

export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:border focus:border-accent focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      דילוג לתוכן הראשי
    </Link>
  );
}
