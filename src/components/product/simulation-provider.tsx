"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLiveDemo, type LiveDemoState } from "@/hooks/use-live-demo";

const SimulationContext = createContext<LiveDemoState | null>(null);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const demo = useLiveDemo();
  return (
    <SimulationContext.Provider value={demo}>{children}</SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error("useSimulation must be used within SimulationProvider");
  }
  return ctx;
}

export function useSimulationOptional() {
  return useContext(SimulationContext);
}
