import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  Code2, Bot, Globe, Smartphone, Cloud,
  Lightbulb, Trophy, Layers, Sparkles,
  CloudCog, Monitor, Server, Database, GitBranch, Cpu,
  type LucideIcon,
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease } } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease } } };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

/* ─────────────────── DATA ─────────────────── */

interface Service {
  id: string;
  Icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  offers: string[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: 'custom-software',
    Icon: Code2,
    badge: 'Custom Build',
    title: 'Custom Software Development',
    description: 'We design and develop tailor-made software solutions that fit your unique business requirements like a glove. From enterprise-grade platforms and internal tools to customer-facing SaaS products, every line of code is architected for performance, scalability, and long-term maintainability.',
    offers: [
      'Enterprise Resource Planning (ERP) systems',
      'Customer Relationship Management (CRM) platforms',
      'SaaS product development from MVP to scale',
      'Legacy system modernization & migration',
      'API design, development & third-party integrations',
      'Microservices architecture & distributed systems',
    ],
    benefits: [
      'Perfectly aligned with your workflows — no compromises',
      'Scalable architecture that grows with your business',
      'Full ownership of source code & intellectual property',
      'Reduced operational costs through automation',
      'Faster time-to-market with agile delivery',
      'Ongoing support & iterative improvements',
    ],
  },
  {
    id: 'ai-chatbot',
    Icon: Bot,
    badge: 'AI / ML',
    title: 'Custom AI Chatbot Development',
    description: 'Supercharge your customer engagement with intelligent, AI-powered chatbots that understand natural language, learn from interactions, and deliver human-like conversations 24/7. From simple FAQ bots to sophisticated LLM-powered assistants, we build conversational AI that truly represents your brand.',
    offers: [
      'GPT / LLM-powered conversational assistants',
      'Multi-channel deployment (Web, WhatsApp, Slack, Telegram)',
      'Custom knowledge base & document Q&A bots',
      'Intent recognition & sentiment analysis',
      'Seamless CRM & helpdesk integrations',
      'Multilingual chatbot capabilities',
    ],
    benefits: [
      '24/7 instant customer support — zero wait times',
      'Up to 70% reduction in support ticket volume',
      'Consistent, on-brand responses every time',
      'Actionable analytics on customer conversations',
      'Scalable to millions of concurrent conversations',
      'Continuous learning & accuracy improvement',
    ],
  },
  {
    id: 'web-apps',
    Icon: Globe,
    badge: 'Full Stack',
    title: 'Web Applications',
    description: 'We craft high-performance, responsive web applications that deliver exceptional user experiences across every device and browser. Whether you need a real-time dashboard, a complex marketplace, or a data-heavy enterprise portal, our full-stack team brings your vision to life with pixel-perfect precision.',
    offers: [
      'Progressive Web Apps (PWAs) for native-like experience',
      'Real-time dashboards & data visualization platforms',
      'E-commerce & marketplace development',
      'Admin panels & content management systems',
      'Single Page Applications (SPAs) with React / Next.js',
      'Server-side rendering (SSR) & static site generation',
    ],
    benefits: [
      'Lightning-fast load times & optimized performance',
      'Responsive design — flawless on mobile, tablet & desktop',
      'SEO-friendly architecture for maximum visibility',
      'Secure authentication & role-based access control',
      'Scalable infrastructure for traffic spikes',
      'Cross-browser compatibility guaranteed',
    ],
  },
  {
    id: 'mobile-apps',
    Icon: Smartphone,
    badge: 'iOS & Android',
    title: 'Mobile Applications',
    description: 'From concept to App Store launch, we build beautiful, high-performance mobile applications for iOS and Android that users love. Whether native or cross-platform, our mobile apps are designed for speed, reliability, and an intuitive user experience that keeps people coming back.',
    offers: [
      'Native iOS development (Swift / SwiftUI)',
      'Native Android development (Kotlin / Jetpack Compose)',
      'Cross-platform apps with React Native & Flutter',
      'Offline-first architecture & data sync',
      'Push notifications & in-app messaging',
      'App Store optimization & launch support',
    ],
    benefits: [
      'Reach users on their preferred platform',
      'Smooth 60fps animations & native-feel UX',
      'Offline functionality for uninterrupted access',
      'Secure payment gateways & biometric auth',
      'Analytics-driven iteration for user retention',
      'Continuous updates & feature enhancements',
    ],
  },
  {
    id: 'cloud-solutions',
    Icon: Cloud,
    badge: 'Enterprise Cloud',
    title: 'Cloud Solutions',
    description: 'Unlock the full potential of the cloud with end-to-end solutions spanning architecture, migration, optimization, and managed services. We help you leverage AWS, Azure, and GCP to build resilient, cost-efficient infrastructure that powers your applications at any scale.',
    offers: [
      'Cloud architecture design & consulting',
      'Seamless cloud migration (lift-and-shift, re-architecting)',
      'Multi-cloud & hybrid cloud strategies',
      'Serverless computing & event-driven architectures',
      'DevOps, CI/CD pipelines & Infrastructure as Code (IaC)',
      'Cloud cost optimization & FinOps advisory',
    ],
    benefits: [
      '99.99% uptime with fault-tolerant architectures',
      'Significant reduction in infrastructure costs',
      'Auto-scaling for unpredictable workloads',
      'Enhanced security with cloud-native tools',
      'Faster deployments with automated pipelines',
      '24/7 monitoring & incident response',
    ],
  },
];

