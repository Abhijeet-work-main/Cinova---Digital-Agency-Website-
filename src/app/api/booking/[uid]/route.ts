import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (per-instance, appropriate for serverless edge)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function isValidMeetUrl(url: unknown): string | null {
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (parsed.username || parsed.password) return null;

    if (parsed.hostname === "meet.google.com") {
      if (/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(parsed.pathname)) {
        return `https://meet.google.com${parsed.pathname}`;
      }
      return null;
    }

    if (parsed.hostname === "app.cal.com") {
      if (parsed.pathname.startsWith("/video/")) {
        return parsed.href;
      }
      return null;
    }
  } catch {
    // not a valid URL
  }
  return null;
}

function extractMeetUrl(data: Record<string, unknown>): string | null {
  // 1. Check top-level meetingUrl
  const top = isValidMeetUrl(data.meetingUrl);
  if (top) return top;

  // 2. Check location field
  const loc = isValidMeetUrl(data.location);
  if (loc) return loc;

  // 3. Check references array
  if (Array.isArray(data.references)) {
    for (const ref of data.references) {
      if (ref && typeof ref === "object") {
        const refObj = ref as Record<string, unknown>;
        const refUrl = isValidMeetUrl(refObj.meetingUrl) || isValidMeetUrl(refObj.location);
        if (refUrl) return refUrl;
      }
    }
  }

  return null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;

  // Validate uid
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(uid)) {
    return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
  }

  // Rate limit
  const ip = getIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Service unavailable" },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  let calData: Record<string, unknown>;
  try {
    const res = await fetch(`https://api.cal.com/v2/bookings/${uid}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[booking route] Cal.com API status:",
          res.status,
          "for uid:",
          uid.slice(0, 8) + "..."
        );
      }
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const json = await res.json();

    if (process.env.NODE_ENV !== "production") {
      // Log field names only, never secret values or PII
      console.log("[booking route] Cal.com response top-level fields:", Object.keys(json));
      if (json?.data && typeof json.data === "object") {
        console.log("[booking route] Cal.com data fields:", Object.keys(json.data));
      }
    }

    if (!json?.data || typeof json.data !== "object") {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    calData = json.data as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Confirm booking belongs to "free-strategy-call" event (returns 404 with no details otherwise)
  const eventType = calData.eventType as Record<string, unknown> | undefined;
  const slug = typeof eventType?.slug === "string" ? eventType.slug : undefined;
  if (slug !== "free-strategy-call") {
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Map Cal.com status to our safe status
  const calStatus = typeof calData.status === "string" ? calData.status.toLowerCase() : "";
  let status: "ready" | "pending" | "cancelled";
  if (calStatus === "accepted" || calStatus === "confirmed") {
    status = "ready";
  } else if (calStatus === "cancelled" || calStatus === "rejected") {
    status = "cancelled";
  } else {
    status = "pending";
  }

  // Never return a meeting link for cancelled or rejected bookings
  const meetingUrl = status === "cancelled" ? null : extractMeetUrl(calData);
  const startTime = typeof calData.startTime === "string" ? calData.startTime : undefined;
  const endTime = typeof calData.endTime === "string" ? calData.endTime : undefined;

  return NextResponse.json(
    { status, startTime, endTime, meetingUrl },
    { headers: { "Cache-Control": "no-store" } }
  );
}
