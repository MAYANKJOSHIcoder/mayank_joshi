"use client";

import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { StarField } from "@/components/ui/StarField";
import { siteConfig } from "@/data/site.config";

const ThreeScene = lazy(() => import("@/components/three/Scene"));

export function Hero() {
  const [isLight, setIsLight] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("light"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Defer 3D scene mount until after first paint / when idle
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => setSceneReady(true));
      return () => (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
    }
    const id = setTimeout(() => setSceneReady(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ⭐ Star field background */}
      <div className="absolute inset-0 z-0">
        <StarField
          count={isLight ? 60 : 150}
          minOpacity={isLight ? 0.01 : 0.06}
          maxOpacity={isLight ? 0.05 : 0.25}
          parallaxStrength={0.03}
        />
      </div>

      {/* 3D Background */}
      <div ref={containerRef} className="absolute inset-0 z-[1]" style={{ willChange: "transform" }}>
        {sceneReady && (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-transparent">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--foreground)] border-t-transparent" />
              </div>
            }
          >
            <ThreeScene />
          </Suspense>
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-[var(--background)]/60 to-[var(--background)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-sm font-medium tracking-[0.25em] uppercase mb-6 text-[var(--muted)]">
            ✦ Welcome to my universe
          </p>
          <h1 className="text-5xl font-extrabold sm:text-7xl lg:text-8xl tracking-tight">
            <span className="gradient-text">{siteConfig.name}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-lg text-[var(--muted)] sm:text-xl max-w-2xl mx-auto"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button
            variant="primary"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          <FaChevronDown className="h-6 w-6 text-[var(--muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
