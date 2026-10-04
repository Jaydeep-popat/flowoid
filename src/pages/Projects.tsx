import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ExternalLink, Globe, Monitor, ShoppingBag, ArrowRight,
  CheckCircle, TrendingUp, Zap, Smartphone, Target, Layers,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } } };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } };

/* ─── Real Project Data (Strictly Given & Real Built) ─── */
const projects = [
  {
    id: 'hiyasha-solar',
    title: 'Hiyasha Solar Systems',
    tag: 'Solar & Renewable Energy',
    icon: Globe,
    img: '/solar.webp',
    desc: 'A clean, conversion-focused website built for a solar energy provider. Showcases products, services, and contact pathways — designed to generate leads and build trust with first-time visitors.',
    link: 'https://hiyashasolar.com/',
    tags: ['React', 'Tailwind CSS', 'SEO', 'Lead Generation'],
  },
  {
    id: 'pithadiya-interior',
    title: 'Pithadiya Interior',
    tag: 'Interior Design',
    icon: Monitor,
    img: '/interior.webp',
    desc: 'A visually rich portfolio website for an interior design studio. Highlights completed projects, design philosophy, and services — helping attract premium residential and commercial clients.',
    link: 'https://pithadiyainterior.com/',
    tags: ['Portfolio', 'UI/UX', 'Responsive', 'Branding'],
  },
  {
    id: 'nilkanth-traders',
    title: 'Nilkanth Traders',
    tag: 'Trading & Commerce',
    icon: ShoppingBag,
    img: '/nilkanth.webp',
    desc: 'A professional business website developed for a trading company. Built to establish digital credibility, present their product catalogue, and enable customers to reach out with ease.',
    link: 'https://nilkanth-trading.vercel.app/',
    tags: ['Business Website', 'Catalogue', 'Mobile-First', 'Contact Integration'],
  },
];

const valuePoints = [
  {
    icon: TrendingUp,
    title: 'A Website Is an Investment, Not an Expense',
    body: 'Every rupee you spend on a professional website works 24/7 — attracting customers, building trust, and converting traffic into revenue. Businesses with a strong online presence grow 2× faster than those without one.',
  },
  {
    icon: Monitor,
    title: 'We Digitise Manual Business Processes',
    body: 'Quotation forms, product catalogues, appointment booking, and customer enquiries — we convert repetitive manual workflows into smooth digital experiences, saving your team hours every single week.',
  },
  {
    icon: Globe,
    title: 'Visibility That Drives Real Growth',
    body: 'A well-built website is your most powerful marketing asset. Combined with SEO and direct WhatsApp contact channels, it puts your business in front of the right customers at the right moment — consistently and reliably.',
  },
];

