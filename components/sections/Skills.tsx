"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { GitHubGraph } from "@/components/ui/GitHubGraph";
import { StarField } from "@/components/ui/StarField";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* ⭐ Star field */}
      <div className="absolute inset-0 z-0">
        <StarField count={80} minOpacity={0.03} maxOpacity={0.15} parallaxStrength={0.01} />
      </div>

      <div className="section-stars absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with"
        />

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-[var(--muted)]">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-lg font-semibold text-[var(--muted)] text-center">
            GitHub Stats
          </h3>
          <GitHubGraph />
        </div>
      </div>
    </section>
  );
}
