# Connect the feedback form to Google Sheets

The portal is a static React app. It cannot talk to Google Sheets with an API key alone (Sheets write access needs OAuth). The supported pattern is a **Google Apps Script web app** bound to your spreadsheet. The form POSTs JSON; the script appends one row per submission.

Source file to copy: [`google-apps-script/Code.gs`](../google-apps-script/Code.gs)

---

## 1. Create the spreadsheet

1. Open [Google Sheets](https://sheets.google.com) with a Department of Agriculture Google account that will own the responses.
2. Create a blank spreadsheet, for example **OASIS Prototype Feedback**.
3. Optional: rename the first tab to `Responses`. The script creates this tab if it is missing.

---

## 2. Attach Apps Script

1. In the spreadsheet, open **Extensions → Apps Script**.
2. Delete any placeholder code in `Code.gs`.
3. Paste the full contents of `google-apps-script/Code.gs`.
4. Click **Save** (disk icon). Name the project **OASIS Feedback Receiver**.

---

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to **Select type** and choose **Web app**.
3. Fill in:
   - **Description:** `OASIS feedback v1`
   - **Execute as:** `Me` (your DA account)
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Google will ask you to authorize the script:
   - Choose your account.
   - If you see “Google hasn’t verified this app”, click **Advanced → Go to OASIS Feedback Receiver (unsafe)**. This warning is normal for a script you own.
   - Allow access to the spreadsheet.
6. Copy the **Web app URL**. It looks like:

```text
https://script.google.com/macros/s/AKfycb.../exec
```

Keep this URL private. Anyone who has it can append rows to the sheet.

### If you later edit Code.gs

Use **Deploy → Manage deployments → Edit (pencil) → New version → Deploy**. The URL stays the same only if you update the existing deployment. Creating a brand-new deployment gives a new URL.

---

## 4. Point the portal at the web app

1. In the project root, copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

2. Paste the web app URL:

```env
VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

3. Restart the Vite dev server (`npm run dev`). Vite only reads `.env` on startup.
4. For a production build, set the same variable in your host (Vercel, Netlify, etc.) as `VITE_GOOGLE_SHEETS_WEBAPP_URL`, then rebuild.

Without this variable, the form still works: it stores submissions in `localStorage` under `oasis-feedback-submissions` so you can test the thank-you page locally.

---

## 5. Test the connection

1. Open the portal, complete the required fields, and submit.
2. Refresh the Google Sheet. You should see a header row (first successful submit) and one data row.
3. The thank-you message should say the response was saved to the spreadsheet.

### Test the script by itself (optional)

Open a new browser tab and visit the web app URL. You should see:

```json
{"ok":true,"service":"OASIS feedback receiver"}
```

---

## 6. How the request works (for maintainers)

The browser sends:

```http
POST {VITE_GOOGLE_SHEETS_WEBAPP_URL}
Content-Type: text/plain;charset=utf-8

{"headers":["Submitted at","Full name",...],"values":["2026-09-04T...","Juan Dela Cruz",...]}
```

`text/plain` avoids a CORS preflight. Apps Script still parses JSON from `e.postData.contents`. The script:

1. Opens or creates the `Responses` tab.
2. Writes the `headers` array to row 1 if the sheet is empty.
3. Appends `values` as the next row.

Column order is defined in `src/lib/form.ts` (`flattenForSheet`). If you add survey questions, submit once to a **new** sheet or extend the header row; existing rows keep their original columns.

---

## 7. Sharing and privacy

- Share the **spreadsheet** with AgriStat staff who need to read responses (**Viewer** or **Editor**). Do not share the web app URL in a public README.
- The web app is set to **Anyone** so testers can submit without a Google login. The script still runs as you, so only your account’s sheet is written.
- Do not put passwords or classified data in the survey. Email addresses in Section A are personal data — limit sheet access accordingly.

---

## 8. Troubleshooting

| Symptom | What to check |
| --- | --- |
| Thank-you page says “local test mode” | `.env` missing, URL empty, or dev server not restarted |
| Submit error / failed fetch | URL truncated; deployment access not **Anyone**; ad blocker blocking `script.google.com` |
| Sheet stays empty | You deployed an old version; use **Manage deployments** and a new version after editing `Code.gs` |
| “Authorization required” in the tab | Re-run the web app URL once while signed into the owner account, then redeploy |
| CORS error in the browser console | Confirm `Content-Type` is still `text/plain;charset=utf-8` in `src/lib/sheets.ts` |
| Duplicate header rows | Do not manually type headers before the first submit, or clear row 1 and let the script write them |

---

## 9. Alternative: Google Form (if Apps Script is blocked)

If your organization blocks Apps Script web apps:

1. Recreate the survey in Google Forms with the same sections.
2. In the form, open **Responses → Link to Sheets**.
3. Replace the in-app form with a link/button to that Google Form, or embed it with an iframe in `FeedbackForm.tsx`.

The in-app form will no longer write to Sheets until Apps Script is allowed again.
