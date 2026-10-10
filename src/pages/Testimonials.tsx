import { useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle2,
  Users,
  Phone,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Check,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

type TestimonialCategory = 'All' | 'Custom Software & ERP' | 'Websites & Portfolios';

interface Testimonial {
  id: string;
  category: 'Custom Software & ERP' | 'Websites & Portfolios';
  title: string;
  q: string;
  name: string;
  role: string;
  company: string;
  location: string;
  init: string;
  rating: number;
  deliveredProject: string;
  verifiedOutcome: string;
  projectLink?: string;
  isFeatured?: boolean;
}

const allTestimonials: Testimonial[] = [
  {
    id: 'hiyasha-solar-hemalbhai',
    category: 'Custom Software & ERP',
    title: 'Smooth, Professional & Truly Transformative',
    q: "Flowoid built the complete management system for Hiyasha Solar, and we couldn't be happier. From tracking inventory to managing customer orders and installation workflows, everything runs smoothly now. Their team understood our solar business needs perfectly and delivered on time.",
    name: 'Hemalbhai Pethapara',
    role: 'Director',
    company: 'Hiyasha Solar System',
    location: 'Rajkot, Gujarat',
    init: 'HP',
    rating: 5,
    deliveredProject: 'Custom Solar ERP & Inventory Ledger',
    verifiedOutcome: '100% paperless order tracking & live stock visibility',
    projectLink: '/projects',
    isFeatured: true,
  },
  {
    id: 'hiyasha-solar-girishbhai',
    category: 'Custom Software & ERP',
    title: 'Simplified Our Daily Operations Across Field Crews',
    q: "Before Flowoid stepped in, managing our solar panel installations and service records was a constant headache. They built us a clean, easy-to-use system that our entire team adopted within a week. Very responsive and genuinely helpful throughout the project.",
    name: 'Girishbhai Pethapara',
    role: 'Co-Director',
    company: 'Hiyasha Solar System',
    location: 'Rajkot, Gujarat',
    init: 'GP',
    rating: 5,
    deliveredProject: 'Field Service & Installation Portal',
    verifiedOutcome: 'Full team adoption in 7 days across on-site crews',
    projectLink: '/projects',
  },
  {
    id: 'pithadiya-interior-bharatbhai',
    category: 'Websites & Portfolios',
    title: 'Beautiful Website, Noticeable Increase in Inquiries',
    q: "Flowoid designed and developed our interior design portfolio website, and we've been getting more high-ticket client inquiries since it launched. The design is elegant, loads instantly, and showcases our work beautifully. They truly captured the essence of our brand.",
    name: 'Bharatbhai Pithadiya',
    role: 'Founder',
    company: 'Pithadiya Interior',
    location: 'Rajkot, Gujarat',
    init: 'BP',
    rating: 5,
    deliveredProject: 'Luxury Interior Design Portfolio Website',
    verifiedOutcome: '2.5× increase in qualified residential project inquiries',
    projectLink: 'https://pithadiyainterior.com/',
  },
  {
    id: 'pithadiya-interior-vijaybhai',
    category: 'Websites & Portfolios',
    title: 'Professional Team with Great Attention to Detail',
    q: "We needed a website that reflects the quality of our interior work, and Flowoid delivered exactly that. The attention to detail in the UI and the smooth animations make our portfolio stand out. Communication was clear and they met every deadline without stress.",
    name: 'Vijaybhai Pithadiya',
    role: 'Co-Founder',
    company: 'Pithadiya Interior',
    location: 'Rajkot, Gujarat',
    init: 'VP',
    rating: 5,
    deliveredProject: 'Responsive Portfolio Architecture & UI/UX',
    verifiedOutcome: 'Sub-second mobile speed & 100% custom responsive layout',
    projectLink: 'https://pithadiyainterior.com/',
  },
  {
    id: 'jakasaniya-trading-maheshbhai',
    category: 'Custom Software & ERP',
    title: 'Transformed How We Track Our Entire Stock',
    q: "Flowoid developed a stock management system that transformed how we track our inventory. No more manual registers — everything is digital, fast, and accurate now. They took the time to understand our workflow before building, and it shows in the final product.",
    name: 'Maheshbhai Jakasaniya',
    role: 'Owner',
    company: 'Jakasaniya Trading Co.',
    location: 'Rajkot, Gujarat',
    init: 'MJ',
    rating: 5,
    deliveredProject: 'Digital Stock Ledger & Inventory Engine',
    verifiedOutcome: 'Eliminated physical registers & stock entry discrepancies',
  },
  {
    id: 'popat-enterprises-manojbhai',
    category: 'Custom Software & ERP',
    title: 'Reliable, Practical & Zero-Nonsense Solution',
    q: "We approached Flowoid for a stock management system and they delivered a practical, no-nonsense solution. It handles our daily stock entries, reports, and alerts without any issues. The system is straightforward and our staff picked it up quickly.",
    name: 'Manojbhai Popat',
    role: 'Proprietor',
    company: 'Popat Enterprises',
    location: 'Rajkot, Gujarat',
    init: 'MP',
    rating: 5,
    deliveredProject: 'Warehouse Inventory & Re-order Alert System',
    verifiedOutcome: 'Zero-headache stock logging & automated re-order alerts',
  },
  {
    id: 'nilkanth-traders',
    category: 'Websites & Portfolios',
    title: 'Modern Web Presence That Drives Real Walk-In Clients',
    q: "Flowoid created a modern, visually appealing website for Nilkanth Traders that showcases our tile collection perfectly. Customers can browse our catalog easily, and we've noticed a real increase in walk-in clients who found us online first. Great team to work with.",
    name: 'Mr. Meet Kalola',
    role: 'Owner',
    company: 'Nilkanth Traders',
    location: 'Rajkot, Gujarat',
    init: 'MK',
    rating: 5,
    deliveredProject: 'Digital Product Catalogue & Business Website',
    verifiedOutcome: 'Noticeable rise in retail walk-in buyers finding catalog online',
    projectLink: 'https://nilkanth-trading.vercel.app/',
  },
  {
    id: 'naturals-soap-vraj-kasundra',
    category: 'Websites & Portfolios',
    title: 'Fast D2C Mobile Checkout & Effortless Order Flow',
    q: "Flowoid developed a high-performance D2C e-commerce store for our natural soap brand. The mobile checkout with UPI is lightning fast, and automated WhatsApp order notifications save our team hours of manual follow-up every single day.",
    name: 'Vraj Kasundra',
    role: 'Founder',
    company: 'Naturals Soap (Team Naturals)',
    location: 'Morbi / Rajkot, Gujarat',
    init: 'VK',
    rating: 5,
    deliveredProject: 'D2C Natural Soaps & Skincare E-Commerce Platform',
    verifiedOutcome: 'Frictionless one-tap UPI mobile checkout & automated WhatsApp alerts',
    projectLink: 'https://teamnaturals.in/',
  },
  {
    id: 'ayanshi-imitation-vatsal-pithadiya',
    category: 'Websites & Portfolios',
    title: 'Digital Catalogue That Modernized Our B2B & Retail Inquiries',
    q: "Flowoid transformed how we present our imitation jewellery collections to wholesale and retail buyers. The digital catalogue is ultra-responsive, beautiful, and enables buyers to select designs and inquire instantly.",
    name: 'Vatsal Pithadiya',
    role: 'Founder',
    company: 'Ayanshi Imitation',
    location: 'Rajkot, Gujarat',
    init: 'VP',
    rating: 5,
    deliveredProject: 'Jewellery Catalogue & Digital Showcase Platform',
    verifiedOutcome: 'Instant catalogue browsing & streamlined buyer inquiry workflow',
  },
];

/* ── Render Gold Stars ── */
function StarRating({ rating = 5 }: { rating?: number }) {
  const count = Math.max(1, Math.min(5, Math.floor(rating)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-sm leading-none">
          ★
        </span>
      ))}
    </div>
  );
}

