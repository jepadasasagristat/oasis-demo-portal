import type { PrototypeOptionId } from '../config/survey';

export type RatingValue = '' | '1' | '2' | '3' | '4' | '5';

export type PrototypeAccess = Record<PrototypeOptionId, boolean>;

export type PlatformRatings = Record<string, RatingValue>;

export interface PlatformFeedback {
  ratings: PlatformRatings;
  comments: string;
}

export interface FeedbackFormState {
  fullName: string;
  officeUnit: string;
  position: string;
  email: string;
  prototypes: PrototypeAccess;
  platforms: Record<PrototypeOptionId, PlatformFeedback>;
  overallRatings: PlatformRatings;
  workedWell: string;
  needsImprovement: string;
  additionalComments: string;
  consent: boolean;
  followUp: boolean;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
