import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

// ── Rate limiter: 3 per hour, 10 per day ──────────────────────────
const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 3600, // per hour
});

const dailyLimiter = new RateLimiterMemory({
  points: 10,
  duration: 86400, // per day
});

async function checkRateLimit(ip: string): Promise<string | null> {
  try {
    await rateLimiter.consume(ip);
  } catch {
    return "Too many messages. Please try again in an hour.";
  }
  try {
    await dailyLimiter.consume(ip);
  } catch {
    return "Daily limit reached. Please try again tomorrow.";
  }
  return null;
}

// ── POST ───────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // 1. Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const rateError = await checkRateLimit(ip);
    if (rateError) {
      return NextResponse.json({ error: rateError }, { status: 429 });
    }

    // 2. Parse & validate input
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 3. Content validation — reject very short or empty messages
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 20) {
      return NextResponse.json(
        { error: "Message is too short. Please write at least 20 characters." },
        { status: 400 }
      );
    }

    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 254);
    const sanitizedMessage = trimmedMessage.slice(0, 2000);

    // 4. Send via Resend
    if (!RESEND_API_KEY || !CONTACT_EMAIL) {
      return NextResponse.json({
        success: true,
        message: "Message received (email not configured)",
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: CONTACT_EMAIL,
        subject: `Portfolio Contact: ${sanitizedName}`,
        text: `From: ${sanitizedName} (${sanitizedEmail})\n\n${sanitizedMessage}`,
        replyTo: sanitizedEmail,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
