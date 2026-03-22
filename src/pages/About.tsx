import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Shield, Lightbulb, TrendingUp, Handshake, Zap, Globe, Code2, Eye, Lock, Users, Rocket, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
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
    { icon: Lightbulb, title: 'Modern Stack', sub: 'Cutting-edge tech always' },
  ];

  return (
    <div
      className="relative min-h-[52vh] bg-page-dots flex items-center px-[5%] pt-3 md:pt-12 pb-16 mt-[80px] md:mt-[86px] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
      <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)', filter: 'blur(55px)' }} />
      <div className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)', filter: 'blur(45px)' }} />
      <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none animate-spinSlow" style={{ width: 700, height: 700, right: -220, top: -220 }} />
      <div className="absolute rounded-full border border-[rgba(201,168,76,.04)] pointer-events-none" style={{ width: 480, height: 480, right: -120, top: -120 }} />

      <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={container}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5">
              Home <span className="opacity-40">/</span> <span className="text-gold">About Us</span>
            </motion.div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2" />
              Our Story
            </motion.div>
            <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-5">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.85, ease } } }}
                >
                  Built on <span className="grad-text">Trust,</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.85, ease, delay: 0.08 } } }}
                >
                  Driven by Innovation
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.82] text-body max-w-[520px] mb-4">
              We're a young, sharp team of developers and designers passionate about building real software that solves real problems — with clean code, modern tools, and honest craftsmanship.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[.9rem] leading-[1.75] text-muted max-w-[500px] mb-8">
              Every project gets our full attention and best engineering — because we believe great software starts with people who care.
            </motion.p>
            <motion.div variants={container} className="flex flex-wrap gap-4">
              {[
                { n: '10+', l: 'Happy Clients' },
                { n: '100%', l: 'Satisfaction Rate' },
                { n: '24/7', l: 'Support' },
              ].map(({ n, l }, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-border shadow-sm hover:shadow-lg hover:border-b4 cursor-pointer transition-[border,box-shadow] duration-200"
                >
                  <span className="font-heading text-[1.15rem] font-black text-dark">{n}</span>
                  <span className="text-[.8rem] text-muted font-semibold">{l}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — highlight boxes */}
          <motion.div className="flex flex-col gap-4 min-w-[260px]" initial="hidden" animate="visible" variants={container} style={{ transition: 'none' }}>
            {heroHighlights.map(({ icon: Icon, title, sub }, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease, delay: 0.2 + i * 0.08 } } }}
                whileHover={{ x: -4, transition: { duration: 0.2 } }}
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

/* ─── CTA Box ─── */
function CtaBox({ h2, p, links }: { h2: string; p: string; links: { label: string; to: string; primary: boolean }[] }) {
  const { ref, inView } = useSectionRef();
  return (
    <div className="bg-page px-[5%] py-20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={scaleIn}
        className="max-w-[1240px] mx-auto bg-gm rounded-[28px] px-[60px] py-[72px] text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute pointer-events-none rounded-full" style={{ width: 640, height: 640, top: -220, right: -160, background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(24px)' }} />
        <div className="absolute inset-0 pointer-events-none w-[420px] h-[420px] rounded-full bg-white/4" style={{ filter: 'blur(70px)', top: -150, left: -120 } as React.CSSProperties} />
        <motion.h2 variants={fadeUp} className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">{h2}</motion.h2>
        <motion.p variants={fadeUp} className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">{p}</motion.p>
        <motion.div variants={container} className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
          {links.map(l => l.primary
            ? <motion.div key={l.label} variants={scaleIn}><Link to={l.to} className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-white bg-mg shadow-[0_10px_30px_rgba(20,16,58,.32)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(20,16,58,.44)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">{l.label}</Link></motion.div>
            : <motion.div key={l.label} variants={scaleIn}><Link to={l.to} className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">{l.label}</Link></motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Label / h2 helpers ─── */
function SLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg ${center ? 'justify-center' : ''}`}>{children}</div>
  );
}
function SH2({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={`font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark mb-4 ${center ? 'text-center' : ''}`}>
      {children}
    </h2>
  );
}

const values = [
  { icon: Shield,    t: 'Security First',        d: 'Every solution is built with security best practices from day one — not bolted on as an afterthought.' },
  { icon: Lightbulb, t: 'Continuous Learning', d: 'We stay current with the latest frameworks, tools, and patterns to deliver cutting-edge solutions.' },
  { icon: TrendingUp,t: 'Scalable Architecture',    d: 'We build systems designed to scale with your business, so you never outgrow your software.' },
  { icon: Handshake, t: 'True Partnership',       d: 'We embed ourselves in your vision, understanding your goals to deliver solutions that truly fit.' },
  { icon: Zap,       t: 'Speed & Quality',        d: 'Agile at our core — we ship fast without cutting corners on the quality that defines our work.' },
  { icon: Globe,     t: 'Remote-Ready',         d: 'We work seamlessly with clients anywhere — clear communication, async updates, and on-time delivery.' },
];


export default function About() {
  useScrollReveal();

  /* ── Section refs ── */
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.1 });

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

      {/* ── STORY ── */}
      <section className="bg-white py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div ref={storyRef} className="max-w-[900px] mx-auto">
            {/* Text */}
            <motion.div
              initial="hidden"
              animate={storyInView ? 'visible' : 'hidden'}
              variants={container}
            >
              <motion.div variants={fadeUp}><SLabel>Who We Are</SLabel></motion.div>
              <motion.div variants={fadeUp}><SH2>A Team of <em className="not-italic grad-text">Passionate</em> Problem Solvers</SH2></motion.div>
              <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted mb-[14px]">Flowoid was born out of a simple belief: great software doesn't need a massive corporation behind it — it needs passionate developers who care deeply about craft. We're a small, focused team that punches well above its weight.</motion.p>
              <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted mb-7">We don't just write code — we think through your problem, design the right architecture, and build solutions that actually work in the real world. Every project gets our full attention and best engineering.</motion.p>
              <motion.div variants={container} className="grid grid-cols-2 gap-[13px]">
                {[
                  { icon: Code2, t: 'Mission-Focused', d: 'Every project aligns with your core business objectives' },
                  { icon: Eye,   t: 'Research-Driven',  d: 'We study the problem deeply before we start building' },
                  { icon: Users, t: 'Long-Term Partner', d: 'Our clients come back because we deliver results' },
                  { icon: Rocket,t: 'Agile Delivery',   d: 'Regular updates, fast iterations, no surprises' },
                ].map((v, i) => {
                  const IconComponent = v.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={{ hidden: { opacity: 0, y: 20, scale: 0.94 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } } }}
                      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.25 } }}
                      className="group bg-white rounded-[16px] border border-border p-5 shadow-sm hover:shadow-lg hover:border-b4 transition-[border,box-shadow] duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 mb-[12px] transition-all duration-200 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-110">
                        <IconComponent size={18} strokeWidth={1.8} />
                      </div>
                      <div className="font-heading text-[.9rem] font-bold text-dark mb-[3px]">{v.t}</div>
                      <div className="text-[.78rem] text-muted leading-[1.55]">{v.d}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="bg-page py-24 px-[5%]">
        <div ref={approachRef} className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={approachInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <motion.div variants={fadeUp}><SLabel center>Our Approach</SLabel></motion.div>
            <motion.div variants={fadeUp}><SH2 center>How We <em className="not-italic grad-text">Work</em> With You</SH2></motion.div>
            <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">
              We follow a proven methodology that combines deep technical expertise with strategic thinking to deliver solutions that truly move the needle.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={approachInView ? 'visible' : 'hidden'}
            variants={container}
          >
            {[
              { num: '01', icon: Eye,      title: 'Understand',       desc: 'We deep-dive into your business, challenges, and goals to build a complete understanding before writing a single line of code.' },
              { num: '02', icon: Lightbulb,title: 'Strategize',        desc: 'Our architects design scalable solutions tailored to your needs, considering security, performance, and future growth.' },
              { num: '03', icon: Code2,    title: 'Build',             desc: 'Agile development with regular sprints, continuous integration, and quality assurance at every step.' },
              { num: '04', icon: Rocket,   title: 'Launch & Support',  desc: 'Seamless deployment, training, and 24/7 support to ensure your solution succeeds from day one.' },
            ].map((step, i) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 40, scale: 0.94 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } } }}
                  className="group relative"
                >
                  <div className="bg-white border-[1.5px] border-border rounded-[18px] p-6 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-b4">
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gg flex items-center justify-center text-white font-heading font-bold text-[.9rem] shadow-lg">
                      {step.num}
                    </div>
                    <div className="w-12 h-12 rounded-[10px] bg-pale border-[1.5px] border-border flex items-center justify-center text-b4 mb-4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white">
                      <IconComponent size={20} strokeWidth={1.8} />
                    </div>
                    <h3 className="font-heading text-[1rem] font-bold text-dark mb-2">{step.title}</h3>
                    <p className="text-[.85rem] text-muted leading-[1.6]">{step.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 translate-y-1/2 text-border">
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
      <section className="bg-white py-24 px-[5%]">
        <div ref={valuesRef} className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <motion.div variants={fadeUp}><SLabel center>Core Values</SLabel></motion.div>
            <motion.div variants={fadeUp}><SH2 center>Principles That <em className="not-italic grad-text">Guide</em> Everything We Do</SH2></motion.div>
            <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">These aren't words on a wall — they're the foundation of every decision, every line of code, and every client relationship.</motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px] mt-[50px]"
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            variants={container}
          >
            {values.map((v, i) => {
              const IconComponent = v.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 32, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } } }}
                  className="group relative overflow-hidden bg-page border-[1.5px] border-border rounded-[20px] p-[30px] transition-all duration-300 hover:-translate-y-[7px] hover:shadow-md hover:border-[rgba(45,43,107,.12)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gg before:scale-x-0 before:origin-left before:transition-transform before:duration-[350ms] hover:before:scale-x-100"
                >
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-pale border-[1.5px] border-border flex items-center justify-center text-b4 mb-[17px] transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-110 group-hover:-rotate-[5deg]">
                    <IconComponent size={24} strokeWidth={1.8} />
                  </div>
                  <div className="font-heading text-[1rem] font-bold text-dark mb-[9px]">{v.t}</div>
                  <div className="text-[.87rem] text-body leading-[1.7]">{v.d}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST & PRIVACY ── */}
      <section className="bg-page py-24 px-[5%]">
        <div ref={trustRef} className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={trustInView ? 'visible' : 'hidden'}
              variants={container}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.7, rotate: -8 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] } } }}
                className="w-20 h-20 rounded-2xl bg-gm flex items-center justify-center text-white mb-8 shadow-lg"
              >
                <Lock size={40} strokeWidth={1.5} />
              </motion.div>
              <motion.div variants={fadeUp}><SLabel>Your Trust, Our Priority</SLabel></motion.div>
              <motion.div variants={fadeUp}><SH2>Your Ideas Are <em className="not-italic grad-text">Safe</em> With Us</SH2></motion.div>
              <motion.p variants={fadeUp} className="text-[1rem] leading-[1.82] text-body mb-6">
                We treat every project with complete confidentiality and professionalism. Your intellectual property, business strategy, and sensitive data are protected with enterprise-grade security and our ironclad confidentiality agreements.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[.95rem] leading-[1.75] text-muted mb-8">
                Working with Flowoid means partnering with a team that respects your vision, safeguards your information, and delivers results with integrity.
              </motion.p>
              <motion.div variants={container} className="space-y-3">
                {['NDA & Confidentiality Agreements', 'Secure Code & Data Handling', 'Transparent Communication', 'GDPR-Aware Practices'].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                    <CheckCircle size={18} strokeWidth={2} className="text-gold flex-shrink-0" />
                    <span className="text-[.9rem] font-medium text-dark">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={trustInView ? 'visible' : 'hidden'}
              variants={container}
              className="space-y-5"
            >
              {[
                { icon: Shield,       title: 'Complete Confidentiality', desc: 'Every project is under strict NDA. Your ideas, code, and strategy remain yours and yours alone.' },
                { icon: Lock,        title: 'Data Security',            desc: 'Multi-layer encryption, secure servers, and compliance with GDPR, HIPAA, and industry standards.' },
                { icon: Users,       title: 'Professional Integrity',   desc: 'Our team is vetted, trained, and committed to ethical practices. Your trust is everything to us.' },
                { icon: CheckCircle, title: 'Honest Track Record',      desc: 'Every client we\'ve worked with trusts us with their most important projects. That says it all.' },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }}
                    className="group bg-white border-[1.5px] border-border rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-b4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-[10px] bg-pale border-[1.5px] border-border flex items-center justify-center text-b4 flex-shrink-0 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-110">
                        <IconComponent size={20} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-[.95rem] font-bold text-dark mb-1">{item.title}</h3>
                        <p className="text-[.82rem] text-muted leading-[1.6]">{item.desc}</p>
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
        h2="Ready to Build Something Great Together?"
        p="We'd love to hear about your project. Let's have an honest conversation about what you need and how we can help."
        links={[{ label: 'Start Your Project →', to: '/contact', primary: true }, { label: 'Explore Our Services', to: '/services', primary: false }]}
      />

      <Footer />
      <BackToTop />
    </>
  );
}