/* ─── Real Project Card ─── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const Icon = project.icon;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 32, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } } }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-b4 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Visual Preview */}
        <div className="h-[220px] sm:h-[230px] overflow-hidden relative bg-pale border-b border-border/70 flex-shrink-0">
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,14,42,0.4),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Tag badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[.68rem] font-bold border border-white/20">
            <Icon size={12} className="text-gold" />
            <span>{project.tag}</span>
          </div>

          {/* Number badge */}
          <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white text-[.68rem] font-bold border border-white/20">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-7">
          <h3 className="font-heading text-[1.2rem] font-bold text-dark mb-2.5 leading-snug group-hover:text-b4 transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-[.9rem] text-body leading-[1.7] mb-5">
            {project.desc}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((t, j) => (
              <span
                key={j}
                className="px-2.5 py-1 rounded-md text-[.74rem] font-medium text-body bg-page border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Live Link */}
      <div className="px-7 pb-7 pt-0 border-t border-border/50 mt-auto">
        <div className="pt-5 flex items-center justify-between">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[.84rem] font-bold text-white bg-mg shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Visit Website</span>
            <ExternalLink size={13} strokeWidth={2.2} />
          </a>
          <span className="text-[.76rem] font-medium text-muted">
            Live in Production
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── MAIN PROJECTS PAGE ─────────────── */
export default function Projects() {
  useScrollReveal();

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const valueRef = useRef<HTMLDivElement>(null);
  const valueInView = useInView(valueRef, { once: true, amount: 0.1 });

  return (
    <>
      <Helmet>
        <title>Portfolio & Projects | Live Client Websites — Flowoid Rajkot</title>
        <meta name="description" content="Explore Flowoid's delivered client projects: business websites, responsive portfolios, and commercial catalogs built for businesses in Rajkot, Gujarat." />
      </Helmet>
      <Navbar />

      {/* ══ HERO ══ */}
      <div
        className="relative min-h-[54vh] bg-page-dots flex items-center px-[5%] pt-8 md:pt-16 pb-24 md:pb-28 mt-[80px] md:mt-[86px] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
        <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)', filter: 'blur(55px)' }} />
        <div className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)', filter: 'blur(45px)' }} />
        <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none" style={{ width: 700, height: 700, right: -220, top: -220 }} />
        <div className="absolute rounded-full border border-[rgba(201,168,76,.04)] pointer-events-none" style={{ width: 480, height: 480, right: -120, top: -120 }} />

        <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={container}>
              <motion.div variants={fadeUp} className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5">
                <Link to="/" className="text-muted no-underline">Home</Link> <span className="opacity-40">/</span> <span className="text-gold">Projects</span>
              </motion.div>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
                <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)]" />
                Software Studio · Rajkot, Gujarat
              </motion.div>
              <h1 className="font-heading font-black text-[clamp(2.15rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
                <span className="block overflow-hidden">
                  <motion.span className="block" variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease } } }}>
                    Work that <span className="grad-text">speaks for itself.</span>
                  </motion.span>
                </span>
              </h1>
              <motion.p variants={fadeUp} className="text-[1.02rem] leading-[1.78] text-body max-w-[540px] mb-7">
                Real businesses. Real problems. Real digital solutions — built to generate leads, build trust, and help local businesses grow online.
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-3.5 flex-wrap mb-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-[.9rem] font-bold text-white bg-mg shadow-[0_6px_18px_rgba(20,16,58,.24)] hover:shadow-[0_10px_26px_rgba(20,16,58,.36)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Get a Free 20-Min Review</span>
                  <ArrowRight size={16} strokeWidth={2.2} />
                </Link>
                <a
                  href="tel:+919924855931"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-full text-[.88rem] font-semibold text-b4 hover:text-dark hover:bg-pale/50 transition-all"
                >
                  <span>Or call +91 99248 55931</span>
                </a>
              </motion.div>
              <motion.div variants={container} className="flex flex-wrap gap-2.5 sm:gap-3">
                {[
                  { tag: '✓', text: 'Based in Rajkot, Gujarat' },
                  { tag: '✓', text: '100% Code Ownership' },
                  { tag: '✓', text: 'Verified Live Websites' },
                ].map(({ tag, text }, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.28 + i * 0.06 } } }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(45,43,107,.09)] shadow-[0_1px_4px_rgba(15,14,42,.03)]"
                  >
                    <span className="text-[.72rem] font-bold text-gold tracking-wide font-heading">{tag}</span>
                    <span className="text-[.78rem] font-medium text-body">{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right highlight cards */}
            <motion.div className="flex flex-col gap-3.5 min-w-[260px]" initial="hidden" animate="visible" variants={container} style={{ transition: 'none' }}>
              {[
                { icon: Zap, title: 'Fast Delivery', sub: '2–3 weeks typical turnaround' },
                { icon: Smartphone, title: 'Mobile-First', sub: 'Optimized for mobile speeds' },
                { icon: Target, title: 'Result-Focused', sub: 'Built to capture real inquiries' },
                { icon: Layers, title: 'Clean Architecture', sub: 'React & modern CSS stack' },
              ].map(({ icon: Icon, title, sub }, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease, delay: 0.2 + i * 0.08 } } }}
                  whileHover={{ x: -4, transition: { duration: 0.2 } }}
                  className="group flex items-center gap-3.5 p-4 bg-white/85 backdrop-blur-sm rounded-2xl border border-border shadow-sm hover:shadow-md hover:bg-white hover:border-b4 transition-[border,box-shadow,background,transform] duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[.85rem] font-bold text-dark">{title}</div>
                    <div className="text-[.75rem] text-muted">{sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ REAL PROJECTS. VERIFIED OUTCOMES. ══ */}
      <section className="bg-white py-28 md:py-32 px-[5%] border-t border-border/40">
        <div className="max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
              Our Work
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
              Real projects. <em className="not-italic grad-text">Verified outcomes.</em>
            </h2>
            <p className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              Every website here was built by our team for a real business — with clean code, fast page loads, and direct customer inquiry channels.
            </p>
          </div>

          {/* 3 Real Projects Grid */}
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          {/* Authentic Studio Reassurance Box */}
          <div className="mt-14 p-8 rounded-2xl border border-dashed border-b4/30 bg-pale/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="font-heading text-[1.05rem] font-bold text-dark mb-1">
                More client builds currently in development.
              </h4>
              <p className="text-[.88rem] text-muted leading-relaxed max-w-[680px]">
                We're actively building new websites and custom software tools for local businesses. Contact us directly to discuss your project requirements or schedule a consultation.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[.88rem] font-bold text-white bg-mg shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ VALUE PROPOSITION ══ */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div ref={valueRef} className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={valueInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
                Why Work With Flowoid
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
              Your business deserves more than <em className="not-italic grad-text">just a template.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              We don't build generic marketing fluff. We build fast, reliable websites and software that help your business establish real digital credibility.
            </motion.p>
          </motion.div>

          {/* 3 Value Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16"
            initial="hidden"
            animate={valueInView ? 'visible' : 'hidden'}
            variants={container}
          >
            {valuePoints.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 32, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } } }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden bg-white border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-b4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gg before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
              >
                <div className="w-12 h-12 rounded-xl bg-pale border border-border flex items-center justify-center mb-5 text-b4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-[1.08rem] font-bold text-dark mb-2.5 leading-snug">{title}</h3>
                <p className="text-[.88rem] text-body leading-[1.7]">{body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Persuasive Pitch Banner */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gm p-8 sm:p-12 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_24px_72px_rgba(15,14,42,.28)]"
            initial={{ opacity: 0, y: 36 }}
            animate={valueInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-[-100px] right-[-100px] w-[380px] h-[380px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.2),transparent 70%)', filter: 'blur(35px)' }} />

            <div className="relative z-[1] max-w-[620px] text-center lg:text-left">
              <span className="inline-block font-heading text-[.75rem] font-bold text-gold tracking-[.14em] uppercase mb-2">
                Digital Presence
              </span>
              <h3 className="font-heading text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold text-white leading-[1.2] mb-3">
                Your competitors are already online.<br />
                <span className="text-gold">Are you making it easy to be found?</span>
              </h3>
              <p className="text-[.95rem] text-white/70 leading-[1.75]">
                Every day without a fast, modern website is a potential customer lost to a competitor who shows up first on Google.
              </p>
            </div>

            <div className="relative z-[1] flex flex-col sm:flex-row lg:flex-col items-center gap-4 flex-shrink-0">
              <div className="space-y-2 text-[.88rem] text-white/85 font-medium mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} strokeWidth={2.2} className="text-gold" />
                  <span>Attract More Qualified Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} strokeWidth={2.2} className="text-gold" />
                  <span>Build Immediate Digital Trust</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} strokeWidth={2.2} className="text-gold" />
                  <span>100% Code & Domain Ownership</span>
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[.9rem] font-bold text-white bg-mg shadow-[0_8px_24px_rgba(20,16,58,.36)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Let's Build Yours</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ CLOSING CTA ══ */}
      <div className="bg-page px-[5%] py-28 md:py-32 border-t border-border/40">
        <motion.div
          className="max-w-[1240px] mx-auto bg-gm rounded-[32px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute pointer-events-none rounded-full" style={{ width: 640, height: 640, top: -220, right: -160, background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(24px)' }} />

          <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
            FIRST STEP
          </div>
          <h2 className="relative z-[2] font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold text-white leading-[1.14] tracking-[-0.025em] mb-4 max-w-[780px] mx-auto">
            Get a free 20-minute technical roadmap. No Commitment, no invoice.
          </h2>
          <p className="relative z-[2] text-white/75 text-[1.02rem] leading-[1.78] max-w-[620px] mx-auto mb-9">
            Bring us your current website, spreadsheet dilemma, or new software vision. We will review what technology fits best, give you a realistic timeline, and outline an honest budget estimate.
          </p>

          <div className="relative z-[2] flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full text-[.92rem] font-bold text-white bg-mg shadow-[0_10px_30px_rgba(20,16,58,.36)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,16,58,.48)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none"
            >
              <span>Book Your Free 20-Minute Review →</span>
            </Link>
            <a
              href="tel:+919924855931"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-full text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55"
            >
              <span>Call +91 99248 55931</span>
            </a>
          </div>

          <div className="relative z-[2] mt-7 flex flex-wrap items-center justify-center gap-3 text-[.82rem] text-white/60 font-medium">
            <span>✓ Zero sales pressure</span>
            <span>·</span>
            <span>✓ Direct discussion with a senior engineer</span>
            <span>·</span>
            <span>✓ Technical roadmap is yours to keep</span>
          </div>
        </motion.div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
