/**
 * Section 2 — Hands-on demo.
 * Upload steps follow the AgriStat Data Bank Data Upload page
 * (period → template → file → Upload & validate). Table steps follow
 * Data Table Builder (dataset → rows → values → Generate Data → visualization).
 */
import { DEMO_ACCOUNTS } from '../config/demoAccounts';
import { PROTOTYPE_LINKS, SAMPLE_DATASETS } from '../config/links';

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3.5 7.5h6l1.6 1.8H20.5v9.2H3.5V7.5Z" strokeLinejoin="round" />
      <path d="M3.5 10.2h17" strokeLinecap="round" />
    </svg>
  );
}

function AccountCard({
  roleLabel,
  usedFor,
  email,
  password,
}: {
  roleLabel: string;
  usedFor: string;
  email: string;
  password: string;
}) {
  return (
    <div>
      <span className="role-pill">{roleLabel}</span>
      <p>
        <strong>{usedFor}</strong>
        Email: <code>{email}</code>
        <br />
        Password: <code>{password}</code>
      </p>
    </div>
  );
}

export default function DemoGuide() {
  return (
    <section className="section-block" id="demo-guide" aria-labelledby="demo-heading">
      <p className="section-kicker">Section 2</p>
      <h2 id="demo-heading">Hands-on Demo Guide</h2>
      <p className="lede">
        Follow these steps in order. Use the producer account for upload and validation, then
        switch to the consumer account for the custom table builder.
      </p>

      <article className="demo-step">
        <span className="step-number" aria-hidden>
          1
        </span>
        <div className="demo-step-body">
          <h3>Download Sample Datasets</h3>
          <p>
            Open each Google Drive folder and download at least one Excel workbook from it.
            You will upload these files in the next step to test Data Bank validation.
          </p>
          <div className="download-row">
            <a
              className="download-card"
              href={SAMPLE_DATASETS.clean.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="download-card-icon">
                <FolderIcon />
              </span>
              <strong>{SAMPLE_DATASETS.clean.label}</strong>
              <span className="download-card-hint">{SAMPLE_DATASETS.clean.hint}</span>
              <span className="card-cta">{SAMPLE_DATASETS.clean.cta}</span>
            </a>
            <a
              className="download-card"
              href={SAMPLE_DATASETS.withErrors.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="download-card-icon">
                <FolderIcon />
              </span>
              <strong>{SAMPLE_DATASETS.withErrors.label}</strong>
              <span className="download-card-hint">{SAMPLE_DATASETS.withErrors.hint}</span>
              <span className="card-cta">{SAMPLE_DATASETS.withErrors.cta}</span>
            </a>
          </div>
          <p className="muted">
            Keep both kinds of files on your computer: one clean workbook and one with
            errors. Use them to test the upload and validation features.
          </p>
        </div>
      </article>

      <article className="demo-step">
        <span className="step-number" aria-hidden>
          2
        </span>
        <div className="demo-step-body">
          <h3>Data Upload (Validation Only)</h3>
          <div className="account-callout">
            <AccountCard {...DEMO_ACCOUNTS.producer} />
          </div>
          <p>
            Go to the{' '}
            <a href={PROTOTYPE_LINKS.dataBank.href} target="_blank" rel="noopener noreferrer">
              Data Bank
            </a>{' '}
            and sign in with the producer account. Then:
          </p>
          <ol>
            <li>
              Open <strong>Data Upload</strong> from the sidebar.
            </li>
            <li>
              <strong>Step 1 — Reporting period:</strong> set the report year and month the
              file covers.
            </li>
            <li>
              <strong>Step 2 — Template:</strong> choose the published workbook schema. If you
              upload a completed ASDB template, the system can auto-detect and select it.
            </li>
            <li>
              <strong>Step 3 — Data file:</strong> drag-and-drop or browse a workbook you
              downloaded from Google Drive (clean folder first, then repeat with a file from
              the errors folder). Confirm the template match message before continuing.
            </li>
            <li>
              Click <strong>Upload &amp; validate</strong> and wait until the preview table
              appears.
            </li>
            <li>
              Review validation: a file from the clean folder should show valid rows; a file
              from the errors folder should list row issues. Inspect error rows in the
              preview. Do not try to publish the data.
            </li>
          </ol>
          <div className="warning-banner" role="note">
            <p>
              Commit / Final Save is disabled in this prototype. Please stop at the validation
              stage.
            </p>
          </div>
        </div>
      </article>

      <article className="demo-step">
        <span className="step-number" aria-hidden>
          3
        </span>
        <div className="demo-step-body">
          <h3>Custom Table Builder</h3>
          <div className="account-callout">
            <AccountCard {...DEMO_ACCOUNTS.consumer} />
          </div>
          <p>
            Sign out of the producer account. Sign in with the consumer account on the{' '}
            <a href={PROTOTYPE_LINKS.dataBank.href} target="_blank" rel="noopener noreferrer">
              Data Bank Login
            </a>
            . Then open <strong>Data Table Builder</strong>:
          </p>
          <ol>
            <li>
              <strong>1. Dataset:</strong> select a published template you are allowed to use.
            </li>
            <li>
              <strong>2. Rows:</strong> check at least one dimension (for example Region and
              Commodity) and reorder grouping if needed.
            </li>
            <li>
              <strong>3. Values:</strong> add a measure and an aggregation (SUM, AVG, MIN, MAX,
              or COUNT).
            </li>
            <li>
              <strong>4. Columns (optional):</strong> pick a pivot field to spread values across
              columns.
            </li>
            <li>
              <strong>5. Filters (optional):</strong> add a field and a matching value, then
              click <strong>Generate Data</strong>.
            </li>
            <li>
              After the table appears, click <strong>Generate Visualization</strong>, choose a
              chart type (bar or line), and apply it. Explore <strong>Export</strong> (XLSX,
              CSV, or PDF) to download the generated data. You may also save a custom table
              template.
            </li>
          </ol>
          <p className="muted">
            If no datasets appear for the consumer account, an administrator still needs to
            grant dataset access. You may instead stay on the producer account and build a
            table from that office’s published templates.
          </p>
        </div>
      </article>

      <article className="demo-step">
        <span className="step-number" aria-hidden>
          4
        </span>
        <div className="demo-step-body">
          <h3>Explore Other Features</h3>
          <ul>
            <li>
              Open the{' '}
              <a href={PROTOTYPE_LINKS.dataAnalytics.href} target="_blank" rel="noopener noreferrer">
                Data Analytics Platform
              </a>
              . Browse the dashboards, view visualizations, and generate insights from the
              analysis.
              <ul>
                <li>
                  From there, open{' '}
                  <a href={PROTOTYPE_LINKS.marketPrice.href} target="_blank" rel="noopener noreferrer">
                    Market Price Monitoring
                  </a>{' '}
                  (Presyong Palengke). Review commodity prices, markets, and related filters.
                </li>
              </ul>
            </li>
            <li>
              Open the{' '}
              <a href={PROTOTYPE_LINKS.geospatial.href} target="_blank" rel="noopener noreferrer">
                Geospatial Mapping Platform
              </a>
              . Briefly explore maps, indicators, and time periods.
            </li>
          </ul>
          <div className="instruction-note">
            <p>
              Take note of your experience while performing these tasks. You will be asked
              about them in the feedback form below.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
