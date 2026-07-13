# Drive WebP Worker

This worker converts Google Drive photos to WebP and writes the generated WebP links back into the billboard sheet.

It is separate from the website. Use it as a local script, a Google Cloud Run Job, or a scheduled server task.

## Required environment variables

```bash
GOOGLE_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="1bqH2CNh5HJt2NPwKef79gthYz5Wu6XDGIowqaBQEgqI"
SHEET_TAB_BILLBOARDS="Billboard_Database"
SHEET_TAB_RAW="Raw_Submissions"
WEBP_OUTPUT_FOLDER_ID="google-drive-folder-id-for-webp-files"
WEBP_OUTPUT_LOCAL_PATH="/Users/you/Library/CloudStorage/GoogleDrive-account/My Drive/path/to/WebP"
```

Optional:

```bash
WEBP_QUALITY=78
WEBP_MAX_WIDTH=1800
WEBP_LIMIT=25
```

## Drive permissions

Share these with the service account:

- Google Sheet: Editor
- Original photos folder: Viewer
- WebP output folder: Editor

`WEBP_OUTPUT_LOCAL_PATH` is the recommended mode for a personal Google Drive account. The worker saves the converted file into Google Drive for desktop, waits for it to sync, and then writes the resulting Drive link into the Sheet. Service accounts cannot upload directly into ordinary My Drive folders because they do not have storage quota.

## Run locally

```bash
cd tools/drive-webp-worker
npm install
npm run start
```

For a scheduled Mac run, load `guide.themedia.webp-worker.plist` as a LaunchAgent. It runs every 15 minutes, processes at most 25 new images per pass, and writes activity to `~/Library/Logs/TheMediaGuide-WebP.log`.

## Sheet behavior

The worker reads:

- `photo_front_url`
- `photo_context_url`

It creates these columns if missing:

- `photo_front_webp_url`
- `photo_context_webp_url`

Then it writes generated WebP Drive links into those columns.

On every run, the worker also checks `Raw_Submissions`. Only `gps_raw` values written in degrees-minutes-seconds form are converted into `gps_latitude` and `gps_longitude`, using six decimals with a dot. Other GPS formats are not changed.
