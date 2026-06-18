"use client";

import { motion } from "framer-motion";
import type { SkillLevel } from "@/data/skills";

interface SkillBadgeProps {
  name: string;
  level: SkillLevel;
  index: number;
}

const levelColors: Record<SkillLevel, string> = {
  beginner: "bg-white/5 text-[var(--muted)] border-white/10 light:bg-black/5 light:border-black/10 light:text-[var(--muted)]",
  learning: "bg-white/8 text-[var(--foreground)] border-white/15 light:bg-black/8 light:border-black/15",
  intermediate: "bg-white/10 text-[var(--foreground)] border-white/20 light:bg-black/10 light:border-black/20",
  advanced: "bg-white/15 text-[var(--foreground)] border-white/25 light:bg-black/15 light:border-black/25 font-semibold",
};

const levelDots: Record<SkillLevel, number> = {
  beginner: 1,
  learning: 2,
  intermediate: 3,
  advanced: 4,
};

export function SkillBadge({ name, level, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${levelColors[level]}`}
    >
      <span>{name}</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i < levelDots[level] ? "bg-current" : "bg-current/20"
            }`}
          />
        ))}
      </span>
    </motion.div>
  );
}
