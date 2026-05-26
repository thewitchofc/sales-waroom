"use client";

import { PageTransitionShell } from "@/components/layout/page-transition-shell";

export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransitionShell>{children}</PageTransitionShell>;
}
