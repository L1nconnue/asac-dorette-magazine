# TheMedia.guide — Platform (first build)

Private, mobile-first media inventory platform for Cameroon. Billboards are the first complete
category; Printers and TV & Radio ship as preview card catalogues. Magazines is included as a
future/secondary route but is not shown as one of the three primary home cards yet.

Stack: Next.js 16 (App Router, TypeScript) · Tailwind · Framer Motion · MapLibre GL · Sora
from Google Fonts · Google Sheets as the live database · deployed on Vercel.

## Run it locally

```bash
npm install
cp .env.example .env.local     # fill in DASHBOARD_PASSWORD and AUTH_SECRET
npm run dev                    # http://localhost:3000
```

If your local npm cache has permission problems, use a project-local cache:

```bash
npm install --cache ./.npm-cache
```

## How the data flows

```
Google Sheet (Billboard_Database)
        │  read every 60s, server-side only
        ▼
src/lib/sheets.ts ──► src/lib/normalize.ts ──► /api/billboards ──► map, filters, cards
```

- Only rows with `database_status = APPROVED` reach the platform. `Raw_Submissions` is never read.
- One row = one structure (faces are shown as a count, not as separate items).
- Column names are matched loosely: `regie`, `owner`, `owner_company` all resolve to the owner field,
  so renaming a column in the sheet will not break the site.
- If the sheet is briefly unreachable, the last good copy is served and marked stale. If it has never
  been read, three clearly-labelled sample billboards keep the map usable.

## Protections

- Every route (pages and APIs) sits behind a password gate; the login cookie is HttpOnly, signed and
  expires after 12 hours. Login is throttled to 8 attempts per IP per 10 minutes.
- Sheet credentials stay server-side. The browser only ever talks to this app.
- Billboard photos are streamed through `/api/photo`, which accepts Drive/Kobo hosts. Public Drive
  links work by link sharing; private Drive files work when the photo folder is shared with the same
  service account used by the app. Private Kobo attachments need `KOBO_API_TOKEN`.
- Security headers, a content security policy, and `noindex` are set for all routes.

## Performance

- Background art compressed to WebP (122 KB desktop / 42 KB mobile, from a 1.8 MB PNG).
- MapLibre loads only on `/billboards`, and only in the browser.
- Photos are lazy-loaded, proxied and cached; the initial JS payload is around 100 KB.
- WebP photo columns are supported. If `photo_front_webp_url` or `photo_context_webp_url`
  exists in the sheet, the platform uses those first and falls back to the original photo columns.
- System font stack — no font download. To use Inter instead, add `next/font/google` in
  `src/app/layout.tsx` and point `--font-inter` at it.

## What is real and what is not

| Section | Data |
| --- | --- |
| Billboards | Real — live from the master sheet |
| Printers, TV & Radio | **Placeholder listings** in `src/lib/catalogues.ts`. Replace before showing clients. |
| Magazines | Future/secondary route with placeholder listings. Add to the home screen only when ready. |

## Verification status

This cleaned build was checked with:

```bash
npm run build
npm audit --omit=dev
```

The production build passes and the production dependency audit reports zero vulnerabilities.

## Map basemap

Default is the local MapLibre style at `/map-styles/themedia-dark.json`, which points to CARTO dark
raster tiles and keeps attribution on the map. The app now falls back to this bundled style if
`MAP_STYLE_URL` is blank or points somewhere outside `/map-styles/`, which prevents old Vercel
environment variables from breaking the map. For a fully custom provider later, update the map style
resolver and the content security policy together.

See `DEPLOY.md` for GitHub + Vercel setup.
See `DRIVE_WEBP_AUTOMATION.md` for the recommended Drive photo conversion workflow.
