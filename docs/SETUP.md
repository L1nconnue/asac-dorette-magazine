# ASAC Magazine — Google Drive CMS Setup

This site can run two ways:

1. **Static mode** — all content is baked into `script.js`. Just deploy and go. No Google setup required.
2. **CMS mode** — categories and article content come live from a Google Drive folder. Edit a doc, refresh the site, the change is there within ~1 minute.

The CMS mode is the goal of this guide. The frontend already knows how to talk to it; you just need to wire up the credentials.

---

## How it works (60-second version)

```
Google Drive                           Vercel                   Browser
─────────────                          ──────                   ───────
ASAC Magazine N°46/    ◀── reads ──   /api/categories.js  ──▶  CATEGORIES
├── 01-Éditorial/                     /api/article.js      ──▶  article HTML
│   ├── 01-La sentinelle…gdoc
│   ├── 02-On ne pilote pas…gdoc
├── 02-Actualité/
└── …
```

- One root folder = the issue. Subfolders = categories. Google Docs inside = articles.
- A service account reads everything in read-only mode. No OAuth flow, no per-user login.
- Edits in Google Docs become visible on the site after the edge cache expires (60 seconds, set in `api/*.js`).

---

## Part A — Google Cloud project + service account

You only do this once.

### A1. Create a Google Cloud project

1. Go to https://console.cloud.google.com/
2. Top-left dropdown → **New Project**
3. Name it something like `ASAC Magazine CMS`, click **Create**

### A2. Enable the APIs

In the new project:

1. Open https://console.cloud.google.com/apis/library
2. Search for **Google Drive API** → click → **Enable**
3. Search for **Google Docs API** → click → **Enable**

### A3. Create the service account

1. https://console.cloud.google.com/iam-admin/serviceaccounts
2. **Create service account**
3. Name: `asac-magazine-reader`. Click **Create and continue**.
4. Skip the "grant access" step. Click **Done**.
5. The service account now appears in the list. **Copy its email address** — it looks like `asac-magazine-reader@asac-magazine-cms.iam.gserviceaccount.com`. You'll need it in Part B.

### A4. Generate a key

1. Click the service-account row → **Keys** tab → **Add key** → **Create new key** → **JSON** → **Create**.
2. A `.json` file downloads. Keep it secret — anyone with this file can read your magazine folder.

### A5. Base64-encode the key (for Vercel)

Vercel environment variables can't contain literal newlines, and the JSON has plenty. The cleanest way to ship it is base64:

**macOS / Linux:**
```bash
base64 -i ~/Downloads/asac-magazine-cms-*.json | tr -d '\n' | pbcopy   # macOS
base64 -w0 ~/Downloads/asac-magazine-cms-*.json | xclip -selection clipboard  # Linux
```

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$HOME\Downloads\asac-magazine-cms-xxx.json")) | Set-Clipboard
```

You now have a single long base64 string on your clipboard. That's `GOOGLE_SERVICE_ACCOUNT_KEY_B64`.

---

## Part B — Share the Drive folder with the service account

1. Open your Drive root folder (the one that contains your `01-Éditorial/`, `02-Actualité/` etc. subfolders).
2. Click **Share** in the top-right.
3. Paste the service-account email from step A3.
4. Set the role to **Viewer**.
5. Uncheck "Notify people" (the service account doesn't read email).
6. Click **Share**.

Now copy the folder ID from the URL. Drive URLs look like:

```
https://drive.google.com/drive/folders/1t1glfplHipbmoL8hXcdKryto1M0TbW1F
                                       └──────── this is the ID ────────┘
