interface ThankYouProps {
  mode: 'sheets' | 'local';
  onReset: () => void;
}

export default function ThankYou({ mode, onReset }: ThankYouProps) {
  return (
    <section className="section-block thank-you" id="feedback" aria-labelledby="thanks-heading">
      <div className="thank-you-icon" aria-hidden>
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 id="thanks-heading">Thank you for your feedback</h2>
      <p className="lede" style={{ marginInline: 'auto' }}>
        Your responses help AgriStat improve the OASIS prototypes. You may close this page or
        submit another response if you are collecting feedback for a second tester.
      </p>
      {mode === 'local' ? (
        <p className="local-mode-note">
          This browser saved a local copy because the Google Sheets web-app URL is not set yet.
          Follow <code>docs/GOOGLE_SHEETS_SETUP.md</code> to store responses in a spreadsheet.
        </p>
      ) : (
        <p className="local-mode-note">Your response was saved to the OASIS feedback spreadsheet.</p>
      )}
      <button type="button" className="btn-secondary" onClick={onReset}>
        Submit another response
      </button>
    </section>
  );
}
