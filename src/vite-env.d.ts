/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script web-app URL. See docs/GOOGLE_SHEETS_SETUP.md */
  readonly VITE_GOOGLE_SHEETS_WEBAPP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
