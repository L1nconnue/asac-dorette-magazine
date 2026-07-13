import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, sessionToken, timingSafeEqual } from "@/lib/auth";

const PUBLIC_PATHS = ["/login", "/api/auth/login", "/brand", "/map-styles", "/icon-512.png", "/apple-icon.png", "/favicon.ico"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE)?.value ?? "";
  const expected = await sessionToken();
  if (cookie && timingSafeEqual(cookie, expected)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = pathname === "/" ? "" : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
