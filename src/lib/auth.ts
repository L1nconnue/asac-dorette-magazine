/** Edge-safe helpers (Web Crypto only) used by both middleware and the login route. */

export const SESSION_COOKIE = "tmg_session";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token = hash(password + secret). Nothing secret ever reaches the browser. */
export async function sessionToken(): Promise<string> {
  const password = process.env.DASHBOARD_PASSWORD ?? "";
  const secret = process.env.AUTH_SECRET ?? "";
  return sha256Hex(`${password}::${secret}::tmg-v1`);
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
