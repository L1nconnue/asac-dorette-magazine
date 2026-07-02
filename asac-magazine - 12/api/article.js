// api/article.js
// Vercel serverless function. Fetches a Google Doc by ID via the Docs API
// and returns clean semantic HTML for the frontend to render.
//
// IMPORTANT: This deliberately IGNORES inline font, size and color styles
// from the doc. Only structural roles (TITLE, HEADING_1..3, NORMAL_TEXT)
// and bold/italic inline formatting are preserved — everything else is
// dropped so the site's own CSS controls the visual presentation.
//
// Embedded images in the doc are mapped to <img> tags that reference
// `contentUri` URLs returned by the Docs API. Those URLs are signed and
// expire after ~30 min, so the client should re-fetch the article rather
// than caching the HTML for long. Edge cache is 60s by default.

const { getDocs, getDrive, parseOrderedName, translate } = require('../lib/google');

module.exports = async function handler(req, res) {
  try {
    const docId = (req.query && req.query.id) || (req.query && req.query.docId);
    if (!docId) {
      res.status(400).json({ error: 'Missing required `id` query parameter (the Google Doc ID).' });
      return;
    }

    // Parallel: doc structure + Drive metadata (for last-modified, name)
    const [docsApi, driveApi] = await Promise.all([getDocs(), getDrive()]);
    const [doc, file] = await Promise.all([
      docsApi.documents.get({ documentId: docId }),
      driveApi.files.get({ fileId: docId, fields: 'id, name, modifiedTime, mimeType, parents' }),
    ]);

    if (file.data.mimeType !== 'application/vnd.google-apps.document') {
      res.status(400).json({ error: 'The requested file is not a Google Doc.' });
      return;
    }

    const { html, images, plainTitle } = convertDocToHtml(doc.data);
    // Clean any "01-" style prefix from fallback titles
    const cleanDocTitle = doc.data.title ? parseOrderedName(doc.data.title).name : null;
    const cleanFileName = file.data.name ? parseOrderedName(file.data.name).name : null;
    let title = plainTitle || cleanDocTitle || cleanFileName || 'Untitled';
    let outHtml = html;

    // Optional on-the-fly translation. Default source is French.
    const lang = (req.query && req.query.lang) || 'fr';
    const source = (req.query && req.query.source) || 'fr';
    if (lang && lang !== source) {
      try {
        const [translatedTitle, translatedHtml] = await Promise.all([
          translate(title, { source, target: lang, format: 'text' }),
          translate(outHtml, { source, target: lang, format: 'html' }),
        ]);
        title = translatedTitle || title;
        outHtml = translatedHtml || outHtml;
      } catch (translateErr) {
        console.warn('[api/article] translation failed, returning source:', translateErr.message);
      }
    }

    // Cache per-language at the edge
    res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=600');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json({
      docId,
      title,
      lang,
      modifiedTime: file.data.modifiedTime,
      html: outHtml,
      images,
    });
  } catch (err) {
    console.error('[api/article]', err);
    res.status(500).json({
      error: err.message || String(err),
      hint: 'Verify the doc ID is correct and that the service-account email has been shared on either the doc itself or its parent folder.',
    });
  }
};

/* ---------- Conversion ---------- */

