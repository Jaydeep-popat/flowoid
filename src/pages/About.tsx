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
const fadeLeft = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
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
  return (
    <div
      className="relative min-h-[54vh] bg-white flex items-center px-[5%] pt-3 md:pt-12 pb-20 mt-[80px] md:mt-[86px] overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(201,168,76,.04),transparent 60%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
      <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)', filter: 'blur(55px)' }} />
      <div className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)', filter: 'blur(45px)' }} />
      <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none animate-spinSlow" style={{ width: 700, height: 700, right: -220, top: -220 }} />
      <div className="absolute rounded-full border border-[rgba(201,168,76,.04)] pointer-events-none" style={{ width: 480, height: 480, right: -120, top: -120 }} />

      <motion.div
        className="relative z-[2] max-w-[1240px] w-full"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2 text-[.74rem] font-semibold text-muted tracking-[.08em] uppercase mb-[18px]">
          Home <span className="opacity-40">/</span> <span className="text-gold">About Us</span>
        </motion.div>
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-[22px]">
          <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2" />
          Our Story
        </motion.div>
        <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-[18px]">
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
        <motion.p variants={fadeUp} className="text-[1.05rem] leading-[1.82] text-body max-w-[580px] mb-8">
          Since 2010, we've been the technology backbone for hundreds of enterprises — turning complex challenges into elegant, scalable digital solutions across 28 countries.
        </motion.p>
        <motion.div variants={container} className="flex flex-wrap gap-4 mb-10">
          {['⚡ Enterprise Solutions', '🌍 Global Presence', '✓ 14+ Years Track Record'].map((item, i) => (
            <motion.div key={i} variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 border border-[rgba(45,43,107,.15)] shadow-sm hover:shadow-md hover:bg-white transition-all duration-200">
              <span className="text-[.82rem] font-medium text-dark">{item}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[.9rem] font-bold text-white bg-mg shadow-[0_6px_18px_rgba(20,16,58,.26)] relative overflow-hidden transition-all duration-[260ms] hover:-translate-y-[2px] hover:shadow-[0_10px_26px_rgba(20,16,58,.38)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.2),transparent_55%)] before:pointer-events-none">
            <span className="relative z-[1]">Get Started</span>
            <ArrowRight size={15} className="relative z-[1]" strokeWidth={2.2} />
          </Link>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[.9rem] font-semibold text-b4 border-[1.5px] border-[rgba(45,43,107,.2)] bg-white/40 hover:bg-white transition-all duration-200">
            Learn More
          </button>
        </motion.div>
      </motion.div>
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
  { icon: Shield,    t: 'Security First',        d: 'Every solution is built with enterprise-grade security baked in from day one — not bolted on as an afterthought.' },
  { icon: Lightbulb, t: 'Continuous Innovation', d: 'We invest 15% of revenue into R&D so clients always have access to cutting-edge technology.' },
  { icon: TrendingUp,t: 'Sustainable Growth',    d: 'We build scalable architectures that grow with your business, preventing costly rebuilds down the road.' },
  { icon: Handshake, t: 'True Partnership',       d: 'We embed ourselves in your team, understanding your culture to deliver solutions that truly fit.' },
  { icon: Zap,       t: 'Speed & Quality',        d: 'Agile at our core — we deliver fast without sacrificing the quality that defines our reputation.' },
  { icon: Globe,     t: 'Global Mindset',         d: 'Operating in 28 countries gives us unique insights to build products for global audiences.' },
];