const process = [
  { n: '01', t: 'Discovery & Strategy', d: 'Deep-dive into your goals, tech requirements, and market to build a bulletproof blueprint.' },
  { n: '02', t: 'Architecture & Design', d: 'Scalable system design and polished UI/UX prototypes reviewed and approved by you.' },
  { n: '03', t: 'Agile Development', d: '2-week sprints with live demos. See real progress every fortnight, course-correct early.' },
  { n: '04', t: 'Launch & Support', d: 'Rigorous QA, seamless deployment, and 24/7 ongoing support to keep you running flawlessly.' },
];

interface TechCat {
  Icon: LucideIcon;
  label: string;
  chips: string[];
}

const techCats: TechCat[] = [
  { Icon: CloudCog, label: 'Cloud Platforms', chips: ['AWS', 'Microsoft Azure', 'Google Cloud', 'DigitalOcean'] },
  { Icon: Monitor, label: 'Frontend', chips: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
  { Icon: Server, label: 'Backend', chips: ['Node.js', 'Python', 'Go', 'Java Spring', '.NET Core'] },
  { Icon: Database, label: 'Databases', chips: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake', 'Elasticsearch'] },
  { Icon: GitBranch, label: 'DevOps', chips: ['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'GitHub Actions'] },
  { Icon: Cpu, label: 'AI / ML', chips: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Apache Spark'] },
];

// const pricing = [
//   { plan: 'Starter', price: '$4,999', sub: 'Best for MVPs & small business apps', feats: ['Up to 5 core features', 'Responsive web app', 'Basic cloud deployment', '30-day post-launch support'], noFeats: ['Custom integrations', 'Dedicated project manager'], btn: 'out', label: 'Get Started' },
//   { plan: 'Growth', price: '$14,999', sub: 'Best for scaling businesses', feats: ['Unlimited features & modules', 'Mobile app (iOS + Android)', 'Advanced cloud architecture', 'Custom API integrations', 'Dedicated project manager', '90-day post-launch support'], noFeats: [], btn: 'in', label: 'Get Started', pop: true },
//   { plan: 'Enterprise', price: 'Custom', sub: 'For large-scale enterprise projects', feats: ['Full digital transformation', 'Multi-platform delivery', 'Dedicated engineering team', 'Security & compliance', 'SLA-backed 24/7 support', 'Ongoing retainer available'], noFeats: [], btn: 'out', label: 'Talk to Sales' },
// ];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Project timelines depend on complexity. An MVP typically takes 6–10 weeks. Mid-scale platforms take 3–5 months. Enterprise-grade systems can take 6–12 months. We provide a detailed timeline after the discovery phase.' },
  { q: 'Do you work with existing codebases?', a: 'Absolutely. We frequently inherit legacy projects for modernization, refactoring, or expansion. Our team conducts a thorough technical audit before beginning any work on an existing codebase.' },
  { q: 'What happens after launch?', a: 'Every project includes a post-launch support window. We offer ongoing retainer plans for maintenance, performance monitoring, feature development, and 24/7 emergency support.' },
  { q: "Can you sign an NDA before we discuss our project?", a: "Yes, always. We sign NDAs before any project discussion begins. Confidentiality is standard practice at TechSphere and built into every client relationship from day one." },
];

/* ─────────────── PAGE HERO ─────────────── */

function PageHero() {
  const heroHighlights: { Icon: LucideIcon; title: string; sub: string }[] = [
    { Icon: Code2, title: 'Custom Software', sub: 'Tailored solutions for your business' },
    { Icon: Bot, title: 'AI Chatbots', sub: 'Intelligent 24/7 conversations' },
    { Icon: Globe, title: 'Web Applications', sub: 'Blazing-fast & responsive' },
    { Icon: Smartphone, title: 'Mobile Apps', sub: 'iOS & Android native feel' },
    { Icon: Cloud, title: 'Cloud Solutions', sub: 'Scalable & cost-efficient' },
  ];

  return (
    <div
      className="relative min-h-[52vh] flex items-center px-[5%] pt-3 md:pt-12 pb-16 mt-[80px] md:mt-[86px] overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(201,168,76,.04),transparent 60%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
      <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none animate-pulse3" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)', filter: 'blur(55px)' }} />
      <div className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)', filter: 'blur(45px)' }} />
      <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none animate-spinSlow" style={{ width: 700, height: 700, right: -220, top: -220 }} />
      <div className="absolute rounded-full border border-[rgba(201,168,76,.04)] pointer-events-none" style={{ width: 480, height: 480, right: -120, top: -120 }} />

      <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={container}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5">
              Home <span className="opacity-40">/</span> <span className="text-gold">Services</span>
            </motion.div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-b4 shadow-[0_0_8px_rgba(72,69,168,.5)]" />
              What We Offer
            </motion.div>
            <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-5">
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden:{ y:'110%',opacity:0 }, visible:{ y:'0%',opacity:1,transition:{ duration:.85,ease } } }}>End-to-End IT Solutions</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden:{ y:'110%',opacity:0 }, visible:{ y:'0%',opacity:1,transition:{ duration:.85,ease,delay:.08 } } }}>Built for <span className="grad-text">Scale &amp; Speed</span></motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.82] text-body max-w-[520px] mb-4">
              From custom software and AI chatbots to cloud solutions and mobile apps — every service is crafted to solve your real business problems.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[.9rem] leading-[1.75] text-muted max-w-[500px] mb-8">
              We combine deep technical expertise with thoughtful design to deliver scalable, production-ready solutions that drive measurable business outcomes.
            </motion.p>
            <motion.div variants={container} className="flex flex-wrap gap-4">
              {[
                { Icon: Layers, n: '5+', l: 'Projects Delivered' },
                { Icon: Sparkles, n: '100%', l: 'Client Satisfaction' },
                { Icon: Lightbulb, n: '24/7', l: 'Support' },
              ].map(({ Icon, n, l }, i) => (
                <motion.div key={i} variants={scaleIn} whileHover={{ y: -4, scale: 1.03, transition:{ duration:0.2 } }} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-border shadow-sm hover:shadow-lg hover:border-b4 cursor-pointer transition-[border,box-shadow] duration-200">
                  <Icon size={16} className="text-b4" />
                  <span className="font-heading text-[1.15rem] font-black text-dark">{n}</span>
                  <span className="text-[.8rem] text-muted font-semibold">{l}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — service highlight boxes */}
          <motion.div className="flex flex-col gap-4 min-w-[260px]" initial="hidden" animate="visible" variants={container} style={{ transition: 'none' }}>
            {heroHighlights.map(({ Icon, title, sub }, i) => (
              <motion.div
                key={i}
                variants={{ hidden:{ opacity:0, x:40 }, visible:{ opacity:1, x:0, transition:{ duration:0.65,ease,delay: 0.2 + i*0.08 } } }}
                whileHover={{ x: -4, transition:{ duration:0.2 } }}
                className="group flex items-center gap-3 p-4 bg-white/80 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:bg-white hover:border-b4 transition-[border,box-shadow,background] duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-110">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[.82rem] font-bold text-dark">{title}</div>
                  <div className="text-[.73rem] text-muted">{sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ────────── INDIVIDUAL SERVICE SECTION ────────── */

function ServiceSection({ service, index, isReversed }: { service: Service; index: number; isReversed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id={service.id} className={`py-24 px-[5%] scroll-mt-[160px] ${index % 2 === 0 ? 'bg-white' : 'bg-page'}`}>
      <div ref={ref} className="max-w-[1240px] mx-auto">
        <motion.div className="sr text-center mb-16" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={container}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-5">
            <span className="w-[7px] h-[7px] rounded-full bg-b4 shadow-[0_0_8px_rgba(72,69,168,.5)]" />{service.badge}
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark mb-5">
            {service.title.split(' ').slice(0, -1).join(' ')}{' '}
            <em className="not-italic grad-text">{service.title.split(' ').slice(-1)}</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[1.02rem] leading-[1.82] text-body max-w-[720px] mx-auto">{service.description}</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className={`group relative overflow-hidden rounded-[22px] border-[1.5px] border-border bg-white p-[34px] transition-all duration-300 hover:shadow-lg hover:border-[rgba(45,43,107,.12)] hover:-translate-y-1 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
            initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeLeft}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gm rounded-t-[22px]" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[48px] h-[48px] rounded-[13px] bg-pale border-[1.5px] border-border flex items-center justify-center transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:scale-110 group-hover:-rotate-[5deg]">
                <Lightbulb size={22} className="text-b4 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-[1.15rem] font-extrabold text-dark">What We Offer</h3>
            </div>
            <ul className="list-none flex flex-col gap-[12px]">
              {service.offers.map((item, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.3 + j * 0.07 }}
                  className="flex items-start gap-3 text-[.88rem] text-body leading-[1.65]"
                >
                  <span className="w-[22px] h-[22px] min-w-[22px] rounded-full bg-pale text-b4 flex items-center justify-center text-[.65rem] font-black mt-[2px]">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={`group relative overflow-hidden rounded-[22px] bg-gm p-[34px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
            initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeRight}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gg rounded-t-[22px]" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[48px] h-[48px] rounded-[13px] bg-white/15 border-[1.5px] border-white/20 flex items-center justify-center">
                <Trophy size={22} className="text-gold2" />
              </div>
              <h3 className="font-heading text-[1.15rem] font-extrabold text-white">Key Benefits</h3>
            </div>
            <ul className="list-none flex flex-col gap-[12px]">
              {service.benefits.map((item, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.3 + j * 0.07 }}
                  className="flex items-start gap-3 text-[.88rem] text-white/85 leading-[1.65]"
                >
                  <span className="w-[22px] h-[22px] min-w-[22px] rounded-full bg-white/15 text-gold2 flex items-center justify-center text-[.65rem] font-black mt-[2px]">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-[6px] mt-7 text-[.84rem] font-bold text-white/90 transition-[gap] duration-200 hover:gap-3">
              Get Started →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── SERVICE NAV (quick links) ─────────── */

function ServiceNav({ activeId, isVisible }: { activeId: string | null; isVisible: boolean }) {
  return (
    <section
      className={`bg-white border-b border-border sticky top-[106px] z-[40] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
    >
      <div className="max-w-[1240px] mx-auto px-[5%] py-0">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
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
                className={`flex items-center gap-[6px] px-4 py-4 text-[.8rem] font-semibold whitespace-nowrap border-b-[2.5px] transition-all duration-200 ${activeId === s.id
                  ? 'border-b4 text-b4'
                  : 'border-transparent text-muted hover:text-dark hover:border-border'
                  }`}
              >
                <NavIcon size={16} />
                {s.title.length > 20 ? s.title.split(' ').slice(0, 2).join(' ') : s.title}
              </a>
            );
          })}
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
      // Determine active service
      const offset = 200;
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

      // Show/hide the sticky service nav based on whether we're within the services wrapper
      if (servicesWrapperRef.current) {
        const wrapper = servicesWrapperRef.current;
        const wrapperTop = wrapper.offsetTop;
        const wrapperBottom = wrapperTop + wrapper.offsetHeight;
        const navHeight = 160; // Navbar + ServiceNav height
        const currentScroll = window.scrollY + navHeight;

        setNavVisible(currentScroll >= wrapperTop && currentScroll <= wrapperBottom);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <PageHero />
      <ServiceNav activeId={activeServiceId} isVisible={navVisible} />

      {/* SERVICE SECTIONS — wrapped so we can detect when user scrolls past them */}
      <div ref={servicesWrapperRef}>
        {services.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} isReversed={i % 2 !== 0} />
        ))}
      </div>

      {/* PROCESS */}
      <section className="bg-page py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={container}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">How We Work</motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark mb-4">Our <em className="not-italic grad-text">Proven</em> 4-Step Delivery Process</motion.h2>
            <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">Transparent, structured, and designed to keep you informed at every stage — zero surprises at launch.</motion.p>
          </motion.div>
          <motion.div
            className="mt-[52px] relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-0"
            initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.15 }} variants={container}
          >
            <div className="hidden lg:block absolute top-[30px] left-[12.5%] right-[12.5%] h-[2px] bg-[linear-gradient(90deg,#C9A84C,#4845A8)] z-0" />
            {process.map((p, i) => (
              <motion.div
                key={i}
                variants={{ hidden:{ opacity:0, y:40, scale:0.92 }, visible:{ opacity:1, y:0, scale:1, transition:{ duration:0.7, ease } } }}
                className="text-center px-[14px] relative z-[1] group"
              >
                <motion.div
                  whileHover={{ scale: 1.12, transition:{ duration:0.25, ease:[0.34,1.56,0.64,1] } }}
                  className="w-[60px] h-[60px] rounded-full bg-white border-2 border-[rgba(45,43,107,.12)] flex items-center justify-center font-heading text-[1.1rem] font-black text-b4 mx-auto mb-5 shadow-sm transition-all duration-300 group-hover:bg-gm group-hover:text-white group-hover:border-transparent group-hover:shadow-brand"
                >{p.n}</motion.div>
                <div className="font-heading text-[.94rem] font-bold text-dark mb-[7px]">{p.t}</div>
                <div className="text-[.79rem] text-muted leading-[1.6]">{p.d}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-white py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div className="text-center mb-[50px]" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={container}>
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Technology Stack</motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">The <em className="not-italic grad-text">Tools &amp; Technologies</em> We Master</motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]"
            initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.1 }} variants={container}
          >
            {techCats.map((t, i) => {
              const TechIcon = t.Icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden:{ opacity:0, y:32, scale:0.95 }, visible:{ opacity:1, y:0, scale:1, transition:{ duration:0.7, ease } } }}
                  whileHover={{ y:-6, transition:{ duration:0.25, ease } }}
                  className="bg-page border-[1.5px] border-border rounded-[18px] p-[22px] transition-[border,box-shadow] duration-[280ms] hover:border-b4 hover:shadow-md"
                >
                  <div className="flex items-center gap-[10px] font-heading text-[.88rem] font-bold text-dark mb-[14px] pb-3 border-b border-border">
                    <span className="w-[28px] h-[28px] rounded-[7px] bg-pale flex items-center justify-center">
                      <TechIcon size={16} className="text-b4" />
                    </span>
                    {t.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t.chips.map((c, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity:0, scale:0.85 }}
                        whileInView={{ opacity:1, scale:1 }}
                        viewport={{ once:true }}
                        transition={{ duration:0.4, ease, delay: 0.1 + j*0.05 }}
                        whileHover={{ scale:1.06, transition:{ duration:0.2 } }}
                        className="px-[13px] py-[5px] rounded-full text-[.74rem] font-semibold text-body bg-white border-[1.5px] border-border cursor-default transition-[border,color] duration-200 hover:bg-pale hover:border-b4 hover:text-gold"
                      >{c}</motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      {/* <section className="bg-page py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[50px]">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Transparent Pricing</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">Plans for Every <em className="not-italic grad-text">Stage of Growth</em></h2>
            <p className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">No hidden fees, no surprises. Choose the engagement model that fits — or talk to us for a custom quote.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricing.map((p, i) => (
              <div key={i} className={`sr d${i + 1} relative overflow-hidden bg-white border-[1.5px] rounded-3xl p-[34px] transition-all duration-300 ${p.pop ? 'border-gold shadow-md hover:-translate-y-1 hover:shadow-lg' : 'border-border hover:-translate-y-1 hover:shadow-md hover:border-b4'}`}>
                {p.pop && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gm text-white text-[.66rem] font-bold px-5 py-1 rounded-b-[10px] whitespace-nowrap tracking-[.06em]">★ Most Popular</div>}
                <div className="text-[.7rem] font-bold tracking-[.1em] text-muted uppercase mt-5">{p.plan}</div>
                <div className="font-heading text-[2.7rem] font-black text-dark leading-none mt-[11px] mb-[5px]">{p.price}<span className="text-[.95rem] font-medium text-muted">{p.price === 'Custom' ? ' pricing' : ' /project'}</span></div>
                <div className="text-[.79rem] text-muted mb-[22px]">{p.sub}</div>
                <div className="h-px bg-border mb-[18px]" />
                <ul className="list-none flex flex-col gap-[10px] mb-7">
                  {p.feats.map((feat, j) => (
                    <li key={j} className="flex items-center gap-[10px] text-[.84rem] text-body">
                      <span className="w-5 h-5 rounded-[6px] bg-pale text-gold flex items-center justify-center text-[.64rem] font-black flex-shrink-0">✓</span>{feat}
                    </li>
                  ))}
                  {p.noFeats.map((feat, j) => (
                    <li key={j} className="flex items-center gap-[10px] text-[.84rem] text-body opacity-50">
                      <span className="w-5 h-5 rounded-[6px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center text-[.64rem] font-black flex-shrink-0">✗</span>{feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-[13px] rounded-xl text-[.89rem] font-bold transition-all duration-[280ms] ${p.btn === 'in'
                      ? 'text-white bg-gm shadow-brand hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(45,43,107,.4)]'
                      : 'text-b4 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale hover:bg-pale2 hover:border-b4'
                    }`}
                >{p.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="bg-white py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-0">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">FAQs</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">Questions We Get <em className="not-italic grad-text">All the Time</em></h2>
          </div>
          <div className="max-w-[760px] mx-auto mt-[42px]">
            {faqs.map((f, i) => (
              <div key={i} className={`sr d${i + 1} border-[1.5px] rounded-[14px] mb-3 overflow-hidden transition-all duration-[250ms] ${openFaq === i ? 'border-gold' : 'border-border'}`}>
                <div
                  className={`flex items-center justify-between px-[22px] py-[18px] cursor-pointer font-heading text-[.93rem] font-bold text-dark gap-[14px] transition-colors duration-200 select-none ${openFaq === i ? 'bg-pale' : 'bg-white'}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <div className={`w-[27px] h-[27px] flex-shrink-0 rounded-[7px] flex items-center justify-center text-[.7rem] transition-all duration-300 ${openFaq === i ? 'bg-gm text-white rotate-180' : 'bg-pale text-gold'}`}>▾</div>
                </div>
                <div className={`overflow-hidden transition-[max-height] duration-[380ms] ease-in-out ${openFaq === i ? 'max-h-[220px]' : 'max-h-0'}`}>
                  <div className="px-[22px] pb-5 text-[.87rem] leading-[1.75] text-body">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-page px-[5%] py-20">
        <div className="sr max-w-[1240px] mx-auto bg-gm rounded-[28px] px-[60px] py-[72px] text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute pointer-events-none rounded-full" style={{ width: 640, height: 640, top: -220, right: -160, background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(24px)' }} />
          <h2 className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">Let's Build Your Next Big Thing</h2>
          <p className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">Get a free consultation and project estimate. No commitment — just absolute clarity on what's possible.</p>
          <div className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-white bg-mg shadow-[0_10px_30px_rgba(20,16,58,.32)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(20,16,58,.44)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">Book Free Consultation →</Link>
            <Link to="/projects" className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">See Our Work</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
