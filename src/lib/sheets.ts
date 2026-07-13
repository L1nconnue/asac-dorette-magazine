import { getGoogleAccessToken } from "./google-auth";
import { parseCsv, rowsToBillboards } from "./normalize";
import { SAMPLE_BILLBOARDS } from "./sample-data";
import type { Billboard, BillboardPayload } from "./types";

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "";
const TAB = process.env.SHEET_TAB_BILLBOARDS ?? "Billboard_Database";
const TTL_MS = Math.max(30, Number(process.env.SHEET_CACHE_SECONDS ?? 60)) * 1000;

type CacheEntry = { payload: BillboardPayload; at: number };
let cache: CacheEntry | null = null;
let inFlight: Promise<BillboardPayload> | null = null;

/* ------------------------------------------------------------------ *
 * Read path A: public link sharing (no credentials).                   *
 * Works when the sheet is shared as "Anyone with the link — Viewer".   *
 * ------------------------------------------------------------------ */
async function readPublicCsv(): Promise<string[][]> {
  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:csv&sheet=${encodeURIComponent(TAB)}&headers=0`;
  const res = await fetch(url, { cache: "no-store", redirect: "follow" });
  if (!res.ok) throw new Error(`Sheet returned HTTP ${res.status}`);
  const text = await res.text();
  if (text.trimStart().startsWith("<")) {
    throw new Error("Sheet is not readable by link. Set link sharing to Viewer, or add a service account.");
  }
  return parseCsv(text);
}

/* ------------------------------------------------------------------ *
 * Read path B: service account (used only if credentials are set).     *
 * ------------------------------------------------------------------ */
async function readWithServiceAccount(email: string, key: string): Promise<string[][]> {
  const token = await getGoogleAccessToken(email, key, ["https://www.googleapis.com/auth/spreadsheets.readonly"]);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/` +
    `${encodeURIComponent(TAB)}?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!res.ok) throw new Error(`Sheets API returned HTTP ${res.status}`);
  const json = (await res.json()) as { values?: unknown[][] };
  return (json.values ?? []).map((row) => row.map((v) => (v === null || v === undefined ? "" : String(v))));
}

/* ------------------------------------------------------------------ */

async function loadFromSheet(): Promise<Billboard[]> {
  if (!SHEET_ID) throw new Error("GOOGLE_SHEET_ID is not set");
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  const rows = email && key ? await readWithServiceAccount(email, key) : await readPublicCsv();
  return rowsToBillboards(rows);
}

/**
 * Returns the approved billboards.
 * - fresh copy if the cache is older than SHEET_CACHE_SECONDS
 * - last good copy if the sheet is temporarily unreachable (marked stale)
 * - bundled sample rows only if the sheet has never been read successfully
 */
export async function getBillboards(force = false): Promise<BillboardPayload> {
  if (!force && cache && Date.now() - cache.at < TTL_MS) return cache.payload;
  if (inFlight) return inFlight;

  inFlight = (async (): Promise<BillboardPayload> => {
    try {
      const billboards = await loadFromSheet();
      const payload: BillboardPayload = {
        billboards,
        meta: {
          total: billboards.length,
          withCoordinates: billboards.filter((b) => b.lat !== null && b.lng !== null).length,
          source: "sheet",
          updatedAt: new Date().toISOString(),
          stale: false,
        },
      };
      cache = { payload, at: Date.now() };
      return payload;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error reading the sheet";
      if (cache) {
        return {
          ...cache.payload,
          meta: { ...cache.payload.meta, stale: true, message },
        };
      }
      return {
        billboards: SAMPLE_BILLBOARDS,
        meta: {
          total: SAMPLE_BILLBOARDS.length,
          withCoordinates: SAMPLE_BILLBOARDS.filter((b) => b.lat !== null).length,
          source: "sample",
          updatedAt: new Date().toISOString(),
          stale: true,
          message,
        },
      };
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}
