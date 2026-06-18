"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-colors hover:border-[var(--foreground)]/20"
    >
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-white text-black px-3 py-1 text-xs font-semibold light:bg-black light:text-white">
          <FaStar className="h-3 w-3" />
          Featured
        </div>
      )}

      <div className="relative h-48 w-full overflow-hidden bg-[var(--card-border)]">
        <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
          <span className="text-sm">Project Screenshot</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="flex-1 text-sm text-[var(--muted)] leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--card-border)] bg-white/5 light:bg-black/5 px-3 py-1 text-xs font-medium text-[var(--muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <FaGithub /> Code
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <FaExternalLinkAlt /> Live
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