```

That's `GOOGLE_DRIVE_ROOT_FOLDER_ID`.

---

## Part C — Set Vercel environment variables

1. Open your project on Vercel → **Settings** → **Environment Variables**.
2. Add the following, marking each as available in **Production**, **Preview**, and **Development**:

   | Name                                  | Value                                                |
   | ------------------------------------- | ---------------------------------------------------- |
   | `GOOGLE_SERVICE_ACCOUNT_KEY_B64`      | The base64 string from A5                            |
   | `GOOGLE_DRIVE_ROOT_FOLDER_ID`         | The folder ID from B                                 |
   | `ASAC_ISSUE_NUMBER`                   | `46`                                                 |
   | `ASAC_ISSUE_MONTH_FR`                 | `Juin 2026`                                          |
   | `ASAC_ISSUE_MONTH_EN`                 | `June 2026`                                          |

3. Click **Save** on each.
4. Trigger a redeploy: **Deployments** → top deployment → **⋯** → **Redeploy**.

Vercel injects these into `process.env` for every serverless function invocation. The frontend never sees them.

### Variant: storing the raw JSON instead of base64

If you'd rather not base64-encode it, you can paste the raw JSON into `GOOGLE_SERVICE_ACCOUNT_KEY` instead — but Vercel's UI sometimes mangles newline characters in long values, so base64 is the safer default. The code accepts either.

---

## Part D — Folder structure (Drive side)

See `FOLDER-STRUCTURE.md` for the exact convention. Quick version:

```
ASAC Magazine N°46/
├── 01-Éditorial/
│   ├── 01-La sentinelle et l'architecte
│   └── 02-On ne pilote pas une compagnie avec une calculatrice
├── 02-Actualité/
├── 03-Évènement/
├── 04-Focus/
├── 05-Vie de l'ASAC/
├── 06-Ça bouge !/
├── 07-Votre avis compte/
├── 08-Les métiers de l'assurance/
├── 09-Emploi/
├── 10-Instant fun - Jeu/
└── 11-Membres de l'ASAC/
```

The `NN-` prefix is **only used for ordering** — the code strips it before display. Same goes for article filenames inside each folder.

---

## Part E — Verify it's working

After redeploy, hit these two URLs in your browser:

- `https://your-site.vercel.app/api/categories`  
  Should return JSON listing your folders with article counts. If you see an `error` field, the hint inside tells you what's wrong.
- `https://your-site.vercel.app/api/article?id=<paste a doc id>`  
  Should return JSON with `title`, `html`, `images`. Open one of your docs in a browser and copy the ID from the URL.

When both endpoints return real data, the homepage and contents page will automatically reflect any change in Drive after one minute of cache TTL.

---

## Troubleshooting

| Symptom                                                | Likely cause                                                                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `/api/categories` returns `error: "No Google credentials configured"` | Env var name typo, or you forgot to redeploy after adding it.                                       |
| `error: "The caller does not have permission"`        | You didn't share the folder with the service-account email, or the role is wrong (must be at least Viewer).        |
| `error: "Requested entity was not found"`             | `GOOGLE_DRIVE_ROOT_FOLDER_ID` is wrong. Copy it again from the Drive URL.                                          |
| Categories show but no articles in them                | The Drive query is filtering by `mimeType='application/vnd.google-apps.document'`. Did you upload `.docx` files instead of converting them to Google Docs? Right-click the file in Drive → **Open with → Google Docs** to convert. |
| Article 404 on the site but the doc exists             | The doc lives outside the configured root folder. Move it into one of the category subfolders.                     |
| Bold/italic from the doc isn't showing                 | Make sure you used Docs' actual Bold/Italic buttons (not just a colored font). The API only reports semantic styles. |
| Inline images don't appear                             | The Docs API returns short-lived signed URLs (~30 min). The frontend re-fetches on every load, so this shouldn't be a problem unless you're caching aggressively somewhere. |

---

## Security notes

- The service-account key is **read-only** (we only request `drive.readonly` and `documents.readonly` scopes). Even if it leaked, the worst case is someone reading your magazine folder.
- The key never reaches the browser. Both `/api/categories` and `/api/article` run on Vercel's servers; only the rendered HTML is sent to the client.
- If you ever suspect the key has leaked, revoke it from https://console.cloud.google.com/iam-admin/serviceaccounts (Keys tab → Delete) and generate a new one.
