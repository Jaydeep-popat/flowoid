import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Code2, Monitor, Smartphone,
  ShoppingBag, Briefcase, ChevronDown, ArrowRight,
} from 'lucide-react';

const navItems = [
  { label: 'Home',         to: '/' },
  { label: 'About',        to: '/about' },
  { label: 'Services',     to: '/services' },
  { label: 'Projects',     to: '/projects' },
  { label: 'Articles',     to: '/articles' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact',      to: '/contact' },
];

const servicesMenu = [
  {
    id: 'website-dev',
    title: 'Website Development',
    desc: 'High-speed business sites that convert visitors',
    to: '/services#website-dev',
    badge: 'Fast & Modern',
    Icon: Globe,
  },
  {
    id: 'custom-software',
    title: 'Custom Software & ERP',
    desc: 'Internal workflows, billing & inventory tools',
    to: '/services#custom-software',
    badge: 'Operations',
    Icon: Code2,
  },
  {
    id: 'web-apps',
    title: 'Web Applications & Portals',
    desc: 'Customer portals, dealer hubs & live dashboards',
    to: '/services#web-apps',
    badge: 'Browser Apps',
    Icon: Monitor,
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    desc: 'Android & cross-platform apps for field teams',
    to: '/services#mobile-apps',
    badge: 'Android/iOS',
    Icon: Smartphone,
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Solutions',
    desc: 'Online stores with UPI, Razorpay & instant checkout',
    to: '/services#e-commerce',
    badge: 'Online Stores',
    Icon: ShoppingBag,
  },
  {
    id: 'portfolio-websites',
    title: 'Portfolio Showcase Sites',
    desc: 'Luxury visual galleries for architects & studios',
    to: '/services#portfolio-websites',
    badge: 'Luxury Showcase',
    Icon: Briefcase,
  },
];

let isFirstLoad = true;

interface NavbarProps {
  variant?: 'home' | 'inner';
}

/* ── Logo image from public ──────────────────────────── */
const Logo = () => (
  <img
    src="/Flowoid_final.webp"
    alt="Flowoid"
    loading="lazy"
    decoding="async"
    className="w-[115px] sm:w-[135px] md:w-[155px] h-auto object-contain flex-shrink-0 saturate-200 contrast-125 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] scale-[1.42] md:scale-[1.52] origin-[left_center] ml-1 md:ml-2 mr-6 md:mr-11 translate-y-[3px] md:translate-y-[5px]"
  />
);

export default function Navbar({ variant = 'inner' }: NavbarProps) {
  const [animateOnMount] = useState(isFirstLoad);
  
  useEffect(() => {
    isFirstLoad = false;
  }, []);

  const parentVars = animateOnMount ? {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  } : {
    hidden: {},
    visible: {}
  };

  const itemVars = animateOnMount ? {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  } : {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  };

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  useEffect(() => {
    setDrawerOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  /* ── Shared nav link active check ─────────────────── */
  const isRouteActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    if (to === '/articles') return location.pathname.startsWith('/articles') || location.pathname.startsWith('/blogs') || location.pathname.startsWith('/article');
    if (to === '/services') return location.pathname.startsWith('/services');
    return location.pathname === to;
  };

  /* ── Shared nav link class builder ─────────────────── */
  const linkCls = (to: string) => {
    const active = isRouteActive(to);
    return `relative text-[1rem] font-medium px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200
     after:content-[''] after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2
     after:w-[72%] after:h-[2px] after:rounded-full after:bg-[#C4952A]
     after:transition-all after:duration-300
     ${active
       ? 'text-dark font-semibold after:scale-x-100 after:opacity-100'
       : 'text-muted hover:text-b4 hover:bg-pale hover:-translate-y-px after:scale-x-0 after:opacity-0'
     }`;
  };

  /* ── Shared CTA button ──────────────────────────────── */
  const ctaBtn = (
    <Link
      to="/contact"
      className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[.85rem] font-bold
                 text-white bg-mg shadow-[0_6px_20px_rgba(20,16,58,.28)]
                 relative overflow-hidden transition-all duration-[280ms]
                 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(20,16,58,.42)]
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
     HOME VARIANT  — integrated to hero → floating pill on scroll
  ══════════════════════════════════════════════════════ */
  if (variant === 'home') {
    return (
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-[998] bg-[rgba(8,7,28,.5)] backdrop-blur-[6px]
                      transition-opacity duration-[300ms]
                      ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Navbar wrapper */}
        <div 
          className="fixed top-0 left-0 right-0 z-[1000] flex justify-center transition-all duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)] pt-0 px-0"
        >
          <motion.nav 
            initial={animateOnMount ? "hidden" : "visible"}
            animate="visible"
            variants={parentVars}
            className={`w-full flex items-center justify-between transition-all duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]
                           ${scrolled
                             ? `max-w-full md:h-[70px] h-[64px] px-5 md:px-8 ${drawerOpen ? 'bg-white' : 'bg-white/95 md:bg-white/75 backdrop-blur-3xl saturate-[200%]'} border-[rgba(255,255,255,0.3)] border-b rounded-none shadow-[0_4px_20px_rgba(15,14,42,.05)] md:shadow-[0_16px_40px_rgba(15,14,42,.12)]`
                             : `max-w-full h-[76px] md:h-[90px] px-5 md:px-12 lg:px-16 ${drawerOpen ? 'bg-white shadow-[0_16px_48px_rgba(15,14,42,.06)]' : 'bg-page-dots'} border-transparent rounded-none`
                           }`}>
            {/* Logo */}
            <motion.div variants={itemVars} className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center h-full">
                <Logo />
              </Link>
            </motion.div>

            {/* Center nav links */}
            <ul className="hidden md:flex items-center gap-1 list-none">
              {navItems.map(({ label, to }) => {
                if (label === 'Services') {
                  const isServicesActive = isRouteActive('/services');
                  return (
                    <motion.li
                      key={to}
                      variants={itemVars}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <Link
                        to={to}
                        className={`relative text-[1rem] font-medium px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 inline-flex items-center gap-1.5
                         after:content-[''] after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2
                         after:w-[72%] after:h-[2px] after:rounded-full after:bg-[#C4952A]
                         after:transition-all after:duration-300
                         ${isServicesActive
                           ? 'text-dark font-semibold after:scale-x-100 after:opacity-100'
                           : servicesDropdownOpen
                             ? 'text-b4 bg-pale -translate-y-px after:scale-x-0 after:opacity-0'
                             : 'text-muted hover:text-b4 hover:bg-pale hover:-translate-y-px after:scale-x-0 after:opacity-0'
                         }`}
                      >
                        <span>{label}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-200 ${
                            servicesDropdownOpen ? 'rotate-180 text-gold' : 'opacity-60'
                          }`}
                        />
                      </Link>

                      {/* Mega Dropdown Card with hover bridge */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[580px] max-w-[92vw] z-[1050]"
                          >
                            <div className="bg-white/95 backdrop-blur-2xl border border-border/90 rounded-2xl shadow-[0_24px_64px_rgba(15,14,42,0.16)] p-4 relative">
                              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                                <span className="text-[.72rem] font-extrabold uppercase tracking-[.12em] text-gold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                                  Specialized Engineering Services
                                </span>
                                <span className="text-[.7rem] font-bold text-muted bg-pale px-2.5 py-0.5 rounded-full border border-border/60">
                                  6 Disciplines
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {servicesMenu.map((s) => {
                                  const ServiceIcon = s.Icon;
                                  return (
                                    <Link
                                      key={s.id}
                                      to={s.to}
                                      onClick={() => setServicesDropdownOpen(false)}
                                      className="group/s flex items-start gap-3 p-2.5 rounded-xl hover:bg-pale/80 transition-all duration-150 border border-transparent hover:border-gold/30 hover:-translate-y-0.5 text-left"
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-pale border border-border/80 flex items-center justify-center text-b4 group-hover/s:bg-gm group-hover/s:text-gold group-hover/s:border-transparent transition-all flex-shrink-0 mt-0.5 shadow-2xs">
                                        <ServiceIcon size={17} strokeWidth={2} />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[.84rem] font-bold text-dark group-hover/s:text-b4 transition-colors truncate">
                                            {s.title}
                                          </span>
                                        </div>
                                        <p className="text-[.72rem] text-muted leading-tight mt-0.5 line-clamp-1 group-hover/s:text-body">
                                          {s.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between bg-pale/50 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl">
                                <div className="text-[.75rem] text-muted">
                                  Fast execution · <strong className="text-dark">100% Code Ownership</strong>
                                </div>
                                <Link
                                  to="/services"
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="inline-flex items-center gap-1 text-[.78rem] font-extrabold text-gold hover:text-b4 transition-colors"
                                >
                                  <span>View All Services</span>
                                  <ArrowRight size={13} strokeWidth={2.5} />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                }

                return (
                  <motion.li key={to} variants={itemVars}>
                    <Link to={to} className={linkCls(to)}>{label}</Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Right CTA + hamburger */}
            <motion.div variants={itemVars} className="flex items-center gap-2 flex-shrink-0">
              {ctaBtn}
              {hamburger}
            </motion.div>
          </motion.nav>
        </div>

        {/* Mobile Drawer — slides down from top */}
        <div className={`fixed top-0 left-0 right-0 z-[999] bg-dark rounded-b-3xl
                         shadow-[0_24px_60px_rgba(0,0,0,.45)] overflow-hidden
                         transition-[transform,opacity] duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)]
                         ${drawerOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-[108%] opacity-0 pointer-events-none'}`}>
          {/* Gold shimmer bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]
                          bg-[linear-gradient(90deg,transparent,#C9A84C,#E8C96A,#C9A84C,transparent)]
                          animate-gl" />

          <div className="pt-20 px-6 pb-8">
            <ul className="list-none flex flex-col gap-1 mb-6">
              {navItems.map(({ label, to }, idx) => {
                if (label === 'Services') {
                  return (
                    <li
                      key={to}
                      className={`transition-[opacity,transform] duration-[400ms] ease-out
                                   ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: drawerOpen ? `${0.1 + idx * 0.08}s` : '0s' }}
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          to={to}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex-1 flex items-center py-2.5 px-4 rounded-xl font-heading text-[0.98rem] font-semibold border border-transparent transition-all duration-[220ms] ${
                            location.pathname === to
                              ? 'text-white bg-white/10 border-white/10'
                              : 'text-white/65 hover:text-white hover:bg-white/8 hover:border-white/8'
                          }`}
                        >
                          <span>{label}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          aria-label="Toggle services list"
                          className="px-3 py-2 text-white/50 hover:text-gold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="text-[.7rem] font-mono font-bold text-gold bg-gold/15 px-1.5 py-0.5 rounded-md border border-gold/30">6</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-gold' : ''}`}
                          />
                        </button>
                      </div>

                      {/* Expandable Services Submenu (Dark) */}
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-3 pr-1 pt-1.5 pb-2 mt-1 space-y-1 bg-white/5 rounded-xl border border-white/10"
                          >
                            <Link
                              to="/services"
                              onClick={() => setDrawerOpen(false)}
                              className="flex items-center justify-between px-3 py-1.5 text-[.78rem] font-bold text-gold hover:text-white transition-colors"
                            >
                              <span>All Services Overview</span>
                              <span>→</span>
                            </Link>
                            {servicesMenu.map((s) => {
                              const ServiceIcon = s.Icon;
                              return (
                                <Link
                                  key={s.id}
                                  to={s.to}
                                  onClick={() => setDrawerOpen(false)}
                                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[.82rem] text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                  <ServiceIcon size={14} className="text-gold flex-shrink-0" />
                                  <span className="truncate">{s.title}</span>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li
                    key={to}
                    className={`transition-[opacity,transform] duration-[400ms] ease-out
                                 ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: drawerOpen ? `${0.1 + idx * 0.08}s` : '0s' }}
                  >
                    <Link
                      to={to}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl
                                  font-heading text-[0.98rem] font-semibold border border-transparent
                                  transition-all duration-[220ms]
                                  ${location.pathname === to
                                    ? 'text-white bg-white/10 border-white/10'
                                    : 'text-white/65 hover:text-white hover:bg-white/8 hover:border-white/8'}`}
                    >
                      {label}
                      <span className="text-white/25 text-xs">›</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="h-px bg-white/8 mb-5" />

            {/* Call card */}
            <div className={`transition-[opacity,transform] duration-[320ms] delay-[380ms]
                             ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <a
                href="tel:+919924855931"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl
                           bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)] mb-4
                           transition-all duration-[220ms] hover:bg-[rgba(201,168,76,.16)]"
              >
                <div className="w-9 h-9 rounded-[10px] bg-gg flex-shrink-0 flex items-center justify-center text-sm">📞</div>
                <div>
                  <span className="block text-[.65rem] text-white/40 mb-[1px]">Call us anytime</span>
                  <strong className="font-heading text-[.88rem] font-bold text-white">+91 99248 55931</strong>
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
     INNER VARIANT  — integrated to dashboard top → floating pill on scroll
  ══════════════════════════════════════════════════════ */
  return (
    <>
      {/* Floating pill wrapper */}
      {/* Floating pill wrapper */}
      <div 
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-center transition-all duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)] pt-0 px-0"
      >
        <motion.nav 
          initial={animateOnMount ? "hidden" : "visible"}
          animate="visible"
          variants={parentVars}
          className={`w-full flex items-center justify-between transition-all duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]
                         ${scrolled
                           ? `max-w-full md:h-[70px] h-[64px] px-5 md:px-8 border-[rgba(255,255,255,0.3)] border-b rounded-none ${drawerOpen ? 'bg-white' : 'bg-white md:bg-white/95 backdrop-blur-3xl saturate-[200%]'} shadow-[0_4px_20px_rgba(15,14,42,.05)] md:shadow-[0_16px_40px_rgba(15,14,42,.12)]`
                           : `max-w-full h-[76px] md:h-[90px] px-5 md:px-12 lg:px-16 bg-page-dots border-transparent rounded-none shadow-[0_4px_20px_rgba(15,14,42,.03)]`
                         }`}>
          {/* Logo */}
          <motion.div variants={itemVars} className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center h-full">
              <Logo />
            </Link>
          </motion.div>

          {/* Center nav links */}
          <ul className="hidden md:flex items-center gap-1 list-none">
            {navItems.map(({ label, to }) => {
              if (label === 'Services') {
                const isServicesActive = isRouteActive('/services');
                return (
                  <motion.li
                    key={to}
                    variants={itemVars}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      to={to}
                      className={`relative text-[1rem] font-medium px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 inline-flex items-center gap-1.5
                       after:content-[''] after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2
                       after:w-[72%] after:h-[2px] after:rounded-full after:bg-[#C4952A]
                       after:transition-all after:duration-300
                       ${isServicesActive
                         ? 'text-dark font-semibold after:scale-x-100 after:opacity-100'
                         : servicesDropdownOpen
                           ? 'text-b4 bg-pale -translate-y-px after:scale-x-0 after:opacity-0'
                           : 'text-muted hover:text-b4 hover:bg-pale hover:-translate-y-px after:scale-x-0 after:opacity-0'
                       }`}
                    >
                      <span>{label}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-gold' : 'opacity-60'
                        }`}
                      />
                    </Link>

                    {/* Mega Dropdown Card with hover bridge */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[580px] max-w-[92vw] z-[1050]"
                        >
                          <div className="bg-white/95 backdrop-blur-2xl border border-border/90 rounded-2xl shadow-[0_24px_64px_rgba(15,14,42,0.16)] p-4 relative">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                              <span className="text-[.72rem] font-extrabold uppercase tracking-[.12em] text-gold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                                Specialized Engineering Services
                              </span>
                              <span className="text-[.7rem] font-bold text-muted bg-pale px-2.5 py-0.5 rounded-full border border-border/60">
                                6 Disciplines
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {servicesMenu.map((s) => {
                                const ServiceIcon = s.Icon;
                                return (
                                  <Link
                                    key={s.id}
                                    to={s.to}
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="group/s flex items-start gap-3 p-2.5 rounded-xl hover:bg-pale/80 transition-all duration-150 border border-transparent hover:border-gold/30 hover:-translate-y-0.5 text-left"
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-pale border border-border/80 flex items-center justify-center text-b4 group-hover/s:bg-gm group-hover/s:text-gold group-hover/s:border-transparent transition-all flex-shrink-0 mt-0.5 shadow-2xs">
                                      <ServiceIcon size={17} strokeWidth={2} />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[.84rem] font-bold text-dark group-hover/s:text-b4 transition-colors truncate">
                                          {s.title}
                                        </span>
                                      </div>
                                      <p className="text-[.72rem] text-muted leading-tight mt-0.5 line-clamp-1 group-hover/s:text-body">
                                        {s.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between bg-pale/50 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl">
                              <div className="text-[.75rem] text-muted">
                                Fast execution · <strong className="text-dark">100% Code Ownership</strong>
                              </div>
                              <Link
                                to="/services"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="inline-flex items-center gap-1 text-[.78rem] font-extrabold text-gold hover:text-b4 transition-colors"
                              >
                                <span>View All Services</span>
                                <ArrowRight size={13} strokeWidth={2.5} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              }

              return (
                <motion.li key={to} variants={itemVars}>
                  <Link to={to} className={linkCls(to)}>{label}</Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Right actions */}
          <motion.div variants={itemVars} className="flex items-center gap-2 flex-shrink-0">
            {/* <Link
              to="/contact"
              className="hidden md:inline-block px-4 py-2 rounded-xl text-[.84rem] font-semibold
                         text-b4 border-[1.5px] border-[rgba(196,149,42,.55)] bg-transparent
                         transition-all duration-[250ms] hover:bg-[rgba(196,149,42,.08)] hover:border-[#C4952A]"
            >
              Get a Quote
            </Link> */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                         text-[.84rem] font-bold text-white bg-mg
                         shadow-[0_6px_20px_rgba(20,16,58,.28)]
                         relative overflow-hidden transition-all duration-[280ms]
                         hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(20,16,58,.42)]
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
          </motion.div>
        </motion.nav>
      </div>

      {/* Inner page mobile drawer — drops below the integrated nav */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-[999] bg-white rounded-b-3xl
                       border border-border shadow-[0_16px_48px_rgba(15,14,42,.13)]
                       overflow-y-auto max-h-[calc(100vh)] pt-20
                       transition-[opacity,transform] duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)]
                       ${drawerOpen
                         ? 'opacity-100 translate-y-0 pointer-events-auto'
                         : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-5 pb-6">
          <ul className="list-none flex flex-col mt-2">
            {navItems.map(({ label, to }, idx) => {
              if (label === 'Services') {
                return (
                  <li
                    key={to}
                    className={`border-b border-border transition-[opacity,transform] duration-[400ms] ease-out
                                ${drawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: drawerOpen ? `${0.1 + idx * 0.08}s` : '0s' }}
                  >
                    <div className="flex items-center justify-between py-1">
                      <Link
                        to={to}
                        className={`flex-1 py-1.5 text-[0.95rem] font-medium transition-all duration-200 ${
                          location.pathname === to ? 'text-b4 font-semibold' : 'text-body hover:text-b4'
                        }`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        {label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-label="Toggle services list"
                        className="px-2 py-1 text-muted hover:text-dark transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span className="text-[.7rem] font-mono font-bold text-gold bg-gold/10 px-1.5 py-0.5 rounded-md border border-gold/30">6</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-gold' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Expandable Services Submenu (Light) */}
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-2 pr-1 pt-1 pb-2 mb-2 space-y-1 bg-pale/50 rounded-xl border border-border"
                        >
                          <Link
                            to="/services"
                            onClick={() => setDrawerOpen(false)}
                            className="flex items-center justify-between px-2.5 py-1 text-[.78rem] font-bold text-gold hover:text-b4 transition-colors"
                          >
                            <span>All Services Overview</span>
                            <span>→</span>
                          </Link>
                          {servicesMenu.map((s) => {
                            const ServiceIcon = s.Icon;
                            return (
                              <Link
                                key={s.id}
                                to={s.to}
                                onClick={() => setDrawerOpen(false)}
                                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[.82rem] font-medium text-dark hover:bg-white hover:text-b4 transition-colors shadow-2xs"
                              >
                                <ServiceIcon size={14} className="text-b4 flex-shrink-0" />
                                <span className="truncate">{s.title}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={to}
                    className={`transition-[opacity,transform] duration-[400ms] ease-out
                                ${drawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: drawerOpen ? `${0.1 + idx * 0.08}s` : '0s' }}>
                  <Link
                    to={to}
                    className={`flex items-center py-2.5 border-b border-border text-[0.95rem]
                                 font-medium transition-all duration-200 last:border-b-0
                                 ${location.pathname === to ? 'text-b4 font-semibold' : 'text-body hover:text-b4'}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={`flex flex-col gap-3 mt-6 transition-[opacity,transform] duration-[400ms] delay-[350ms] ease-out
                           ${drawerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
                         text-white bg-mg shadow-brand hover:shadow-[0_12px_30px_rgba(20,16,58,.42)]
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