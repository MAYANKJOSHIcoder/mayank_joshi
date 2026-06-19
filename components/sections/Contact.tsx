"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StarField } from "@/components/ui/StarField";
import { socials } from "@/data/socials";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const MAX_TEXTAREA_HEIGHT = 200;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
    el.style.height = newHeight + "px";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      // Reset textarea height after clearing
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/20";

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StarField count={80} minOpacity={0.03} maxOpacity={0.15} parallaxStrength={0.01} />
      </div>
      <div className="section-stars absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto w-full px-4">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a question or want to collaborate? Drop me a message!"
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4 max-w-xl mx-auto rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-sm text-[var(--muted)]">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm text-[var(--muted)]">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1 block text-sm text-[var(--muted)]">
              Message
            </label>
            <textarea
              ref={textareaRef}
              id="contact-message"
              required
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                autoResize();
              }}
              placeholder="Your message..."
              className={inputClass + " overflow-y-auto"}
              style={{ minHeight: 100, maxHeight: MAX_TEXTAREA_HEIGHT, resize: "none" }}
            />
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <FaCheckCircle /> Message sent successfully!
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <FaExclamationCircle /> Failed to send. Please try again.
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            <FaPaperPlane className="h-4 w-4" />
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center gap-6"
        >
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)] transition-all hover:border-[var(--foreground)] hover:text-[var(--foreground)] hover:scale-110"
                aria-label={social.name}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
