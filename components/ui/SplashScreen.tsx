"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface Star {
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export function SplashScreen() {
  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        width: Math.random() * 2 + 1,
        height: Math.random() * 2 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]">
      {/* Starfield background on splash */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[var(--foreground)]"
            style={{
              width: star.width,
              height: star.height,
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <motion.div
          className="text-7xl font-bold gradient-text"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          MJ
        </motion.div>
        <motion.div
          className="h-0.5 w-28 rounded-full bg-[var(--foreground)] opacity-40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.p
          className="text-sm text-[var(--muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
