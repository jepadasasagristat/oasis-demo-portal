/**
 * OASIS Prototype Feedback Portal — Google Sheets receiver
 *
 * How to install: see docs/GOOGLE_SHEETS_SETUP.md
 *
 * Expected POST body (JSON, Content-Type: text/plain):
 * {
 *   headers: string[],
 *   values: string[]
 * }
 */

const SHEET_NAME = 'Responses';

function doGet() {
  return jsonOutput({ ok: true, service: 'OASIS feedback receiver' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({ ok: false, error: 'Empty request body' });
    }

    const payload = JSON.parse(e.postData.contents);
    const headers = Array.isArray(payload.headers) ? payload.headers.map(String) : [];
    const values = Array.isArray(payload.values) ? payload.values.map(stringifyCell) : [];

    if (headers.length === 0 || values.length === 0) {
      return jsonOutput({ ok: false, error: 'Missing headers or values' });
    }

    const sheet = getOrCreateSheet_();
    ensureHeaderRow_(sheet, headers);

    const row = headers.map((_, index) => values[index] ?? '');
    sheet.appendRow(row);

    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaderRow_(sheet, headers) {
  const lastColumn = sheet.getLastColumn();
  const existing =
    lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0] : [];
  const hasHeader = existing.some((cell) => String(cell).trim() !== '');

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    return;
  }

  // If new questions were added later, extend the header row.
  if (headers.length > existing.length) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function stringifyCell(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
