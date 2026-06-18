import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "MAYANKJOSHIcoder";

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({
      configured: false,
      totalContributions: 0,
      totalRepos: 0,
      totalStars: 0,
      weeks: [],
    });
  }

  try {
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
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
      body: JSON.stringify({ query }),
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
      totalContributions:
        user.contributionsCollection.contributionCalendar.totalContributions,
      totalRepos: user.repositories.totalCount,
      totalStars,
      weeks: user.contributionsCollection.contributionCalendar.weeks,
    });
  } catch {
    return NextResponse.json({
      configured: false,
      totalContributions: 0,
      totalRepos: 0,
      totalStars: 0,
      weeks: [],
    });
  }
}
