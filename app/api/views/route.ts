import { NextResponse } from "next/server";

// In-memory fallback when KV is not configured
let viewCount = 1247;

export async function POST() {
  viewCount += 1;
  return NextResponse.json({ views: viewCount });
}

export async function GET() {
  return NextResponse.json({ views: viewCount });
}
