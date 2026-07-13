import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const env = {
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  sheetId: process.env.GOOGLE_SHEET_ID,
  tab: process.env.SHEET_TAB_BILLBOARDS || "Billboard_Database",
  rawTab: process.env.SHEET_TAB_RAW || "Raw_Submissions",
  outputFolderId: process.env.WEBP_OUTPUT_FOLDER_ID,
  outputLocalPath: process.env.WEBP_OUTPUT_LOCAL_PATH,
  quality: Number(process.env.WEBP_QUALITY || 78),
  maxWidth: Number(process.env.WEBP_MAX_WIDTH || 1800),
  limit: Number(process.env.WEBP_LIMIT || 25),
};

for (const [name, value] of Object.entries({
  GOOGLE_CLIENT_EMAIL: env.email,
  GOOGLE_PRIVATE_KEY: env.key,
  GOOGLE_SHEET_ID: env.sheetId,
  WEBP_OUTPUT_FOLDER_ID: env.outputFolderId,
})) {
  if (!value) throw new Error(`${name} is required`);
}

const aliases = {
  structure_id: ["structure_id", "structureid", "id", "billboard_id"],
  photo_front_url: ["photo_front_url", "photo_front", "front_photo", "photo"],
  photo_context_url: ["photo_context_url", "photo_context", "context_photo"],
  photo_front_webp_url: ["photo_front_webp_url", "photo_front_webp", "front_photo_webp", "photo_webp", "webp_front_url"],
  photo_context_webp_url: ["photo_context_webp_url", "photo_context_webp", "context_photo_webp", "webp_context_url"],
};

function slugKey(header) {
  return String(header || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function driveFileId(url) {
  const raw = String(url || "");
  for (const p of [/\/file\/d\/([a-zA-Z0-9_-]{10,})/, /[?&]id=([a-zA-Z0-9_-]{10,})/, /\/d\/([a-zA-Z0-9_-]{10,})/]) {
    const m = raw.match(p);
    if (m) return m[1];
  }
  return null;
}

function columnLetter(indexOneBased) {
  let n = indexOneBased;
  let out = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    out = String.fromCharCode(65 + r) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

function buildColumnIndex(headers) {
  const slugged = headers.map(slugKey);
  const idx = {};
  for (const [field, names] of Object.entries(aliases)) {
    for (const name of names) {
      const at = slugged.indexOf(name);
      if (at !== -1) {
        idx[field] = at;
        break;
      }
    }
  }
  return idx;
}

function findHeaderRow(rows) {
  for (let i = 0; i < Math.min(rows.length, 25); i++) {
    const slugged = rows[i].map(slugKey);
    const hits = ["structure_id", "photo_front_url"].filter((k) => slugged.some((s) => aliases[k].includes(s))).length;
    if (hits >= 1) return i;
  }
  return 0;
}

async function googleToken(scopes) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: env.email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64(header)}.${b64(claims)}`;
  const signature = crypto.createSign("RSA-SHA256").update(unsigned).sign(env.key.replace(/\\n/g, "\n"), "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Google auth failed: HTTP ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function sheetsGet(token, tab = env.tab) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.sheetId}/values/${encodeURIComponent(tab)}?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Could not read sheet: HTTP ${res.status} ${await res.text()}`);
  return (await res.json()).values || [];
}

async function sheetsMetadata(token, tab = env.tab) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.sheetId}?fields=sheets(properties(sheetId,title,gridProperties(columnCount)))`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Could not read sheet metadata: HTTP ${res.status} ${await res.text()}`);
  const sheets = (await res.json()).sheets || [];
  const match = sheets.find((sheet) => sheet.properties?.title === tab);
  if (!match) throw new Error(`Sheet tab not found: ${tab}`);
  return match.properties;
}

async function ensureSheetColumns(token, properties, requiredColumns) {
  const currentColumns = properties.gridProperties?.columnCount || 0;
  if (requiredColumns <= currentColumns) return;
  await appendSheetColumns(token, properties.sheetId, requiredColumns - currentColumns);
}

async function appendSheetColumns(token, sheetId, length) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.sheetId}:batchUpdate`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [{
        appendDimension: {
          sheetId,
          dimension: "COLUMNS",
          length,
        },
      }],
    }),
  });
  if (!res.ok) throw new Error(`Could not expand ${env.tab}: HTTP ${res.status} ${await res.text()}`);
}

async function sheetsUpdate(token, rowNumber, colIndexZeroBased, value, tab = env.tab) {
  const range = `${tab}!${columnLetter(colIndexZeroBased + 1)}${rowNumber}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.sheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  const request = () => fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [[value]] }),
  });
  let res = await request();
  if (res.ok) return;

  let body = await res.text();
  const gridLimit = body.match(/max columns:\s*(\d+)/i);
  const requiredColumns = colIndexZeroBased + 1;
  if (res.status === 400 && gridLimit && requiredColumns > Number(gridLimit[1])) {
    const properties = await sheetsMetadata(token, tab);
    await appendSheetColumns(token, properties.sheetId, requiredColumns - Number(gridLimit[1]));
    res = await request();
    if (res.ok) return;
    body = await res.text();
  }
  throw new Error(`Could not update ${range}: HTTP ${res.status} ${body}`);
}

