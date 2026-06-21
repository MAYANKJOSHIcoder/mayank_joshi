"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotifyNowPlaying } from "@/components/ui/SpotifyNowPlaying";
import { StarField } from "@/components/ui/StarField";
import { siteConfig } from "@/data/site.config";
import { CubeMascot } from "@/components/ui/CubeMascot";
import { FaMapMarkerAlt, FaGraduationCap, FaBrain, FaGamepad } from "react-icons/fa";

const quickFacts = [
  { icon: FaMapMarkerAlt, label: "Location", value: siteConfig.location },
  { icon: FaGraduationCap, label: "College", value: siteConfig.college },
  { icon: FaBrain, label: "Focus", value: "AI / Machine Learning" },
  { icon: FaGamepad, label: "Hobbies", value: "Gaming & Photography" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden bg-[var(--background)]">
      <div className="absolute inset-0 z-0">
        <StarField count={80} minOpacity={0.03} maxOpacity={0.15} parallaxStrength={0.01} />
      </div>
      <div className="relative z-10 mx-auto w-full px-4">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and what I'm passionate about"
        />

        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div
              className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]
                         w-[340px] h-[340px] max-md:w-[280px] max-md:h-[280px]
                         flex items-center justify-center
                         shadow-lg"
            >
              <CubeMascot size={240} accentColor="#6ee7b7" interactive />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Hey, I&apos;m <span className="font-semibold text-[var(--foreground)]">Mayank</span>! 👋
            </p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              I&apos;m a {siteConfig.course} student at {siteConfig.college} with a deep passion for
              Artificial Intelligence and Machine Learning. I love building things that live on the
              internet, exploring new technologies, and turning ideas into reality.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              When I&apos;m not coding, you&apos;ll find me gaming, capturing moments through photography,
              or experimenting with the latest AI tools and frameworks.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-[var(--muted)] shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--muted)]">{fact.label}</p>
                      <p className="text-sm font-medium">{fact.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <SpotifyNowPlaying />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
