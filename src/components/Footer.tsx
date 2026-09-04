import { PORTAL } from '../config/links';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="site-footer-product">{PORTAL.title}</span>
        <p>Department of Agriculture · Agricultural Statistics NCMO</p>
      </div>
    </footer>
  );
}