const timeline = [
  { year: '2010', t: 'Founded in Bangalore',         d: 'TechSphere was born with 5 engineers and a bold dream — to democratize enterprise technology for growing businesses.' },
  { year: '2013', t: 'First 50 Clients & Series A',  d: 'Secured $4M Series A. Expanded into cloud solutions and grew to 40 team members across 2 offices.' },
  { year: '2016', t: 'Global Expansion — 10 Countries', d: 'Opened offices in London, Singapore, and Dubai. Launched our proprietary DevSecOps framework.' },
  { year: '2019', t: '200+ Clients & ISO 27001',      d: 'Achieved ISO 27001 security certification. Launched our AI-powered monitoring suite.' },
  { year: '2022', t: '1,000 Projects Milestone',      d: 'Delivered our 1,000th project. Expanded to 200 team members and 28 countries globally.' },
  { year: '2024', t: 'TechSphere 3.0 — AI & Automation', d: 'Launched our next-gen platform integrating AI automation, predictive analytics, and real-time cloud orchestration.' },
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

  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.08 });

  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true, amount: 0.1 });

  return (
    <>
      <Navbar />
      <PageHero />

      {/* ── STORY ── */}
      <section className="bg-white py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-center">
            {/* Images */}
            <motion.div
              className="relative"
              style={{ height: 500 }}
              initial="hidden"
              animate={storyInView ? 'visible' : 'hidden'}
              variants={fadeLeft}
            >
              <motion.div
                className="absolute top-0 left-0 w-[75%] rounded-[22px] overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={storyInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
              >
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=420&fit=crop" alt="Team" className="w-full h-[340px] object-cover transition-transform duration-700 hover:scale-[1.04]" />
              </motion.div>
              <motion.div
                className="absolute bottom-0 right-0 w-[55%] rounded-[18px] overflow-hidden border-4 border-white shadow-md"
                initial={{ opacity: 0, y: 40, x: 20 }}
                animate={storyInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.9, ease, delay: 0.25 }}
              >
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=260&fit=crop" alt="Working" className="w-full h-[210px] object-cover transition-transform duration-700 hover:scale-[1.04]" />
              </motion.div>
              <motion.div
                className="absolute left-[-18px] bg-gm text-white rounded-2xl px-5 py-[14px] shadow-brand z-[4]"
                style={{ bottom: 120 }}
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={storyInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1], delay: 0.45 }}
              >
                <strong className="block font-heading text-[1.7rem] font-black leading-none">14+</strong>
                <span className="text-[.68rem] font-semibold opacity-80 mt-[2px] block">Years of Excellence</span>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              animate={storyInView ? 'visible' : 'hidden'}
              variants={container}
            >
              <motion.div variants={fadeUp}><SLabel>Who We Are</SLabel></motion.div>
              <motion.div variants={fadeUp}><SH2>A Team of <em className="not-italic grad-text">Passionate</em> Problem Solvers</SH2></motion.div>
              <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted mb-[14px]">TechSphere was founded in 2010 with a single mission: to make enterprise-grade technology accessible to every business, regardless of size or industry. What started as a team of five developers has grown into a 200-person powerhouse serving clients across 28 countries.</motion.p>
              <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted mb-7">We don't just write code — we architect digital futures. Our multidisciplinary team of engineers, designers, strategists, and cybersecurity experts work in lockstep to deliver solutions that transform your business.</motion.p>
              <motion.div variants={container} className="grid grid-cols-2 gap-[13px]">
                {[
                  { icon: Code2, t: 'Mission-Focused', d: 'Every project aligns with your core business objectives' },
                  { icon: Eye,   t: 'Research-Driven',  d: 'Data and insights guide every technical decision' },
                  { icon: Users, t: 'Long-Term Partner', d: '96% of our clients return for their next project' },
                  { icon: Rocket,t: 'Agile Delivery',   d: '3× faster delivery vs industry average, every sprint' },
                ].map((v, i) => {
                  const IconComponent = v.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={{ hidden: { opacity: 0, y: 20, scale: 0.94 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } } }}
                      className="bg-pale border-[1.5px] border-border rounded-[13px] p-4 transition-all duration-[250ms] hover:border-b4 hover:bg-pale2 hover:-translate-y-[3px]"
                    >
                      <div className="w-6 h-6 text-b4 mb-[7px]"><IconComponent size={20} strokeWidth={1.8} /></div>
                      <div className="font-heading text-[.88rem] font-bold text-dark mb-[3px]">{v.t}</div>
                      <div className="text-[.77rem] text-muted leading-[1.5]">{v.d}</div>
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

      {/* ── TIMELINE ── */}
      <section className="bg-white py-24 px-[5%]">
        <div ref={timelineRef} className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center mb-0"
            initial="hidden"
            animate={timelineInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <motion.div variants={fadeUp}><SLabel center>Our Journey</SLabel></motion.div>
            <motion.div variants={fadeUp}><SH2 center>14 Years of <em className="not-italic grad-text">Growth</em> &amp; Milestones</SH2></motion.div>
          </motion.div>

          <div className="relative max-w-[820px] mx-auto mt-[50px] pl-11 before:content-[''] before:absolute before:left-0 before:top-[6px] before:bottom-[6px] before:w-[2px] before:rounded-sm before:bg-[linear-gradient(to_bottom,#C9A84C,#4845A8_80%,transparent)]">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                className="relative mb-11 last:mb-0"
                initial={{ opacity: 0, x: -30 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              >
                <motion.div
                  className="absolute -left-[50px] top-1 w-[14px] h-[14px] rounded-full bg-gg shadow-[0_0_0_4px_#F0F0FA,0_0_0_7px_rgba(201,168,76,.2)]"
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.12 + 0.2 }}
                />
                <div className="font-heading text-[.76rem] font-extrabold text-gold tracking-[.1em] mb-[5px]">{t.year}</div>
                <div className="font-heading text-[1.08rem] font-bold text-dark mb-[7px]">{t.t}</div>
                <div className="text-[.89rem] text-body leading-[1.72]">{t.d}</div>
              </motion.div>
            ))}
          </div>
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
                Working with TechSphere means partnering with a team that respects your vision, safeguards your information, and delivers results with integrity.
              </motion.p>
              <motion.div variants={container} className="space-y-3">
                {['ISO 27001 Security Certified', 'NDA & Confidentiality Agreements', 'Enterprise-Grade Data Protection', '24/7 Security Monitoring', 'GDPR & Privacy Compliant'].map((item, i) => (
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
                { icon: CheckCircle, title: 'Proven Track Record',      desc: '14+ years of zero security breaches. 300+ enterprises trust us with their most sensitive projects.' },
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
        p="Join 300+ companies that trust TechSphere to power their digital transformation. Let's talk about your vision."
        links={[{ label: 'Start Your Project →', to: '/contact', primary: true }, { label: 'Explore Our Services', to: '/services', primary: false }]}
      />

      <Footer />
      <BackToTop />
    </>
  );
}
