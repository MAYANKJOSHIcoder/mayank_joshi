"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, light }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn("mb-12 text-center relative z-10", className)}
    >
      <h2 className={cn(
        "text-3xl font-bold sm:text-4xl",
        light ? "text-white" : ""
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-3 max-w-2xl mx-auto",
          light ? "text-white/70" : "text-[var(--muted)]"
        )}>
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[var(--foreground)] opacity-30" />
    </motion.div>
  );
}
