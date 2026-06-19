"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { StarField } from "@/components/ui/StarField";
import { siteConfig } from "@/data/site.config";

const ThreeScene = lazy(() => import("@/components/three/Scene"));

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ⭐ Star field background */}
      <div className="absolute inset-0 z-0">
        <StarField count={150} minOpacity={0.06} maxOpacity={0.25} parallaxStrength={0.03} />
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-[1]">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-transparent">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent light:border-black light:border-t-transparent" />
            </div>
          }
        >
          <ThreeScene />
        </Suspense>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-[var(--background)]/40 to-[var(--background)]" />

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
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="h-6 w-6 text-[var(--muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
