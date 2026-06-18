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
  totalContributions: number;
  totalRepos: number;
  totalStars: number;
  weeks: Week[];
}

// Monochrome contribution levels — dark mode
const LEVEL_COLORS_DARK: Record<string, string> = {
  NONE: "#161616",
  FIRST_QUARTER: "#3a3a3a",
  SECOND_QUARTER: "#6a6a6a",
  THIRD_QUARTER: "#9a9a9a",
  FOURTH_QUARTER: "#e0e0e0",
};

// Monochrome contribution levels — light mode
const LEVEL_COLORS_LIGHT: Record<string, string> = {
  NONE: "#e8e8e8",
  FIRST_QUARTER: "#c0c0c0",
  SECOND_QUARTER: "#909090",
  THIRD_QUARTER: "#505050",
  FOURTH_QUARTER: "#1a1a1a",
};

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function GitHubGraph() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [isDark, setIsDark] = useState(true);

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
    fetch("/api/github")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => setData(null));
    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  if (!data.configured) {
    return (
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
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

  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  if (data.weeks.length > 0) {
    for (let weekIdx = 0; weekIdx < data.weeks.length; weekIdx++) {
      const firstDay = data.weeks[weekIdx].contributionDays[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ label: MONTH_LABELS[month], col: weekIdx });
          lastMonth = month;
        }
      }
    }
  }

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-6">
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
            <p className="text-xs text-[var(--muted)]">Contributions</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-0 min-w-fit">
          <div className="flex ml-10 mb-1">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-[10px] text-[var(--muted)]"
                style={{
                  position: "relative",
                  left: `${m.col * 14}px`,
                  marginRight:
                    i < monthLabels.length - 1
                      ? `${(monthLabels[i + 1]?.col - m.col) * 14 - 30}px`
                      : 0,
                }}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="flex gap-0">
            <div className="flex flex-col gap-[3px] mr-2 pt-0">
              {dayLabels.map((label, i) => (
                <div
                  key={i}
                  className="h-[11px] text-[9px] text-[var(--muted)] flex items-center justify-end pr-1 w-7"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {data.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const day = week.contributionDays.find(
                      (d) => d.weekday === dayIdx
                    );
                    const level = day?.contributionLevel ?? "NONE";
                    const count = day?.contributionCount ?? 0;
                    const date = day?.date ?? "";
                    const color = colors[level] ?? colors.NONE;

                    return (
                      <div
                        key={dayIdx}
                        className="h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-150 cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={
                          count > 0
                            ? `${count} contributions on ${date}`
                            : `No contributions on ${date}`
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-[var(--muted)]">
            <span>Less</span>
            {Object.values(colors).map((c, i) => (
              <div key={i} className="h-[11px] w-[11px] rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
