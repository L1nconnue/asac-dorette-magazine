# Updating images on the site

The magazine has three kinds of images you can swap:

1. **Hero** — the giant photo behind "ASSURANCES & SÉCURITÉ" on the home page
2. **Featured panels** — the 4 stacked scroll cards on the home page (Focus, Emploi, Ça Bouge, Actualité)
3. **Category cards** — the squares that appear in the menu page grid, one per section

There are two ways to update each: edit the code (works whether or not the CMS is set up), or drop an image in your Drive folder (only works once `SETUP.md` is complete).

---

## Option A — Drop images in your Drive folder *(recommended once the CMS is configured)*

This is the simplest. No code, no redeploy.

### To set the **hero image**

1. Open your root magazine folder in Drive.
2. Upload an image file (JPEG, PNG, or WebP). Name it **`hero.jpg`** (or `hero.png`, etc.).
3. Wait up to 60 seconds, refresh the homepage. The hero updates.

> If you have multiple images in the root and want one specifically as the hero, name it `hero.*`. Otherwise the file alphabetically first (e.g. starting with `_`) wins.

### To set a **category card image** (which is also the home featured panel)

1. Open the matching category subfolder in Drive (e.g. `04-Focus/`).
2. Upload an image file. Name it **`cover.jpg`**.
3. Wait 60 seconds, refresh. The image now appears on both the menu card AND the home page panel (if that category is one of the 4 featured ones).

The same fallback applies — name it `cover.*` to be explicit, or prefix with `_` to force first-place, or upload nothing and the site uses the baked default.

### Where the images are actually served from

You don't have to make Drive images publicly viewable. The site fetches each image through `/api/image?id=DRIVE_ID`, which uses the service account to read it. They're then cached at the edge for 24 hours.

### File format notes

- **Recommended**: JPEG, 1600×1000px, ≤500 KB. Sized for retina displays at typical site widths.
- WebP works too if your source files are WebP.
- PNG is fine for graphic content but heavier.
- The image gets cached aggressively, so if you replace it with a same-named file, you may need to wait 24 hours OR rename it (e.g. `cover-v2.jpg`).

---

## Option B — Edit the code *(works without any CMS setup)*

Use this if you haven't done the Google Cloud / service account setup yet, or just want full control.

### Hero image

Open `index.html`. Find this near line 75:

```html
<section class="panel" data-panel="0">
  <div class="panel__media">
    <div class="panel__img" style="background-image:url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=85&auto=format&fit=crop')"></div>
```

Replace the URL inside `url(...)`. It can be:
- An external URL (Unsplash, your own CDN, etc.)
- A local path like `assets/hero.jpg` (put the file in the `assets/` folder)

### Featured panel images (the 4 stacked cards)

Same file, `index.html`. Search for `panel--feature` — there are 4 sections starting around line 90:

```html
<section class="panel panel--feature" data-panel="1" data-category="Focus">
  <div class="panel__media">
    <div class="panel__img" style="background-image:url('…')"></div>
```

Each section has its own `background-image:url(...)`. Replace the four URLs:
- Line ~90 — Focus
- Line ~107 — Emploi
- Line ~124 — Ça Bouge
- Line ~141 — Actualité

### Category card images (in the menu grid)

Open `script.js`. Search for `const CATEGORIES`. Each entry has an `image:` field:

```js
{
  id: 'focus',
  name: { fr: 'Focus', en: 'Focus' },
  image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=85&auto=format&fit=crop',
  articles: [ … ],
},
```

Replace the `image:` URL for each of the 11 categories.

---

## Image sizing reference

| Slot                      | Recommended size      | Aspect    |
| ------------------------- | --------------------- | --------- |
| Hero                      | 1920 × 1080 (or wider)| Landscape |
| Featured panel (×4)       | 1920 × 1080           | Landscape |
| Category card             | 1200 × 1200           | Square    |

Smaller images get upscaled and look blurry on big screens. Larger images get downscaled by browsers, which is fine — don't worry about going over.

---

## After updating

- **Drive option:** wait ~60 seconds (the API cache window), refresh the page.
- **Code option:** redeploy (`vercel --prod`, or push to the connected branch, or drag-drop the folder on vercel.com).

If you ever see an old image after updating, do a hard refresh on your browser (Ctrl/Cmd + Shift + R) — your browser cached the previous one.
