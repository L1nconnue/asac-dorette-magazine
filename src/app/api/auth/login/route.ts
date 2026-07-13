import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE, sessionToken, timingSafeEqual } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Small in-memory throttle: 8 tries per IP per 10 minutes.
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 8;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function tooManyTries(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

function shouldUseSecureCookie(request: Request) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (LOCAL_HOSTS.has(host)) return false;
  return forwardedProto ? forwardedProto === "https" : process.env.NODE_ENV === "production";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooManyTries(ip)) {
    return NextResponse.json({ error: "Too many attempts. Wait 10 minutes and try again." }, { status: 429 });
  }

  const expected = process.env.DASHBOARD_PASSWORD ?? "";
  if (!expected || !process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Access is not configured yet. Set DASHBOARD_PASSWORD and AUTH_SECRET." }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const given = String(body.password ?? "");
  const ok = given.length === expected.length && timingSafeEqual(given, expected);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "That password does not match." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: shouldUseSecureCookie(request),
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
