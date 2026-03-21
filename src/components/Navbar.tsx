import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
];

interface NavbarProps {
  variant?: 'home' | 'inner';
}

export default function Navbar({ variant = 'inner' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > (variant === 'home' ? 60 : 40));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location]);

  const logoSvg = (
    <svg viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );

  if (variant === 'home') {
    return (
      <>
        {/* Overlay */}
        <div
          className={`m-overlay${drawerOpen ? ' show' : ''}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Nav Shell */}
        <div id="nav-shell" className={scrolled ? 'scrolled' : ''}>
          <nav id="nav" className={scrolled ? 'scrolled' : ''}>
            <Link to="/" className="nav-logo">
              <div className="lmark">{logoSvg}</div>
              <span className="lname">Tech<em>Sphere</em></span>
            </Link>
            <ul className="nav-links">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={location.pathname === to ? 'active' : ''}>{label}</Link>
                </li>
              ))}
            </ul>
            <div className="nav-right">
              <Link to="/contact" className="btn-fill">Get in Touch</Link>
              <div
                className={`ham${drawerOpen ? ' open' : ''}`}
                onClick={() => setDrawerOpen(v => !v)}
              >
                <span /><span /><span />
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Drawer */}
        <div className={`m-drawer${drawerOpen ? ' open' : ''}`}>
          <div className="m-drawer-inner">
            <ul className="m-nav-list">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} onClick={() => setDrawerOpen(false)}>
                    {label} <span>›</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="m-div" />
            <div className="m-bottom">
              <a href="tel:+919876543210" className="m-call">
                <div className="m-call-ico">📞</div>
                <div className="m-call-txt">
                  <span>Call us anytime</span>
                  <strong>+91 98765 43210</strong>
                </div>
              </a>
              <div className="m-socials">
                <span className="m-soc-lbl">Follow us</span>
                <div className="m-soc-icons">
                  <div className="msoc">in</div>
                  <div className="msoc">𝕏</div>
                  <div className="msoc">f</div>
                  <div className="msoc">▶</div>
                  <div className="msoc">@</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Inner page variant
  return (
    <>
      <nav className={`nav-inner${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <div className="lmark">{logoSvg}</div>
          <span className="lname">Tech<em>Sphere</em></span>
        </Link>
        <ul className="nav-links">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} className={location.pathname === to ? 'active' : ''}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <Link to="/contact" className="btn-ghost">Get a Quote</Link>
          <Link to="/contact" className="btn-fill">Free Consultation →</Link>
          <div
            className={`ham${drawerOpen ? ' open' : ''}`}
            onClick={() => setDrawerOpen(v => !v)}
          >
            <span /><span /><span />
          </div>
        </div>
      </nav>
      <div className={`m-drawer-inner-page${drawerOpen ? ' open' : ''}`}>
        <ul className="m-links">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={location.pathname === to ? 'active' : ''}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="m-ico">
                  {label === 'Home' ? '🏠' : label === 'About' ? '🏢' : label === 'Services' ? '⚙️' : label === 'Projects' ? '📁' : label === 'Testimonials' ? '⭐' : '📞'}
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="m-ctas">
          <Link to="/contact" className="btn-ghost" onClick={() => setDrawerOpen(false)}>Get a Quote</Link>
          <Link to="/contact" className="btn-fill" onClick={() => setDrawerOpen(false)}>Free Consultation →</Link>
        </div>
      </div>
    </>
  );
}
