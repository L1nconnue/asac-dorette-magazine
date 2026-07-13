# Deploy TheMedia.guide on GitHub and Vercel

This project is a Next.js app. The normal deployment path is:

1. Put this folder in a private GitHub repository.
2. Import that repository into Vercel.
3. Add environment variables.
4. Deploy.

Vercel creates Preview deployments for branch/pull-request changes and a Production deployment from the production branch, normally `main`.

Official references:

- Vercel Git deployments: https://vercel.com/docs/git
- GitHub repository quickstart: https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories

## 1. Prepare the Google Sheet

The app can read the billboard sheet in two ways.

### Simple option: link-viewer access

1. Open the billboard master sheet.
2. Click Share.
3. Under General access, choose Anyone with the link.
4. Set the role to Viewer.
5. Keep it as Viewer. The site only reads the sheet.

This is the easiest option. The platform itself is password-protected, but anyone who gets the sheet link could open the sheet.

### More private option: service account

Use this if you do not want the sheet readable by link.

1. In Google Cloud Console, create a service account.
2. Enable the Google Sheets API.
3. Download the service account JSON key.
4. Share the Google Sheet with the service account email as Viewer.
5. If billboard photos are private Drive files, also share the parent photo folder with the same service account email as Viewer.
6. Add `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` in Vercel.

## 2. Create the GitHub repository

1. Go to GitHub.
2. Create a new private repository named `themedia-guide-platform`.
3. Do not add a README from GitHub if you are uploading this folder, because this project already has one.
4. Upload the contents of the `themedia-guide-platform` folder.

If using Terminal from inside this folder:

```bash
git init
git add .
git commit -m "TheMedia.guide platform first build"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/themedia-guide-platform.git
git push -u origin main
```

## 3. Import the project into Vercel

1. Log in to Vercel.
2. Click Add New, then Project.
3. Choose the GitHub repository `themedia-guide-platform`.
4. Vercel should detect Next.js automatically.
5. Keep the default build settings:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: leave default
   - Install Command: leave default
6. Before clicking Deploy, add the environment variables below.

## 4. Environment variables

Add these in Vercel under Project Settings, Environment Variables.

Add them to Production, Preview, and Development unless you deliberately want different values.

| Name | Value |
| --- | --- |
| `GOOGLE_SHEET_ID` | `1bqH2CNh5HJt2NPwKef79gthYz5Wu6XDGIowqaBQEgqI` |
| `SHEET_TAB_BILLBOARDS` | `Billboard_Database` |
| `SHEET_CACHE_SECONDS` | `60` |
| `DASHBOARD_PASSWORD` | choose the private password your team will use |
| `AUTH_SECRET` | a long private random string, 30+ characters |
| `MAP_STYLE_URL` | `/map-styles/themedia-dark.json` |

Optional service account variables:

| Name | Value |
| --- | --- |
| `GOOGLE_CLIENT_EMAIL` | `client_email` from the service account JSON |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON, pasted exactly with `\n` line breaks |
| `KOBO_API_TOKEN` | optional Kobo API token if you still use private Kobo attachment URLs |

If you add the WebP automation later, the Google Sheet must be shared with the service account as `Editor`, because the automation writes generated WebP links back into the sheet.

## 5. Deploy

1. Click Deploy in Vercel.
2. Wait for the build to finish.
3. Open the Vercel deployment URL.
4. Enter the `DASHBOARD_PASSWORD`.
5. Confirm:
   - Home page loads with the smaller logo.
   - Billboards opens the map.
   - Map pins load over the dark map.
   - Printers and TV & Radio show cards.
   - The burger menu appears on small screens.
   - The language switch changes English/French labels.

## 6. Day-to-day workflow

- Edit the Google Sheet as usual. The platform refreshes from the sheet cache about every 60 seconds.
- If WebP columns are present, the platform uses them first and falls back to the original photo links while conversion is pending.
- Use the Refresh button on the Billboards page to force a fresh read.
- Make code changes in a branch or pull request.
- Vercel creates a Preview deployment for review.
- Merge into `main` when approved.
- Vercel creates the Production deployment from `main`.

## 7. If something looks wrong

| What you see | Meaning | Fix |
| --- | --- | --- |
| Login says access is not configured | Missing `DASHBOARD_PASSWORD` or `AUTH_SECRET` | Add both in Vercel and redeploy |
| Red sample-data banner | The app could not read the Google Sheet | Check sheet sharing or service account variables |
| Map panel stays blank | Old deployment, stale env var, or blocked map tiles | Redeploy this build and keep `MAP_STYLE_URL=/map-styles/themedia-dark.json` or remove custom map style values |
| Map has no pins | No approved rows with valid coordinates | Check `database_status`, `latitude`, and `longitude` in the sheet |
| Photo unavailable | Photo URL is private, broken, or not a browser-readable image | Share the Drive photo folder with the service account, set `KOBO_API_TOKEN` for Kobo URLs, or make the files link-viewer readable |
| French switch does not persist | Browser local storage was cleared | Select FR again from the menu |

## 8. Local checks before deployment

Run:

```bash
npm install
npm run typecheck
npm run build
npm audit --omit=dev
```

Expected result:

- Type check passes.
- Production build passes.
- Audit reports zero vulnerabilities.
