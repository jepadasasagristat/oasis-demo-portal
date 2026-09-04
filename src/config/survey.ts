/**
 * Feedback survey copy — edit questions here without touching form layout.
 *
 * Rating scale: 1 = Poor … 5 = Excellent.
 */

export const COMMENTS_PLACEHOLDER =
  'Enter your comments, suggestions, or recommendations';

export const RATING_TABLE_INTRO =
  'Rate each item from 1 (Poor) to 5 (Excellent) based on your hands-on experience. These ratings show what worked well and what should be improved.';

export const RATING_SCALE = [
  { value: '1', label: '1', caption: 'Poor' },
  { value: '2', label: '2', caption: 'Fair' },
  { value: '3', label: '3', caption: 'Average' },
  { value: '4', label: '4', caption: 'Good' },
  { value: '5', label: '5', caption: 'Excellent' },
] as const;

export const PROTOTYPE_OPTIONS = [
  { id: 'dataBank', label: 'AgriStat Data Bank' },
  { id: 'dataAnalytics', label: 'Data Analytics Portal' },
  { id: 'marketPrice', label: 'Market Price Monitoring' },
  { id: 'geospatial', label: 'Geospatial Mapping Platform' },
] as const;

export type PrototypeOptionId = (typeof PROTOTYPE_OPTIONS)[number]['id'];

export interface RatingQuestion {
  id: string;
  label: string;
}

export interface PlatformSection {
  id: PrototypeOptionId;
  title: string;
  questions: RatingQuestion[];
  commentsLabel: string;
}

export const PLATFORM_SECTIONS: PlatformSection[] = [
  {
    id: 'dataBank',
    title: 'AgriStat Data Bank',
    questions: [
      {
        id: 'nav',
        label: 'Ease of signing in and opening Data Upload',
      },
      {
        id: 'steps',
        label: 'Clarity of the upload steps (reporting period, template, and file)',
      },
      {
        id: 'validation',
        label: 'Ease of understanding validation results and the preview table',
      },
      {
        id: 'errors',
        label: 'How clearly the system showed problems in the error file',
      },
      {
        id: 'useful',
        label: 'Usefulness of AgriStat Data Bank for the Department and the agriculture sector',
      },
    ],
    commentsLabel: 'Comments/Suggestions/Recommendations on the AgriStat Data Bank',
  },
  {
    id: 'dataAnalytics',
    title: 'Data Analytics Platform',
    questions: [
      {
        id: 'nav',
        label: 'Ease of opening Data Table Builder with the consumer account',
      },
      {
        id: 'config',
        label: 'Clarity of setting up rows, values, columns, and filters',
      },
      {
        id: 'generate',
        label: 'Usefulness of the custom table produced by Generate Data',
      },
      {
        id: 'vizExport',
        label: 'Usefulness of the charts and export options (XLSX, CSV, PDF)',
      },
      {
        id: 'useful',
        label: 'Usefulness of the Data Analytics Platform for the Department and the agriculture sector',
      },
    ],
    commentsLabel: 'Comments/Suggestions/Recommendations on the Data Analytics Platform',
  },
  {
    id: 'marketPrice',
    title: 'Market Price Monitoring Platform',
    questions: [
      {
        id: 'nav',
        label: 'Ease of finding a commodity and a market',
      },
      {
        id: 'clarity',
        label: 'Clarity of the price figures, units, and labels',
      },
      {
        id: 'filters',
        label: 'Usefulness of maps and filters when exploring prices',
      },
      {
        id: 'consistency',
        label: 'Ease of understanding and using the interface',
      },
      {
        id: 'useful',
        label: 'Usefulness of Market Price Monitoring for the Department and the agriculture sector',
      },
    ],
    commentsLabel: 'Comments/Suggestions/Recommendations on the Market Price Monitoring Platform',
  },
  {
    id: 'geospatial',
    title: 'Geospatial Mapping Platform',
    questions: [
      {
        id: 'nav',
        label: 'Ease of navigating the map and finding a location',
      },
      {
        id: 'legend',
        label: 'Clarity of indicators, legends, and map layers',
      },
      {
        id: 'filters',
        label: 'Usefulness of filters for location, commodity, and time period',
      },
      {
        id: 'visual',
        label: 'Ease of reading and interpreting the map',
      },
      {
        id: 'useful',
        label: 'Usefulness of the Geospatial Mapping Platform for the Department and the agriculture sector',
      },
    ],
    commentsLabel: 'Comments/Suggestions/Recommendations on the Geospatial Mapping Platform',
  },
];

export const OVERALL_QUESTIONS: RatingQuestion[] = [
  {
    id: 'satisfaction',
    label: 'Overall quality of the OASIS prototypes you used',
  },
  {
    id: 'instructions',
    label: 'Clarity of the hands-on demo guide',
  },
  {
    id: 'improveWork',
    label: 'How well OASIS would support the Department and the agriculture sector',
  },
];
