# OASIS Prototype Feedback Portal

Single-page portal for the Department of Agriculture / AgriStat **Operational Agricultural Statistics Information Systems** prototypes: access links, a hands-on demo guide, and a feedback survey.

Stack matches the other OASIS frontends: **React 18 + Vite + TypeScript**, DA green/white tokens from Presyong Palengke / Data Bank (`#06402b`).

## Run locally

```bash
cd oasis-presentation
npm install
copy .env.example .env
npm run dev
```

Open http://localhost:5176

```bash
npm run build
npm run preview
```

## What to edit first

| What | File |
| --- | --- |
| Prototype URLs | `src/config/links.ts` |
| Sample dataset folders | `src/config/links.ts` (`SAMPLE_DATASETS`) |
| Producer / consumer demo accounts | `src/config/demoAccounts.ts` |
| Survey questions | `src/config/survey.ts` |
| DA logo | `src/assets/images/da-logo.png` (header) and `public/favicon.png` |
| Google Sheets endpoint | `.env` → `VITE_GOOGLE_SHEETS_WEBAPP_URL` |

Sample datasets are Google Drive folders:

- Clean (no errors): [Drive folder](https://drive.google.com/drive/folders/1OQh2t6a6D8urlv4KCvn-9bz_M2RxSp74?usp=drive_link)
- With errors: [Drive folder](https://drive.google.com/drive/folders/1bfTrS-eYB4Y-Bjc3myZLZIPKh3Wx1KOp?usp=drive_link)

## Demo guide (Data Bank)

Instructions follow the current AgriStat Data Bank prototype:

1. **Producer** (`prod-demo@da.gov.ph`) — Data Upload: reporting period → template → file → **Upload & validate**. Commit is disabled; stop at preview.
2. **Consumer** (`cons-demo@da.gov.ph`) — Data Table Builder: dataset, rows, values, optional columns/filters → **Generate Data** → **Generate Visualization** → export.

## Google Sheets

Responses POST to a Google Apps Script web app, which appends a row to your spreadsheet.

**Full walkthrough:** [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md)

Script to paste into Apps Script: [google-apps-script/Code.gs](google-apps-script/Code.gs)

If the env variable is empty, submissions are stored in the browser (`localStorage`) so you can still test the thank-you screen.

## Page order

1. Header (DA logo + title)
2. Access the OASIS Prototypes
3. Hands-on Demo Guide
4. OASIS Prototype Feedback Survey (A–G), then thank-you after submit
