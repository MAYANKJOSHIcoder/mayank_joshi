import { cn } from "@/lib/cn";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
        variant === "primary" &&
          "bg-white text-black border border-white hover:bg-gray-200 hover:scale-105 shadow-lg shadow-white/10",
        variant === "primary" &&
          "light:bg-black light:text-white light:border-black light:hover:bg-gray-800 light:shadow-black/10",
        variant === "secondary" &&
          "border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] hover:border-[var(--foreground)] hover:scale-105",
        variant === "ghost" &&
          "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
