"use client";

import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { AnimatePresence, motion } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Site always renders behind the splash */}
      {children}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[9999]"
            onAnimationComplete={() => setShowSplash(false)}
          >
            <SplashScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
