// lib/google.js
// Shared authentication helper for the Google Drive + Docs APIs.
// Reads the service-account JSON from either GOOGLE_SERVICE_ACCOUNT_KEY_B64
// (base64-encoded, recommended for Vercel) or GOOGLE_SERVICE_ACCOUNT_KEY (raw JSON).

const { google } = require('googleapis');

let _authClient = null;

function loadCredentials() {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_B64;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (b64) {
    try {
      const json = Buffer.from(b64, 'base64').toString('utf8');
      return JSON.parse(json);
    } catch (err) {
      throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY_B64 — could not decode base64 JSON: ' + err.message);
    }
  }
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY — could not parse JSON: ' + err.message);
    }
  }
  throw new Error(
    'No Google credentials configured. Set either GOOGLE_SERVICE_ACCOUNT_KEY_B64 (recommended) ' +
    'or GOOGLE_SERVICE_ACCOUNT_KEY in your Vercel project environment variables. ' +
    'See docs/SETUP.md for the full procedure.'
  );
}

async function getAuth() {
  if (_authClient) return _authClient;
  const credentials = loadCredentials();
  _authClient = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/documents.readonly',
      'https://www.googleapis.com/auth/cloud-translation',
    ],
  });
  return _authClient;
}

async function getDrive() {
  const auth = await getAuth();
  return google.drive({ version: 'v3', auth });
}

async function getDocs() {
  const auth = await getAuth();
  return google.docs({ version: 'v1', auth });
}

// Terms that must NEVER be translated regardless of language setting.
// These are proper names, brand names and legal identifiers whose French
// form is canonical even in English contexts.
const PROTECTED_TERMS = [
  // Magazine identity
  'ASSURANCES & SÉCURITÉ',
  'ASSURANCES ET SÉCURITÉ',
  'Assurances & Sécurité',
  'Assurances et Sécurité',
  // Organisation names
  'ASAC',
  "Association des Sociétés d'Assurances du Cameroun",
  "Le Magazine de l'Association des Sociétés d'Assurances du Cameroun",
  // Regional / regulatory bodies (translate poorly or incorrectly)
  'CIMA',
  'FANAF',
  'CIPRES',
  'BEAC',
];

// Wrap each protected term in <span translate="no">…</span> before sending
// to the API so Cloud Translation skips them. Works in format='html' mode.
// For format='text' we use placeholder tokens instead (since text mode ignores HTML).
function protectTerms(input, format) {
  let result = input;
  const map = {}; // placeholder → original term (text mode only)
  PROTECTED_TERMS.forEach((term, i) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(escaped, 'g');
    if (format === 'html') {
      result = result.replace(re, `<span translate="no">${term}</span>`);
    } else {
      const placeholder = `\u00ABP${i}P\u00BB`; // use «P0P» tokens unlikely to appear in real text
      map[placeholder] = term;
      result = result.replace(re, placeholder);
    }
  });
  return { protected: result, map };
}

// After translation, restore text-mode placeholders and strip the html-mode spans.
function unprotectTerms(translated, format, map) {
  let result = translated;
  if (format === 'html') {
    // Remove only the wrapping spans — keep the content
    result = result.replace(/<span translate="no">([\s\S]*?)<\/span>/g, '$1');
  } else {
    // Restore placeholder tokens
    for (const [placeholder, original] of Object.entries(map)) {
      result = result.split(placeholder).join(original);
    }
  }
  return result;
}

// Translate a batch of strings (or a single HTML blob) via Cloud Translation v2.
// `format` can be 'text' (default) or 'html' — html preserves tags and only
// translates the visible text content, which is exactly what we want for
// rendered article HTML.
//
// Set ASAC_DISABLE_TRANSLATION=1 in env to short-circuit (useful when the
// Cloud Translation API isn't enabled in the GCP project yet).
async function translate(values, { source = 'fr', target = 'en', format = 'text' } = {}) {
  if (process.env.ASAC_DISABLE_TRANSLATION === '1') return values;
  if (source === target) return values;
  const items = Array.isArray(values) ? values : [values];
  if (!items.length) return values;

  // Protect terms before translation
  const protectedItems = [];
  const maps = [];
  for (const item of items) {
    const { protected: p, map } = protectTerms(item || '', format);
    protectedItems.push(p);
    maps.push(map);
  }

  const auth = await getAuth();
  const translateApi = google.translate({ version: 'v2', auth });
  const res = await translateApi.translations.translate({
    requestBody: { q: protectedItems, source, target, format },
  });
  const out = (res.data && res.data.data && res.data.data.translations) || [];

  const decoded = items.map((orig, i) => {
    const t = out[i] && out[i].translatedText;
    if (!t) return orig;
    let restored = unprotectTerms(t, format, maps[i]);
    // Decode HTML entities in plain-text output
    if (format !== 'html') {
      restored = restored
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    }
    return restored;
  });
  return Array.isArray(values) ? decoded : decoded[0];
}

function getRootFolderId() {
  const id = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!id) {
    throw new Error(
      'GOOGLE_DRIVE_ROOT_FOLDER_ID is not set. This must be the Drive folder ID ' +
      'of your magazine root folder (the one containing one subfolder per category). ' +
      'See docs/SETUP.md.'
    );
  }
  return id;
}

// Convert "01-Éditorial" -> { order: 1, name: "Éditorial" }
// Recognises separators: "-", "_", or whitespace between leading digits and name.
function parseOrderedName(name) {
  const m = name.match(/^(\d+)[-_.\s]+(.+?)\s*$/);
  if (m) return { order: parseInt(m[1], 10), name: m[2] };
  return { order: 9999, name };
}

// Slug for category id (matches the IDs used in script.js so the frontend can swap data in)
function slugify(s) {
  return s
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

module.exports = {
  getAuth,
  getDrive,
  getDocs,
  translate,
  getRootFolderId,
  parseOrderedName,
  slugify,
};
