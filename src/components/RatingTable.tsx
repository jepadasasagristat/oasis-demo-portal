import { RATING_SCALE, RATING_TABLE_INTRO, type RatingQuestion } from '../config/survey';
import type { RatingValue } from '../types/feedback';

interface RatingTableProps {
  namePrefix: string;
  questions: RatingQuestion[];
  values: Record<string, RatingValue>;
  errors: Record<string, string | undefined>;
  required?: boolean;
  onChange: (questionId: string, value: RatingValue) => void;
}

export default function RatingTable({
  namePrefix,
  questions,
  values,
  errors,
  required = false,
  onChange,
}: RatingTableProps) {
  return (
    <div className="rating-block">
      <p className="rating-intro" id={`${namePrefix}-rating-intro`}>
        {RATING_TABLE_INTRO}
      </p>
      <div className="rating-table-wrap">
        <table className="rating-table" aria-describedby={`${namePrefix}-rating-intro`}>
          <caption className="visually-hidden">
            Rating items, 1 Poor to 5 Excellent
          </caption>
          <thead>
            <tr>
              <th scope="col" className="rating-statement-col">
                <span className="visually-hidden">Statement</span>
              </th>
              {RATING_SCALE.map((item) => (
                <th key={item.value} scope="col" className="rating-score-col">
                  <span className="rating-col-head">
                    <span className="rating-col-num">{item.label}</span>
                    {item.caption ? <span className="rating-col-cap">{item.caption}</span> : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => {
              const error = errors[`${namePrefix}.${question.id}`];
              return (
                <tr key={question.id} className={error ? 'has-error' : undefined}>
                  <th
                    scope="row"
                    data-error-key={`${namePrefix}.${question.id}`}
                    tabIndex={-1}
                  >
                    {question.label}
                    {required ? (
                      <span className="required-mark" aria-hidden>
                        {' '}
                        *
                      </span>
                    ) : null}
                    {error ? (
                      <p className="field-error" id={`${namePrefix}-${question.id}-error`}>
                        {error}
                      </p>
                    ) : null}
                  </th>
                  {RATING_SCALE.map((item) => {
                    const inputId = `${namePrefix}-${question.id}-${item.value}`;
                    const selected = values[question.id] === item.value;
                    return (
                      <td
                        key={item.value}
                        className={selected ? 'is-selected' : undefined}
                      >
                        <label htmlFor={inputId} className={`rating-cell${selected ? ' is-on' : ''}`}>
                          <input
                            id={inputId}
                            type="radio"
                            name={`${namePrefix}-${question.id}`}
                            value={item.value}
                            checked={selected}
                            onChange={() => onChange(question.id, item.value)}
                            aria-label={`${question.label}: ${item.label}${item.caption ? ` ${item.caption}` : ''}`}
                            aria-invalid={error ? true : undefined}
                            aria-describedby={error ? `${namePrefix}-${question.id}-error` : undefined}
                          />
                          <span className="rating-choice" aria-hidden>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </label>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rating-mobile">
        {questions.map((question) => {
          const error = errors[`${namePrefix}.${question.id}`];
          return (
            <div className="rating-mobile-item" key={question.id}>
              <p>
                {question.label}
                {required ? (
                  <span className="required-mark" aria-hidden>
                    {' '}
                    *
                  </span>
                ) : null}
              </p>
              <div className="rating-pills" role="radiogroup" aria-label={question.label}>
                {RATING_SCALE.map((item) => (
                  <label key={item.value} className={values[question.id] === item.value ? 'is-on' : undefined}>
                    <input
                      type="radio"
                      name={`${namePrefix}-mobile-${question.id}`}
                      value={item.value}
                      checked={values[question.id] === item.value}
                      onChange={() => onChange(question.id, item.value)}
                    />
                    <span className="rating-choice" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item.caption ? <span className="rating-pill-cap">{item.caption}</span> : null}
                  </label>
                ))}
              </div>
              {error ? <p className="field-error">{error}</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
