/**
 * OASIS User Demo Portal — editable links and labels.
 *
 * Prototype URLs and Google Drive dataset folders live here.
 */

export const PORTAL = {
  agency: 'Department of Agriculture',
  unit: 'AgriStat',
  title: 'OASIS User Demo Portal',
  subtitle: 'Operational Agricultural Statistics Information Systems',
} as const;

/** Section 1 — prototype access cards (open in a new tab). */
export const PROTOTYPE_LINKS = {
  dataBank: {
    id: 'data-bank',
    name: 'Data Bank Platform',
    shortName: 'Data Bank',
    description:
      'Collect, upload, and validate agricultural statistics before they enter the official data bank.',
    href: 'https://asdb-demo.vercel.app/login',
  },
  dataAnalytics: {
    id: 'data-analytics',
    name: 'Data Analytics Portal',
    shortName: 'Data Analytics',
    description:
      'View interactive visualizations and generate insights from agricultural production, trade, and market analysis.',
    href: 'https://adap-demo.vercel.app/',
  },
  marketPrice: {
    id: 'market-price',
    name: 'Market Price Monitoring',
    shortName: 'Market Price Monitoring',
    description:
      'Monitor retail prices of key commodities across public markets nationwide.',
    href: 'https://marketprice-demo.vercel.app/',
  },
  geospatial: {
    id: 'geospatial',
    name: 'Geospatial Mapping Platform',
    shortName: 'Geospatial Mapping',
    description:
      'Explore production, prices, and related indicators on maps by region, province, and time period.',
    href: 'http://gmportal-demo.vercel.app/',
  },
} as const;

/**
 * Section 2 — sample datasets for Data Upload validation.
 * These open Google Drive folders. Testers download a workbook from each folder.
 */
export const SAMPLE_DATASETS = {
  clean: {
    label: 'Clean datasets (no errors)',
    hint: 'Open this folder and download at least one workbook. These files should pass validation.',
    href: 'https://drive.google.com/drive/folders/1OQh2t6a6D8urlv4KCvn-9bz_M2RxSp74?usp=drive_link',
    cta: 'Open Google Drive folder →',
  },
  withErrors: {
    label: 'Datasets with errors',
    hint: 'Open this folder and download at least one workbook. These files should show validation issues.',
    href: 'https://drive.google.com/drive/folders/1bfTrS-eYB4Y-Bjc3myZLZIPKh3Wx1KOp?usp=drive_link',
    cta: 'Open Google Drive folder →',
  },
} as const;

export const NAV_ITEMS = [
  { id: 'prototypes', label: 'Prototypes' },
  { id: 'demo-guide', label: 'Demo Guide' },
  { id: 'feedback', label: 'Feedback Form' },
] as const;
