import { PROTOTYPE_LINKS } from '../config/links';

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 19V5M4 19h16" strokeLinecap="round" />
      <path d="M8 15v-4M12 15V8M16 15v-7" strokeLinecap="round" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

const CARDS = [
  { ...PROTOTYPE_LINKS.dataBank, name: 'AgriStat Data Bank', icon: <DatabaseIcon /> },
  { ...PROTOTYPE_LINKS.dataAnalytics, icon: <ChartIcon /> },
  { ...PROTOTYPE_LINKS.geospatial, icon: <MapIcon /> },
];

export default function PrototypeAccess() {
  return (
    <section className="section-block" id="prototypes" aria-labelledby="prototypes-heading">
      <p className="section-kicker">Section 1</p>
      <h2 id="prototypes-heading">Access the OASIS Prototypes</h2>
      <p className="lede">
        Open each platform in a new tab. Explore the interface first, then return here for the
        hands-on demo and the feedback form.
      </p>

      <div className="card-grid">
        {CARDS.map((card) => (
          <a
            key={card.id}
            className="prototype-card"
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="card-icon">{card.icon}</span>
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            <span className="card-cta">Open prototype →</span>
          </a>
        ))}
      </div>

      <div className="instruction-note">
        <p>
          Please open and explore each prototype before proceeding to the hands-on demo and
          feedback form.
        </p>
      </div>
    </section>
  );
}
