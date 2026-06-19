"use client";

import Link from "next/link";
import { socials } from "@/data/socials";
import { siteConfig } from "@/data/site.config";
import { StarField } from "./StarField";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <StarField count={60} minOpacity={0.03} maxOpacity={0.12} parallaxStrength={0} />
      </div>

      <div className="relative z-10 mx-auto w-full px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>

          <p className="text-sm text-[var(--muted)]">
            Made by{" "}
            <span className="font-medium text-[var(--foreground)]">
              {siteConfig.name}
            </span>{" "}
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>

    </footer>
  );
}