function parseDmsCoordinates(raw) {
  const text = String(raw || "").trim();
  const pattern = /^\s*(\d{1,2})\s*[°º]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:[.,]\d+)?)\s*["″]\s*([NS])\s*[,;\s]+\s*(\d{1,3})\s*[°º]\s*(\d{1,2})\s*['′]\s*(\d{1,2}(?:[.,]\d+)?)\s*["″]\s*([EW])\s*$/i;
  const match = text.match(pattern);
  if (!match) return null;
  const number = (value) => Number(String(value).replace(",", "."));
  const latDegrees = number(match[1]);
  const latMinutes = number(match[2]);
  const latSeconds = number(match[3]);
  const lonDegrees = number(match[5]);
  const lonMinutes = number(match[6]);
  const lonSeconds = number(match[7]);
  if (latDegrees > 90 || lonDegrees > 180 || latMinutes >= 60 || lonMinutes >= 60 || latSeconds >= 60 || lonSeconds >= 60) return null;
  let lat = latDegrees + latMinutes / 60 + latSeconds / 3600;
  let lon = lonDegrees + lonMinutes / 60 + lonSeconds / 3600;
  if (match[4].toUpperCase() === "S") lat *= -1;
  if (match[8].toUpperCase() === "W") lon *= -1;
  return { lat: lat.toFixed(6), lon: lon.toFixed(6) };
}

async function updateDmsCoordinates(token) {
  const rows = await sheetsGet(token, env.rawTab);
  const headerAt = rows.slice(0, 25).findIndex((row) => row.map(slugKey).includes("gps_raw"));
  if (headerAt < 0) throw new Error(`gps_raw header not found in ${env.rawTab}`);
  const headers = rows[headerAt].map(slugKey);
  const rawCol = headers.indexOf("gps_raw");
  const latCol = headers.indexOf("gps_latitude");
  const lonCol = headers.indexOf("gps_longitude");
  if (latCol < 0 || lonCol < 0) throw new Error(`GPS output columns not found in ${env.rawTab}`);

  let converted = 0;
  for (let index = headerAt + 1; index < rows.length; index++) {
    const row = rows[index] || [];
    const coords = parseDmsCoordinates(row[rawCol]);
    if (!coords) continue;
    const rowNumber = index + 1;
    if (String(row[latCol] || "") !== coords.lat) {
      await sheetsUpdate(token, rowNumber, latCol, coords.lat, env.rawTab);
    }
    if (String(row[lonCol] || "") !== coords.lon) {
      await sheetsUpdate(token, rowNumber, lonCol, coords.lon, env.rawTab);
    }
    converted += 1;
  }
  console.log(`Checked DMS coordinates. ${converted} DMS row(s) are standardized.`);
}

async function ensureWebpColumns(token, rows, headerAt, idx, properties) {
  const header = rows[headerAt] || [];
  let nextCol = header.length;
  const missingCount = ["photo_front_webp_url", "photo_context_webp_url"]
    .filter((field) => idx[field] === undefined).length;
  await ensureSheetColumns(token, properties, nextCol + missingCount);
  for (const field of ["photo_front_webp_url", "photo_context_webp_url"]) {
    if (idx[field] !== undefined) continue;
    const name = field;
    await sheetsUpdate(token, headerAt + 1, nextCol, name);
    idx[field] = nextCol;
    header[nextCol] = name;
    nextCol += 1;
  }
}

async function driveJson(token, url, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`Drive request failed: HTTP ${res.status} ${await res.text()}`);
  return res.json();
}

