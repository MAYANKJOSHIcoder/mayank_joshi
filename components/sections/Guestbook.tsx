"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarField } from "@/components/ui/StarField";
import { FaBook, FaPaperPlane, FaUser, FaClock } from "react-icons/fa";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => setEntries(data.entries || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please fill in both name and message");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!res.ok) throw new Error("Failed to post");

      const data = await res.json();
      setEntries([data.entry, ...entries]);
      setName("");
      setMessage("");
    } catch {
      setError("Failed to post message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)]/40 focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/20";

  return (
    <section id="guestbook" className="relative py-24 bg-[var(--card-bg)] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StarField count={50} minOpacity={0.03} maxOpacity={0.1} parallaxStrength={0.01} />
      </div>
      <div className="section-stars absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <SectionHeading
          title="Guestbook"
          subtitle="Leave a message for me!"
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mb-12 space-y-4 rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-6"
        >
          <div>
            <label htmlFor="guestbook-name" className="mb-1 block text-sm text-[var(--muted)]">
              Name
            </label>
            <input
              id="guestbook-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="guestbook-message" className="mb-1 block text-sm text-[var(--muted)]">
              Message
            </label>
            <textarea
              id="guestbook-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something nice..."
              rows={3}
              maxLength={500}
              className={inputClass + " resize-none"}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black light:bg-black light:text-white px-6 py-2.5 text-sm font-medium transition-all hover:bg-gray-200 hover:scale-105 disabled:opacity-50 light:hover:bg-gray-800"
          >
            <FaPaperPlane className="h-3.5 w-3.5" />
            {loading ? "Posting..." : "Sign Guestbook"}
          </button>
        </motion.form>

        <div className="space-y-4">
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-5"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 light:bg-black/10">
                    <FaUser className="h-3.5 w-3.5 text-[var(--muted)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{entry.name}</p>
                    <p className="flex items-center gap-1 text-xs text-[var(--muted)]">
                      <FaClock className="h-3 w-3" />
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed pl-11">
                  {entry.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-12 text-[var(--muted)]">
              <FaBook className="h-8 w-8" />
              <p className="text-sm">No messages yet. Be the first to sign!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