/* ── Animated stat counter ── */
function StatCounter({
  end,
  suffix,
  label,
  sublabel,
  delay = 0,
}: {
  end: number;
  suffix: string;
  label: string;
  sublabel?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;
    const dur = 1400;
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (step >= steps) {
        setCount(end);
        clearInterval(timer);
      }
    }, dur / steps);
  }

  return (
    <motion.div
      ref={ref}
      className="text-center py-6 px-4 border-r border-white/10 last:border-r-0"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay }}
    >
      <div className="font-heading text-[clamp(2.4rem,3.8vw,3.2rem)] font-black text-white leading-none tracking-tight mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-[.92rem] font-bold text-white/90">{label}</div>
      {sublabel && (
        <div className="text-[.76rem] text-white/50 font-medium mt-1">
          {sublabel}
        </div>
      )}
    </motion.div>
  );
}

export default function Testimonials() {
  useScrollReveal();

  const [activeCategory, setActiveCategory] =
    useState<TestimonialCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: TestimonialCategory[] = [
    'All',
    'Custom Software & ERP',
    'Websites & Portfolios',
  ];

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'All') return allTestimonials;
    return allTestimonials.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const featuredSpotlight = allTestimonials[0];

  return (
    <>
      <Helmet>
        <title>Client Testimonials & Verified Reviews | Flowoid Rajkot</title>
        <meta
          name="description"
          content="Read verified client reviews from Gujarat business owners, manufacturers, and trade leaders who trust Flowoid for custom software and business websites."
        />
      </Helmet>

      <Navbar />

      {/* ══ PAGE HERO ══ */}
      <div className="relative min-h-[52vh] bg-page-dots flex items-center px-[5%] pt-8 md:pt-16 pb-24 md:pb-28 mt-[80px] md:mt-[86px] overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)',
            backgroundSize: '36px 36px',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)',
          }}
        />
        <div
          className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',
            filter: 'blur(55px)',
          }}
        />
        <div
          className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)',
            filter: 'blur(45px)',
          }}
        />

        <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left Column */}
            <motion.div initial="hidden" animate="visible" variants={container}>
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5"
              >
                <Link to="/" className="text-muted no-underline hover:text-dark">
                  Home
                </Link>
                <span className="opacity-40">/</span>
                <span className="text-gold">Verified Testimonials</span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b3 tracking-[.1em] uppercase mb-5"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)]" />
                Verified Client Reviews · Rajkot, Gujarat
              </motion.div>

              <h1 className="font-heading font-black text-[clamp(2.15rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease } },
                    }}
                  >
                    Real feedback from the
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        transition: { duration: 0.6, ease, delay: 0.08 },
                      },
                    }}
                  >
                    founders we <span className="grad-text">build for.</span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUp}
                className="text-[1.02rem] leading-[1.78] text-body max-w-[540px] mb-8"
              >
                No simulated case studies. No anonymous corporate filler.
                Unfiltered reviews from Gujarat business owners and trade
                leaders who run their operations and client acquisition on Flowoid
                software.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-4 text-[.82rem] font-bold text-dark"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-2xs">
                  <CheckCircle2 size={16} className="text-[#10B981]" />
                  <span>100% Verified Local Businesses</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-2xs">
                  <Star size={16} className="text-gold fill-gold" />
                  <span>5.0 / 5.0 Star Rating</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-2xs">
                  <Users size={16} className="text-b4" />
                  <span>Direct Senior Engineer Contact</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: 3 Verified Delivery Standards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 text-[.7rem] font-bold text-gold tracking-widest uppercase mb-4">
                <ShieldCheck size={15} />
                <span>Our Quality Commitment</span>
              </div>
              <h3 className="font-heading font-extrabold text-[1.25rem] text-dark leading-tight mb-4">
                Why Our Clients Recommend Us
              </h3>

              <div className="space-y-4 text-[.9rem] leading-[1.65]">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      Direct Engineer Communication
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      You work 1-on-1 with senior developers in Rajkot. No
                      unhelpful account managers or game of telephone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      Fortnightly Working Releases
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      You test working software on staging every 10–14 days. No
                      four-month disappearing acts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      100% Asset & Code Ownership
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      Full intellectual property, Git source code, and database
                      credentials belong to you on day one.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ OUTCOME METRICS BAND ══ */}
      <div className="bg-gm px-[5%] py-12 relative overflow-hidden shadow-inner">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(201,168,76,.12) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 relative z-[1]">
          <StatCounter
            end={10}
            suffix="+"
            label="Live Deployments"
            sublabel="Active production systems in Gujarat"
            delay={0}
          />
          <StatCounter
            end={100}
            suffix="%"
            label="On-Time Delivery"
            sublabel="Milestone-driven sprint velocity"
            delay={0.1}
          />
          <StatCounter
            end={5}
            suffix="/5"
            label="Client Rating"
            sublabel="Unfiltered local client feedback"
            delay={0.2}
          />
          <StatCounter
            end={100}
            suffix="%"
            label="Code Ownership"
            sublabel="Zero vendor lock-in or licensing fees"
            delay={0.3}
          />
        </div>
      </div>

      {/* ══ MAIN TESTIMONIALS SECTION ══ */}
      <main className="bg-page py-20 md:py-28 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-[680px] mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-widest uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
              UNFILTERED PROOF
            </div>
            <h2 className="font-heading font-black text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.12] text-dark tracking-[-0.025em] mb-4">
              Real stories from the businesses we’ve transformed.
            </h2>
            <p className="text-[1rem] leading-[1.78] text-body">
              Every quote below comes from a real founder or director who worked
              directly with our engineering team to solve a critical operational bottleneck.
            </p>
          </div>

          {/* ══ ASYMMETRIC FEATURED SPOTLIGHT: HIYASHA SOLAR ══ */}
          <div className="mb-14">
            <div className="group rounded-3xl border border-border bg-white p-7 sm:p-10 shadow-sm hover:shadow-xl hover:border-b4/50 transition-all duration-300 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
                {/* Left: Quote & Client Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.14)] text-[.72rem] font-bold text-b4 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      Featured Client Spotlight
                    </span>
                    <StarRating rating={featuredSpotlight.rating} />
                    <span className="text-[.76rem] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>Verified Client</span>
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-[clamp(1.4rem,2.4vw,1.95rem)] leading-[1.25] text-dark mb-4">
                    "{featuredSpotlight.title}"
                  </h3>

                  <p className="text-[1.03rem] text-body leading-[1.8] mb-7 italic">
                    "{featuredSpotlight.q}"
                  </p>

                  {/* Client Bio */}
                  <div className="flex items-center gap-3.5 pt-5 border-t border-border/70">
                    <div className="w-12 h-12 rounded-full bg-gm text-gold font-bold text-sm flex items-center justify-center shadow-xs">
                      {featuredSpotlight.init}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-[.98rem] text-dark flex items-center gap-1.5">
                        <span>{featuredSpotlight.name}</span>
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      </div>
                      <div className="text-[.82rem] text-muted">
                        {featuredSpotlight.role} ·{' '}
                        <span className="font-semibold text-dark">
                          {featuredSpotlight.company}
                        </span>
                      </div>
                      <div className="text-[.74rem] text-muted/80">
                        {featuredSpotlight.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Operational Outcomes Breakdown */}
                <div className="bg-pale/70 rounded-2xl p-6 sm:p-7 border border-border">
                  <div className="text-[.72rem] font-bold text-b4 tracking-widest uppercase mb-4 flex items-center gap-1.5">
                    <Layers size={14} className="text-gold" />
                    <span>Delivered Solution & Outcomes</span>
                  </div>

                  <div className="mb-5 pb-4 border-b border-border/80">
                    <div className="text-[.76rem] text-muted uppercase font-semibold">
                      System Deployed
                    </div>
                    <div className="text-dark font-heading font-black text-[1.08rem]">
                      {featuredSpotlight.deliveredProject}
                    </div>
                  </div>

                  <div className="space-y-3.5 text-[.88rem] leading-relaxed text-body font-medium">
                    <div className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        className="text-emerald-600 flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span>
                        <strong>100% Paperless Flow:</strong> Replaced physical
                        registers with automated order tracking.
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        className="text-emerald-600 flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span>
                        <strong>Zero Stock Discrepancies:</strong> Real-time panel &
                        inverter inventory tracking across warehouse.
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        className="text-emerald-600 flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span>
                        <strong>7-Day Onboarding:</strong> Adopted effortlessly by
                        installation crews and office staff.
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1.5 text-[.82rem] font-bold text-b4 hover:text-dark transition-colors"
                    >
                      <span>Explore this project</span>
                      <ArrowRight size={13} />
                    </Link>
                    <span className="text-[.74rem] font-semibold text-muted">
                      Production Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ CATEGORY FILTER BAR ══ */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? allTestimonials.length
                  : allTestimonials.filter((t) => t.category === cat).length;
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-[42px] px-5 py-2 rounded-full text-[.84rem] font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-dark text-white shadow-sm'
                      : 'bg-white text-body border border-border hover:border-b4 hover:text-dark'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[.7rem] px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-pale text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ══ TESTIMONIALS GRID ══ */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20"
          >
            <AnimatePresence>
              {filteredTestimonials.map((t) => {
                const isExpanded = expandedId === t.id;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease }}
                    key={t.id}
                    className="group bg-white rounded-2xl border border-border p-7 shadow-xs hover:shadow-xl hover:border-b4/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Header: Rating & Tag */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <StarRating rating={t.rating} />
                        <span className="px-2.5 py-0.5 rounded-full bg-pale border border-[rgba(45,43,107,.1)] text-[.68rem] font-bold text-b4 uppercase tracking-wider">
                          {t.category === 'Custom Software & ERP'
                            ? 'Software / ERP'
                            : 'Website Dev'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-extrabold text-[1.15rem] leading-[1.3] text-dark mb-3">
                        {t.title}
                      </h3>

                      {/* Quote */}
                      <p
                        className={`text-[.92rem] leading-[1.76] text-body mb-5 ${
                          !isExpanded && t.q.length > 170 ? 'line-clamp-4' : ''
                        }`}
                      >
                        "{t.q}"
                      </p>

                      {t.q.length > 170 && (
                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : t.id)
                          }
                          className="text-[.78rem] font-bold text-b4 hover:text-dark underline cursor-pointer mb-5 inline-block"
                        >
                          {isExpanded ? 'Show less' : 'Read full quote'}
                        </button>
                      )}

                      {/* Delivered Scope Tag */}
                      <div className="p-3 rounded-xl bg-pale/50 border border-border/80 text-[.78rem] leading-relaxed mb-6">
                        <div className="text-muted font-medium">
                          <strong className="text-dark">Delivered:</strong>{' '}
                          {t.deliveredProject}
                        </div>
                        <div className="text-[#059669] font-medium mt-1">
                          <strong>Outcome:</strong> {t.verifiedOutcome}
                        </div>
                      </div>
                    </div>

                    {/* Author Footer */}
                    <div className="pt-4 border-t border-border/70 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-pale2 border border-border flex items-center justify-center font-heading text-[.82rem] font-bold text-b3">
                          {t.init}
                        </div>
                        <div>
                          <div className="font-heading font-bold text-[.88rem] text-dark flex items-center gap-1.5 leading-snug">
                            <span>{t.name}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          </div>
                          <div className="text-[.74rem] text-muted leading-tight">
                            {t.role} · {t.company}
                          </div>
                        </div>
                      </div>

                      {t.projectLink && (
                        <a
                          href={t.projectLink}
                          target={
                            t.projectLink.startsWith('http')
                              ? '_blank'
                              : '_self'
                          }
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-dark hover:border-b4 transition-colors"
                          title="View Project"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ══ THE FLOWOID DELIVERY GUARANTEE (TRUST SECTION) ══ */}
          <div className="mt-14 p-8 sm:p-12 rounded-3xl bg-white border border-border shadow-xs">
            <div className="text-center max-w-[620px] mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-[.7rem] font-bold text-gold tracking-widest uppercase mb-2">
                <HeartHandshake size={14} />
                <span>HOW WE PROTECT YOUR BUSINESS</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-dark leading-tight mb-3">
                The 3 Guarantees Behind Every 5-Star Review
              </h3>
              <p className="text-[.94rem] text-body leading-relaxed">
                We believe trust is earned through clear accountability,
                uncompromised engineering, and transparent pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-pale/50 border border-border">
                <div className="w-10 h-10 rounded-xl bg-gm text-gold flex items-center justify-center mb-4">
                  <Users size={18} />
                </div>
                <h4 className="font-heading font-bold text-dark text-lg mb-2">
                  No Junior Outsourcing
                </h4>
                <p className="text-[.88rem] text-body leading-relaxed">
                  Your project is never handed off to an untrained intern or
                  subcontracted to third parties. You collaborate directly with
                  senior engineers who write your code.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-pale/50 border border-border">
                <div className="w-10 h-10 rounded-xl bg-gm text-gold flex items-center justify-center mb-4">
                  <Layers size={18} />
                </div>
                <h4 className="font-heading font-bold text-dark text-lg mb-2">
                  Fortnightly Working Demos
                </h4>
                <p className="text-[.88rem] text-body leading-relaxed">
                  You test working software on real staging environments every
                  10–14 days. You witness measurable progress without waiting
                  months for a grand reveal.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-pale/50 border border-border">
                <div className="w-10 h-10 rounded-xl bg-gm text-gold flex items-center justify-center mb-4">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-heading font-bold text-dark text-lg mb-2">
                  100% Asset Ownership
                </h4>
                <p className="text-[.88rem] text-body leading-relaxed">
                  Upon final payment, you receive 100% intellectual property
                  rights, full Git repository source code, raw database
                  schemas, and server credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ══ CLOSING ROADMAP CTA ══ */}
      <div className="bg-page px-[5%] py-28 md:py-32 border-t border-border/40">
        <motion.div
          className="max-w-[1240px] mx-auto bg-gm rounded-[32px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 640,
              height: 640,
              top: -220,
              right: -160,
              background:
                'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',
              filter: 'blur(24px)',
            }}
          />

          <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
            FIRST STEP
          </div>
          <h2 className="relative z-[2] font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold text-white leading-[1.14] tracking-[-0.025em] mb-4 max-w-[780px] mx-auto">
            Get a free 20-minute technical roadmap. No Commitment-Just discovery, no invoice.
          </h2>
          <p className="relative z-[2] text-white/75 text-[1.02rem] leading-[1.78] max-w-[620px] mx-auto mb-9">
            Bring us your current website, spreadsheet dilemma, or new software
            vision. We will review what technology fits best, give you a
            realistic timeline, and outline an honest budget estimate.
          </p>

          <div className="relative z-[2] flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="btn-cta-gold rounded-full min-h-[50px] px-8 py-3.5 group"
            >
              <span>Start Your Project</span>
              <ArrowRight size={17} strokeWidth={2.4} className="btn-arrow" />
            </Link>
            <a
              href="tel:+919924855931"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-full text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55"
            >
              <Phone size={15} className="text-gold" />
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
