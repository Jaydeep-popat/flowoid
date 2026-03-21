import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

const logoSvg = (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-dark relative z-10">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const LogoMark = () => (
  <div className="relative w-[38px] h-[38px] rounded-[11px] bg-gg flex items-center justify-center shadow-gold flex-shrink-0 overflow-hidden transition-[transform,box-shadow] duration-[320ms] cubic-bezier-bounce group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:shadow-[0_8px_22px_rgba(201,168,76,.5)]">
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.28)_0%,transparent_55%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_50%,rgba(255,255,255,.1))]" />
    {logoSvg}
  </div>
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

  if (variant === 'home') {
    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-[998] bg-[rgba(8,7,28,.5)] backdrop-blur-[6px] transition-opacity duration-[380ms] ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Nav Shell */}
        <div className={`fixed top-0 left-0 right-0 z-[1000] p-0 transition-[padding] duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)] ${scrolled ? 'px-[2%] py-[10px]' : ''}`}>
          <nav className={`flex items-center justify-between px-[5%] border transition-all duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)] ${
            scrolled
              ? 'h-[58px] px-[28px] bg-white/85 backdrop-blur-2xl saturate-180 rounded-2xl border-[rgba(45,43,107,.09)] shadow-[0_4px_24px_rgba(15,14,42,.08),0_1px_0_rgba(255,255,255,.8)_inset]'
              : 'h-[66px] bg-transparent border-transparent rounded-none'
          }`}>
            <Link to="/" className="group flex items-center gap-[10px] font-heading text-[1.2rem] font-extrabold text-dark tracking-[-0.025em] no-underline flex-shrink-0">
              <LogoMark />
              <span>Tech<em className="not-italic grad-text">Sphere</em></span>
            </Link>

            <ul className="hidden md:flex items-center gap-[2px] list-none">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`relative text-[.855rem] font-medium px-[13px] py-[7px] rounded-[10px] whitespace-nowrap transition-[color,background] duration-200 after:content-[''] after:absolute after:bottom-[3px] after:left-1/2 after:-translate-x-1/2 after:w-[16px] after:h-[2px] after:rounded-sm after:bg-gg after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 ${
                      location.pathname === to
                        ? 'text-dark font-semibold after:scale-x-100'
                        : 'text-muted hover:text-dark hover:bg-pale'
                    }`}
                  >{label}</Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-[7px] px-5 py-[9px] rounded-[10px] text-[.83rem] font-bold text-dark bg-gg shadow-[0_4px_18px_rgba(201,168,76,.4)] whitespace-nowrap transition-all duration-[280ms] relative overflow-hidden hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.26)_0%,transparent_55%)] before:pointer-events-none flex-shrink-0"
              >Get in Touch</Link>
              {/* Hamburger */}
              <button
                className={`flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-[10px] border flex-shrink-0 transition-all duration-[250ms] ${
                  drawerOpen
                    ? 'bg-gm border-transparent shadow-brand [&>span]:bg-white [&>span:nth-child(1)]:translate-y-[7px] [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(1)]:w-[17px] [&>span:nth-child(1)]:ml-0 [&>span:nth-child(2)]:scale-x-0 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:-translate-y-[7px] [&>span:nth-child(3)]:-rotate-45 [&>span:nth-child(3)]:w-[17px] [&>span:nth-child(3)]:ml-0'
                    : 'bg-pale border-[rgba(45,43,107,.12)] hover:bg-pale2'
                }`}
                onClick={() => setDrawerOpen(v => !v)}
                aria-label="Toggle menu"
              >
                <span className="block w-[17px] h-[2px] bg-dark rounded-sm transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] origin-center" />
                <span className="block w-[12px] h-[2px] bg-dark rounded-sm ml-[5px] transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] origin-center" />
                <span className="block w-[17px] h-[2px] bg-dark rounded-sm transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] origin-center" />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Drawer */}
        <div className={`fixed top-0 left-0 right-0 z-[999] bg-dark rounded-b-3xl shadow-[0_24px_60px_rgba(0,0,0,.45)] overflow-hidden transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.4,0,.2,1)] ${drawerOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-[108%] opacity-0 pointer-events-none'}`}>
          {/* Gold shimmer bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,#C9A84C,#E8C96A,#C9A84C,transparent)] bg-[200%_100%] animate-gl" />

          <div className="pt-[84px] px-6 pb-[30px]">
            <ul className="list-none flex flex-col gap-[3px] mb-6">
              {navItems.map(({ label, to }, idx) => (
                <li
                  key={to}
                  className={`transition-[opacity,transform] duration-300 ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                  style={{ transitionDelay: drawerOpen ? `${0.07 + idx * 0.05}s` : '0s' }}
                >
                  <Link
                    to={to}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between px-4 py-[13px] rounded-xl font-heading text-[1.04rem] font-semibold text-white/70 border border-transparent transition-all duration-[220ms] hover:text-white hover:bg-white/8 hover:border-white/8 hover:pl-5 [&>span]:text-[.7rem] [&>span]:text-white/22 [&>span]:transition-all [&>span]:duration-[220ms] hover:[&>span]:text-gold hover:[&>span]:translate-x-1"
                  >
                    {label} <span>›</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-px bg-white/7 mb-[22px]" />

            <div className={`transition-[opacity,transform] duration-[320ms] delay-[380ms] ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'}`}>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 px-4 py-[13px] rounded-[14px] bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)] mb-[18px] transition-all duration-[220ms] hover:bg-[rgba(201,168,76,.16)]"
              >
                <div className="w-[38px] h-[38px] rounded-[10px] bg-gg flex-shrink-0 flex items-center justify-center text-[.9rem]">📞</div>
                <div>
                  <span className="block text-[.67rem] text-white/40 mb-[2px]">Call us anytime</span>
                  <strong className="font-heading text-[.91rem] font-bold text-white">+91 98765 43210</strong>
                </div>
              </a>
              <div className="flex items-center gap-[10px]">
                <span className="text-[.7rem] text-white/30 font-medium">Follow us</span>
                <div className="flex gap-2">
                  {['in','𝕏','f','▶','@'].map((s) => (
                    <div key={s} className="w-[34px] h-[34px] rounded-[9px] border border-white/10 bg-white/4 flex items-center justify-center text-[.78rem] text-white/38 cursor-pointer transition-all duration-[220ms] hover:bg-gg hover:border-transparent hover:text-dark">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Inner page variant — always solid glass
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] h-[68px] px-[5%] flex items-center justify-between bg-white/92 backdrop-blur-2xl border-b border-[rgba(45,43,107,.09)] transition-all duration-[350ms] ${scrolled ? 'bg-white/98 shadow-[0_4px_24px_rgba(15,14,42,.08),0_1px_0_rgba(255,255,255,.8)_inset]' : ''}`}>
        <Link to="/" className="group flex items-center gap-[10px] font-heading text-[1.2rem] font-extrabold text-dark tracking-[-0.025em] no-underline flex-shrink-0">
          <LogoMark />
          <span>Tech<em className="not-italic grad-text">Sphere</em></span>
        </Link>

        <ul className="hidden md:flex items-center gap-[2px] list-none">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`relative text-[.855rem] font-medium px-[13px] py-[7px] rounded-[10px] whitespace-nowrap transition-[color,background] duration-200 after:content-[''] after:absolute after:bottom-[3px] after:left-1/2 after:-translate-x-1/2 after:w-[16px] after:h-[2px] after:rounded-sm after:bg-gg after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 ${
                  location.pathname === to
                    ? 'text-dark font-semibold after:scale-x-100'
                    : 'text-muted hover:text-dark hover:bg-pale'
                }`}
              >{label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to="/contact" className="hidden md:inline-block px-5 py-2 rounded-[10px] text-[.84rem] font-semibold text-b4 border-[1.5px] border-[rgba(45,43,107,.12)] bg-transparent transition-all duration-[250ms] hover:bg-pale hover:border-b4">Get a Quote</Link>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-[7px] px-5 py-[9px] rounded-[10px] text-[.83rem] font-bold text-dark bg-gg shadow-[0_4px_18px_rgba(201,168,76,.4)] whitespace-nowrap transition-all duration-[280ms] relative overflow-hidden hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.26)_0%,transparent_55%)] before:pointer-events-none"
          >Free Consultation →</Link>
          {/* Hamburger */}
          <button
            className={`md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-[10px] border flex-shrink-0 transition-all duration-[250ms] ${
              drawerOpen
                ? 'bg-gm border-transparent shadow-brand [&>span]:bg-white [&>span:nth-child(1)]:translate-y-[7px] [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:scale-x-0 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:-translate-y-[7px] [&>span:nth-child(3)]:-rotate-45'
                : 'bg-pale border-[rgba(45,43,107,.12)] hover:bg-pale2'
            }`}
            onClick={() => setDrawerOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-[17px] h-[2px] bg-dark rounded-sm transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] origin-center" />
            <span className="block w-[12px] h-[2px] bg-dark rounded-sm transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] origin-center" />
            <span className="block w-[17px] h-[2px] bg-dark rounded-sm transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] origin-center" />
          </button>
        </div>
      </nav>

      {/* Inner page mobile drawer */}
      <div className={`md:hidden fixed top-[68px] left-0 right-0 z-[999] bg-white border-b border-border px-[5%] pt-5 pb-7 shadow-[0_16px_48px_rgba(15,14,42,.1)] overflow-y-auto max-h-[calc(100vh-68px)] flex-col ${drawerOpen ? 'flex' : 'hidden'}`}>
        <ul className="list-none flex flex-col">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center gap-3 py-[13px] border-b border-border text-[.95rem] font-medium transition-all duration-200 last:border-b-0 ${location.pathname === to ? 'text-b4' : 'text-body hover:text-b4'}`}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="w-8 h-8 rounded-lg bg-pale flex items-center justify-center text-[.85rem] flex-shrink-0">
                  {label === 'Home' ? '🏠' : label === 'About' ? '🏢' : label === 'Services' ? '⚙️' : label === 'Projects' ? '📁' : label === 'Testimonials' ? '⭐' : '📞'}
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-[10px] mt-[18px]">
          <Link to="/contact" onClick={() => setDrawerOpen(false)} className="block text-center py-3 px-5 text-[.9rem] rounded-[10px] text-b4 border-[1.5px] border-[rgba(45,43,107,.12)] bg-transparent font-semibold hover:bg-pale">Get a Quote</Link>
          <Link to="/contact" onClick={() => setDrawerOpen(false)} className="block text-center py-3 px-5 text-[.9rem] rounded-[10px] font-bold text-dark bg-gg shadow-gold hover:shadow-[0_10px_28px_rgba(201,168,76,.5)]">Free Consultation →</Link>
        </div>
      </div>
    </>
  );
}
