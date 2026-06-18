"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/data/experience";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex w-full md:w-[calc(50%-1rem)] ${
        isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[var(--foreground)] bg-[var(--background)] md:block" />

      {/* Card */}
      <div className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-colors hover:border-[var(--foreground)]/20">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{experience.title}</h3>
          <span className="text-sm text-[var(--muted)]">{experience.date}</span>
        </div>
        <p className="mb-3 text-sm font-medium text-[var(--muted)]">
          {experience.organization}
        </p>
        <p className="mb-4 text-sm text-[var(--muted)] leading-relaxed">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--card-border)] bg-white/5 light:bg-black/5 px-3 py-1 text-xs font-medium text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
