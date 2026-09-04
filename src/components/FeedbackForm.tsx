/**
 * Section 3 — OASIS Prototype Feedback Survey.
 * Question copy lives in src/config/survey.ts. Submit logic: src/lib/sheets.ts.
 */
import { FormEvent, useId, useState, type ReactNode } from 'react';
import {
  COMMENTS_PLACEHOLDER,
  OVERALL_QUESTIONS,
  PLATFORM_SECTIONS,
  PROTOTYPE_OPTIONS,
  type PrototypeOptionId,
} from '../config/survey';
import { createInitialFormState, emptyPlatform, setRating, validateForm } from '../lib/form';
import { submitFeedback } from '../lib/sheets';
import type { FeedbackFormState, FormErrors, RatingValue } from '../types/feedback';
import RatingTable from './RatingTable';

interface FeedbackFormProps {
  onSubmitted: (mode: 'sheets' | 'local') => void;
}

function Field({
  id,
  label,
  required,
  error,
  full,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className={`form-field${full ? ' full' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span className="required-mark" aria-hidden>
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? <p className="field-hint">{hint}</p> : null}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function FeedbackForm({ onSubmitted }: FeedbackFormProps) {
  const [form, setForm] = useState<FeedbackFormState>(createInitialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formId = useId();
  const accessedCount = PROTOTYPE_OPTIONS.filter((item) => form.prototypes[item.id]).length;

  function clearError(key: string) {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function update<K extends keyof FeedbackFormState>(key: K, value: FeedbackFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    clearError(String(key));
  }

  function updatePlatformRating(sectionId: PrototypeOptionId, questionId: string, value: RatingValue) {
    setForm((current) => ({
      ...current,
      platforms: {
        ...current.platforms,
        [sectionId]: {
          ...current.platforms[sectionId],
          ratings: setRating(current.platforms[sectionId].ratings, questionId, value),
        },
      },
    }));
    clearError(`${sectionId}.${questionId}`);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowErrors(true);
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.querySelector(`[data-error-key="${firstKey}"]`);
      if (el instanceof HTMLElement) el.focus();
      document.getElementById('feedback-error-summary')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    setShowErrors(false);
    setSubmitting(true);
    try {
      const result = await submitFeedback(form);
      onSubmitted(result.mode);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Could not submit the form. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-block" id="feedback" aria-labelledby="feedback-heading">
      <p className="section-kicker">Section 3</p>
      <h2 id="feedback-heading">OASIS Prototype Feedback Survey</h2>

      <form className="feedback-form" onSubmit={handleSubmit} noValidate>
        {showErrors && Object.keys(errors).length > 0 ? (
          <div className="form-alert" id="feedback-error-summary" role="alert">
            Please complete the required fields highlighted below.
          </div>
        ) : null}

        <fieldset className="form-panel" aria-labelledby={`${formId}-panel-respondent`}>
          <h3 id={`${formId}-panel-respondent`} className="form-panel-title">
            Respondent Information
          </h3>
          <div className="form-stack form-stack-respondent">
            <Field id={`${formId}-fullName`} label="Full Name" required error={errors.fullName}>
              <input
                id={`${formId}-fullName`}
                data-error-key="fullName"
                name="fullName"
                autoComplete="name"
                placeholder="Juan Dela Cruz"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                required
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
              />
            </Field>
            <Field id={`${formId}-office`} label="Office / Unit" required error={errors.officeUnit}>
              <input
                id={`${formId}-office`}
                data-error-key="officeUnit"
                name="officeUnit"
                placeholder="e.g. AgriStat, NCMO"
                value={form.officeUnit}
                onChange={(e) => update('officeUnit', e.target.value)}
                required
                aria-invalid={errors.officeUnit ? true : undefined}
              />
            </Field>
            <Field
              id={`${formId}-position`}
              label="Position / Designation"
              required
              error={errors.position}
            >
              <input
                id={`${formId}-position`}
                data-error-key="position"
                name="position"
                placeholder="e.g. Statistician"
                value={form.position}
                onChange={(e) => update('position', e.target.value)}
                required
                aria-invalid={errors.position ? true : undefined}
              />
            </Field>
            <Field id={`${formId}-email`} label="Email" required error={errors.email}>
              <input
                id={`${formId}-email`}
                data-error-key="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@da.gov.ph"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                required
                aria-invalid={errors.email ? true : undefined}
              />
            </Field>
          </div>

          <div className="proto-picker">
            <p id={`${formId}-prototypes-label`} className="proto-picker-label">
              Which prototypes did you access?
              <span className="required-mark" aria-hidden>
                {' '}
                *
              </span>
            </p>
            <p className="field-hint">Select one or more. Questions for each choice appear next.</p>
            <div
              className="proto-chip-grid"
              role="group"
              aria-labelledby={`${formId}-prototypes-label`}
              data-error-key="prototypes"
              tabIndex={-1}
            >
              {PROTOTYPE_OPTIONS.map((option) => {
                const checked = form.prototypes[option.id];
                return (
                  <label
                    className={`proto-chip${checked ? ' is-selected' : ''}`}
                    key={option.id}
                  >
                    <input
                      type="checkbox"
                      name="prototypes"
                      value={option.id}
                      checked={checked}
                      onChange={(e) => {
                        const nextChecked = e.target.checked;
                        setForm((current) => ({
                          ...current,
                          prototypes: {
                            ...current.prototypes,
                            [option.id]: nextChecked,
                          },
                          platforms: nextChecked
                            ? current.platforms
                            : {
                                ...current.platforms,
                                [option.id]: emptyPlatform(),
                              },
                        }));
                        if (nextChecked) clearError('prototypes');
                      }}
                    />
                    <span className="proto-chip-check" aria-hidden>
                      {checked ? '✓' : ''}
                    </span>
                    <span className="proto-chip-label">{option.label}</span>
                  </label>
                );
              })}
            </div>
            {errors.prototypes ? <p className="field-error">{errors.prototypes}</p> : null}
          </div>
        </fieldset>

        {accessedCount === 0 ? (
          <p className="form-empty-hint">
            Select at least one prototype above to show its rating questions.
          </p>
        ) : null}

        {PLATFORM_SECTIONS.filter((section) => form.prototypes[section.id]).map((section) => (
          <fieldset
            className="form-panel is-revealed"
            key={section.id}
            aria-labelledby={`${formId}-panel-${section.id}`}
          >
            <h3 id={`${formId}-panel-${section.id}`} className="form-panel-title">
              {section.title}
            </h3>
            <RatingTable
              namePrefix={section.id}
              questions={section.questions}
              values={form.platforms[section.id].ratings}
              errors={errors}
              required
              onChange={(questionId, value) =>
                updatePlatformRating(section.id, questionId, value)
              }
            />
            <Field
              id={`${formId}-${section.id}-comments`}
              label={section.commentsLabel}
              full
              hint="Optional"
            >
              <textarea
                id={`${formId}-${section.id}-comments`}
                name={`${section.id}Comments`}
                placeholder={COMMENTS_PLACEHOLDER}
                value={form.platforms[section.id].comments}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    platforms: {
                      ...current.platforms,
                      [section.id]: {
                        ...current.platforms[section.id],
                        comments: e.target.value,
                      },
                    },
                  }))
                }
              />
            </Field>
          </fieldset>
        ))}

        <fieldset className="form-panel" aria-labelledby={`${formId}-panel-overall`}>
          <h3 id={`${formId}-panel-overall`} className="form-panel-title">
            Overall Experience &amp; General Feedback
          </h3>
          <RatingTable
            namePrefix="overall"
            questions={OVERALL_QUESTIONS}
            values={form.overallRatings}
            errors={errors}
            required
            onChange={(questionId, value) => {
              update('overallRatings', setRating(form.overallRatings, questionId, value));
              clearError(`overall.${questionId}`);
            }}
          />
          <div className="form-stack form-stack-comments">
            <Field id={`${formId}-workedWell`} label="What worked well?" hint="Optional">
              <textarea
                id={`${formId}-workedWell`}
                name="workedWell"
                placeholder={COMMENTS_PLACEHOLDER}
                value={form.workedWell}
                onChange={(e) => update('workedWell', e.target.value)}
              />
            </Field>
            <Field
              id={`${formId}-needsImprovement`}
              label="What should be improved?"
              hint="Optional"
            >
              <textarea
                id={`${formId}-needsImprovement`}
                name="needsImprovement"
                placeholder={COMMENTS_PLACEHOLDER}
                value={form.needsImprovement}
                onChange={(e) => update('needsImprovement', e.target.value)}
              />
            </Field>
            <Field
              id={`${formId}-additional`}
              label="Additional comments or features you need"
              hint="Optional"
            >
              <textarea
                id={`${formId}-additional`}
                name="additionalComments"
                placeholder={COMMENTS_PLACEHOLDER}
                value={form.additionalComments}
                onChange={(e) => update('additionalComments', e.target.value)}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="form-panel form-panel-submit" aria-labelledby={`${formId}-panel-submit`}>
          <h3 id={`${formId}-panel-submit`} className="form-panel-title">
            Consent and submit
          </h3>
          <div className="consent-stack">
            <label className={`consent-card${form.consent ? ' is-checked' : ''}${errors.consent ? ' has-error' : ''}`}>
              <input
                type="checkbox"
                name="consent"
                data-error-key="consent"
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
                required
              />
              <span>
                I understand that my responses will be used by the Agricultural Statistics NCMO
                to improve the OASIS project.
                <span className="required-mark" aria-hidden>
                  {' '}
                  *
                </span>
              </span>
            </label>
            {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
            <label className={`consent-card is-optional${form.followUp ? ' is-checked' : ''}`}>
              <input
                type="checkbox"
                name="followUp"
                checked={form.followUp}
                onChange={(e) => update('followUp', e.target.checked)}
              />
              <span>I agree to be contacted for follow-up clarification (optional).</span>
            </label>
          </div>

          {submitError ? (
            <p className="form-error" role="alert">
              {submitError}
            </p>
          ) : null}

          <div className="submit-row">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit feedback'}
            </button>
            <p className="submit-note">
              Please finish the demo steps before sending your responses.
            </p>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
