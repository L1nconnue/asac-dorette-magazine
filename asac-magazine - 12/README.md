# ASAC Magazine — Assurances & Sécurité

A bilingual (FR / EN) online magazine for the **Association des Sociétés d'Assurance du Cameroun**, inspired by floema.com. Built as a static site with optional Google Drive CMS for content management.

**Issue:** N°46 — Juin 2026

---

## What's inside

| File / Folder              | Purpose                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `index.html`               | Home page (hero, stacked-panel features, menu overlay, category list)   |
| `article.html`             | Individual article page (frost nav, hero, body, sources, back link)     |
| `styles.css`               | All styling, one file                                                   |
| `script.js`                | All client-side logic, one file. Detects page via `body[data-page]`     |
| `assets/`                  | Logos, favicons, arrow SVGs                                             |
| `api/categories.js`        | Vercel serverless function — lists Drive folders as categories          |
| `api/article.js`           | Vercel serverless function — fetches a Doc, returns clean semantic HTML |
| `lib/google.js`            | Shared service-account auth helper                                      |
| `docs/SETUP.md`            | Step-by-step Google Cloud + Vercel setup                                |
| `docs/FOLDER-STRUCTURE.md` | Drive folder/file naming convention                                     |
| `package.json`             | `googleapis` dependency                                                 |
| `vercel.json`              | Clean URLs, rewrites for `/article/[id]`, function config, cache headers |

---

## Deploy (static mode — no CMS)

The fastest path. The site runs entirely from the baked content in `script.js`.

1. Push this folder to a Git repo, **or** drag-drop the folder onto vercel.com.
2. Vercel auto-detects it as a static project. No build step needed.
3. Done.

Article URLs will look like `/article.html?id=focus-0&cat=focus`. The site works fine; the CMS endpoints just return 500s, and the frontend silently falls back.

## Deploy (CMS mode — auto-updates from Google Drive)

Follow **`docs/SETUP.md`** end to end. ~15 minutes the first time. Once configured:

- The frontend calls `/api/categories` on every page load (edge-cached 60s)
- When you open an article, if its ID is a Google Doc ID the frontend fetches `/api/article?id=...` and renders the live content
- Edit a doc → wait up to a minute → refresh → see the change

The two modes coexist. Articles defined in both Drive and `ARTICLE_BODIES` (in `script.js`) prefer the Drive version.

---

## Features

- **Floema-inspired stacked-panel scroll** on the home page (4 feature panels rise on top of the hero)
- **Bilingual UI** with FR/EN toggle, full translations of every UI string
- **Real article pages** (not modals) with clean URLs
- **Frost-on-scroll nav** on the menu page and article pages — never on home
- **Download the issue as PDF** — single click generates the entire magazine as a styled A4 PDF using jsPDF (no server roundtrip)
- **Custom cursor** with `mix-blend-mode: difference` on desktop
- **Google Drive CMS** layer (optional)
- **Responsive** down to 360px

---

## Local development

There's no build step. Open `index.html` directly in a browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

For the API endpoints to work locally you need `vercel dev` (which loads env vars from `.env.local`):

```bash
npm install -g vercel
npm install
vercel dev
```

Create `.env.local` with the same variables documented in `docs/SETUP.md`.

---

## Editing content

### Static articles (in `script.js`)

The `CATEGORIES` array near the top controls the menu. Each entry has `id`, `name.{fr,en}`, `image`, and `articles[]`.

The `ARTICLE_BODIES` object further down contains the actual content. Each entry can include:
- `author.{fr,en}` — byline name
- `role.{fr,en}` — italic role line under the byline
- `lead.{fr,en}` — opening paragraph with the blue left bar
- `paragraphs.{fr,en}` — array of body paragraphs (rendered before the inline image)
- `sections.{fr,en}` — array of `{h, p}` objects (rendered after the inline image)
- `pullQuote.{fr,en}` — optional emphasized quote, dropped in the middle of `sections`
- `sources` — optional array of `{label, url}` links
- `image` — hero image URL (overrides the category's default)

Articles without a body entry get a generic fallback (`makeGenericBody()`).

### Live articles (Google Drive)

Just edit the Google Doc. See `docs/FOLDER-STRUCTURE.md` for the conventions the parser expects.

---

## Built by

Magazine: **ASAC** — Association des Sociétés d'Assurance du Cameroun  
Site design & build: **MW DDB Cameroon**