async function driveDownload(token, fileId) {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Could not download ${fileId}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function driveName(token, fileId) {
  const meta = await driveJson(token, `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name`);
  return meta.name || fileId;
}

function driveQueryValue(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

async function findOutputFile(token, name) {
  const query = `name = '${driveQueryValue(name)}' and '${driveQueryValue(env.outputFolderId)}' in parents and trashed = false`;
  const url = new URL("https://www.googleapis.com/drive/v3/files");
  url.searchParams.set("q", query);
  url.searchParams.set("spaces", "drive");
  url.searchParams.set("fields", "files(id,name,modifiedTime)");
  url.searchParams.set("orderBy", "modifiedTime desc");
  url.searchParams.set("pageSize", "1");
  const result = await driveJson(token, url.toString());
  return result.files?.[0] || null;
}

async function waitForOutputFile(token, name) {
  for (let attempt = 0; attempt < 45; attempt++) {
    const file = await findOutputFile(token, name);
    if (file) return file;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  throw new Error(`Google Drive did not finish syncing ${name} within 90 seconds`);
}

function webpFileName(originalName, sourceFileId) {
  const base = path.basename(originalName, path.extname(originalName)) || "billboard-photo";
  const safeBase = base.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "billboard-photo";
  return `${safeBase}-${sourceFileId.slice(-12)}.webp`;
}

async function saveThroughDriveDesktop(token, originalName, sourceFileId, webpBuffer) {
  const name = webpFileName(originalName, sourceFileId);
  const existing = await findOutputFile(token, name);
  if (existing) return `https://drive.google.com/file/d/${existing.id}/view`;
  await fs.mkdir(env.outputLocalPath, { recursive: true });
  await fs.writeFile(path.join(env.outputLocalPath, name), webpBuffer);
  console.log(`Saved ${name}; waiting for Google Drive to sync it...`);
  const synced = await waitForOutputFile(token, name);
  return `https://drive.google.com/file/d/${synced.id}/view`;
}

async function uploadWebp(token, originalName, sourceFileId, webpBuffer) {
  if (env.outputLocalPath) {
    return saveThroughDriveDesktop(token, originalName, sourceFileId, webpBuffer);
  }
  const base = path.basename(originalName, path.extname(originalName)) || "billboard-photo";
  const metadata = {
    name: `${base}.webp`,
    mimeType: "image/webp",
    parents: [env.outputFolderId],
  };
  const boundary = `tmg_${crypto.randomBytes(12).toString("hex")}`;
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`),
    Buffer.from(`--${boundary}\r\nContent-Type: image/webp\r\n\r\n`),
    webpBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ]);
  const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
      "Content-Length": String(body.length),
    },
    body,
  });
  if (!res.ok) throw new Error(`Could not upload WebP: HTTP ${res.status} ${await res.text()}`);
  const created = await res.json();
  return `https://drive.google.com/file/d/${created.id}/view`;
}

async function convertOne({ driveToken, sheetsToken, row, rowNumber, sourceCol, targetCol, label }) {
  const sourceUrl = String(row[sourceCol] || "").trim();
  const targetUrl = String(row[targetCol] || "").trim();
  if (!sourceUrl || targetUrl) return false;
  const fileId = driveFileId(sourceUrl);
  if (!fileId) {
    console.log(`Skipping ${label} row ${rowNumber}: not a Google Drive URL`);
    return false;
  }
  const [name, input] = await Promise.all([driveName(driveToken, fileId), driveDownload(driveToken, fileId)]);
  const webp = await sharp(input)
    .rotate()
    .resize({ width: env.maxWidth, withoutEnlargement: true })
    .webp({ quality: env.quality })
    .toBuffer();
  const link = await uploadWebp(driveToken, name, fileId, webp);
  await sheetsUpdate(sheetsToken, rowNumber, targetCol, link);
  console.log(`Converted ${label} row ${rowNumber}: ${name} -> ${link}`);
  return true;
}

async function main() {
  const scopes = ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"];
  const token = await googleToken(scopes);
  await updateDmsCoordinates(token);
  const [rows, properties] = await Promise.all([sheetsGet(token), sheetsMetadata(token)]);
  const headerAt = findHeaderRow(rows);
  const idx = buildColumnIndex(rows[headerAt] || []);
  await ensureWebpColumns(token, rows, headerAt, idx, properties);

  let converted = 0;
  for (let i = headerAt + 1; i < rows.length && converted < env.limit; i++) {
    const row = rows[i] || [];
    const rowNumber = i + 1;
    if (idx.photo_front_url !== undefined && idx.photo_front_webp_url !== undefined) {
      if (await convertOne({ driveToken: token, sheetsToken: token, row, rowNumber, sourceCol: idx.photo_front_url, targetCol: idx.photo_front_webp_url, label: "front" })) converted++;
    }
    if (converted >= env.limit) break;
    if (idx.photo_context_url !== undefined && idx.photo_context_webp_url !== undefined) {
      if (await convertOne({ driveToken: token, sheetsToken: token, row, rowNumber, sourceCol: idx.photo_context_url, targetCol: idx.photo_context_webp_url, label: "context" })) converted++;
    }
  }
  console.log(`Done. Converted ${converted} image(s).`);
}

await main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
