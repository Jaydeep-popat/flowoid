import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, Monitor, ShoppingBag, ArrowRight, CheckCircle, Globe, Layers, Rocket, Zap, Smartphone, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

/* ─── Project data ──────────────────────────────── */
const projects = [
  {
    title: 'Hiyasha Solar Systems',
    tag: 'Solar & Energy',
    icon: Globe,
    img: '/solar.png',
    desc: 'A clean, conversion-focused website built for a solar energy provider. Showcases products, services, and contact pathways — designed to generate leads and build trust with first-time visitors.',
    link: 'https://hiyashasolar.com/',
    tags: ['React', 'Tailwind CSS', 'SEO', 'Lead Generation'],
  },
  {
    title: 'Pithadiya Interior',
    tag: 'Interior Design',
    icon: Monitor,
    img: '/interior.png',
    desc: 'A visually rich portfolio website for an interior design studio. Highlights completed projects, design philosophy, and services — helping attract premium residential and commercial clients.',
    link: 'https://pithadiyainterior.com/',
    tags: ['Portfolio', 'UI/UX', 'Responsive', 'Branding'],
  },
  {
    title: 'Nilkanth Traders',
    tag: 'Trading & Commerce',
    icon: ShoppingBag,
    img: '/nilkanth.png',
    desc: 'A professional business website developed for a trading company. Built to establish digital credibility, present their product catalogue, and enable customers to reach out with ease.',
    link: 'https://nilkanth-trading.vercel.app/',
    tags: ['Business Website', 'Catalogue', 'Mobile-First', 'Contact Integration'],
  },
];

/* ─── Value proposition points ─────────────────── */
const valuePoints = [
  {
    icon: TrendingUp,
    title: 'A Website Is an Investment, Not an Expense',
    body: 'Every rupee you spend on a professional website works 24/7 — attracting customers, building trust, and converting traffic into revenue. Businesses with a strong online presence grow 2× faster than those without one.',
  },
  {
    icon: Monitor,
    title: 'We Digitise Manual Business Processes',
    body: 'Quotation forms, product catalogues, appointment booking, customer enquiries — we convert repetitive manual workflows into smooth digital experiences, saving your team hours every single week.',
  },
  {
    icon: Globe,
    title: 'Visibility That Drives Real Growth',
    body: 'A well-built website is your most powerful marketing asset. Combined with SEO and digital marketing, it puts your business in front of the right customers at the right moment — consistently and scalably.',
  },
];

