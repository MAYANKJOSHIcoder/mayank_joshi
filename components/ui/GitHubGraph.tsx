"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaExclamationCircle } from "react-icons/fa";

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
  weekday: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface GitHubData {
  configured: boolean;
  year: number;
  totalContributions: number;
  totalRepos: number;
  totalStars: number;
  weeks: Week[];
}

// Contribution graph colors — dark mode (bright, visible greens on dark bg)
const LEVEL_COLORS_DARK: Record<string, string> = {
  NONE: "#1b1f23",
  FIRST_QUARTER: "#006d32",
  SECOND_QUARTER: "#26a641",
  THIRD_QUARTER: "#39d353",
  FOURTH_QUARTER: "#56d364",
};

// Border color for NONE cells — adapts to theme
const NONE_BORDER_DARK = "#3d444d";
const NONE_BORDER_LIGHT = "#d0d7de";

// Contribution graph colors — light mode
const LEVEL_COLORS_LIGHT: Record<string, string> = {
  NONE: "#ebedf0",
  FIRST_QUARTER: "#9be9a8",
  SECOND_QUARTER: "#40c463",
  THIRD_QUARTER: "#30a14e",
  FOURTH_QUARTER: "#216e39",
};

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function GitHubGraph() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from(
    { length: Math.min(currentYear - 2007, 5) },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const detect = () => {
      const dark =
        document.documentElement.classList.contains("dark") ||
        (!document.documentElement.classList.contains("light") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(dark);
    };
    detect();
    const observer = new MutationObserver(detect);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    fetch(`/api/github?year=${selectedYear}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setError(false);
      })
      .catch(() => {
        setData(null);
        setError(true);
      });
    return () => observer.disconnect();
  }, [selectedYear]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <FaGithub className="h-8 w-8 text-[var(--muted)]" />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">GitHub Stats</p>
            <p className="mt-1 text-xs text-[var(--muted)] flex items-center gap-1.5 justify-center">
              <FaExclamationCircle className="h-3 w-3" />
              Failed to load GitHub data
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
        <div className="flex flex-col items-center gap-3 text-center animate-pulse">
          <FaGithub className="h-8 w-8 text-[var(--muted)] opacity-40" />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">GitHub Stats</p>
            <p className="mt-1 text-xs text-[var(--muted)]">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data.configured) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <FaGithub className="h-8 w-8 text-[var(--muted)]" />
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">GitHub Stats</p>
            <p className="mt-1 text-xs text-[var(--muted)] flex items-center gap-1.5 justify-center">
              <FaExclamationCircle className="h-3 w-3" />
              Set GITHUB_TOKEN in .env.local to show your stats
            </p>
          </div>
        </div>
      </div>
    );
  }

  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT;

  // Cell sizing: compute to fit 53 weeks within the card
  // Card max-w-3xl ≈ 768px, minus padding ~64px = ~704px usable
  // Labels take ~36px, so grid area ≈ 668px
  // 53 weeks need: 53 * CELL + 52 * GAP ≤ 668
  // With GAP=2, CELL=12: 53*12 + 52*2 = 636+104 = 740 → slightly over
  // Use CELL=11: 53*11 + 52*2 = 583+104 = 687 → fits with room
  const CELL = 11;
  const GAP = 2;
  const LABEL_W = 36;

  // Build month labels with their column positions
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  for (let weekIdx = 0; weekIdx < data.weeks.length; weekIdx++) {
    const firstDay = data.weeks[weekIdx].contributionDays[0];
    if (firstDay) {
      const month = new Date(firstDay.date + "T00:00:00").getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTH_LABELS[month], col: weekIdx });
        lastMonth = month;
      }
    }
  }

  const totalGridWidth = data.weeks.length * (CELL + GAP) - GAP;

  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
      {/* Year selector */}
      <div className="mb-5 flex items-center justify-center gap-2 flex-wrap">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              selectedYear === y
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "bg-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-8">
        <div className="flex items-center gap-3">
          <FaGithub className="h-5 w-5 text-[var(--muted)]" />
          <div>
            <p className="text-2xl font-bold">{data.totalRepos}</p>
            <p className="text-xs text-[var(--muted)]">Repositories</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-2xl font-bold">{data.totalStars}</p>
            <p className="text-xs text-[var(--muted)]">Stars</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-2xl font-bold">{data.totalContributions}</p>
            <p className="text-xs text-[var(--muted)]">
              Contributions in {data.year}
            </p>
          </div>
        </div>
      </div>

      {/* Contribution graph — no overflow, fully visible */}
      <div className="flex justify-center">
        <div>
          {/* Month labels */}
          <div className="flex" style={{ marginLeft: LABEL_W }}>
            {monthLabels.map((m, i) => {
              const nextCol =
                i < monthLabels.length - 1
                  ? monthLabels[i + 1].col
                  : data.weeks.length;
              const w = (nextCol - m.col) * (CELL + GAP);
              return (
                <div
                  key={i}
                  className="text-[10px] text-[var(--muted)] shrink-0"
                  style={{ width: w }}
                >
                  {m.label}
                </div>
              );
            })}
          </div>

          {/* Day labels + grid */}
          <div className="flex mt-1">
            {/* Day labels */}
            <div
              className="flex flex-col shrink-0"
              style={{ width: LABEL_W, gap: GAP }}
            >
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="text-[9px] text-[var(--muted)] flex items-center justify-end pr-2"
                  style={{ height: CELL }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Contribution cells — columns are weeks */}
            <div className="flex" style={{ gap: GAP }}>
              {data.weeks.map((week, weekIdx) => (
                <div
                  key={weekIdx}
                  className="flex flex-col"
                  style={{ gap: GAP }}
                >
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const day = week.contributionDays.find(
                      (d) => d.weekday === dayIdx
                    );
                    const level = day?.contributionLevel ?? "NONE";
                    const count = day?.contributionCount ?? 0;
                    const date = day?.date ?? "";
                    const bg = colors[level] ?? colors.NONE;
                    const hasContributions = count > 0;
                    const noneBorder = isDark ? NONE_BORDER_DARK : NONE_BORDER_LIGHT;

                    return (
                      <div
                        key={dayIdx}
                        className="rounded-sm cursor-pointer transition-transform hover:scale-150"
                        style={{
                          width: CELL,
                          height: CELL,
                          backgroundColor: bg,
                          boxShadow: hasContributions
                            ? `0 0 6px ${bg}, 0 0 12px ${bg}40, inset 0 0 0 1px rgba(255,255,255,0.15)`
                            : `inset 0 0 0 1px ${noneBorder}`,
                        }}
                        title={
                          hasContributions
                            ? `${count} contribution${count > 1 ? "s" : ""} on ${date}`
                            : date
                            ? `No contributions on ${date}`
                            : ""
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-[var(--muted)]">
            <span>Less</span>
            {Object.entries(colors).map(([level, c], i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: CELL,
                  height: CELL,
                  backgroundColor: c,
                  boxShadow:
                    level === "NONE"
                      ? `inset 0 0 0 1px ${isDark ? NONE_BORDER_DARK : NONE_BORDER_LIGHT}`
                      : `0 0 5px ${c}, 0 0 10px ${c}40`,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
