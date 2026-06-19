import { StarField } from "@/components/ui/StarField";
import { FaFeatherAlt } from "react-icons/fa";

export default function BlogPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StarField count={60} minOpacity={0.03} maxOpacity={0.12} parallaxStrength={0.01} />
      </div>

      <div className="section-stars absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto w-full px-4 text-center">
        <div className="mb-4 flex justify-center">
          <FaFeatherAlt className="h-12 w-12 text-[var(--muted)]" />
        </div>
        <h1 className="text-4xl font-bold gradient-text">Blog</h1>
        <p className="mt-4 text-[var(--muted)]">
          Thoughts on AI, web development, and everything in between.
        </p>

        <div className="mt-16 flex flex-col items-center gap-4 py-20 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
          <FaFeatherAlt className="h-8 w-8 text-[var(--muted)] opacity-50" />
          <p className="text-[var(--muted)]">
            Blog posts coming soon. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
