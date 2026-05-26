"use client";

import { PageTransitionShell } from "@/components/layout/page-transition-shell";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransitionShell>{children}</PageTransitionShell>;
}
