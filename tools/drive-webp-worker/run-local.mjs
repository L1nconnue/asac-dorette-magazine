import fs from "node:fs/promises";

const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
if (!keyPath) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is required");

const credentials = JSON.parse(await fs.readFile(keyPath, "utf8"));
if (!credentials.client_email || !credentials.private_key) {
  throw new Error("The service account JSON file is missing client_email or private_key");
}

process.env.GOOGLE_CLIENT_EMAIL = credentials.client_email;
process.env.GOOGLE_PRIVATE_KEY = credentials.private_key;

await import("./worker.mjs");
