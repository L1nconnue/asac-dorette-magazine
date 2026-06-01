// api/image.js
// Streams an image file from Google Drive through the service account, so
// images stored in private Drive folders don't have to be made publicly
// viewable. Heavily cached at the edge.
//
// Usage:  /api/image?id=<drive-file-id>

const { getDrive } = require('../lib/google');

module.exports = async function handler(req, res) {
  try {
    const id = (req.query && req.query.id) || '';
    if (!/^[A-Za-z0-9_-]{20,}$/.test(id)) {
      res.status(400).send('Invalid id parameter');
      return;
    }
    const drive = await getDrive();

    // Inspect mimeType first so we can set Content-Type correctly
    const meta = await drive.files.get({ fileId: id, fields: 'mimeType, name' });
    const mime = meta.data.mimeType || 'application/octet-stream';
    if (!/^image\//.test(mime)) {
      res.status(400).send('Not an image');
      return;
    }

    // Cache aggressively — images don't change often
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('Content-Type', mime);

    // Stream the bytes
    const dl = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );
    dl.data.on('error', (e) => {
      console.error('[api/image] stream error', e);
      try { res.status(500).end(); } catch (_) {}
    });
    dl.data.pipe(res);
  } catch (err) {
    console.error('[api/image]', err);
    res.status(500).send('Image fetch failed');
  }
};
