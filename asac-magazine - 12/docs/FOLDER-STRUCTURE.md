# Folder & file naming convention

This guide tells you exactly how to organize your Google Drive folder so the site reads it correctly. Read `SETUP.md` first if you haven't done the credentials setup yet.

---

## 1. The root folder

You have **one** root folder per issue. Its name doesn't matter — the code reads it by ID, not by name. We recommend:

```
ASAC Magazine N°46 — Juin 2026/
```

The folder ID is the part of the URL after `/folders/`. Set it as `GOOGLE_DRIVE_ROOT_FOLDER_ID` in Vercel.

---

## 2. Category subfolders

Inside the root, create **one folder per category**. The folder name controls both the **order** in the menu and the **display label**.

**Format:** `NN-Category Name`

- `NN` = two-digit order (`01`, `02`, …)
- Separator can be `-`, `_`, `.` or space
- The order prefix is **stripped** before display

### Recommended set (mirrors the current site)

```
01-Éditorial
02-Actualité
03-Évènement
04-Focus
05-Vie de l'ASAC
06-Ça bouge !
07-Votre avis compte
08-Les métiers de l'assurance
09-Emploi
10-Instant fun - Jeu
11-Membres de l'ASAC
```

The site has built-in English translations for each of these names (see `CATEGORY_NAME_OVERRIDES` in `script.js`). If you add a new category not in that list, the site will use the French name as the English fallback — edit `script.js` to add a proper translation when you do.

---

## 3. Article docs inside each category

Inside each category folder, create Google Docs (not `.docx` uploads — see troubleshooting in `SETUP.md`). Same `NN-Title` convention:

```
04-Focus/
├── 01-La dématérialisation de l'assurance automobile au Cameroun
├── 02-L'assurance agricole face aux défis climatiques
└── 03-…
```

The order prefix controls display order in the menu and contents page. The rest is the article title that appears on the site.

---

## 4. Inside the article document

The CMS extracts **only** the following from each doc:

| Doc element                | Rendered as          |
| -------------------------- | -------------------- |
| Title style                | `<h1>` (the headline) |
| Heading 1                  | `<h1>`               |
| Heading 2                  | `<h2>`               |
| Heading 3                  | `<h3>`               |
| Normal text                | `<p>`                |
| **Bold** inline            | `<strong>`           |
| *Italic* inline            | `<em>`               |
| Hyperlink                  | `<a target="_blank">` |
| Inline image               | `<img>`              |
| Bulleted list              | `<ul><li>`           |

Everything else is **deliberately dropped**:

- Custom fonts, font sizes, font colors
- Background colors
- Underline, strikethrough
- Page breaks, footnotes, comments
- Tabular columns

This keeps the visual presentation consistent across articles — the doc decides *what* is content, the site decides *how* it looks.

### Writing tip — bylines and roles

The site renders a byline block under the title. The CMS doesn't have a structured "author" field, so:

- Make the first **Heading 2** under the title the author's name
- Make the first **italicized line** after that the author's role / affiliation

The frontend's article template will use these conventions when rendering live docs. (If you need stricter structure, the in-file `ARTICLE_BODIES` in `script.js` always wins — see "Hybrid mode" below.)

---

## 5. Images

Drag images directly into the doc. The Docs API returns rendered URLs that the site embeds as `<img>` tags. The grid layout is preserved; if you want a wider image, just insert it on its own paragraph (no surrounding text).

Note: the URLs Google returns are signed and expire after ~30 minutes. The frontend re-fetches on every article view, so this isn't a problem in practice — but **don't** hot-link these URLs from elsewhere.

---

## 6. Hybrid mode — mixing baked + live content

The frontend tries the CMS first; if anything fails (network down, env vars missing, doc deleted), it falls back to the static `ARTICLE_BODIES` in `script.js`. This means:

- Critical "evergreen" articles can stay in `script.js` for guaranteed availability and faster first paint.
- Everything else can live in Drive and update automatically.

There's no toggle to flip — it's the same site, the same URL. The fallback is invisible to readers.

---

## 7. Issue number and month

These come from Vercel env vars, not Drive:

| Variable                | Example       |
| ----------------------- | ------------- |
| `ASAC_ISSUE_NUMBER`     | `46`          |
| `ASAC_ISSUE_MONTH_FR`   | `Juin 2026`   |
| `ASAC_ISSUE_MONTH_EN`   | `June 2026`   |

Update them between issues, then redeploy. The red badge on the homepage and the cover of the downloadable PDF will reflect the new value.

---

## 8. Quick checklist before publishing

- [ ] Each category folder named `NN-Name`
- [ ] Each article is a Google Doc (not a `.docx` upload), named `NN-Title`
- [ ] All folders + docs shared with the service account email (Viewer)
- [ ] Used Heading 1/2/3 + Normal styles (not just bigger font)
- [ ] Bold and italic only for emphasis; no rainbow text
- [ ] Images embedded inline, not linked externally
- [ ] `ASAC_ISSUE_NUMBER` / `_MONTH_*` env vars updated
- [ ] Redeployed
