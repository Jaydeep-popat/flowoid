import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ExternalLink, Globe, Monitor, ShoppingBag } from 'lucide-react';

const projects = [
  {
    id: 'hiyasha-solar',
    title: 'Hiyasha Solar Systems',
    subtitle: 'Solar EPC Lead Generation & Project Showcase Website',
    tag: 'Solar & Renewable Energy · Rajkot',
    icon: Globe,
    img: '/solar.webp',
    desc: 'A conversion-focused web platform built for a premier solar EPC contractor. Showcases residential rooftop and commercial solar installations with integrated quotation pathways that turn local search visitors into qualified leads.',
    outcome: '100% paperless lead capture · 2.4× faster quote turnaround',
    link: 'https://hiyashasolar.com/',
    tech: ['React', 'Tailwind CSS', 'Lead Generation', 'Local SEO'],
  },
  {
    id: 'pithadiya-interior',
    title: 'Pithadiya Interior',
    subtitle: 'Luxury Architectural & Interior Portfolio Website',
    tag: 'Interior Design & Architecture · Rajkot',
    icon: Monitor,
    img: '/interior.webp',
    desc: 'An elegant, performance-tuned showcase website engineered for a luxury interior design studio. Highlights bespoke residential and commercial spaces with immersive imagery and frictionless contact pathways.',
    outcome: '2.5× increase in qualified residential project inquiries',
    link: 'https://pithadiyainterior.com/',
    tech: ['Portfolio UI', 'Responsive Design', 'Branding', 'Fast CDN'],
  },
  {
    id: 'nilkanth-traders',
    title: 'Nilkanth Traders',
    subtitle: 'B2B Agro Commodities & Spices Trade Platform',
    tag: 'Trading & Commerce · Rajkot',
    icon: ShoppingBag,
    img: '/nilkanth.webp',
    desc: 'Replaced outdated manual price sheets with a digital product directory. Allows regional dealers and walk-in buyers to browse product specifications and initiate inquiries directly over WhatsApp.',
    outcome: 'Direct catalog-driven walk-in buyers & instant WhatsApp inquiry flow',
    link: 'https://nilkanth-trading.vercel.app/',
    tech: ['Product Catalog', 'Mobile-First', 'Direct WhatsApp', 'Fast UI'],
  },
];

