# Google Docs → site formatting cheat sheet

Everything you can do inside a Google Doc and exactly how it renders on the magazine site. Bookmark this file inside your Drive folder — it's the editorial reference.

The renderer **ignores** all inline font choices, font sizes, colors, highlights, underlining, and strikethrough. It only respects the **paragraph styles** and **bold/italic** below. This is intentional — it keeps every article looking like part of the same magazine, no matter who wrote it.

---

## 1. Paragraph styles

You set these via the dropdown in the Google Docs toolbar (the menu that defaults to "Normal text"), or via **Format → Paragraph styles**.

| What you choose in Docs                | Renders on the site as                  | Use for                              |
| -------------------------------------- | --------------------------------------- | ------------------------------------ |
| **Title**                              | The big headline `<h1>`                 | The article's main title (one only)  |
| **Heading 1**                          | Same big headline `<h1>`                | Same as Title                        |
| **Heading 2**                          | Medium subheading `<h2>`                | Major sections                       |
| **Heading 3**                          | Small blue uppercase subheading `<h3>`  | Subsections within an article        |
| **Heading 4**                          | A red-bordered uppercase **pull quote** | Emphasizing a powerful sentence      |
| **Heading 5 / Heading 6**              | Small heading `<h4>`                    | Rarely needed                        |
| **Normal text**                        | Regular paragraph `<p>`                 | Body copy                            |
| **Title block** (Title + author name)  | Title + byline (see §6)                 | The top of every article             |

---

## 2. Inline formatting

| In the doc                          | Keyboard      | Renders as          | Notes                                  |
| ----------------------------------- | ------------- | ------------------- | -------------------------------------- |
| **Bold**                            | Ctrl/Cmd + B  | `<strong>` (bolder) | Use for emphasis, not whole paragraphs |
| *Italic*                            | Ctrl/Cmd + I  | `<em>` (italic)     | Use for foreign words, citations       |
| Hyperlink                           | Ctrl/Cmd + K  | `<a target="_blank">` | Opens in a new tab automatically    |
| Underline                           |               | (ignored)           | Not used in print typography           |
| Custom font, size, color, highlight |               | (ignored)           | Reset to default before publishing     |

---

## 3. Quotes & pull quotes

The site supports two flavours of quote.

### Inline blockquote — for citing someone

Type a paragraph that **starts with `>` followed by a space**, exactly like this:

```
> L'assurance n'est pas un produit, c'est une promesse.
```

Renders as an indented italic paragraph with a blue left bar — good for citing sources or a respondent's words.

### Pull quote — for visually emphasizing a key idea

Use the **Heading 4** paragraph style. Whatever you write becomes a large, red-bordered, uppercase pull quote with an opening curly-quote ornament. Reserve this for one or two lines per article that you really want the reader to notice.

---

## 4. Horizontal divider (visual break)

Type three hyphens on their own line:

```
---
```

(Asterisks `***` work too.) The site renders a thin centered rule with a small blue dot — useful for separating sections of long features without a heading.

You can also use Google Docs' built-in **Insert → Horizontal line** menu — both produce the same result.

---

## 5. Lists

Use the standard bulleted-list button in the toolbar (next to alignment). Nested bullets work. Each item renders as a list item on the site.

Numbered lists work the same way.

---

## 6. Author byline

The site looks for an author signature in two places:

**Option A — name in a Heading 2 right after the title:**

```
[Title]   La sentinelle et l'architecte
[H2]      Mispa MBONDI
[Italic]  Responsable Technique chez ASAC
[Normal]  …body starts here…
```

**Option B — italicized name signature at the end of the article**, the way it appears in print:

```
…final paragraph of the body.

[Italic]  Mispa MBONDI
```

Either way works — pick whichever feels more natural for the piece.

---

## 7. Images

**Insert → Image → Upload from computer.** Drop the image right where you want it to appear in the text. Place it on its own paragraph for a full-width display.

The site:
- Extracts the image automatically
- Serves it from the Drive folder (no extra uploading anywhere)
- Renders it at full content width
- Adds a small italic caption underneath **if** the very next paragraph is in *italic* and short (under 200 characters)

So this:

```
[Image]
[Italic] Photo : NKEN Martin Olivier, 2025
```

…renders as a properly-captioned figure.

---

## 8. Sources / footnotes

At the very bottom of the article, write a Heading 3 called **Sources** (or "References") and then list each source either as a bullet or a link. The site automatically styles this section with a top border and smaller text — no special tagging needed.

Example:

```
[H3]      Sources
[Normal]  · ASAC Cameroun — https://www.asac-cameroun.org
[Normal]  · Atlas Magazine — https://www.atlas-mag.net
```

The site detects the heading and tightens the styling automatically.

---

## 9. What if I need something not in this list?

Tell the editor. The site has a small, deliberate vocabulary. Adding new formatting (callouts, image grids, video embeds…) is a one-time code change. Once added, it becomes part of this cheat sheet for everyone.

For now, anything you do with custom fonts, colors, or sizes in Google Docs will be silently dropped on the site. That's a feature, not a bug — it keeps the magazine visually consistent.

---

## Quick reference card

```
Title or Heading 1   → article headline
Heading 2            → big subheading
Heading 3            → small blue subheading
Heading 4            → red pull quote
Normal text          → body paragraph
> paragraph          → blockquote (citation)
---                  → horizontal divider
**bold** / Ctrl+B    → strong
*italic* / Ctrl+I    → emphasis
Insert → Image       → full-width image
Italic + short next  → image caption
H3 "Sources"         → styled sources section
```
