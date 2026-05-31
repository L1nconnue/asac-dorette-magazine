# ASAC — Assurances et Sécurité

The web magazine of the **Association des Sociétés d'Assurance du Cameroun** (ASAC).

A fully responsive, editorial-grade publication inspired by Floema, with:

- **Stacked-card scroll** on the home page — sections slide up from below with cubic easing
- **Bilingual** French / English with a sleek inline switcher
- **Sommaire / Contents** menu with a clean grid of category cards; each card reveals a background image on hover with red→white arrow swap
- **Article list** screens per category, with full-width blocks and image hovers
- **Article modal** with backdrop blur, staggered fade-in (particle-style entry), drop cap, and editorial typography
- **Custom cursor**, smooth typography (Bebas Neue + Poppins), and full mobile responsiveness with a burger menu

## File structure

```
.
├── index.html          # Single-page entry
├── styles.css          # Stylesheet
├── script.js           # All interactions + content data
├── vercel.json         # Vercel headers & cache config
└── assets/
    ├── logo-blue.png       # ASAC horizontal logo (light backgrounds)
    ├── logo-white.png      # ASAC horizontal logo (dark backgrounds)
    ├── arrow_red.svg       # Arrow icon (light mode)
    ├── arrow_white.svg     # Arrow icon (dark mode)
    ├── favicon.svg
    └── favicon.png
```

## Local development

This is a pure static site. To preview:

```bash
# Any static server works
npx serve .
# or
python3 -m http.server 5173
```

Then open the printed URL (usually <http://localhost:3000> or <http://localhost:5173>).

## Deploy to Vercel

### Option A — Drag & drop
1. Zip this folder.
2. Go to <https://vercel.com/new> and drop the zip onto the dashboard.

### Option B — CLI
```bash
npm i -g vercel
vercel
```

### Option C — Git
1. Push this folder to a GitHub / GitLab repo.
2. Import the repo on Vercel; no build step required.

## Content

Article data lives at the top of `script.js` in the `CATEGORIES` array. Each article has bilingual titles, and one fully written body lives in `ARTICLE_BODIES`. All other articles use a graceful French/English fallback body.

Placeholder photography is sourced from Unsplash CDN URLs — replace with your own assets for production.

## License

© ASAC — All rights reserved.
