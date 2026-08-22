"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/*
        reducedMotion="user" makes every Framer Motion animation respect the
        OS-level "reduce motion" setting — transforms and opacity are skipped
        and elements render at their target state immediately.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
