import daLogo from '../assets/images/da-logo.png';
import { PORTAL } from '../config/links';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <span className="brand-mark">
          <img
            src={daLogo}
            alt="Department of Agriculture"
            className="brand-logo"
            width={40}
            height={40}
          />
        </span>
        <div className="brand-text">
          <h1>{PORTAL.title}</h1>
          <p>{PORTAL.subtitle}</p>
        </div>
      </div>
    </header>
  );
}
