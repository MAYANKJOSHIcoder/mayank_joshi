import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "MAYANKJOSHIcoder";

export async function GET(request: NextRequest) {
  const currentYear = new Date().getFullYear();

  if (!GITHUB_TOKEN) {
    return NextResponse.json({
      configured: false,
      year: currentYear,
      totalContributions: 0,
      totalRepos: 0,
      totalStars: 0,
      weeks: [],
    });
  }

  // Extract year from query parameter, default to current year
  const yearParam = request.nextUrl.searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : currentYear;

  // Validate year
  if (isNaN(year) || year < 2008 || year > currentYear) {
    return NextResponse.json(
      { error: `Invalid year. Must be between 2008 and ${currentYear}.` },
      { status: 400 }
    );
  }

  // Calculate from/to for the full year
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  try {
    const query = `
      query($from: DateTime!, $to: DateTime!) {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                  weekday
                }
              }
            }
            totalRepositoryContributions
          }
          repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
            totalCount
            nodes {
              stargazerCount
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { from, to } }),
    });

    if (!res.ok) throw new Error("GitHub API error");

    const data = await res.json();
    const user = data.data?.user;

    if (!user) throw new Error("No user data");

    const totalStars = user.repositories.nodes.reduce(
      (sum: number, repo: { stargazerCount: number }) => sum + repo.stargazerCount,
      0
    );

    return NextResponse.json({
      configured: true,
      year,
      totalContributions:
        user.contributionsCollection.contributionCalendar.totalContributions,
      totalRepos: user.repositories.totalCount,
      totalStars,
      weeks: user.contributionsCollection.contributionCalendar.weeks,
    });
  } catch {
    return NextResponse.json({
      configured: false,
      year,
      totalContributions: 0,
      totalRepos: 0,
      totalStars: 0,
      weeks: [],
    });
  }
}
