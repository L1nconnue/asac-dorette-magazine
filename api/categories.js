// api/categories.js
// Vercel serverless function. Lists every subfolder of the root Drive folder
// as a category, counts the Google Docs inside each one, and returns the
// shape that the frontend's CATEGORIES array expects.
//
// Response cached at the edge for 60s, stale-while-revalidate 5 min,
// so a Docs edit shows up on the site within ~1 minute without hammering
// the Drive API.

const { getDrive, getRootFolderId, parseOrderedName, slugify } = require('../lib/google');

module.exports = async function handler(req, res) {
  try {
    const drive = await getDrive();
    const rootId = getRootFolderId();

    // 1. List all subfolders inside the root
    const foldersRes = await drive.files.list({
      q: `'${rootId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      orderBy: 'name',
      pageSize: 200,
    });

    const folders = foldersRes.data.files || [];

    // 2. For each subfolder, list its Google Docs in parallel
    const categories = await Promise.all(
      folders.map(async (folder) => {
        const docsRes = await drive.files.list({
          q: `'${folder.id}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
          fields: 'files(id, name, modifiedTime)',
          orderBy: 'name',
          pageSize: 200,
        });
        const docs = docsRes.data.files || [];
        const { order: catOrder, name: displayName } = parseOrderedName(folder.name);
        return {
          id: slugify(displayName),
          folderId: folder.id,
          order: catOrder,
          name: { fr: displayName, en: displayName }, // English mapping done client-side via translations, see I18N_CATEGORY_NAMES below
          count: docs.length,
          articles: docs
            .map((doc) => {
              const { order, name } = parseOrderedName(doc.name);
              return {
                id: doc.id,            // Google Doc ID — used as ?id= on article.html
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

    // Edge cache: 1 minute fresh, 5 minutes stale-while-revalidate
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json({
      issue: {
        number: process.env.ASAC_ISSUE_NUMBER || '46',
        month: { fr: process.env.ASAC_ISSUE_MONTH_FR || 'Juin 2026', en: process.env.ASAC_ISSUE_MONTH_EN || 'June 2026' },
      },
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
