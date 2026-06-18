import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

// In-memory store (replace with Vercel KV in production)
const entries: GuestbookEntry[] = [
  {
    id: randomUUID(),
    name: "Friend",
    message: "Hey Mayank! Your portfolio is amazing. Keep building cool stuff! 🚀",
    timestamp: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    entries: entries.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
  });
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    if (name.trim().length > 50 || message.trim().length > 500) {
      return NextResponse.json(
        { error: "Name or message too long" },
        { status: 400 }
      );
    }

    const entry: GuestbookEntry = {
      id: randomUUID(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    entries.push(entry);

    return NextResponse.json({ entry });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
