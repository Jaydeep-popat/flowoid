import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  variant?: 'home' | 'inner';
}

const Logo = () => (
  <img src="/Final Logo.png" alt="TechSphere" className="h-12 w-auto object-contain" />
);

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter,  href: '#', label: 'Twitter'  },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube,  href: '#', label: 'YouTube'  },
];

const navCols = [
  {
    h: 'Services',
    links: [
      { label: 'Custom Software',    to: '/services' },
      { label: 'Cloud & Infrastructure', to: '/services' },
      { label: 'Cybersecurity',      to: '/services' },
      { label: 'Data & Analytics',   to: '/services' },
      { label: 'IT Consulting',      to: '/services' },
    ],
  },
  {
    h: 'Company',
    links: [
      { label: 'About Us',      to: '/about' },
      { label: 'Projects',      to: '/projects' },
      { label: 'Testimonials',  to: '/testimonials' },
      { label: 'Contact',       to: '/contact' },
    ],
  },
];

const QUOTE = '"Turning ideas into powerful digital solutions — ready to build whatever you imagine."';

/* ─── Shared bottom bar ─────────────────────────────── */
function BottomBar() {
  return (
    <div className="border-t border-white/8 py-5 flex items-center justify-between flex-wrap gap-3">
      <span className="text-[.76rem] text-white/35">
        © {new Date().getFullYear()} TechSphere IT Solutions Pvt. Ltd. All rights reserved.
      </span>
      <div className="flex gap-5">
        {['Privacy Policy', 'Terms of Service', 'Cookies'].map(l => (
          <a key={l} href="#" className="text-[.76rem] text-white/35 hover:text-white transition-colors duration-200">
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer({ variant = 'inner' }: FooterProps) {
  const [email, setEmail] = useState('');

  /* ══════════════════════════════════════════════════
     HOME VARIANT
  ══════════════════════════════════════════════════ */
  if (variant === 'home') {
    return (
      <footer className="relative overflow-hidden" style={{background:'linear-gradient(135deg,#060518 0%,#0e0c2e 30%,#1a1845 60%,#251f5a 100%)'}}>
        {/* Shine overlays */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(72,69,168,.35),transparent 65%)',filter:'blur(60px)',transform:'translate(30%,-30%)'}} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(45,43,107,.4),transparent 65%)',filter:'blur(50px)',transform:'translate(-30%,30%)'}} />
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(135deg,rgba(255,255,255,.03) 0%,transparent 50%)',zIndex:0}} />
        {/* Newsletter strip */}
        <div className="px-[5%] py-8 border-b border-white/8 relative z-[1]">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-6 flex-wrap">
            <div>
              <h4 className="font-heading text-[1rem] font-bold text-white mb-1">Stay ahead in tech</h4>
              <p className="text-[.82rem] text-white/45">Insights, case studies & IT tips — no spam, ever.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-4 py-[10px] rounded-[10px] bg-white/7 border border-white/10 text-white
                           text-[.84rem] outline-none min-w-[240px] placeholder:text-white/30
                           transition-[border-color] duration-200 focus:border-[rgba(201,168,76,.4)]"
              />
              <button className="relative overflow-hidden px-5 py-[10px] rounded-[10px] bg-gg text-dark
                                 text-[.84rem] font-bold transition-all duration-[250ms]
                                 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(201,168,76,.4)]
                                 before:content-[''] before:absolute before:inset-0
                                 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)]
                                 before:pointer-events-none">
                Subscribe →
              </button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="px-[5%] py-14 border-b border-white/8 relative z-[1]">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr] gap-12">

            {/* Brand column */}
            <div>
              <div className="mb-5">
                <Logo />
              </div>

              {/* Quote */}
              <blockquote className="text-[.9rem] italic text-white/70 leading-[1.75] max-w-[320px] mb-6 border-l-2 border-gold pl-4">
                {QUOTE}
              </blockquote>

              {/* Contact info */}
              <div className="flex flex-col gap-3 mb-6">
                <a href="tel:+919924855931"
                   className="flex items-center gap-3 text-[.84rem] text-white/75 hover:text-white transition-colors duration-200 group">
                  <span className="w-8 h-8 rounded-[8px] bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 group-hover:border-gold/30 transition-all duration-200 text-white/50 group-hover:text-white">
                    <Phone size={15} strokeWidth={1.8} />
                  </span>
                  <span>+91 99248 55931</span>
                </a>
                <a href="mailto:popatjaydeep21@gmail.com"
                   className="flex items-center gap-3 text-[.84rem] text-white/75 hover:text-white transition-colors duration-200 group">
                  <span className="w-8 h-8 rounded-[8px] bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 group-hover:border-gold/30 transition-all duration-200 text-white/50 group-hover:text-white">
                    <Mail size={15} strokeWidth={1.8} />
                  </span>
                  <span>popatjaydeep21@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-[.84rem] text-white/55">
                  <span className="w-8 h-8 rounded-[8px] bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 text-white/40">
                    <MapPin size={15} strokeWidth={1.8} />
                  </span>
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-2">
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                     className="w-9 h-9 rounded-[9px] border border-white/10 bg-white/5 flex items-center justify-center
                                text-white/45 cursor-pointer transition-all duration-[250ms]
                                hover:bg-gg hover:border-transparent hover:text-dark">
                    <s.icon size={16} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {navCols.map(col => (
              <div key={col.h}>
                <h4 className="font-heading text-[.78rem] font-bold text-white mb-5 tracking-[.1em] uppercase">
                  {col.h}
                </h4>
                <ul className="list-none flex flex-col gap-3">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link to={l.to}
                            className="text-[.95rem] text-white font-medium inline-block transition-all duration-200 hover:text-gold2 hover:scale-105 hover:translate-x-1 origin-left">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[5%] pb-2">
          <div className="max-w-[1240px] mx-auto">
            <BottomBar />
          </div>
        </div>
      </footer>
    );
  }

  /* ══════════════════════════════════════════════════
     INNER VARIANT
  ══════════════════════════════════════════════════ */
  return (
    <footer className="relative overflow-hidden px-[6%] pt-14" style={{background:'linear-gradient(135deg,#060518 0%,#0e0c2e 30%,#1a1845 60%,#251f5a 100%)'}}>
      {/* Shine overlays */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(72,69,168,.3),transparent 65%)',filter:'blur(55px)',transform:'translate(30%,-30%)'}} />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(45,43,107,.35),transparent 65%)',filter:'blur(45px)',transform:'translate(-30%,30%)'}} />
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(135deg,rgba(255,255,255,.03) 0%,transparent 50%)',zIndex:0}} />
      <div className="max-w-[1240px] mx-auto relative z-[1]">

        {/* Main row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr] gap-10 pb-10 border-b border-white/8">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <Logo />
            </div>

            {/* Quote */}
            <blockquote className="text-[.88rem] italic text-white/65 leading-[1.75] max-w-[310px] mb-6 border-l-2 border-gold pl-4">
              {QUOTE}
            </blockquote>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-5">
              <a href="tel:+919924855931"
                 className="flex items-center gap-3 text-[.83rem] text-white/70 hover:text-white transition-colors duration-200 group">
                <span className="w-8 h-8 rounded-[8px] bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 text-white/50 group-hover:bg-gold/20 group-hover:border-gold/30 group-hover:text-white transition-all duration-200">
                  <Phone size={15} strokeWidth={1.8} />
                </span>
                <span>+91 99248 55931</span>
              </a>
              <a href="mailto:popatjaydeep21@gmail.com"
                 className="flex items-center gap-3 text-[.83rem] text-white/70 hover:text-white transition-colors duration-200 group">
                <span className="w-8 h-8 rounded-[8px] bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0 text-white/50 group-hover:bg-gold/20 group-hover:border-gold/30 group-hover:text-white transition-all duration-200">
                  <Mail size={15} strokeWidth={1.8} />
                </span>
                <span>popatjaydeep21@gmail.com</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                   className="w-9 h-9 rounded-[9px] border border-white/10 bg-white/5 flex items-center justify-center
                              text-white/40 cursor-pointer transition-all duration-[250ms]
                              hover:bg-gg hover:border-transparent hover:text-dark">
                  <s.icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <div key={col.h}>
              <h4 className="font-heading text-[.78rem] font-bold text-white mb-4 tracking-[.1em] uppercase">
                {col.h}
              </h4>
              <ul className="list-none flex flex-col gap-[10px]">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to}
                          className="text-[.95rem] text-white font-medium inline-block transition-all duration-200 hover:text-gold2 hover:scale-105 hover:translate-x-1 origin-left">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <BottomBar />
      </div>
    </footer>
  );
}
