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

// Contribution graph colors — dark mode (GitHub's original palette)
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

// Contribution graph colors — light mode (GitHub's original palette)
const LEVEL_COLORS_LIGHT: Record<string, string> = {
  NONE: "#ebedf0",
  FIRST_QUARTER: "#006d32",
  SECOND_QUARTER: "#26a641",
  THIRD_QUARTER: "#39d353",
  FOURTH_QUARTER: "#56d364",
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

  // Build month labels with their column positions
  const monthLabels: { label: string; col: number; span: number }[] = [];
  let lastMonth = -1;
  for (let weekIdx = 0; weekIdx < data.weeks.length; weekIdx++) {
    const firstDay = data.weeks[weekIdx].contributionDays[0];
    if (firstDay) {
      const month = new Date(firstDay.date + "T00:00:00").getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTH_LABELS[month], col: weekIdx, span: 0 });
        lastMonth = month;
      }
    }
  }
  // Compute span for each month label
  for (let i = 0; i < monthLabels.length; i++) {
    monthLabels[i].span =
      (i < monthLabels.length - 1
        ? monthLabels[i + 1].col
        : data.weeks.length) - monthLabels[i].col;
  }

  const GAP = 2;
  const totalCols = data.weeks.length;
  const CELL = 12;

  return (
    <div className="max-w-5xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:p-8">
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

      {/* Contribution graph — centered, fixed 12px cells, scrollable */}
      <div className="flex justify-center">
        <div className="inline-block overflow-x-auto">
          <div className="flex flex-col" style={{ gap: GAP }}>
            {/* Month labels */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `36px repeat(${totalCols}, ${CELL}px)`,
                gap: GAP,
              }}
            >
            {/* Empty cell under day labels */}
            <div />
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-[10px] text-[var(--muted)] text-left overflow-hidden"
                style={{
                  gridColumn: `${m.col + 2} / span ${m.span}`,
                }}
              >
                {m.label}
              </div>
            ))}
          </div>

            {/* Grid: day labels + contribution cells */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `36px repeat(${totalCols}, ${CELL}px)`,
                gridTemplateRows: `repeat(7, ${CELL}px)`,
                gap: GAP,
              }}
            >
            {/* Day labels column */}
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="text-[9px] text-[var(--muted)] flex items-center justify-end pr-2"
                style={{ gridColumn: 1, gridRow: i + 1 }}
              >
                {label}
              </div>
            ))}

            {/* Week columns */}
            {data.weeks.map((week, weekIdx) =>
              Array.from({ length: 7 }).map((_, dayIdx) => {
                const day = week.contributionDays.find(
                  (d) => d.weekday === dayIdx
                );
                const count = day?.contributionCount ?? 0;
                const date = day?.date ?? "";

                let bg: string;

                if (count === 0) {
                  bg = colors.NONE;
                } else if (count <= 2) {
                  bg = colors.FIRST_QUARTER;
                } else if (count <= 5) {
                  bg = colors.SECOND_QUARTER;
                } else if (count <= 10) {
                  bg = colors.THIRD_QUARTER;
                } else {
                  bg = colors.FOURTH_QUARTER;
                }
                const hasContributions = count > 0;

                return (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className="rounded-sm cursor-pointer hover:opacity-80"
                    style={{
                      gridColumn: weekIdx + 2,
                      gridRow: dayIdx + 1,
                      backgroundColor: bg,
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
              })
            )}
          </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-[var(--muted)]">
              <span>Less</span>
              {Object.entries(colors).map(([level, c], i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: c,
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
