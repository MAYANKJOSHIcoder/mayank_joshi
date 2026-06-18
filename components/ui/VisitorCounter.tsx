"use client";

import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

export function VisitorCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => setViews(null));
  }, []);

  if (views === null) return null;

  return (
    <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
      <FaEye className="h-3 w-3" />
      {views.toLocaleString()} views
    </span>
  );
}