export default function PortfolioSection() {
  const [featured, p2, p3] = projects;
  const FeaturedIcon = featured.icon;
  const P2Icon = p2.icon;
  const P3Icon = p3.icon;

  return (
    <section id="portfolio" className="bg-page py-24 md:py-32 px-[5%] border-b border-border/40">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[760px] mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-[7px] text-[.72rem] font-extrabold tracking-[.14em] uppercase text-gold mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg after:content-[''] after:w-5 after:h-[2px] after:rounded-sm after:bg-gg">
            Our Work in Production
          </div>

          <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.08] tracking-[-0.03em] text-dark mb-5">
            Real projects. <span className="grad-text">Verified outcomes.</span>
          </h2>

          <p className="text-[1rem] leading-[1.8] text-body max-w-[620px] mx-auto">
            We don't build generic marketing fluff. Every project below is a real, live system built by Flowoid for a real business in Gujarat — with clean code, fast page loads, and direct customer inquiry channels.
          </p>
        </div>

        {/* Asymmetric Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Featured Case Study — 7 columns, prominent desktop view */}
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-border p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-b4 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pale text-[.72rem] font-bold text-b3 uppercase tracking-wider">
                  <FeaturedIcon size={13} className="text-b4" />
                  {featured.tag}
                </span>
                <span className="text-[.78rem] font-semibold text-[#10B981] flex items-center gap-1">
                  <CheckCircle2 size={14} /> Live in Production
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-heading text-[1.45rem] font-bold text-dark leading-tight mb-2 group-hover:text-b4 transition-colors">
                {featured.title}
              </h3>
              <p className="text-[.88rem] font-semibold text-gold mb-4">
                {featured.subtitle}
              </p>

              {/* Visual Preview */}
              <div className="rounded-xl border border-border/80 overflow-hidden mb-6 aspect-[16/9] relative bg-pale">
                <img
                  src={featured.img}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <p className="text-[.92rem] text-body leading-[1.7] mb-6">
                {featured.desc}
              </p>

              {/* Outcome Metric Callout */}
              <div className="bg-pale/70 border border-border/80 rounded-xl p-4 flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0 text-gold font-heading font-black text-xl shadow-xs">
                  ✓
                </div>
                <div className="text-[.86rem] text-dark font-medium leading-snug">
                  <strong className="text-dark font-bold">Outcome:</strong> {featured.outcome}
                </div>
              </div>
            </div>

            {/* Footer tags & link */}
            <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {featured.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md bg-page text-[.74rem] font-semibold text-muted border border-border/70">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[.82rem] font-bold text-white bg-mg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Visit Live Site</span>
                <ExternalLink size={13} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          {/* Right Column — 2 Supporting Projects (5 cols desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Project 2: Pithadiya Interior */}
            <div className="bg-white rounded-[24px] border border-border p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-b4 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pale text-[.72rem] font-bold text-b3 uppercase tracking-wider">
                    <P2Icon size={13} className="text-b4" />
                    {p2.tag}
                  </span>
                  <span className="text-[.76rem] font-semibold text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 size={13} /> Production
                  </span>
                </div>

                <h3 className="font-heading text-[1.25rem] font-bold text-dark leading-tight mb-1 group-hover:text-b4 transition-colors">
                  {p2.title}
                </h3>
                <p className="text-[.82rem] font-semibold text-gold mb-4">
                  {p2.subtitle}
                </p>

                <div className="rounded-xl border border-border/80 overflow-hidden mb-4 aspect-[16/9] relative bg-pale">
                  <img
                    src={p2.img}
                    alt={p2.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <p className="text-[.88rem] text-body leading-[1.65] mb-4">
                  {p2.desc}
                </p>

                <div className="bg-pale/70 border border-border/80 rounded-xl p-3.5 mb-5 text-[.82rem] text-dark leading-snug">
                  <strong className="text-dark font-bold">Outcome:</strong> {p2.outcome}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p2.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-page text-[.72rem] font-medium text-muted border border-border/70">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p2.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[.82rem] font-bold text-b4 hover:text-dark transition-colors"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={12} strokeWidth={2.2} />
                </a>
              </div>
            </div>

            {/* Project 3: Nilkanth Traders */}
            <div className="bg-white rounded-[24px] border border-border p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-b4 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pale text-[.72rem] font-bold text-b3 uppercase tracking-wider">
                    <P3Icon size={13} className="text-b4" />
                    {p3.tag}
                  </span>
                  <span className="text-[.76rem] font-semibold text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 size={13} /> Production
                  </span>
                </div>

                <h3 className="font-heading text-[1.25rem] font-bold text-dark leading-tight mb-1 group-hover:text-b4 transition-colors">
                  {p3.title}
                </h3>
                <p className="text-[.82rem] font-semibold text-gold mb-4">
                  {p3.subtitle}
                </p>

                <div className="rounded-xl border border-border/80 overflow-hidden mb-4 aspect-[16/9] relative bg-pale">
                  <img
                    src={p3.img}
                    alt={p3.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <p className="text-[.88rem] text-body leading-[1.65] mb-4">
                  {p3.desc}
                </p>

                <div className="bg-pale/70 border border-border/80 rounded-xl p-3.5 mb-5 text-[.82rem] text-dark leading-snug">
                  <strong className="text-dark font-bold">Outcome:</strong> {p3.outcome}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p3.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-page text-[.72rem] font-medium text-muted border border-border/70">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p3.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[.82rem] font-bold text-b4 hover:text-dark transition-colors"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={12} strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Projects */}
        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[.95rem] font-bold text-white bg-mg shadow-[0_8px_24px_rgba(20,16,58,.26)] hover:shadow-[0_16px_40px_rgba(20,16,58,.4)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Explore All Projects &amp; Case Studies</span>
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
