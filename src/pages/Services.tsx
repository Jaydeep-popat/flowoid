import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  Code2, Globe, Smartphone, Monitor,
  Server, Database, GitBranch, ArrowRight,
  Shield, CheckCircle, ShoppingBag, Briefcase,
  type LucideIcon,
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const fadeLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } };
const fadeRight = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } };

/* ─────────────────── REAL SERVICES DATA ─────────────────── */

interface Service {
  id: string;
  Icon: LucideIcon;
  badge: string;
  title: string;
  summary: string;
  description: string;
  replaces: string;
  offers: string[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: 'website-dev',
    Icon: Globe,
    badge: 'Fast & Modern',
    title: 'Website Development',
    summary: 'Fast, responsive business websites that turn local visitors into paying customers.',
    description: 'We build clean, modern websites that load instantly on mobile phones, rank well on Google, and clearly explain what your business offers. No heavy WordPress templates or fragile plugins that break after updates.',
    replaces: 'Replaces: Slow template builders & outdated brochures',
    offers: [
      'Custom responsive design optimized for mobile, tablet, and desktop',
      'Fast Google Core Web Vitals optimization and lightweight code',
      'Local search engine optimization (SEO) so local customers find you first',
      'Direct WhatsApp click-to-chat and instant contact forms',
      'Simple content management for blogs, portfolios, and company updates',
      'Domain configuration, fast SSL hosting setup, and security hardening',
    ],
    benefits: [
      'Loads in under 1 second even on spotty 3G/4G connections',
      'Clear messaging so first-time visitors understand your work in 5 seconds',
      'Direct customer inquiries routed straight to your phone or email',
      '100% ownership of your website source code, assets, and domain',
      'Zero monthly subscription traps or expensive plugin licenses',
      'Local Rajkot developers available for quick edits and support anytime',
    ],
  },
  {
    id: 'custom-software',
    Icon: Code2,
    badge: 'Operations & Workflow',
    title: 'Custom Software Development',
    summary: 'Internal systems, dispatch tools, and billing software built around your exact operations.',
    description: 'When off-the-shelf software is too clunky and Excel spreadsheets start causing lost orders, we build a custom tool designed specifically for your team. Every screen is tailored to how your business actually runs.',
    replaces: 'Replaces: Messy Excel sheets, manual paper logs & WhatsApp chains',
    offers: [
      'Internal operations management and workflow tracking software',
      'Warehouse inventory, stock movements, and dispatch tools',
      'Automated quotation, GST billing, and invoice generation pipelines',
      'Role-based permissions for managers, operators, and field staff',
      'Automated WhatsApp order updates and daily PDF summary reports',
      'Safe migration of past records from Excel, Tally, or paper logs',
    ],
    benefits: [
      'Saves your staff 2+ hours every day on repetitive data entry',
      'Stops expensive errors in order dispatching and price calculations',
      'One single dashboard that shows live stock and order status in real time',
      'Zero per-user monthly seat fees — you own the whole system forever',
      'Runs smoothly on office desktops, laptops, and warehouse tablets',
      'Built to adapt as your company adds more branches, products, or staff',
    ],
  },
  {
    id: 'web-apps',
    Icon: Monitor,
    badge: 'Browser Platforms',
    title: 'Web Applications & Portals',
    summary: 'Secure customer portals, dealer ordering hubs, and real-time dashboards.',
    description: 'We create powerful web applications that run directly in any browser. Whether you need a customer self-service portal, a dealer ordering system, or an internal operations hub, we deliver fast, secure platforms.',
    replaces: 'Replaces: Phone-tag order taking & delayed manual reports',
    offers: [
      'Customer self-service portals and live order tracking',
      'B2B dealer and distributor ordering platforms',
      'Real-time operations dashboards and automated daily analytics',
      'Secure multi-user authentication with role-based access control',
      'Direct REST API integrations with your existing systems and tools',
      'Progressive Web Apps (PWAs) that work even during brief offline periods',
    ],
    benefits: [
      'No app store download needed — open instantly in Chrome, Safari, or Edge',
      'Dealers and customers can place orders 24/7 without calling your staff',
      'Bank-grade encrypted database backups and private cloud hosting',
      'Simple interface that staff learn in 10 minutes without training manuals',
      'Real-time sync so everyone sees accurate inventory and order status',
      'Clean codebase that can be expanded easily over the next five years',
    ],
  },
  {
    id: 'mobile-apps',
    Icon: Smartphone,
    badge: 'Android & Cross-Platform',
    title: 'Application & Mobile Development',
    summary: 'Practical Android and cross-platform apps built for field teams and end customers.',
    description: 'We develop fast, intuitive mobile applications designed for real-world usage. From field staff tracking deliveries to customers ordering on their phones, our apps are built to stay fast even on budget devices and spotty cellular networks.',
    replaces: 'Replaces: Paper clipboards, delayed phone updates & lost notes',
    offers: [
      'Native Android and cross-platform mobile apps for phones and tablets',
      'Offline-first data entry for factory floors and remote locations',
      'Barcode scanning, camera receipt uploads, and digital signatures',
      'Live GPS route logging and delivery status updates',
      'Push notifications and automated WhatsApp/SMS status alerts',
      'Google Play Store publishing, app store compliance, and maintenance',
    ],
    benefits: [
      'Runs smoothly on budget Android devices common in local businesses',
      'Offline capability so field agents can work without interruption',
      'Large, thumb-friendly buttons designed for quick field use',
      'Automatic data sync as soon as the phone catches a signal',
      'Lower development cost by sharing code across Android and iOS',
      'Direct developer support for new Android OS updates and features',
    ],
  },
  {
    id: 'e-commerce',
    Icon: ShoppingBag,
    badge: 'Online Stores',
    title: 'E-Commerce Development',
    summary: 'High-converting online stores, streamlined checkout flows, and secure payment integrations.',
    description: 'We build fast, secure e-commerce platforms tailored to your brand. From Razorpay and UPI integrations to automated WhatsApp dispatch updates and real-time inventory management, your store is built to convert visitors without marketplace fees.',
    replaces: 'Replaces: Clunky marketplace commissions & slow store templates',
    offers: [
      'Custom online store design optimized for fast checkout on mobile phones',
      'Direct payment gateway integration (Razorpay, Cashfree, UPI, Credit Cards)',
      'Product catalog management with variants, categories, and inventory sync',
      'Automated WhatsApp and SMS order confirmation and shipping alerts',
      'Discount coupon engine, bundle pricing, and automated GST invoice generation',
      'Custom merchant dashboard for tracking orders, dispatches, and sales reports',
    ],
    benefits: [
      'Zero marketplace sales commission — 100% of profit goes directly to you',
      'Fast page load times that prevent shoppers from abandoning their carts',
      'Automated WhatsApp alerts reduce customer service calls about order status',
      'Complete ownership of customer data and email/phone lists for marketing',
      'Direct UPI and instant checkout experience familiar to Indian shoppers',
      'Easily managed by non-technical staff without ongoing agency retainer fees',
    ],
  },
  {
    id: 'portfolio-websites',
    Icon: Briefcase,
    badge: 'Showcase & Branding',
    title: 'Portfolio Websites',
    summary: 'High-impact portfolio and showcase websites designed to win high-ticket clients.',
    description: 'For architects, design agencies, consultants, and creative professionals, your website is your digital showroom. We build bespoke portfolio websites with interactive case studies, fluid animations, and clear inquiry paths that establish instant credibility.',
    replaces: 'Replaces: Outdated PDF portfolios & generic social media links',
    offers: [
      'Bespoke visual design tailored to your personal or agency brand identity',
      'Rich case study layouts with gallery zoom, video embeds, and before/after sliders',
      'Ultra-fast asset delivery with WebP/AVIF image compression',
      'Interactive animations and smooth transitions that create a lasting impression',
      'Prominent consultation booking and WhatsApp inquiry buttons on every project',
      'Clean SEO structure so prospective clients searching your name find your best work',
    ],
    benefits: [
      'Instantly positions your practice as premium and trustworthy to high-value clients',
      'Effortless proposal sharing with clean, dedicated links for each past project',
      'Loads high-res imagery in milliseconds without lagging on mobile browsers',
      'Turns portfolio visitors into direct consultation inquiries and project leads',
      '100% client code ownership with zero recurring theme or template subscriptions',
      'Simple process to add new projects and case studies as your body of work grows',
    ],
  },
];

