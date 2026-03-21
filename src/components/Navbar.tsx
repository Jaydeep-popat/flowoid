import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home',         to: '/' },
  { label: 'About',        to: '/about' },
  { label: 'Services',     to: '/services' },
  { label: 'Projects',     to: '/projects' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact',      to: '/contact' },
];

interface NavbarProps {
  variant?: 'home' | 'inner';
}

/* ── Logo image from public ──────────────────────────── */
const Logo = () => (
  <img
    src="/Final Logo.png"
    alt="TechSphere"
    className="h-12 md:h-16 w-auto object-contain flex-shrink-0"
  />
);

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

  useEffect(() => { setDrawerOpen(false); }, [location]);

  /* ── Shared nav link class builder ─────────────────── */
  const linkCls = (to: string) =>
    `relative text-[.9rem] font-medium px-3.5 py-2 rounded-xl whitespace-nowrap transition-all duration-200
     after:content-[''] after:absolute after:bottom-[4px] after:left-1/2 after:-translate-x-1/2
     after:w-4 after:h-[2px] after:rounded-full after:bg-gg
     after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100
     ${location.pathname === to
       ? 'text-dark font-semibold after:scale-x-100'
       : 'text-muted hover:text-dark hover:bg-pale'
     }`;

  /* ── Shared CTA button ──────────────────────────────── */
  const ctaBtn = (
    <Link
      to="/contact"
      className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[.85rem] font-bold
                 text-dark bg-gg shadow-[0_4px_18px_rgba(201,168,76,.35)]
                 relative overflow-hidden transition-all duration-[280ms]
                 hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(201,168,76,.55)]
                 before:content-[''] before:absolute before:inset-0
                 before:bg-[linear-gradient(135deg,rgba(255,255,255,.26)_0%,transparent_55%)]
                 before:pointer-events-none flex-shrink-0"
    >
      Get in Touch
    </Link>
  );

  /* ── Hamburger button ───────────────────────────────── */
  const hamburger = (
    <button
      className={`flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-xl
                  border flex-shrink-0 transition-all duration-[250ms]
                  ${drawerOpen
                    ? 'bg-dark border-transparent shadow-brand'
                    : 'bg-pale border-[rgba(45,43,107,.12)] hover:bg-pale2'}`}
      onClick={() => setDrawerOpen(v => !v)}
      aria-label="Toggle menu"
    >
      <span className={`block h-[2px] bg-dark rounded-sm transition-all duration-300 origin-center
                        ${drawerOpen ? 'w-[17px] translate-y-[7px] rotate-45 bg-white' : 'w-[17px]'}`} />
      <span className={`block h-[2px] bg-dark rounded-sm transition-all duration-300
                        ${drawerOpen ? 'w-[17px] opacity-0 scale-x-0 bg-white' : 'w-[12px] ml-[5px]'}`} />
      <span className={`block h-[2px] bg-dark rounded-sm transition-all duration-300 origin-center
                        ${drawerOpen ? 'w-[17px] -translate-y-[7px] -rotate-45 bg-white' : 'w-[17px]'}`} />
    </button>
  );

  /* ══════════════════════════════════════════════════════
     HOME VARIANT  — transparent → floating pill on scroll
  ══════════════════════════════════════════════════════ */
  if (variant === 'home') {
    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-[998] bg-[rgba(8,7,28,.5)] backdrop-blur-[6px]
                      transition-opacity duration-[380ms]
                      ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Floating pill wrapper */}
        <div className="fixed top-0 left-0 right-0 z-[1000] flex justify-center
                        pt-4 px-4 transition-all duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]">
          <nav className={`w-full max-w-[1380px] flex items-center justify-between px-8 transition-all
                           duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]
                           ${scrolled
                             ? 'h-[70px] bg-white/90 backdrop-blur-2xl saturate-180 rounded-full border border-[rgba(45,43,107,.10)] shadow-[0_8px_32px_rgba(15,14,42,.12),0_1px_0_rgba(255,255,255,.8)_inset]'
                             : 'h-[76px] bg-transparent border border-transparent rounded-full'
                           }`}>
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
            </Link>

            {/* Center nav links */}
            <ul className="hidden md:flex items-center gap-1 list-none">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={linkCls(to)}>{label}</Link>
                </li>
              ))}
            </ul>

            {/* Right CTA + hamburger */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {ctaBtn}
              {hamburger}
            </div>
          </nav>
        </div>

        {/* Mobile Drawer — slides down from top */}
        <div className={`fixed top-0 left-0 right-0 z-[999] bg-dark rounded-b-3xl
                         shadow-[0_24px_60px_rgba(0,0,0,.45)] overflow-hidden
                         transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.4,0,.2,1)]
                         ${drawerOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-[108%] opacity-0 pointer-events-none'}`}>
          {/* Gold shimmer bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]
                          bg-[linear-gradient(90deg,transparent,#C9A84C,#E8C96A,#C9A84C,transparent)]
                          animate-gl" />

          <div className="pt-20 px-6 pb-8">
            <ul className="list-none flex flex-col gap-1 mb-6">
              {navItems.map(({ label, to }, idx) => (
                <li
                  key={to}
                  className={`transition-[opacity,transform] duration-300
                               ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                  style={{ transitionDelay: drawerOpen ? `${0.07 + idx * 0.05}s` : '0s' }}
                >
                  <Link
                    to={to}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl
                                font-heading text-[1rem] font-semibold border border-transparent
                                transition-all duration-[220ms]
                                ${location.pathname === to
                                  ? 'text-white bg-white/10 border-white/10'
                                  : 'text-white/65 hover:text-white hover:bg-white/8 hover:border-white/8'}`}
                  >
                    {label}
                    <span className="text-white/25 text-xs">›</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-px bg-white/8 mb-5" />

            {/* Call card */}
            <div className={`transition-[opacity,transform] duration-[320ms] delay-[380ms]
                             ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl
                           bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)] mb-4
                           transition-all duration-[220ms] hover:bg-[rgba(201,168,76,.16)]"
              >
                <div className="w-9 h-9 rounded-[10px] bg-gg flex-shrink-0 flex items-center justify-center text-sm">📞</div>
                <div>
                  <span className="block text-[.65rem] text-white/40 mb-[1px]">Call us anytime</span>
                  <strong className="font-heading text-[.88rem] font-bold text-white">+91 98765 43210</strong>
                </div>
              </a>
              <div className="flex items-center gap-2.5">
                <span className="text-[.68rem] text-white/30 font-medium">Follow us</span>
                <div className="flex gap-1.5">
                  {['in', '𝕏', 'f', '▶', '@'].map(s => (
                    <div key={s} className="w-8 h-8 rounded-[8px] border border-white/10 bg-white/4
                                           flex items-center justify-center text-[.75rem] text-white/35
                                           cursor-pointer transition-all duration-[220ms]
                                           hover:bg-gg hover:border-transparent hover:text-dark">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ══════════════════════════════════════════════════════
     INNER VARIANT  — always floating pill, slightly below top
  ══════════════════════════════════════════════════════ */
  return (
    <>
      {/* Floating pill wrapper */}
      <div className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-4 px-4">
        <nav className={`w-full max-w-[1380px] h-[70px] flex items-center justify-between px-8
                         rounded-full border bg-white transition-all duration-[350ms]
                         ${scrolled
                           ? 'border-[rgba(45,43,107,.14)] shadow-[0_8px_32px_rgba(15,14,42,.14)]'
                           : 'border-[rgba(45,43,107,.10)] shadow-[0_4px_20px_rgba(15,14,42,.08)]'
                         }`}>
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <Logo />
          </Link>

          {/* Center nav links */}
          <ul className="hidden md:flex items-center gap-1 list-none">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={linkCls(to)}>{label}</Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/contact"
              className="hidden md:inline-block px-4 py-2 rounded-full text-[.84rem] font-semibold
                         text-b4 border-[1.5px] border-[rgba(45,43,107,.14)] bg-transparent
                         transition-all duration-[250ms] hover:bg-pale hover:border-b4"
            >
              Get a Quote
            </Link>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full
                         text-[.84rem] font-bold text-dark bg-gg
                         shadow-[0_4px_18px_rgba(201,168,76,.35)]
                         relative overflow-hidden transition-all duration-[280ms]
                         hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(201,168,76,.55)]
                         before:content-[''] before:absolute before:inset-0
                         before:bg-[linear-gradient(135deg,rgba(255,255,255,.26)_0%,transparent_55%)]
                         before:pointer-events-none"
            >
              Free Consultation →
            </Link>
            {/* Mobile hamburger */}
            <button
              className={`md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10
                          rounded-xl border flex-shrink-0 transition-all duration-[250ms]
                          ${drawerOpen
                            ? 'bg-dark border-transparent shadow-brand'
                            : 'bg-pale border-[rgba(45,43,107,.12)] hover:bg-pale2'}`}
              onClick={() => setDrawerOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[2px] rounded-sm transition-all duration-300 origin-center
                                ${drawerOpen ? 'w-[17px] translate-y-[7px] rotate-45 bg-white' : 'w-[17px] bg-dark'}`} />
              <span className={`block h-[2px] rounded-sm transition-all duration-300
                                ${drawerOpen ? 'w-[17px] opacity-0 scale-x-0 bg-white' : 'w-[12px] ml-[5px] bg-dark'}`} />
              <span className={`block h-[2px] rounded-sm transition-all duration-300 origin-center
                                ${drawerOpen ? 'w-[17px] -translate-y-[7px] -rotate-45 bg-white' : 'w-[17px] bg-dark'}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* Inner page mobile drawer — drops below the pill */}
      <div className={`md:hidden fixed top-[94px] left-4 right-4 z-[999] bg-white rounded-2xl
                       border border-border shadow-[0_16px_48px_rgba(15,14,42,.13)]
                       overflow-y-auto max-h-[calc(100vh-90px)]
                       transition-[opacity,transform] duration-[300ms] ease-[cubic-bezier(.4,0,.2,1)]
                       ${drawerOpen
                         ? 'opacity-100 translate-y-0 pointer-events-auto'
                         : 'opacity-0 -translate-y-3 pointer-events-none'}`}>
        <div className="px-4 pt-4 pb-5">
          <ul className="list-none flex flex-col">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center py-3.5 border-b border-border text-[.95rem]
                               font-medium transition-all duration-200 last:border-b-0
                               ${location.pathname === to ? 'text-b4 font-semibold' : 'text-body hover:text-b4'}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5 mt-4">
            <Link
              to="/contact"
              onClick={() => setDrawerOpen(false)}
              className="block text-center py-3 px-5 text-[.9rem] rounded-xl text-b4
                         border-[1.5px] border-[rgba(45,43,107,.12)] bg-transparent
                         font-semibold hover:bg-pale transition-all duration-200"
            >
              Get a Quote
            </Link>
            <Link
              to="/contact"
              onClick={() => setDrawerOpen(false)}
              className="block text-center py-3 px-5 text-[.9rem] rounded-xl font-bold
                         text-dark bg-gg shadow-gold hover:shadow-[0_10px_28px_rgba(201,168,76,.5)]
                         transition-all duration-200"
            >
              Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
