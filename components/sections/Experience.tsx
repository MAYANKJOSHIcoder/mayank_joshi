"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { StarField } from "@/components/ui/StarField";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-[var(--section-bg)] overflow-hidden">
      {/* ⭐ Star field */}
      <div className="absolute inset-0 z-0">
        <StarField count={50} minOpacity={0.03} maxOpacity={0.1} parallaxStrength={0.01} />
      </div>

      <div className="relative z-10 mx-auto w-full px-4">
        <SectionHeading
          title="Experience"
          subtitle="My journey in tech and education"
        />

        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--foreground)]/20 to-[var(--foreground)]/5 hidden md:block" />

          {experiences.map((exp, index) => (
            <TimelineItem key={exp.title} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
