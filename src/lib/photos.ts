/** Google Drive share links are not direct images. Turn them into something loadable. */
export function driveFileId(url: string): string | null {
  const patterns = [/\/file\/d\/([a-zA-Z0-9_-]{10,})/, /[?&]id=([a-zA-Z0-9_-]{10,})/, /\/d\/([a-zA-Z0-9_-]{10,})/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

const DEFAULT_PHOTO_HOSTS = [
  "drive.google.com",
  "lh3.googleusercontent.com",
  "drive.usercontent.google.com",
  "kf.kobotoolbox.org",
  "kc.kobotoolbox.org",
  "eu.kobotoolbox.org",
];

const KOBO_PHOTO_HOSTS = ["kf.kobotoolbox.org", "kc.kobotoolbox.org", "eu.kobotoolbox.org"];

/** Add more image hosts without touching the code: EXTRA_PHOTO_HOSTS="cdn.example.com,files.example.org" */
export const ALLOWED_PHOTO_HOSTS = [
  ...DEFAULT_PHOTO_HOSTS,
  ...(process.env.EXTRA_PHOTO_HOSTS ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean),
];

export function isKoboPhotoHost(hostname: string) {
  return KOBO_PHOTO_HOSTS.includes(hostname.toLowerCase());
}

export function directPhotoUrl(url: string): string | null {
  const raw = (url ?? "").trim();
  if (!raw) return null;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  if (!ALLOWED_PHOTO_HOSTS.includes(parsed.hostname)) return null;

  const id = parsed.hostname === "drive.google.com" ? driveFileId(raw) : null;
  if (id) return `https://drive.usercontent.google.com/download?id=${id}&export=view`;
  return raw;
}

/** What the browser requests: our own proxy, so credentials and hosts stay server-side. */
export function proxiedPhoto(url: string): string | null {
  if (!directPhotoUrl(url)) return null;
  return `/api/photo?u=${encodeURIComponent(url)}`;
}