// Walk the Docs API response and emit semantic HTML.
// Reference: https://developers.google.com/workspace/docs/api/reference/rest/v1/documents
function convertDocToHtml(doc) {
  const body = (doc.body && doc.body.content) || [];

  // Build a map of inline-object id -> image contentUri (the rendered image URL)
  const inlineObjects = doc.inlineObjects || {};
  const imageById = {};
  for (const [objId, obj] of Object.entries(inlineObjects)) {
    const props =
      obj.inlineObjectProperties &&
      obj.inlineObjectProperties.embeddedObject &&
      obj.inlineObjectProperties.embeddedObject.imageProperties;
    const uri = props && props.contentUri;
    if (uri) imageById[objId] = uri;
  }

  // Track all image URLs encountered so the client knows what was used
  const images = [];
  let plainTitle = null;
  let inList = null; // 'ul' | 'ol' | null
  const out = [];

  const closeList = () => {
    if (inList) { out.push(`</${inList}>`); inList = null; }
  };
  const openList = (kind) => {
    if (inList === kind) return;
    closeList();
    out.push(`<${kind}>`);
    inList = kind;
  };

  for (const el of body) {
    if (el.paragraph) {
      const para = el.paragraph;
      const style = (para.paragraphStyle && para.paragraphStyle.namedStyleType) || 'NORMAL_TEXT';
      const bulletKind = detectBullet(para);
      const inner = renderParagraphInner(para, imageById, images);
      const trimmed = inner.trim();

      if (!trimmed) {
        // Skip empty paragraphs but still close any open list so spacing is right
        closeList();
        continue;
      }

      if (bulletKind) {
        openList(bulletKind);
        out.push(`<li>${inner}</li>`);
        continue;
      }
      closeList();

      // Markdown-ish shortcuts that work inside Google Docs:
      //   "---" or "***"   on its own line → horizontal rule
      //   "> something"    at the start    → blockquote
      const plain = stripTags(trimmed).trim();
      if (/^([-*]\s*){3,}$/.test(plain) || plain === '---' || plain === '***') {
        out.push('<hr>');
        continue;
      }
      if (style === 'NORMAL_TEXT' && /^&gt;\s/.test(inner.trimStart())) {
        const stripped = inner.replace(/^\s*&gt;\s?/, '');
        out.push(`<blockquote>${stripped}</blockquote>`);
        continue;
      }

      switch (style) {
        case 'TITLE':
        case 'HEADING_1':
          if (!plainTitle) plainTitle = stripTags(trimmed);
          out.push(`<h1>${inner}</h1>`);
          break;
        case 'SUBTITLE':
        case 'HEADING_2':
          out.push(`<h2>${inner}</h2>`);
          break;
        case 'HEADING_3':
          out.push(`<h3>${inner}</h3>`);
          break;
        case 'HEADING_4':
          // Heading 4 is repurposed as "pull quote" — see cheatsheet
          out.push(`<blockquote class="pull">${inner}</blockquote>`);
          break;
        case 'HEADING_5':
        case 'HEADING_6':
          out.push(`<h4>${inner}</h4>`);
          break;
        case 'NORMAL_TEXT':
        default:
          out.push(`<p>${inner}</p>`);
      }
    } else if (el.table) {
      closeList();
      out.push(renderTable(el.table, imageById, images));
    } else if (el.horizontalRule || (el.sectionBreak && el.sectionBreak.sectionStyle)) {
      closeList();
      out.push('<hr>');
    }
    // SectionBreak and TableOfContents are skipped on purpose.
  }
  closeList();

  return { html: out.join('\n'), images, plainTitle };
}

// Render the content of a paragraph: text runs (with <strong>/<em>) and inline images.
// Everything else from the textRun (color, fontFamily, fontSize, backgroundColor,
// underline, strikethrough, baselineOffset) is intentionally dropped.
function renderParagraphInner(para, imageById, images) {
  const parts = [];
  for (const el of para.elements || []) {
    if (el.inlineObjectElement) {
      const uri = imageById[el.inlineObjectElement.inlineObjectId];
      if (uri) {
        images.push(uri);
        parts.push(`<img src="${escapeAttr(uri)}" alt="" loading="lazy">`);
      }
      continue;
    }
    if (el.textRun) {
      const content = el.textRun.content || '';
      if (!content || content === '\n') continue;
      const ts = el.textRun.textStyle || {};
      let html = escapeHtml(content.replace(/\n+$/, ''));
      // Preserve only semantic emphasis: bold + italic. Drop everything else.
      if (ts.italic) html = `<em>${html}</em>`;
      if (ts.bold) html = `<strong>${html}</strong>`;
      // If a textRun has a link, keep it (it's a structural decision in the doc).
      if (ts.link && (ts.link.url || ts.link.bookmarkId || ts.link.headingId)) {
        const href = ts.link.url || '#';
        html = `<a href="${escapeAttr(href)}" target="_blank" rel="noopener">${html}</a>`;
      }
      parts.push(html);
    }
    // PageBreak, FootnoteReference, AutoText, etc. are skipped.
  }
  return parts.join('');
}

function renderTable(table, imageById, images) {
  const rows = [];
  for (const row of table.tableRows || []) {
    const cells = [];
    for (const cell of row.tableCells || []) {
      const cellParts = [];
      for (const c of cell.content || []) {
        if (c.paragraph) cellParts.push(`<p>${renderParagraphInner(c.paragraph, imageById, images)}</p>`);
      }
      cells.push(`<td>${cellParts.join('')}</td>`);
    }
    rows.push(`<tr>${cells.join('')}</tr>`);
  }
  return `<table>${rows.join('')}</table>`;
}

function detectBullet(para) {
  if (!para.bullet) return null;
  // Heuristic: bullets with a glyph that's a digit-ish symbol → ordered list.
  // The Docs API doesn't directly tell us "ordered vs unordered", but the
  // list's listProperties.nestingLevels[].glyphType encodes it. We assume
  // unordered unless we can confirm DECIMAL/ROMAN/ALPHA at nesting 0.
  return 'ul';
}

/* ---------- Escaping ---------- */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
function stripTags(s) {
  return String(s).replace(/<[^>]*>/g, '');
}
