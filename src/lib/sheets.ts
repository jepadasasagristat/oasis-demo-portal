import { flattenForSheet } from './form';
import type { FeedbackFormState } from '../types/feedback';

const LOCAL_STORAGE_KEY = 'oasis-feedback-submissions';

export function isSheetsConfigured(): boolean {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL?.trim();
  return Boolean(url && !url.includes('PASTE_YOUR') && url.startsWith('http'));
}

/**
 * Submit to the Google Apps Script web app (see docs/GOOGLE_SHEETS_SETUP.md).
 *
 * Content-Type is text/plain so the browser does not send a CORS preflight.
 * Apps Script still parses JSON from e.postData.contents.
 *
 * If the web-app URL is not set, the response is stored in localStorage so
 * you can still test the thank-you flow locally.
 */
export async function submitFeedback(state: FeedbackFormState): Promise<{
  mode: 'sheets' | 'local';
}> {
  const payload = flattenForSheet(state);
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL?.trim();

  if (!isSheetsConfigured() || !url) {
    persistLocally(payload);
    return { mode: 'local' };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      ...payload,
      raw: state,
    }),
  });

  if (!response.ok) {
    throw new Error('The feedback service returned an error. Please try again.');
  }

  const result = (await response.json().catch(() => ({ ok: true }))) as {
    ok?: boolean;
    error?: string;
  };

  if (result.ok === false) {
    throw new Error(result.error || 'Could not save your response to Google Sheets.');
  }

  return { mode: 'sheets' };
}

function persistLocally(payload: { headers: string[]; values: string[] }): void {
  const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
  const list = existing ? (JSON.parse(existing) as unknown[]) : [];
  list.push({ savedAt: new Date().toISOString(), ...payload });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
}
