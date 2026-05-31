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
  getRootFolderId,
  parseOrderedName,
  slugify,
};