const process = [
  { n: '01', stepTag: 'Discovery', t: 'Understand your bottlenecks', d: 'We sit together in Rajkot or hop on a call to map where spreadsheets or manual steps slow your business down.' },
  { n: '02', stepTag: 'Blueprint', t: 'Plain-English scope & quote', d: 'You get a written document listing every screen, feature, and fixed delivery timeline. Zero hidden fees.' },
  { n: '03', stepTag: 'Friday Demo', t: 'Build & test weekly', d: 'Every Friday afternoon, you test what was built that week on a live link. Any feedback gets addressed immediately.' },
  { n: '04', stepTag: 'Warranty', t: 'Launch together & warranty', d: 'We guide your staff through rollout and include 30 days of post-launch bug warranty with direct phone support.' },
];

interface TechChip {
  name: string;
  color: string;
}

interface TechCat {
  Icon: LucideIcon;
  label: string;
  role: string;
  benefit: string;
  chips: TechChip[];
}

const techCats: TechCat[] = [
  {
    Icon: Monitor,
    label: 'Frontend & Interfaces',
    role: 'Fast client screens & portals',
    benefit: 'Sub-second loads on mobile data',
    chips: [
      { name: 'React', color: '#06B6D4' },
      { name: 'Next.js', color: '#111827' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind CSS', color: '#0EA5E9' },
      { name: 'Vite', color: '#8B5CF6' },
      { name: 'HTML5 / CSS3', color: '#E34F26' },
    ],
  },
  {
    Icon: Server,
    label: 'Backend & APIs',
    role: 'High-throughput business logic',
    benefit: 'Handles hundreds of live staff orders',
    chips: [
      { name: 'Node.js', color: '#10B981' },
      { name: 'Express', color: '#6366F1' },
      { name: 'REST APIs', color: '#F59E0B' },
      { name: 'Python', color: '#3B82F6' },
      { name: 'WebSockets', color: '#EC4899' },
    ],
  },
  {
    Icon: Database,
    label: 'Databases & Storage',
    role: 'ACID ledgers & stock records',
    benefit: 'Zero corrupted records or lost data',
    chips: [
      { name: 'PostgreSQL', color: '#4338CA' },
      { name: 'MongoDB', color: '#059669' },
      { name: 'MySQL', color: '#0284C7' },
      { name: 'Redis Caching', color: '#DC2626' },
    ],
  },
  {
    Icon: Smartphone,
    label: 'Mobile & Field Apps',
    role: 'Lightweight Android & iOS tools',
    benefit: 'Works offline when signal drops',
    chips: [
      { name: 'React Native', color: '#06B6D4' },
      { name: 'Android / Kotlin', color: '#16A34A' },
      { name: 'Flutter', color: '#0284C7' },
      { name: 'Offline SQLite', color: '#475569' },
    ],
  },
  {
    Icon: GitBranch,
    label: 'Hosting & Deployment',
    role: 'Server setup & release pipelines',
    benefit: 'Automated zero-downtime updates',
    chips: [
      { name: 'Docker', color: '#0284C7' },
      { name: 'GitHub Actions', color: '#181717' },
      { name: 'Linux Cloud VPS', color: '#F59E0B' },
      { name: 'Vercel', color: '#000000' },
      { name: 'Nginx', color: '#10B981' },
    ],
  },
  {
    Icon: Shield,
    label: 'Security & Integrity',
    role: 'Encrypted storage & access control',
    benefit: 'Private data isolation & mutual NDA',
    chips: [
      { name: 'SSL / TLS', color: '#10B981' },
      { name: 'RBAC Roles', color: '#8B5CF6' },
      { name: 'Encrypted Backups', color: '#2563EB' },
      { name: 'Password Hashing', color: '#D97706' },
      { name: 'Mutual NDA', color: '#C9A84C' },
    ],
  },
];

const faqs = [
  {
    q: 'How much does a typical website or custom software project cost?',
    a: 'We do not charge open-ended hourly rates that balloon unexpectedly. After our initial 20-minute review, we give you a fixed-price scope broken down into milestone payments. You only pay for deliverables you have reviewed and approved.',
  },
  {
    q: 'How long does it take from our first meeting to launch?',
    a: 'A standard business website typically takes 2 to 3 weeks. A custom software tool or web app usually takes 5 to 8 weeks. We never disappear for weeks at a time — every Friday afternoon you test real progress on a staging link.',
  },
  {
    q: 'Can you import our existing Excel spreadsheets and past records?',
    a: 'Yes, absolutely. Most of our clients in Rajkot come to us with years of data trapped in spreadsheets or paper books. We clean, format, and safely import your historical data into the new system before launch so nothing gets lost.',
  },
  {
    q: 'Do we own the source code and database once the project is finished?',
    a: '100% yes. You own all source code, database records, and server credentials from day one. We sign a mutual NDA before kickoff and hand over all files and passwords upon completion. You are never locked in.',
  },
];

/* ─────────────── PAGE HERO ─────────────── */

function PageHero() {
  const heroHighlights: { Icon: LucideIcon; title: string; sub: string }[] = [
    { Icon: Globe, title: 'Website Development', sub: 'Fast, modern, SEO-ready' },
    { Icon: Code2, title: 'Custom Software', sub: 'Spreadsheet & paper replacement' },
    { Icon: Monitor, title: 'Web Applications', sub: 'Customer portals & dashboards' },
    { Icon: Smartphone, title: 'Mobile & App Dev', sub: 'Android & field worker tools' },
  ];

  return (
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
              <Link to="/" className="text-muted no-underline">Home</Link> <span className="opacity-40">/</span> <span className="text-gold">Services</span>
            </motion.div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)]" />
              Software Studio · Rajkot, Gujarat
            </motion.div>
            <h1 className="font-heading font-black text-[clamp(2.15rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease } } }}>
                  Software, web apps &
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease, delay: 0.08 } } }}>
                  websites built for <span className="grad-text">real businesses.</span>
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="text-[1.02rem] leading-[1.78] text-body max-w-[540px] mb-7">
              Flowoid is an independent developer team in Rajkot. We design and build fast websites, custom software, browser portals, and mobile applications that help local businesses run smoother and grow faster.
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
                { tag: '✓', text: 'IT consulting' },
                { tag: '✓', text: '100% code ownership' },
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

          {/* Right — highlight boxes */}
          <motion.div className="flex flex-col gap-3.5 min-w-[260px]" initial="hidden" animate="visible" variants={container} style={{ transition: 'none' }}>
            {heroHighlights.map(({ Icon, title, sub }, i) => (
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
  );
}

/* ─────────── SERVICE NAV (quick links) ─────────── */

function ServiceNav({ activeId, isVisible }: { activeId: string | null; isVisible: boolean }) {
  return (
    <section
      className={`bg-white border-b border-border sticky top-[76px] md:top-[86px] z-[40] transition-all duration-300 shadow-sm ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-[5%] py-0">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {services.map((s) => {
            const NavIcon = s.Icon;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(s.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex items-center gap-2 px-4 py-3.5 text-[.82rem] font-bold whitespace-nowrap border-b-[2.5px] transition-all duration-200 ${
                  activeId === s.id
                    ? 'border-gold text-dark bg-pale/50'
                    : 'border-transparent text-muted hover:text-dark hover:border-border'
                }`}
              >
                <NavIcon size={16} strokeWidth={1.8} />
                <span>{s.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────── INDIVIDUAL SERVICE SECTION ────────── */

function ServiceSection({ service, index, isReversed }: { service: Service; index: number; isReversed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id={service.id} className={`py-28 md:py-32 px-[5%] scroll-mt-[140px] border-t border-border/40 ${index % 2 === 0 ? 'bg-white' : 'bg-page'}`}>
      <div ref={ref} className="max-w-[1240px] mx-auto">
        <motion.div className="text-center mb-16" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={container}>
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
              {service.badge}
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
            {service.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[1.02rem] leading-[1.78] text-body max-w-[65ch] mx-auto mb-4">
            {service.description}
          </motion.p>
          <motion.div variants={fadeUp}>
            <span className="inline-block text-[.82rem] font-semibold text-gold bg-pale border border-border px-4 py-1.5 rounded-full">
              {service.replaces}
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left card: What We Build */}
          <motion.div
            className={`group bg-white rounded-2xl border border-border p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={isReversed ? fadeRight : fadeLeft}
          >
            <div>
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-border/60">
                <div className="w-12 h-12 rounded-xl bg-pale border border-border flex items-center justify-center text-b4">
                  <service.Icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-heading text-[1.12rem] font-bold text-dark">What We Deliver</h3>
                  <div className="text-[.78rem] text-muted">Concrete features and deliverables included in your build</div>
                </div>
              </div>
              <ul className="list-none flex flex-col gap-3.5">
                {service.offers.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease, delay: 0.2 + j * 0.05 }}
                    className="flex items-start gap-3 text-[.9rem] text-body leading-[1.65]"
                  >
                    <CheckCircle size={17} strokeWidth={2.2} className="text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-border/50 text-[.8rem] text-muted font-medium">
              ✓ Tested on real devices prior to deployment
            </div>
          </motion.div>

          {/* Right card: Why It Matters */}
          <motion.div
            className={`group bg-gm rounded-2xl p-7 sm:p-9 shadow-lg text-white flex flex-col justify-between relative overflow-hidden ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={isReversed ? fadeLeft : fadeRight}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative z-[2]">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-white/12">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gold">
                  <Shield size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-heading text-[1.12rem] font-bold text-white">Why It Matters For You</h3>
                  <div className="text-[.78rem] text-white/60">Business advantages and peace of mind</div>
                </div>
              </div>
              <ul className="list-none flex flex-col gap-3.5 mb-8">
                {service.benefits.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: 14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease, delay: 0.2 + j * 0.05 }}
                    className="flex items-start gap-3 text-[.9rem] text-white/85 leading-[1.65]"
                  >
                    <CheckCircle size={17} strokeWidth={2.2} className="text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative z-[2] pt-6 border-t border-white/12 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[.82rem] text-white/60 font-medium">100% code and database ownership</span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[.86rem] font-bold text-white bg-mg shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Plan This Build</span>
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MAIN COMPONENT ─────────────── */

export default function Services() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(services[0].id);
  const [navVisible, setNavVisible] = useState(true);
  const servicesWrapperRef = useRef<HTMLDivElement>(null);

  // Track active service on scroll + hide nav when past service sections
  useEffect(() => {
    const handleScroll = () => {
      const offset = 220;
      const scrollY = window.scrollY + offset;
      let foundActive = false;

      for (let i = services.length - 1; i >= 0; i--) {
        const el = document.getElementById(services[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveServiceId(services[i].id);
          foundActive = true;
          break;
        }
      }
      if (!foundActive) {
        setActiveServiceId(services[0].id);
      }

      if (servicesWrapperRef.current) {
        const wrapper = servicesWrapperRef.current;
        const wrapperTop = wrapper.offsetTop;
        const wrapperBottom = wrapperTop + wrapper.offsetHeight;
        const navHeight = 160;
        const currentScroll = window.scrollY + navHeight;
        setNavVisible(currentScroll >= wrapperTop && currentScroll <= wrapperBottom);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Services | Websites, Custom Software & Mobile Apps — Flowoid Rajkot</title>
        <meta name="description" content="Explore Flowoid's software services — websites, custom software, web applications, and mobile apps for businesses in Rajkot, Gujarat." />
      </Helmet>
      <Navbar />
      <PageHero />
      <ServiceNav activeId={activeServiceId} isVisible={navVisible} />

      {/* SERVICE SECTIONS */}
      <div ref={servicesWrapperRef}>
        {services.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} isReversed={i % 2 !== 0} />
        ))}
      </div>

      {/* PROCESS */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div className="max-w-[1240px] mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={container}>
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
                How We Work
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
              Our 4-Step <em className="not-italic grad-text">Delivery Workflow</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              Transparent, structured, and designed to keep you informed at every stage — zero surprises at launch.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={container}
          >
            {process.map((p, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 36, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } } }}
                className="group relative"
              >
                <div className="bg-white border border-border rounded-2xl p-7 sm:p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-b4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-gg flex items-center justify-center text-white font-heading font-bold text-[.85rem] shadow-md">
                        {p.n}
                      </div>
                      <span className="text-[.72rem] font-bold text-muted uppercase tracking-[.08em]">
                        {p.stepTag}
                      </span>
                    </div>
                    <h3 className="font-heading text-[1.02rem] font-bold text-dark mb-2">{p.t}</h3>
                    <p className="text-[.86rem] text-muted leading-[1.65]">{p.d}</p>
                  </div>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 text-border z-10">
                    <ArrowRight size={20} strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div className="max-w-[1240px] mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={container}>
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
                Engineering Stack
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
              Dependable tools we use <em className="not-italic grad-text">every day.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              We avoid trendy hype and fragile frameworks. Every technology in our stack is chosen for speed, security, and long-term stability so your software runs smoothly for years.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={container}
          >
            {techCats.map((t, i) => {
              const TechIcon = t.Icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } } }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden bg-white border border-border/90 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_2px_10px_rgba(20,16,58,0.03)] hover:shadow-[0_16px_36px_rgba(20,16,58,0.08)] hover:border-b4 transition-all duration-300 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gg before:scale-x-0 before:origin-left hover:before:scale-x-100 before:transition-transform before:duration-300 before:rounded-t-2xl"
                >
                  <div>
                    {/* Top Row: Icon + Title + Role */}
                    <div className="flex items-start gap-4 mb-5 pb-4 border-b border-border/60">
                      <div className="w-12 h-12 rounded-xl bg-pale border border-[rgba(45,43,107,0.12)] flex items-center justify-center text-b4 flex-shrink-0 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105 transition-all duration-300">
                        <TechIcon size={22} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-heading text-[1.05rem] font-bold text-dark mb-1 leading-snug">
                          {t.label}
                        </h3>
                        <p className="text-[.78rem] text-muted leading-tight">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {/* Chips with Brand Color Dots */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {t.chips.map((chip, j) => (
                        <div
                          key={j}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[.8rem] font-semibold text-[#121124] bg-page border border-border hover:bg-pale/70 hover:border-b4/40 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs select-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_4px_rgba(0,0,0,0.15)]"
                            style={{ backgroundColor: chip.color }}
                          />
                          <span>{chip.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Production Guarantee Banner */}
                  <div className="pt-4 border-t border-border/60 flex items-center gap-2.5 text-[.78rem] text-body font-medium bg-pale/40 -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 px-7 sm:px-8 py-3.5 rounded-b-2xl">
                    <span className="text-gold font-bold text-[.85rem]">✓</span>
                    <span className="text-muted leading-snug">
                      <strong className="text-dark font-semibold">Outcome: </strong>
                      {t.benefit}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
              FAQs
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark">
              Frequently Asked <em className="not-italic grad-text">Questions</em>
            </h2>
          </div>
          <div className="max-w-[800px] mx-auto space-y-3.5">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white ${
                  openFaq === i ? 'border-gold shadow-md' : 'border-border'
                }`}
              >
                <button
                  type="button"
                  className={`w-full text-left flex items-center justify-between px-6 py-5 cursor-pointer font-heading text-[.96rem] font-bold text-dark gap-4 transition-colors duration-200 ${
                    openFaq === i ? 'bg-pale/40' : 'hover:bg-pale/20'
                  }`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <div className={`w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center text-[.72rem] font-bold transition-all duration-300 ${
                    openFaq === i ? 'bg-gm text-white rotate-180' : 'bg-pale text-gold'
                  }`}>
                    ▾
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    openFaq === i ? 'max-h-[260px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 text-[.9rem] leading-[1.75] text-body border-t border-border/40">
                    {f.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOX */}
      <div className="bg-page px-[5%] py-28 md:py-32 border-t border-border/40">
        <div className="max-w-[1240px] mx-auto bg-gm rounded-[32px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute pointer-events-none rounded-full" style={{ width: 640, height: 640, top: -220, right: -160, background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(24px)' }} />
          <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
            FIRST STEP
          </div>
          <h2 className="relative z-[2] font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold text-white leading-[1.14] tracking-[-0.025em] mb-4 max-w-[780px] mx-auto">
            Get a free 20-minute technical roadmap. No Commitment-Just discovery, no invoice.
          </h2>
          <p className="relative z-[2] text-white/75 text-[1.02rem] leading-[1.78] max-w-[620px] mx-auto mb-9">
            Tell us what is slowing your business down — whether it is a messy spreadsheet, an outdated website, or a new mobile app concept. We will review your requirements, recommend the right tech, and give you an honest budget estimate.
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
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
