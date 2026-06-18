"use client";

import Link from "next/link";
import { FaArrowUp, FaHeart } from "react-icons/fa";
import { socials } from "@/data/socials";
import { siteConfig } from "@/data/site.config";
import { VisitorCounter } from "./VisitorCounter";
import { StarField } from "./StarField";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <StarField count={60} minOpacity={0.03} maxOpacity={0.12} parallaxStrength={0} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
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

          <VisitorCounter />

          <p className="text-sm text-[var(--muted)] flex items-center gap-1.5">
            Made with <FaHeart className="h-3.5 w-3.5 text-red-500" /> by{" "}
            <span className="font-medium text-[var(--foreground)]">
              {siteConfig.name}
            </span>{" "}
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute -top-5 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black light:bg-black light:text-white shadow-lg transition-all hover:scale-110 border border-[var(--card-border)]"
        aria-label="Back to top"
      >
        <FaArrowUp className="h-4 w-4" />
      </button>
    </footer>
  );
}
