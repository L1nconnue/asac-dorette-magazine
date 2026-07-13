import type { Availability, Billboard, Condition, TriState } from "./types";

/** Minimal RFC-4180 CSV parser (handles quotes, commas and newlines inside cells). */
export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const text = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += c;
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  row.push(cell);
  rows.push(row);
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

/** "Arrondissement Name " -> "arrondissement_name" */
export function slugKey(header: string): string {
  return header
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Accept a few spellings for each field so a renamed column does not break the site. */
const ALIASES: Record<string, string[]> = {
  structure_id: ["structure_id", "structureid", "id", "billboard_id"],
  face_ids: ["face_ids", "faceid", "face_id"],
  confirmed_face_count: ["confirmed_face_count", "face_count", "faces", "nb_faces"],
  faces_orientation: ["faces_orientation", "face_orientation", "orientation"],
  city: ["city", "ville"],
  arrondissement_code: ["arrondissement_code", "arrondissement_no", "arr_code"],
  arrondissement_name: ["arrondissement_name", "arrondissement", "arr_name"],
  neighborhood: ["neighborhood", "neighbourhood", "quartier"],
  road_axis: ["road_axis", "axis", "axe", "axe_routier"],
  latitude: ["latitude", "lat", "gps_latitude"],
  longitude: ["longitude", "lng", "lon", "gps_longitude"],
  format_size: ["format_size", "format", "dimensions", "size"],
  media_type: ["media_type", "billboard_type", "type"],
  owner_company: ["owner_company", "regie", "owner", "regie_owner", "company"],
  monthly_price_xaf: ["monthly_price_xaf", "price_xaf", "monthly_price"],
  price_source: ["price_source", "source_prix"],
  availability_status: ["availability_status", "availability", "disponibilite"],
  condition_status: ["condition_status", "condition", "etat"],
  photo_front_url: ["photo_front_url", "photo_front", "front_photo", "photo"],
  photo_front_webp_url: ["photo_front_webp_url", "photo_front_webp", "front_photo_webp", "photo_webp", "webp_front_url"],
  photo_context_url: ["photo_context_url", "photo_context", "context_photo"],
  photo_context_webp_url: ["photo_context_webp_url", "photo_context_webp", "context_photo_webp", "webp_context_url"],
  last_verified_date: ["last_verified_date", "last_verified", "verified_at"],
  database_status: ["database_status", "status", "statut"],
  notes: ["notes", "note", "comment", "comments"],
  has_lights: ["has_lights", "lights", "lighting", "eclairage"],
};

export function buildColumnIndex(headerRow: string[]): Record<string, number> {
  const slugged = headerRow.map(slugKey);
  const index: Record<string, number> = {};
  for (const [field, aliases] of Object.entries(ALIASES)) {
    for (const alias of aliases) {
      const at = slugged.indexOf(alias);
      if (at !== -1) {
        index[field] = at;
        break;
      }
    }
  }
  return index;
}

/** The sheet has title/among rows above the real header, so find the header row itself. */
export function findHeaderRow(rows: string[][]): number {
  for (let i = 0; i < Math.min(rows.length, 25); i++) {
    const slugged = rows[i].map(slugKey);
    const hits = ["structure_id", "latitude", "longitude", "owner_company", "database_status"].filter((k) =>
      slugged.some((s) => ALIASES[k].includes(s)),
    ).length;
    if (hits >= 2) return i;
  }
  return 0;
}

const clean = (v: string | undefined) => (v ?? "").toString().trim();

function toNumber(v: string): number | null {
  const raw = clean(v).replace(/\s|\u00a0/g, "").replace(/,/g, ".");
  if (!raw) return null;
  const n = Number(raw.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function toAvailability(v: string): Availability {
  const s = clean(v).toLowerCase();
  if (!s) return "Unknown";
  if (s.startsWith("avail") || s.startsWith("libre") || s.startsWith("dispo")) return "Available";
  if (s.startsWith("occup") || s.startsWith("booked") || s.startsWith("taken")) return "Occupied";
  if (s.startsWith("remov") || s.includes("revisit") || s.startsWith("retir")) return "Removed";
  return "Unknown";
}

function toCondition(v: string): Condition {
  const s = clean(v).toLowerCase();
  if (!s) return "Unknown";
  if (s.startsWith("good") || s.startsWith("bon")) return "Good";
  if (s.startsWith("damag") || s.startsWith("abim") || s.startsWith("endommag")) return "Damaged";
  if (s.includes("check") || s.includes("verif")) return "To Check";
  return "Unknown";
}

function toTriState(v: string): TriState {
  const s = clean(v).toLowerCase();
  if (["yes", "y", "true", "1", "oui"].includes(s)) return "Yes";
  if (["no", "n", "false", "0", "non"].includes(s)) return "No";
  return "Unknown";
}

function toList(v: string): string[] {
  return clean(v)
    .split(/[,;|/]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function rowToBillboard(row: string[], idx: Record<string, number>, i: number): Billboard | null {
  const at = (field: string) => (idx[field] === undefined ? "" : clean(row[idx[field]]));

  const structureId = at("structure_id") || `ROW-${i + 1}`;
  const status = at("database_status");
  // Only approved structures belong in the platform view.
  if (status && !/^appro/i.test(status)) return null;

  const lat = toNumber(at("latitude"));
  const lng = toNumber(at("longitude"));
  const inCameroon = (n: number | null, min: number, max: number) => n !== null && n >= min && n <= max;

  return {
    id: structureId,
    structureId,
    faceIds: toList(at("face_ids")),
    faceCount: toNumber(at("confirmed_face_count")),
    facesOrientation: at("faces_orientation"),
    city: at("city") || "Douala",
    arrondissementCode: at("arrondissement_code"),
    arrondissementName: at("arrondissement_name"),
    neighborhood: at("neighborhood"),
    roadAxis: at("road_axis"),
    lat: inCameroon(lat, 1, 14) ? lat : null,
    lng: inCameroon(lng, 8, 17) ? lng : null,
    formatSize: at("format_size"),
    mediaType: at("media_type"),
    owner: at("owner_company"),
    availability: toAvailability(at("availability_status")),
    condition: toCondition(at("condition_status")),
    hasLights: toTriState(at("has_lights")),
    photoFront: at("photo_front_webp_url") || at("photo_front_url"),
    photoContext: at("photo_context_webp_url") || at("photo_context_url"),
    lastVerified: at("last_verified_date"),
    status: status || "APPROVED",
    notes: at("notes"),
    monthlyPriceXaf: toNumber(at("monthly_price_xaf")),
    priceSource: at("price_source"),
  };
}

export function rowsToBillboards(rows: string[][]): Billboard[] {
  if (rows.length === 0) return [];
  const headerAt = findHeaderRow(rows);
  const idx = buildColumnIndex(rows[headerAt]);
  const out: Billboard[] = [];
  const seen = new Set<string>();
  for (let i = headerAt + 1; i < rows.length; i++) {
    const b = rowToBillboard(rows[i], idx, i);
    if (!b) continue;
    if (!b.structureId || seen.has(b.structureId)) continue;
    seen.add(b.structureId);
    out.push(b);
  }
  return out;
}
