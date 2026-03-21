import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  variant?: 'home' | 'inner';
}

const logoSvg = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-dark relative z-10">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const LogoMark = ({ size = 38, radius = 11 }: { size?: number; radius?: number }) => (
  <div
    className="relative bg-gg flex items-center justify-center shadow-gold flex-shrink-0 overflow-hidden"
    style={{ width: size, height: size, borderRadius: radius }}
  >
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.28)_0%,transparent_55%)]" />
    {logoSvg}
  </div>
);

const socialLinks = ['in','𝕏','▶','f','@'];

export default function Footer({ variant = 'inner' }: FooterProps) {
  const [email, setEmail] = useState('');

  if (variant === 'home') {
    return (
      <footer className="bg-dark">
        {/* Newsletter */}
        <div className="px-[5%] py-9 border-b border-white/6 bg-white/[.02]">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-8 flex-wrap">
            <div>
              <h4 className="font-heading text-[1.1rem] font-bold text-white mb-1">Stay ahead in tech</h4>
              <p className="text-[.84rem] text-white/40">Get insights, case studies, and IT tips — no spam, ever.</p>
            </div>
            <div className="flex gap-[10px] flex-wrap">
              <input
                type="email"
                className="px-[18px] py-[11px] rounded-[10px] bg-white/7 border border-white/10 text-white text-[.84rem] outline-none min-w-[240px] sm:min-w-0 sm:w-full transition-[border-color] duration-200 placeholder:text-white/30 focus:border-[rgba(201,168,76,.4)]"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="relative overflow-hidden px-[22px] py-[11px] rounded-[10px] bg-gg text-dark text-[.84rem] font-bold transition-all duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(201,168,76,.45)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)]">
                Subscribe →
              </button>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="bg-[linear-gradient(135deg,rgba(201,168,76,.12)_0%,transparent_60%)] border-b border-white/6 px-[5%] py-14">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2.2fr_1fr_1fr_1fr] gap-14">
            <div>
              <div className="flex items-center gap-[10px] font-heading text-[1.3rem] font-extrabold text-white mb-4">
                <LogoMark size={34} radius={9} />
                Tech<em className="not-italic grad-text">Sphere</em>
              </div>
              <p className="text-[.85rem] leading-[1.82] text-white/35 max-w-[280px] mb-[26px]">Custom IT solutions for forward-thinking enterprises. From strategy to deployment — your technology partner for life.</p>
              <div className="flex flex-col gap-[10px] mb-[26px]">
                <div className="flex items-center gap-[10px] text-[.83rem] text-white/42">
                  <span className="text-[.9rem]">📧</span>
                  <a href="mailto:hello@techsphere.in" className="text-white/55 hover:text-gold2 transition-colors duration-200">hello@techsphere.in</a>
                </div>
                <div className="flex items-center gap-[10px] text-[.83rem] text-white/42">
                  <span className="text-[.9rem]">📞</span>
                  <a href="tel:+919876543210" className="text-white/55 hover:text-gold2 transition-colors duration-200">+91 98765 43210</a>
                </div>
                <div className="flex items-center gap-[10px] text-[.83rem] text-white/42">
                  <span className="text-[.9rem]">📍</span>
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>
              <div className="flex gap-2">
                {socialLinks.map(s => (
                  <div key={s} className="w-9 h-9 rounded-[10px] border border-white/10 bg-white/4 flex items-center justify-center text-[.82rem] text-white/35 cursor-pointer transition-all duration-[250ms] hover:bg-gold hover:border-gold hover:text-dark">{s}</div>
                ))}
              </div>
            </div>

            {[
              { h: 'Services', links: [{ label: 'Software Development', to: '/services' }, { label: 'Cloud & Infrastructure', to: '/services' }, { label: 'Cybersecurity', to: '/services' }, { label: 'Data & Analytics', to: '/services' }, { label: 'IT Consulting', to: '/services' }] },
              { h: 'Company',  links: [{ label: 'About Us', to: '/about' }, { label: 'Our Team', to: '/about' }, { label: 'Careers', to: '#' }, { label: 'Blog', to: '#' }, { label: 'Contact', to: '/contact' }] },
              { h: 'Resources', links: [{ label: 'Case Studies', to: '/projects' }, { label: 'Documentation', to: '#' }, { label: 'Pricing', to: '#' }, { label: 'Partner Program', to: '#' }, { label: 'Support', to: '#' }] },
            ].map(col => (
              <div key={col.h}>
                <div className="font-heading text-[.84rem] font-bold text-white/70 mb-[18px] tracking-[.04em] uppercase">{col.h}</div>
                <ul className="list-none flex flex-col gap-3">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-[.83rem] text-white/33 flex items-center gap-1.5 transition-colors duration-200 hover:text-gold2 before:content-['›'] before:text-gold before:opacity-0 before:translate-x-[-6px] before:transition-[opacity,transform] before:duration-200 hover:before:opacity-100 hover:before:translate-x-0 hover:pl-1">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-[5%] py-6">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between flex-wrap gap-[14px]">
            <div className="text-[.78rem] text-white/22">© 2025 TechSphere IT Solutions Pvt. Ltd. All rights reserved.</div>
            <div className="flex gap-5">
              {['Privacy Policy','Terms of Service','Cookies'].map(l => (
                <a key={l} href="#" className="text-[.78rem] text-white/22 hover:text-white transition-colors duration-200">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Inner page footer
  return (
    <footer className="bg-dark pt-16 px-[6%]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr] gap-[52px] pb-[42px] border-b border-white/6">
          <div>
            <div className="flex items-center gap-[10px] mb-[14px]">
              <LogoMark />
              <span className="font-heading text-[1.3rem] font-extrabold text-white">
                Tech<em className="not-italic grad-text">Sphere</em>
              </span>
            </div>
            <p className="text-[.84rem] text-white/35 leading-[1.75] max-w-[258px]">Custom IT solutions for forward-thinking enterprises. From strategy to deployment — your technology partner for life.</p>
          </div>

          {[
            { h: 'Company',  links: [{ label: 'About Us', to: '/about' }, { label: 'Testimonials', to: '/testimonials' }, { label: 'Careers', to: '#' }, { label: 'Blog', to: '#' }] },
            { h: 'Services', links: [{ label: 'Cloud Solutions', to: '/services' }, { label: 'Cybersecurity', to: '/services' }, { label: 'Custom Software', to: '/services' }, { label: 'Data & Analytics', to: '/services' }] },
            { h: 'Connect',  links: [{ label: 'Contact Us', to: '/contact' }, { label: 'Portfolio', to: '/projects' }, { label: 'LinkedIn', to: '#' }, { label: 'GitHub', to: '#' }] },
          ].map(col => (
            <div key={col.h}>
              <h4 className="font-heading text-[.82rem] font-bold text-white/70 mb-4 tracking-[.05em] uppercase">{col.h}</h4>
              <ul className="list-none flex flex-col gap-[9px]">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[.81rem] text-white/33 flex items-center gap-1.5 transition-colors duration-200 hover:text-gold2">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 py-[22px] pb-8">
          <span className="text-[.76rem] text-white/22">© 2024 TechSphere IT Solutions. All rights reserved.</span>
          <div className="flex gap-[10px]">
            {['in','𝕏','gh','yt'].map(s => (
              <a key={s} href="#" className="w-[34px] h-[34px] rounded-[9px] bg-white/5 border border-white/10 flex items-center justify-center text-[.78rem] text-white/35 transition-all duration-[250ms] hover:bg-gold hover:border-gold hover:text-dark">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
