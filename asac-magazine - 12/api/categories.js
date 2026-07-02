// api/categories.js
// Vercel serverless function. Lists every subfolder of the root Drive folder
// as a category, counts the Google Docs inside each one, and returns the
// shape that the frontend's CATEGORIES array expects.
//
// Response cached at the edge for 60s, stale-while-revalidate 5 min,
// so a Docs edit shows up on the site within ~1 minute without hammering
// the Drive API.

const { getDrive, getRootFolderId, parseOrderedName, slugify, translate } = require('../lib/google');

module.exports = async function handler(req, res) {
  try {
    const drive = await getDrive();
    const rootId = getRootFolderId();

    // 1. List EVERY direct child of the root in one query (folders + files).
    //    Folders → categories. Image files in the root → hero candidate.
    const rootRes = await drive.files.list({
      q: `'${rootId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)',
      orderBy: 'name',
      pageSize: 500,
    });
    const rootChildren = rootRes.data.files || [];
    const folders = rootChildren.filter((f) => f.mimeType === 'application/vnd.google-apps.folder');
    const heroImage = pickCover(rootChildren, 'hero');

    // 2. For each subfolder, list its contents (docs + image files) in parallel
    const categories = await Promise.all(
      folders.map(async (folder) => {
        const childrenRes = await drive.files.list({
          q: `'${folder.id}' in parents and trashed=false`,
          fields: 'files(id, name, mimeType, modifiedTime)',
          orderBy: 'name',
          pageSize: 500,
        });
        const children = childrenRes.data.files || [];
        const docs = children.filter((f) => f.mimeType === 'application/vnd.google-apps.document');
        const coverImage = pickCover(children, 'cover');
        const { order: catOrder, name: displayName } = parseOrderedName(folder.name);
        return {
          id: slugify(displayName),
          folderId: folder.id,
          order: catOrder,
          name: { fr: displayName, en: displayName },
          count: docs.length,
          coverImage,
          articles: docs
            .map((doc) => {
              const { order, name } = parseOrderedName(doc.name);
              return {
                id: doc.id,
                docId: doc.id,
                order,
                title: { fr: name, en: name },
                modifiedTime: doc.modifiedTime,
              };
            })
            .sort((a, b) => a.order - b.order),
        };
      })
    );

    categories.sort((a, b) => a.order - b.order);

    // If the client asks for English, translate names + titles in one batch.
    const lang = (req.query && req.query.lang) || 'fr';
    if (lang === 'en') {
      try {
        // Build a single flat list to translate in one API call
        const strings = [];
        const slots = []; // [{kind, catIdx, artIdx?}]
        categories.forEach((c, ci) => {
          strings.push(c.name.fr);
          slots.push({ kind: 'cat', ci });
          c.articles.forEach((a, ai) => {
            strings.push(a.title.fr);
            slots.push({ kind: 'art', ci, ai });
          });
        });
        const translated = await translate(strings, { source: 'fr', target: 'en', format: 'text' });
        translated.forEach((t, i) => {
          const slot = slots[i];
          if (slot.kind === 'cat') categories[slot.ci].name.en = t;
          else categories[slot.ci].articles[slot.ai].title.en = t;
        });
      } catch (err) {
        console.warn('[api/categories] translation failed:', err.message);
      }
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json({
      issue: {
        number: process.env.ASAC_ISSUE_NUMBER || '46',
        month: { fr: process.env.ASAC_ISSUE_MONTH_FR || 'Juin 2026', en: process.env.ASAC_ISSUE_MONTH_EN || 'June 2026' },
        heroImage,
      },
      lang,
      categories,
    });
  } catch (err) {
    console.error('[api/categories]', err);
    res.status(500).json({
      error: err.message || String(err),
      hint: 'Verify GOOGLE_SERVICE_ACCOUNT_KEY_B64 and GOOGLE_DRIVE_ROOT_FOLDER_ID are set, and that the service-account email has been granted Viewer access to the root folder.',
    });
  }
};

// Find an image file inside `children` that should serve as the cover.
// Priority:
//   1. A file whose name (without extension) is exactly `preferred` (e.g. "cover", "hero")
//   2. A file whose name starts with `_` (so users can prefix _cover.jpg to force first place)
//   3. The first image file alphabetically
function pickCover(children, preferred) {
  const imgs = (children || []).filter((f) => /^image\//.test(f.mimeType || ''));
  if (!imgs.length) return null;
  const named = imgs.find((f) => f.name.replace(/\.[^.]+$/, '').toLowerCase() === preferred);
  if (named) return imageUrl(named.id);
  const underscored = imgs.find((f) => f.name.startsWith('_'));
  if (underscored) return imageUrl(underscored.id);
  return imageUrl(imgs[0].id);
}

// Internal URL — served by /api/image.js (no auth required on the client side)
function imageUrl(id) {
  return `/api/image?id=${id}`;
}
