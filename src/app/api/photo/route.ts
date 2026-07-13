import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "@/lib/google-auth";
import { directPhotoUrl, driveFileId, isKoboPhotoHost } from "@/lib/photos";

export const runtime = "nodejs";

function photoHeaders(target: string) {
  const headers = new Headers();
  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return headers;
  }
  const token = process.env.KOBO_API_TOKEN;
  if (token && isKoboPhotoHost(parsed.hostname)) headers.set("Authorization", `Token ${token}`);
  return headers;
}

async function fetchDriveWithServiceAccount(target: string) {
  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return null;
  }
  if (!["drive.google.com", "drive.usercontent.google.com"].includes(parsed.hostname)) return null;
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  const id = driveFileId(target);
  if (!email || !key || !id) return null;
  try {
    const token = await getGoogleAccessToken(email, key, ["https://www.googleapis.com/auth/drive.readonly"]);
    return fetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    return null;
  }
}

function isImageResponse(response: Response) {
  return response.ok && (response.headers.get("content-type") ?? "").startsWith("image/");
}

/** Streams billboard photos through the site so Drive/Kobo links work and stay server-side. */
export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("u") ?? "";
  const direct = directPhotoUrl(target);
  if (!direct) return NextResponse.json({ error: "Photo source not allowed" }, { status: 400 });

  try {
    const driveAuthed = await fetchDriveWithServiceAccount(target);
    const upstream = driveAuthed && isImageResponse(driveAuthed)
      ? driveAuthed
      : await fetch(direct, { redirect: "follow", headers: photoHeaders(target), cache: "no-store" });
    const type = upstream.headers.get("content-type") ?? "";
    if (!upstream.ok || !type.startsWith("image/")) {
      return NextResponse.json({ error: "Photo unavailable" }, { status: 404 });
    }
    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "private, max-age=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Photo unavailable" }, { status: 502 });
  }
}
