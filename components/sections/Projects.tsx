"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { StarField } from "@/components/ui/StarField";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-[var(--card-bg)] overflow-hidden">
      {/* ⭐ Star field */}
      <div className="absolute inset-0 z-0">
        <StarField count={60} minOpacity={0.03} maxOpacity={0.12} parallaxStrength={0.01} />
      </div>

      <div className="relative z-10 mx-auto w-full px-4">
        <SectionHeading
          title="Projects"
          subtitle="Some things I've built or am working on"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
