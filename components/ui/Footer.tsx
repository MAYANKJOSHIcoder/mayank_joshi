"use client";

import Link from "next/link";
import { socials } from "@/data/socials";
import { siteConfig } from "@/data/site.config";
import { FaArrowUp } from "react-icons/fa6";
import { StarField } from "./StarField";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[32px] border-t border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm">
      <div className="absolute inset-0 opacity-30">
        <StarField
          count={60}
          minOpacity={0.03}
          maxOpacity={0.12}
          parallaxStrength={0}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-[2.4fr_0.8fr_auto] md:gap-12 md:items-center">
          {/* Brand */}
          <div className="order-1 md:order-1">
            <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
              {siteConfig.name}
            </h3>

            <p className="mt-5 max-w-md text-base text-[var(--muted)]">
              Full Stack Developer, Security Researcher and Engineering Student.
            </p>

            <div className="mt-6 flex gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--foreground)]"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="order-2 ml-auto text-right md:order-2 md:ml-0">
            <h4 className="mb-4 font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Go To Top */}
          <div className="order-3 ml-auto flex justify-end md:order-3 md:ml-0 md:self-auto">
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--background)] transition-all hover:-translate-y-1 hover:border-[var(--foreground)]"
              aria-label="Go to top"
            >
              <FaArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--card-border)] pt-8 text-center text-sm text-[var(--muted)]">
          Made by{" "}
          <span className="font-semibold text-[var(--foreground)]">
            {siteConfig.name}
          </span>{" "}
          &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
