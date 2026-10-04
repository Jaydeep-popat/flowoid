import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Shield, Lightbulb, Handshake, Zap, Globe, Code2, Eye, Lock, Users, Rocket, CheckCircle, ArrowRight, Smartphone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import AboutSection from '../components/AboutSection';
import useScrollReveal from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease } },
};
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ─── Shared visible viewport hook ─── */
function useSectionRef() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return { ref, inView };
}

/* ─── HERO ─────────────────────────── */
function PageHero() {
  const heroHighlights = [
    { icon: Shield, title: 'Security First', sub: 'Built-in from day one' },
    { icon: Zap, title: 'Agile Delivery', sub: 'Fast sprints, no surprises' },
    { icon: Users, title: 'Long-Term Partner', sub: 'We grow with you' },
    { icon: Lightbulb, title: 'Modern Stack', sub: 'Dependable, modern tech' },
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
              <Link to="/" className="text-muted no-underline">Home</Link> <span className="opacity-40">/</span> <span className="text-gold">About Us</span>
            </motion.div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)]" />
              Software Studio · Rajkot, Gujarat
            </motion.div>
            <h1 className="font-heading font-black text-[clamp(2.15rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease } } }}
                >
                  Reliable software &
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease, delay: 0.08 } } }}
                >
                  web apps for <span className="grad-text">growing businesses.</span>
                </motion.span>
              </span>
            </h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: 0.16 } } }}
              className="text-[1.02rem] leading-[1.78] text-body max-w-[540px] mb-7"
            >
              Flowoid is an independent team of developers in Rajkot. We take ideas trapped in spreadsheets, paper forms, or outdated tools and turn them into fast, custom software your team will actually enjoy using.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: 0.22 } } }}
              className="flex items-center gap-3.5 flex-wrap mb-8"
            >
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
            {heroHighlights.map(({ icon: Icon, title, sub }, i) => (
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

/* ─── CTA Box ─── */
function CtaBox({ h2, p, links, note }: { h2: string; p: string; links: { label: string; to: string; primary: boolean }[]; note?: string }) {
  const { ref, inView } = useSectionRef();
  return (
    <div className="bg-page px-[5%] py-28 md:py-32 border-t border-border/40">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={scaleIn}
        className="max-w-[1240px] mx-auto bg-gm rounded-[32px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute pointer-events-none rounded-full" style={{ width: 640, height: 640, top: -220, right: -160, background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(24px)' }} />
        <div className="absolute inset-0 pointer-events-none w-[420px] h-[420px] rounded-full bg-white/4" style={{ filter: 'blur(70px)', top: -150, left: -120 } as React.CSSProperties} />
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">FIRST STEP</motion.div>
        <motion.h2 variants={fadeUp} className="relative z-[2] font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold text-white leading-[1.14] tracking-[-0.025em] mb-4 max-w-[780px] mx-auto">{h2}</motion.h2>
        <motion.p variants={fadeUp} className="relative z-[2] text-white/75 text-[1.02rem] leading-[1.78] max-w-[620px] mx-auto mb-9">{p}</motion.p>
        <motion.div variants={container} className="relative z-[2] flex items-center justify-center gap-4 flex-wrap">
          {links.map(l => {
            const isExternal = l.to.startsWith('tel:') || l.to.startsWith('mailto:') || l.to.startsWith('http');
            const Tag = isExternal ? 'a' : Link;
            const linkProps = isExternal ? { href: l.to } : { to: l.to };
            return l.primary ? (
              <motion.div key={l.label} variants={scaleIn}>
                <Tag {...(linkProps as any)} className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full text-[.92rem] font-bold text-white bg-mg shadow-[0_10px_30px_rgba(20,16,58,.36)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,16,58,.48)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">{l.label}</Tag>
              </motion.div>
            ) : (
              <motion.div key={l.label} variants={scaleIn}>
                <Tag {...(linkProps as any)} className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-full text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">{l.label}</Tag>
              </motion.div>
            );
          })}
        </motion.div>
        {note && (
          <motion.div variants={fadeUp} className="relative z-[2] mt-7 flex flex-wrap items-center justify-center gap-3 text-[.82rem] text-white/60 font-medium">
            <span>✓ Zero sales pressure</span>
            <span>·</span>
            <span>✓ Direct discussion with a senior engineer</span>
            <span>·</span>
            <span>✓ Technical roadmap is yours to keep</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

/* ─── Label / h2 helpers ─── */
function SLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg ${center ? 'justify-center' : ''}`}>{children}</div>
  );
}
function SH2({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={`font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4 ${center ? 'text-center' : ''}`}>
      {children}
    </h2>
  );
}

const values = [
  { icon: Globe,     t: 'Plain Gujarati & English',       d: 'If we cannot explain a technical choice in simple terms, we do not understand it well enough ourselves.' },
  { icon: Zap,       t: 'Fast pages over flashy gimmicks', d: 'Your customers will not wait for slow screens. We build systems that load fast, even on spotty mobile data.' },
  { icon: Lock,      t: 'Code you actually own',           d: 'You own 100% of your source code, logins, and database from day one. We never hold your project hostage.' },
  { icon: Shield,    t: 'Security is not an add-on fee',   d: 'We lock down databases, hash passwords, and test backups before launch. It comes standard on every single build.' },
  { icon: Lightbulb, t: 'Practical tools over trendy hype',d: 'We stick to dependable tools like React, Node, and PostgreSQL. They will still run without issues five years from now.' },
  { icon: Handshake, t: 'Direct honesty, even when it costs us', d: 'If an idea will waste your money, we tell you straight. We would rather lose a quick fee than your trust.' },
];

export default function About() {
  useScrollReveal();

  /* ── Section refs ── */
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });

  const approachRef = useRef<HTMLDivElement>(null);
  const approachInView = useInView(approachRef, { once: true, amount: 0.1 });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.1 });

  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true, amount: 0.1 });

  return (
    <>
      <Navbar />
      <PageHero />

      {/* ── WHO WE ARE ── */}
      <AboutSection />

      {/* ── WHAT WE BUILD (SERVICES TOUCHPOINT) ── */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div ref={servicesRef} className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={servicesInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <motion.div variants={fadeUp}><SLabel center>What We Do</SLabel></motion.div>
            <motion.div variants={fadeUp}><SH2 center>Practical software built to solve <em className="not-italic grad-text">real bottlenecks.</em></SH2></motion.div>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              We do not sell pre-made templates or over-engineered systems you will never need. We build four distinct things:
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14"
            initial="hidden"
            animate={servicesInView ? 'visible' : 'hidden'}
            variants={container}
          >
            {[
              {
                icon: Globe,
                badge: 'Operational Systems',
                solve: 'Replaces: Excel spreadsheets & WhatsApp order chains',
                title: 'Custom Web Applications & Portals',
                desc: 'Customer portals, vendor management systems, and internal operational dashboards that replace chaotic spreadsheets with clean, role-based workflows.',
              },
              {
                icon: Zap,
                badge: 'Process Automation',
                solve: 'Replaces: Manual invoice re-entry & repetitive typing',
                title: 'Business Automation & Workflow Tools',
                desc: 'Automating repetitive office tasks, WhatsApp notifications, billing pipelines, and inventory sync so your staff saves hours each day.',
              },
              {
                icon: Smartphone,
                badge: 'Field & Factory Apps',
                solve: 'Built for: Low-connectivity field operations',
                title: 'Mobile & Progressive Apps',
                desc: 'Clean Android and iOS apps designed for field agents, factory floors, or end customers that work smoothly even on spotty cellular connectivity.',
              },
              {
                icon: Code2,
                badge: 'Secure Intelligence',
                solve: 'Internal: Private company data only',
                title: 'AI Assistants & Secure Integrations',
                desc: 'Internal knowledge bots, document search tools, and secure system integrations that make your existing records immediately searchable.',
              },
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                  className="group bg-white border border-border rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-b4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-pale border border-border flex items-center justify-center text-b4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105">
                        <IconComponent size={22} strokeWidth={1.8} />
                      </div>
                      <span className="text-[.72rem] font-bold text-b3 uppercase tracking-[.08em] px-3 py-1 rounded-full bg-pale border border-border">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-heading text-[1.12rem] font-bold text-dark mb-2.5">{item.title}</h3>
                    <p className="text-[.88rem] text-muted leading-[1.68] mb-5">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-border/50 text-[.78rem] font-semibold text-gold">
                    {item.solve}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Social Proof Outcome Box */}
          <motion.div
            initial="hidden"
            animate={servicesInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="bg-white border border-gold/30 rounded-2xl p-7 sm:p-9 max-w-[940px] mx-auto shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-pale text-gold flex items-center justify-center flex-shrink-0 font-heading text-3xl font-black shadow-sm">
              “
            </div>
            
            <div className="flex-1">
              <p className="text-[1.02rem] text-dark font-medium italic leading-[1.75] mb-3">
                "Flowoid replaced our manual order spreadsheets with a clean internal portal in less than 3 weeks. Our dispatch team saves two hours every single day."
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50">
                <div className="text-[.82rem] text-muted font-medium">
                  <span className="font-bold text-dark">— Verified Client Outcome</span> · Manufacturing & Distribution, Rajkot
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-pale text-b3 text-[.72rem] font-bold">3-Week Delivery</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[.72rem] font-bold">2 hrs saved/day</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-page text-muted text-[.72rem] font-semibold">Zero lost dispatches</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="bg-white py-28 md:py-32 px-[5%] border-t border-border/40">
        <div ref={approachRef} className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={approachInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <motion.div variants={fadeUp}><SLabel center>How We Work</SLabel></motion.div>
            <motion.div variants={fadeUp}><SH2 center>No guesswork. <em className="not-italic grad-text">You see progress every single week.</em></SH2></motion.div>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              Most software projects go off track because people stop talking. We keep things open from day one. You can sit with us here in Rajkot or hop on a quick call.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={approachInView ? 'visible' : 'hidden'}
            variants={container}
          >
            {[
              { num: '01', icon: Eye,        stepTag: 'Discovery',    title: 'Understand your business', desc: 'We do not write code right away. First, we learn how your team works and where paper or spreadsheets slow you down.' },
              { num: '02', icon: Lightbulb,  stepTag: 'Blueprint',    title: 'Write down the exact plan', desc: 'You get a simple document listing every screen, feature, and fixed delivery timeline. No confusing tech talk.' },
              { num: '03', icon: Code2,      stepTag: 'Friday Demo',  title: 'Build & demo weekly',      desc: 'Every Friday afternoon, you test what we built that week on a live link. If something feels awkward to use, we fix it early.' },
              { num: '04', icon: Rocket,     stepTag: 'Warranty',     title: 'Launch together & support', desc: 'We help your staff get comfortable using the system. Includes 30 days of post-launch warranty and direct phone support.' },
            ].map((step, i) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 36, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } } }}
                  className="group relative"
                >
                  <div className="bg-page border border-border rounded-2xl p-7 sm:p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-b4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-full bg-gg flex items-center justify-center text-white font-heading font-bold text-[.85rem] shadow-md">
                          {step.num}
                        </div>
                        <span className="text-[.72rem] font-bold text-muted uppercase tracking-[.08em]">
                          {step.stepTag}
                        </span>
                      </div>
                      <div className="w-11 h-11 rounded-xl bg-white border border-border flex items-center justify-center text-b4 mb-4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white">
                        <IconComponent size={20} strokeWidth={1.8} />
                      </div>
                      <h3 className="font-heading text-[1.02rem] font-bold text-dark mb-2">{step.title}</h3>
                      <p className="text-[.86rem] text-muted leading-[1.65]">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 text-border z-10">
                      <ArrowRight size={20} strokeWidth={1.5} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div ref={valuesRef} className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <motion.div variants={fadeUp}><SLabel center>Our Standards</SLabel></motion.div>
            <motion.div variants={fadeUp}><SH2 center>How we make decisions <em className="not-italic grad-text">when you are not in the room.</em></SH2></motion.div>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              We run a small shop. Our reputation across Gujarat is the only thing that brings in new work.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={container}
          >
            {values.map((v, i) => {
              const IconComponent = v.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } } }}
                  className="group relative overflow-hidden bg-white border border-border rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-b4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gg before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-pale border border-border flex items-center justify-center text-b4 mb-5 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105">
                    <IconComponent size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-[1.02rem] font-bold text-dark mb-2.5">{v.t}</h3>
                  <p className="text-[.88rem] text-body leading-[1.65]">{v.d}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST & PRIVACY ── */}
      <section className="bg-white py-28 md:py-32 px-[5%] border-t border-border/40">
        <div ref={trustRef} className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={trustInView ? 'visible' : 'hidden'}
              variants={container}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } } }}
                className="w-16 h-16 rounded-2xl bg-gm flex items-center justify-center text-white mb-6 shadow-md"
              >
                <Lock size={32} strokeWidth={1.75} />
              </motion.div>
              <motion.div variants={fadeUp}><SLabel>Privacy & Trust</SLabel></motion.div>
              <motion.div variants={fadeUp}><SH2>Your idea stays your idea. <em className="not-italic grad-text">We sign an NDA before we start.</em></SH2></motion.div>
              <motion.p variants={fadeUp} className="text-[1.02rem] leading-[1.78] text-body max-w-[65ch] mb-4">
                Local founders often tell us they worry a developer will copy their concept or leak their sales data. We do not do that. Before you share customer numbers or internal workflows, we sign a mutual non-disclosure agreement.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[.95rem] leading-[1.72] text-muted max-w-[65ch] mb-8">
                You keep complete ownership of your code, databases, and customer records. We work out of our office right here in Rajkot, Gujarat, so you always know who has your keys.
              </motion.p>
              <motion.div variants={container} className="space-y-3.5 mb-8">
                {[
                  'Mutual non-disclosure agreement signed before kickoff',
                  'All database backups stored in your private cloud account',
                  'Direct phone line to the engineer writing your code',
                  'Clean project handover with written documentation and passwords',
                  '30-day post-launch warranty with bug fixes included',
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                    <CheckCircle size={18} strokeWidth={2.2} className="text-gold flex-shrink-0" />
                    <span className="text-[.92rem] font-medium text-dark">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
              {/* Guarantee callout */}
              <motion.div
                variants={fadeUp}
                className="p-4 rounded-xl bg-pale/70 border border-border flex items-center gap-3"
              >
                <Shield size={20} className="text-gold flex-shrink-0" />
                <span className="text-[.82rem] font-medium text-body">
                  <strong className="text-dark">100% IP & Code Guarantee:</strong> All Git repositories and production secrets are handed over to your ownership at project completion.
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={trustInView ? 'visible' : 'hidden'}
              variants={container}
              className="space-y-4 sm:space-y-5"
            >
              {[
                { icon: Shield,       title: 'Complete Code Ownership', desc: 'The code belongs entirely to you. If you bring development in-house later, the handoff is clean and painless.' },
                { icon: Lock,         title: 'Private Data Storage',    desc: 'Your customer lists and sales data stay in your account. We never share or sell client data.' },
                { icon: CheckCircle,  title: 'No Surprise Bills',       desc: 'We quote fixed scopes with clear milestone payments. You never get billed for hours you did not approve first.' },
                { icon: Users,        title: 'Local Accountability',    desc: 'We are based in Rajkot, not behind an anonymous ticket queue. You can call us and meet face to face.' },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
                    className="group bg-page border border-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-b4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-pale border border-border flex items-center justify-center text-b4 flex-shrink-0 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105">
                        <IconComponent size={20} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-[.98rem] font-bold text-dark mb-1">{item.title}</h3>
                        <p className="text-[.84rem] text-muted leading-[1.6]">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <CtaBox
        h2="Get a free 20-minute technical roadmap. No Commitment-Just discovery, no invoice."
        p="Bring us your biggest operational headache or the app idea you've been putting off. We will review your requirements, tell you what technology fits best, and give you an honest budget and timeline estimate. Even if you choose not to hire us, the breakdown is yours to keep."
        links={[
          { label: 'Book Your Free 20-Minute Audit →', to: '/contact', primary: true },
          { label: 'Call +91 99248 55931', to: 'tel:+919924855931', primary: false },
        ]}
        note="No sales jargon. You talk directly with a developer, not an account executive."
      />

      <Footer />
      <BackToTop />
    </>
  );
}
