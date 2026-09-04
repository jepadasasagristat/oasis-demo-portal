import {
  OVERALL_QUESTIONS,
  PLATFORM_SECTIONS,
  PROTOTYPE_OPTIONS,
  type PrototypeOptionId,
} from '../config/survey';
import type {
  FeedbackFormState,
  FormErrors,
  PlatformFeedback,
  RatingValue,
} from '../types/feedback';

export function emptyPlatform(): PlatformFeedback {
  return { ratings: {}, comments: '' };
}

export function createInitialFormState(): FeedbackFormState {
  const prototypes = Object.fromEntries(
    PROTOTYPE_OPTIONS.map((item) => [item.id, false]),
  ) as FeedbackFormState['prototypes'];

  const platforms = Object.fromEntries(
    PLATFORM_SECTIONS.map((section) => [section.id, emptyPlatform()]),
  ) as FeedbackFormState['platforms'];

  return {
    fullName: '',
    officeUnit: '',
    position: '',
    email: '',
    prototypes,
    platforms,
    overallRatings: {},
    workedWell: '',
    needsImprovement: '',
    additionalComments: '',
    consent: false,
    followUp: false,
  };
}

export function setRating(
  ratings: Record<string, RatingValue>,
  questionId: string,
  value: RatingValue,
): Record<string, RatingValue> {
  return { ...ratings, [questionId]: value };
}

export function validateForm(state: FeedbackFormState): FormErrors {
  const errors: FormErrors = {};

  if (!state.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!state.officeUnit.trim()) errors.officeUnit = 'Office or unit is required.';
  if (!state.position.trim()) errors.position = 'Position or designation is required.';
  if (!state.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  const accessed = PROTOTYPE_OPTIONS.filter((item) => state.prototypes[item.id]);
  if (accessed.length === 0) {
    errors.prototypes = 'Select at least one prototype you accessed.';
  }

  for (const section of PLATFORM_SECTIONS) {
    if (!state.prototypes[section.id]) continue;
    for (const question of section.questions) {
      if (!state.platforms[section.id].ratings[question.id]) {
        errors[`${section.id}.${question.id}`] = 'Please provide a rating.';
      }
    }
  }

  for (const question of OVERALL_QUESTIONS) {
    if (!state.overallRatings[question.id]) {
      errors[`overall.${question.id}`] = 'Please provide a rating.';
    }
  }

  if (!state.consent) {
    errors.consent = 'Consent is required before submitting.';
  }

  return errors;
}

export function accessedPrototypeLabels(state: FeedbackFormState): string {
  return PROTOTYPE_OPTIONS.filter((item) => state.prototypes[item.id])
    .map((item) => item.label)
    .join('; ');
}

function ratingLabel(value: RatingValue | undefined): string {
  if (!value) return '';
  return value;
}

function platformPrefix(id: PrototypeOptionId): string {
  switch (id) {
    case 'dataBank':
      return 'Data Bank';
    case 'geospatial':
      return 'Geospatial';
    case 'dataAnalytics':
      return 'Data Analytics';
    case 'marketPrice':
      return 'Market Price';
    default:
      return id;
  }
}

/** Flatten the form into ordered columns for Google Sheets. */
export function flattenForSheet(state: FeedbackFormState): {
  headers: string[];
  values: string[];
} {
  const headers: string[] = [
    'Submitted at',
    'Full name',
    'Office / unit',
    'Position / designation',
    'Email',
    'Prototypes accessed',
    'Consent',
    'May contact for follow-up',
  ];
  const values: string[] = [
    new Date().toISOString(),
    state.fullName.trim(),
    state.officeUnit.trim(),
    state.position.trim(),
    state.email.trim(),
    accessedPrototypeLabels(state),
    state.consent ? 'Yes' : 'No',
    state.followUp ? 'Yes' : 'No',
  ];

  for (const section of PLATFORM_SECTIONS) {
    const prefix = platformPrefix(section.id);
    for (const question of section.questions) {
      headers.push(`${prefix} — ${question.label}`);
      values.push(ratingLabel(state.platforms[section.id].ratings[question.id]));
    }
    headers.push(`${prefix} — comments / suggestions / recommendations`);
    values.push(state.platforms[section.id].comments.trim());
  }

  for (const question of OVERALL_QUESTIONS) {
    headers.push(`Overall — ${question.label}`);
    values.push(ratingLabel(state.overallRatings[question.id]));
  }

  headers.push('What worked well', 'What needs improvement', 'Additional comments');
  values.push(
    state.workedWell.trim(),
    state.needsImprovement.trim(),
    state.additionalComments.trim(),
  );

  return { headers, values };
}
