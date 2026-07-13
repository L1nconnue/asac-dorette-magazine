# Google Drive WebP Automation

The platform now supports both original photo links and WebP photo links.

## Sheet columns

Keep the existing columns:

- `photo_front_url`
- `photo_context_url`

Add these optional columns:

- `photo_front_webp_url`
- `photo_context_webp_url`

The platform uses the WebP column first. If the WebP column is empty, it falls back to the original column.

## Recommended Drive structure

Inside your billboard photo folder, keep originals and WebP copies separate:

```text
TheMedia.guide/
  Billboards/
    Douala/
      Billboard Photos/
        DLA1 - Douala 1er/
        DLA2 - Douala 2e/
        DLA3 - Douala 3e/
        WebP/
```

The originals can stay heavy. The `WebP` folder should contain lighter converted copies.

## Permissions

Share these with the service account email:

- Google Sheet: `Editor` if the automation writes WebP links back into the sheet.
- Original photo folder: `Viewer`.
- WebP output folder: `Editor`.

The platform only needs read access, but the conversion automation needs write access.

## Automation behavior

The automation should run on a schedule, for example every 15 minutes:

1. Read rows from `Billboard_Database`.
2. For each row:
   - If `photo_front_url` exists and `photo_front_webp_url` is empty, convert the front image.
   - If `photo_context_url` exists and `photo_context_webp_url` is empty, convert the context image.
3. Save the converted `.webp` file into the locally synced `WebP` Drive folder.
4. Wait for Google Drive for desktop to finish syncing it.
5. Write the new Drive share link back to:
   - `photo_front_webp_url`
   - `photo_context_webp_url`

## Why this is better

- Heavy original photos stay untouched.
- The website loads WebP when available.
- The website still works while conversion is pending.
- The sheet remains the source of truth.

## Important note

Google Drive does not automatically convert photos to WebP by itself. You need a small worker:

- Recommended for your personal Google Drive: run the local worker on your Mac while Google Drive for desktop is open.
- Cloud option: use a Shared Drive with Google Cloud Run + Cloud Scheduler.

The worker uses the same service account credentials as the platform for reading originals and updating the Sheet. For personal My Drive storage, set `WEBP_OUTPUT_LOCAL_PATH` so the files upload through your Google Drive desktop account; Google does not give service accounts storage quota in ordinary My Drive folders.
