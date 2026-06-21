"use client";

import { motion } from "framer-motion";
import type { SkillLevel } from "@/data/skills";

interface SkillBadgeProps {
  name: string;
  level: SkillLevel;
  index: number;
}

const levelDots: Record<SkillLevel, number> = {
  beginner: 1,
  learning: 2,
  intermediate: 3,
  advanced: 4,
};

const badgeStyle =
  "inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 text-sm font-medium";

export function SkillBadge({ name, level, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={badgeStyle}
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
