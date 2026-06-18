import { StarField } from "@/components/ui/StarField";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StarField count={60} minOpacity={0.03} maxOpacity={0.12} parallaxStrength={0.01} />
      </div>

      <div className="section-stars absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <FaArrowLeft className="h-3 w-3" />
          Back to Blog
        </Link>

        <article className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
          <h1 className="text-3xl font-bold gradient-text capitalize">
            {params.slug.replace(/-/g, " ")}
          </h1>
          <p className="mt-4 text-[var(--muted)]">
            This is a placeholder for the blog post content. The full MDX content would be rendered here.
          </p>
        </article>
      </div>
    </div>
  );
}