/* ─── Project card component ────────────────────── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const Icon = project.icon;
  return (
    <div className={`sr d${index + 1} group bg-white border border-border rounded-2xl overflow-hidden shadow-sm
                     transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-b4 flex flex-col`}>
      {/* Image */}
      <div className="h-[220px] overflow-hidden relative bg-pale flex-shrink-0">
        {project.img ? (
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          /* Placeholder for Nilkanth Traders */
          <div className="w-full h-full flex flex-col items-center justify-center bg-[linear-gradient(135deg,#f0f0f8,#e8e8f4)]">
            <div className="w-16 h-16 rounded-2xl bg-gm flex items-center justify-center mb-3 shadow-[0_8px_24px_rgba(45,43,107,.2)]">
              <Icon size={28} strokeWidth={1.5} className="text-white" />
            </div>
            <span className="text-[.78rem] font-semibold text-muted">Preview coming soon</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.7),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tag */}
        <div className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-full text-[.65rem] font-bold
                        text-gold bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)] mb-3 tracking-[.04em] w-fit">
          <Icon size={11} strokeWidth={2.2} />
          {project.tag}
        </div>

        {/* Title */}
        <h3 className="font-heading text-[1.05rem] font-bold text-dark mb-2 leading-[1.35]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[.84rem] text-muted leading-[1.68] mb-4 flex-1">{project.desc}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-[6px] mb-5">
          {project.tags.map((t, j) => (
            <span key={j} className="px-[10px] py-[3px] bg-page border border-border text-[.7rem] text-body rounded-full">
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[.82rem] font-bold text-dark bg-gg
                       shadow-[0_4px_16px_rgba(201,168,76,.3)] relative overflow-hidden transition-all duration-[260ms]
                       hover:-translate-y-[1px] hover:shadow-[0_8px_26px_rgba(201,168,76,.48)] w-fit mt-auto
                       before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.2),transparent_55%)] before:pointer-events-none"
          >
            <ExternalLink size={13} strokeWidth={2.2} className="relative z-[1]" />
            <span className="relative z-[1]">Visit Website</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[.82rem] font-semibold
                           text-muted bg-page border border-border w-fit mt-auto cursor-default">
            Live link coming soon
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────── */
export default function Projects() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* ══ HERO ════════════════════════════════════════ */}
      <div
        className="relative min-h-[52vh] flex items-center px-[6%] pt-20 pb-16 mt-[106px] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
        <div className="absolute right-[-100px] top-[-120px] w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)', filter: 'blur(55px)' }} />

        <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
          {/* Breadcrumb */}
          {/* 2-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Left — headline + copy */}
            <div>
              <div className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5">
                Home <span className="opacity-40">/</span> <span className="text-gold">Projects</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
                <span className="w-[7px] h-[7px] rounded-full bg-b4 shadow-[0_0_8px_rgba(72,69,168,.5)]" />
                Our Portfolio
              </div>
              <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-5">
                Work That <span className="grad-text">Speaks</span><br />For Itself
              </h1>
              <p className="text-[1rem] leading-[1.82] text-body max-w-[520px] mb-4">
                Real businesses. Real problems. Real digital solutions — built to generate leads, save time, and accelerate growth. Every project we deliver is a partnership, not just a transaction.
              </p>
              <p className="text-[.9rem] leading-[1.75] text-muted max-w-[500px] mb-8">
                From solar energy providers to interior design studios and trading companies — we've helped businesses across industries establish a powerful online presence that converts visitors into customers.
              </p>
              {/* Mini stat pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { n: '3+', l: 'Live Projects' },
                  { n: '100%', l: 'Client Satisfaction' },
                  { n: '24/7', l: 'Support' },
                ].map(({ n, l }, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm">
                    <span className="font-heading text-[1rem] font-black text-dark">{n}</span>
                    <span className="text-[.75rem] text-muted font-medium">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — highlights */}
            <div className="hidden lg:flex flex-col gap-4 min-w-[240px]">
              {[
                { icon: Zap,        title: 'Fast Delivery',   sub: 'Shipped on time, every time' },
                { icon: Smartphone, title: 'Mobile-First',    sub: 'Looks great on any device'   },
                { icon: Target,     title: 'Result-Focused',  sub: 'Built to convert and grow'   },
              ].map(({ icon: Icon, title, sub }, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/80 rounded-2xl border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[.82rem] font-bold text-dark">{title}</div>
                    <div className="text-[.73rem] text-muted">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ PROJECTS GRID ═══════════════════════════════ */}
      <section className="bg-white py-20 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3">
              <span className="w-5 h-[2px] rounded-sm bg-gg" /> Our Work <span className="w-5 h-[2px] rounded-sm bg-gg" />
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.025em] text-dark mb-3">
              Projects We're <em className="not-italic grad-text">Proud Of</em>
            </h2>
            <p className="text-[.95rem] text-muted leading-[1.78] max-w-[480px] mx-auto">
              Each project is built with purpose — clean code, strong design, and a focus on real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>

          {/* More on the way */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 py-8 px-8 rounded-2xl border border-dashed border-[rgba(45,43,107,.18)] bg-pale/60">
            <div className="flex -space-x-2">
              {[
                { icon: Layers, label: 'Projects' },
                { icon: Rocket, label: 'Growing' },
                { icon: Zap,    label: 'Fast' },
              ].map(({ icon: Icon }, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-white border-2 border-[rgba(45,43,107,.08)] flex items-center justify-center shadow-sm text-b4">
                  <Icon size={15} strokeWidth={1.8} />
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[.9rem] font-semibold text-dark">
                More exciting projects are on the way!
              </p>
              <p className="text-[.8rem] text-muted mt-0.5">
                We're constantly working with new clients — this portfolio is just getting started.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[.82rem] font-bold text-dark bg-gg
                         shadow-[0_4px_14px_rgba(201,168,76,.3)] relative overflow-hidden transition-all duration-[260ms]
                         hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(201,168,76,.48)]
                         before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.2),transparent_55%)] before:pointer-events-none"
            >
              <span className="relative z-[1]">Be the Next</span>
              <ArrowRight size={13} strokeWidth={2.2} className="relative z-[1]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ VALUE PROPOSITION ═══════════════════════════ */}
      <section className="bg-page py-20 px-[6%]">
        <div className="max-w-[1240px] mx-auto">

          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3">
              <span className="w-5 h-[2px] rounded-sm bg-gg" /> Why Go Digital <span className="w-5 h-[2px] rounded-sm bg-gg" />
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.12] tracking-[-0.025em] text-dark mb-4">
              Your Business Deserves More Than<br />
              <em className="not-italic grad-text">Just a Website</em>
            </h2>
            <p className="text-[.95rem] text-body leading-[1.78] max-w-[620px] mx-auto">
              We don't just build websites — we build digital systems that replace manual processes, attract the right customers,
              and give your business a professional edge that works around the clock.
            </p>
          </div>

          {/* 3 value cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {valuePoints.map(({ icon: Icon, title, body }, i) => (
              <div key={i} className={`sr d${i + 1} group relative overflow-hidden bg-white border border-border rounded-2xl p-7
                                        transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-b4
                                        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]
                                        before:bg-gg before:scale-x-0 before:origin-left before:transition-transform before:duration-300
                                        group-hover:before:scale-x-100`}>
                <div className="w-12 h-12 rounded-2xl bg-pale border border-border flex items-center justify-center mb-5
                                text-b4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white">
                  <Icon size={20} strokeWidth={1.7} />
                </div>
                <h3 className="font-heading text-[1rem] font-bold text-dark mb-2 leading-[1.35]">{title}</h3>
                <p className="text-[.84rem] text-body leading-[1.72]">{body}</p>
              </div>
            ))}
          </div>

          {/* Persuasive pitch banner */}
          <div className="sr relative overflow-hidden rounded-3xl bg-gm px-10 py-12 md:px-16 md:py-14
                          flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_60px_rgba(15,14,42,.22)]">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(30px)' }} />

            <div className="relative z-[1] flex-1 text-center md:text-left">
              <p className="font-heading text-[.8rem] font-bold text-gold tracking-[.1em] uppercase mb-2">Think About This</p>
              <h3 className="font-heading text-[clamp(1.3rem,2.5vw,1.9rem)] font-extrabold text-white leading-[1.3] mb-3">
                Your competitors are already online.<br />
                <span className="text-gold">Are you making it easy to be found?</span>
              </h3>
              <p className="text-[.9rem] text-white/65 leading-[1.72] max-w-[520px] mx-auto md:mx-0">
                Every day without a strong digital presence is a potential customer lost to a competitor who shows up first.
                A professionally built website is no longer optional — it's the foundation of every successful business.
              </p>
            </div>
            <div className="relative z-[1] flex-shrink-0 flex flex-col items-center gap-3">
              {['Attract More Customers', 'Build Instant Trust', 'Generate Leads 24/7', 'Outrank Competitors'].map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-[.85rem] font-semibold text-white/85">
                  <CheckCircle size={16} strokeWidth={2} className="text-gold flex-shrink-0" />
                  {pt}
                </div>
              ))}
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[.86rem] font-bold text-dark bg-gg
                           shadow-[0_6px_22px_rgba(201,168,76,.4)] relative overflow-hidden transition-all duration-[260ms]
                           hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(201,168,76,.55)]
                           before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none"
              >
                <span className="relative z-[1]">Let's Build Yours</span>
                <ArrowRight size={15} className="relative z-[1]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════ */}
      <div className="bg-page px-[6%] py-16">
        <div className="sr max-w-[1240px] mx-auto bg-gm rounded-3xl px-12 py-16 text-center relative overflow-hidden shadow-[0_28px_80px_rgba(15,14,42,.26)]">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-[-180px] right-[-130px] w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.2),transparent 70%)', filter: 'blur(28px)' }} />
          <div className="relative z-[2]">
            <h2 className="font-heading text-[clamp(1.7rem,3vw,2.7rem)] font-black text-white tracking-[-0.025em] mb-3">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-white/60 text-[.97rem] leading-[1.75] max-w-[480px] mx-auto mb-8">
              Every great project starts with a conversation. Tell us about your business and let's build something that makes a real difference.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[.9rem] font-bold text-dark bg-gg
                           shadow-[0_8px_28px_rgba(201,168,76,.38)] relative overflow-hidden transition-all duration-[280ms]
                           hover:-translate-y-[3px] hover:shadow-[0_14px_38px_rgba(201,168,76,.55)]
                           before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none"
              >
                <span className="relative z-[1]">Start Your Project</span>
                <ArrowRight size={15} className="relative z-[1]" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-[13px] rounded-full text-[.9rem] font-semibold
                           text-white border border-white/25 bg-white/8 transition-all duration-[280ms]
                           hover:bg-white/18 hover:border-white/50"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
