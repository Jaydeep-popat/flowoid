import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

/* ─── DATA ─────────────────────────────────────────────── */
const services = [
  { n: '01', ico: '🖥️', name: 'Custom Software Development',       info: 'End-to-end development of web, mobile, and desktop applications tailored precisely to your business workflows and requirements.' },
  { n: '02', ico: '☁️', name: 'Cloud Infrastructure & Migration',   info: 'Seamlessly migrate to AWS, Azure, or GCP. We design scalable, cost-efficient cloud architectures that grow with your business.', feat: true },
  { n: '03', ico: '🔐', name: 'Cybersecurity Solutions',            info: 'Comprehensive security audits, penetration testing, threat monitoring, and compliance frameworks to keep your data protected 24/7.' },
  { n: '04', ico: '📊', name: 'Data Analytics & BI',               info: 'Transform raw data into actionable intelligence. Real-time dashboards, data warehouses, and predictive analytics pipelines built for you.' },
  { n: '05', ico: '🔗', name: 'ERP & System Integration',          info: 'Connect disparate tools and systems. We implement and integrate ERP, CRM, and third-party platforms without disrupting operations.' },
  { n: '06', ico: '🤝', name: 'IT Consulting & Strategy',          info: 'Strategic technology advisory to align your IT investments with business goals — roadmaps, vendor selection, and digital transformation.' },
];

const whyFeats = [
  { ico: '🎯', t: 'Requirement-First Approach', d: 'We deep-dive into your requirements before writing a single line of code, ensuring every solution is precisely what you need.' },
  { ico: '⚡', t: 'Agile & Fast Delivery',      d: 'Iterative sprints, continuous feedback, and rapid deployment cycles ensure you see results faster than traditional vendors.' },
  { ico: '🛡️', t: 'Enterprise-Grade Quality',   d: 'Rigorous testing, security-first architecture, and production-ready code that performs under real-world enterprise demands.' },
];

const stats = [
  { num: '300', suf: '+',  lbl: 'Enterprise Clients Served' },
  { num: '1.2', suf: 'K', lbl: 'Projects Delivered' },
  { num: '99',  suf: '%', lbl: 'On-Time Delivery Rate' },
  { num: '24',  suf: '/7',lbl: 'Support & Monitoring' },
];

const portfolio = [
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', tag: 'Enterprise Software', name: 'Real-Time Analytics Platform',       desc: 'Built for a Fortune 500 client — processes 50M events/day with sub-second latency.', cls: 'sr-l' },
  { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop', tag: 'Cybersecurity',      name: 'Zero-Trust Security Framework',       desc: 'Deployed across 12 global offices, protecting sensitive financial data with SOC2 compliance.', cls: 'sr-r d1' },
  { img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop', tag: 'Cloud Migration',    name: 'Multi-Cloud Migration for HealthTech', desc: 'Migrated legacy EHR systems to AWS with zero downtime and 60% cost reduction.', cls: 'sr-l d2' },
  { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', tag: 'ERP Integration',    name: 'SAP + Custom CRM Integration',        desc: 'Unified 8 disconnected systems for a retail chain of 200+ stores with zero downtime.', cls: 'sr-r d3' },
];

const testimonials1 = [
  { tf: true,  title: 'Amazing to work with',                   q: "Our redesign result is thrilling. TechSphere was amazing to work with, making the process fun and stress-free. They are always super responsive.",                   init: 'RK', name: 'Rajesh Kumar', role: 'CEO & Founder @ClickMagick' },
  { tf: false, title: 'Outstanding product design',             q: "Their creativity and technical skills resulted in visually stunning, user-friendly designs. An absolute pleasure working with such talented people. Highly recommend!", init: 'SR', name: 'Sneha Reddy',   role: 'Product Owner @Plix' },
  { tf: false, title: 'Reliable, Fast, Easy',                   q: "TechSphere was incredibly fast, offering numerous options. They solicit feedback constantly and worked hard to create the perfect design for us.",                      init: 'VS', name: 'Vikram Singh',  role: 'Co-Founder @Legacy Blueprint' },
  { tf: true,  title: 'TechSphere is one of the most talented', q: "TechSphere is one of the most talented teams I've worked with. They go above and beyond in understanding and executing design excellence.",                          init: 'AP', name: 'Aarav Patel',   role: 'Marketing Lead @Stepsize' },
  { tf: false, title: 'Game-Changing Partnership',              q: "Working with TechSphere was a game-changer. Their mobile app development expertise helped us launch our product successfully and reach new market heights.",            init: 'AM', name: 'Arjun Mehta',   role: 'CTO @InnovateCorp' },
  { tf: false, title: 'Brilliant cloud architects',             q: "The team migrated our entire infrastructure to AWS with zero downtime. Their cloud expertise saved us 60% on costs and improved performance dramatically.",             init: 'PK', name: 'Priya Kapoor',  role: 'CTO @FinanceFirst' },
];
const testimonials2 = [
  { tf: false, title: 'Incredibly professional team',  q: "The TechSphere team is incredibly professional and talented. They delivered our e-commerce platform on time, within budget, and with outstanding quality.",        init: 'PS', name: 'Priya Sharma',  role: 'Marketing Director @GrowthFirst' },
  { tf: true,  title: 'Excellent Design',              q: "Working with TechSphere has been a pleasure. They were fast, communicative, and crafted an excellent design that met all our requirements perfectly.",                  init: 'AG', name: 'Ananya Gupta',  role: 'CEO & Co-Founder @Prönö' },
  { tf: false, title: 'Transformed our digital presence', q: "TechSphere completely transformed our digital presence. Their team delivered exceptional results that far exceeded our expectations and business goals.",           init: 'NS', name: 'Neha Sharma',   role: 'CEO @TechFlow Solutions' },
  { tf: false, title: 'Security experts',              q: "Their cybersecurity audit identified 23 critical vulnerabilities we didn't know existed. The remediation was swift and thorough. Now we sleep easy.",                  init: 'RT', name: 'Ravi Tiwari',   role: 'CISO @DataVault' },
  { tf: true,  title: 'ERP integration experts',       q: "Our 8 disconnected systems now talk seamlessly. TechSphere's ERP integration saved our team 15 hours a week. The ROI was visible in month one.",                       init: 'SM', name: 'Suresh Menon',  role: 'COO @RetailGiant' },
  { tf: false, title: '5-star consulting',             q: "Their IT consulting roadmap became our company's technology bible. 6 months in, we've automated 70% of manual processes. Exceptional team.",                           init: 'KP', name: 'Kavya Pillai',  role: 'VP Operations @ScaleUp' },
];

const techStack = [
  { ico: '⚛️', name: 'React' },      { ico: '🟢', name: 'Node.js' },  { ico: '🐍', name: 'Python' },
  { ico: '☁️', name: 'AWS' },        { ico: '🔷', name: 'Azure' },    { ico: '🐳', name: 'Docker' },
  { ico: '☸️', name: 'Kubernetes' }, { ico: '🍃', name: 'MongoDB' },  { ico: '🐘', name: 'PostgreSQL' },
  { ico: '🔴', name: 'Redis' },      { ico: '📱', name: 'React Native' }, { ico: '🤖', name: 'TensorFlow' },
];

const logos = ['Microsoft', 'Deloitte', 'Accenture', 'Infosys', 'Wipro', 'TCS', 'HCL Technologies', 'Capgemini', 'Oracle', 'SAP'];

/* ─── TCARD ─────────────────────────────────────────────── */
function TCard({ tf, title, q, init, name, role }: typeof testimonials1[0]) {
  return (
    <div className={`flex-shrink-0 w-[340px] sm:w-[300px] p-[28px_26px] rounded-[20px] border cursor-default transition-[transform,box-shadow] duration-300 hover:-translate-y-1 ${
      tf
        ? 'bg-[linear-gradient(145deg,#3730a3_0%,#4845A8_100%)] border-transparent shadow-[0_8px_32px_rgba(45,43,107,.35)] hover:shadow-[0_16px_48px_rgba(45,43,107,.45)]'
        : 'bg-white border-border shadow-[0_4px_20px_rgba(15,14,42,.07)] hover:shadow-[0_12px_36px_rgba(15,14,42,.12)]'
    }`}>
      <div className={`font-heading text-[1rem] font-bold mb-3 leading-[1.3] ${tf ? 'text-white' : 'text-dark'}`}>{title}</div>
      <p className={`text-[.87rem] leading-[1.78] mb-5 ${tf ? 'text-white/82' : 'text-muted'}`}>{q}</p>
      <hr className={`border-none border-t mb-4 ${tf ? 'border-white/20' : 'border-border'}`} />
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-heading text-[.8rem] font-bold flex-shrink-0 ${tf ? 'bg-white/20 border-white/30 text-white' : 'bg-pale2 border-border text-b3'}`}>{init}</div>
        <div>
          <div className={`font-heading text-[.88rem] font-bold ${tf ? 'text-white/90' : 'text-dark'}`}>
            {name}<span className="inline-block w-2 h-2 rounded-full bg-[#10B981] shad  ow-[0_0_6px_rgba(16,185,129,.5)] ml-[5px] align-middle animate-blink" />
          </div>
          <div className={`text-[.75rem] ${tf ? 'text-white/60' : 'text-muted'}`}>{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO SLIDER ─────────────────────────────────────── */
const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=500&fit=crop',
    tag: 'Dev Teams',
    label: 'Collaborative Engineering',
    stat: { v: '1,200+', l: 'Projects Shipped' },
    // Squircle / rounded rectangle with one diagonal cut corner
    shape: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))',
    peekShape: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)',
    accent: '#4845A8',
  },
  {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop',
    tag: 'Enterprise',
    label: 'Enterprise-Grade Solutions',
    stat: { v: '300+', l: 'Enterprise Clients' },
    // Wide parallelogram-like cut on top-left and bottom-right
    shape: 'polygon(48px 0%, 100% 0%, calc(100% - 48px) 100%, 0% 100%)',
    peekShape: 'polygon(30px 0%, 100% 0%, calc(100% - 30px) 100%, 0% 100%)',
    accent: '#C9A84C',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=500&fit=crop',
    tag: 'Strategy',
    label: 'Strategic IT Consulting',
    stat: { v: '99%', l: 'On-Time Delivery' },
    // Organic blob-like pill
    shape: 'ellipse(50% 48% at 50% 50%)',
    peekShape: 'ellipse(48% 46% at 50% 50%)',
    accent: '#10B981',
  },
  {
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=500&fit=crop',
    tag: 'Cybersecurity',
    label: 'Zero-Trust Security',
    stat: { v: '24/7', l: 'Active Monitoring' },
    // Pentagon / shield-ish
    shape: 'polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%)',
    peekShape: 'polygon(50% 0%, 100% 28%, 100% 100%, 0% 100%, 0% 28%)',
    accent: '#6B67D4',
  },
];

const SLIDE_DURATION = 5000;

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number, dir: 'next' | 'prev' = 'next') => {
    setDirection(dir);
    setCurrent(idx);
    setProgress(0);
  }, [current]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    const totalSteps = SLIDE_DURATION / 50;
    let step = 0;
    progressRef.current = setInterval(() => {
      step++;
      setProgress(Math.min((step / totalSteps) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      const next = (current + 1) % heroSlides.length;
      goTo(next, 'next');
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, goTo]);

  const slide = heroSlides[current];

  /* clip-path per direction */
  const enterVariants = {
    next:  { clipPath: 'inset(0 100% 0 0)', opacity: 0, scale: 1.06 },
    prev:  { clipPath: 'inset(0 0 0 100%)', opacity: 0, scale: 1.06 },
  };
  const exitVariants = {
    next:  { clipPath: 'inset(0 0 0 100%)', opacity: 0, scale: 0.97 },
    prev:  { clipPath: 'inset(0 100% 0 0)', opacity: 0, scale: 0.97 },
  };

  return (
    <div className="relative w-full select-none" aria-label="Hero image slideshow" style={{ height: 520 }}>
      {/* ── Ambient glow orb behind ── */}
      <div
        className="absolute pointer-events-none transition-colors duration-[1200ms]"
        style={{
          width: 340, height: 340,
          top: '50%', left: '50%',
          transform: 'translate(-42%,-48%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${slide.accent}28 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      {/* ── Peek card (background secondary image) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`peek-${current}`}
          initial={{ opacity: 0, rotate: 9, scale: 0.88, x: 30, y: -30 }}
          animate={{ opacity: 1, rotate: 8, scale: 0.92, x: 24, y: -22 }}
          exit={{ opacity: 0, rotate: 12, scale: 0.84 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute overflow-hidden border-[3px] border-white shadow-[0_16px_48px_rgba(15,14,42,.22)] animate-heroPeek"
          style={{
            width: 210, height: 162,
            top: '12%', right: '-8px',
            clipPath: slide.peekShape,
            transformOrigin: 'center center',
            zIndex: 1,
          }}
        >
          <img
            src={slide.peek}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Tinted overlay */}
          <div className="absolute inset-0" style={{ background: `${slide.accent}1A` }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Main slide ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`slide-${current}`}
          custom={direction}
          variants={{
            enter: (d: 'next' | 'prev') => ({ ...enterVariants[d] }),
            center: { clipPath: 'inset(0 0% 0 0)', opacity: 1, scale: 1 },
            exit:  (d: 'next' | 'prev') => ({ ...exitVariants[d] }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="absolute overflow-hidden border-[3.5px] border-white shadow-[0_28px_72px_rgba(15,14,42,.24)]"
          style={{
            width: '82%',
            height: 400,
            top: '8%',
            left: '2%',
            clipPath: slide.shape,
            transformOrigin: 'center center',
            zIndex: 2,
          }}
        >
          {/* Ken-Burns image */}
          <img
            src={slide.src}
            alt={slide.label}
            loading="lazy"
            className="w-full h-full object-cover animate-heroKenBurns"
          />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.85)_0%,rgba(8,7,28,.25)_50%,transparent_100%)]" />
          {/* Slide tag + title */}
          <div className="absolute bottom-0 left-0 right-0 p-[22px_24px]">
            <div
              className="inline-block px-[10px] py-[3px] rounded-full text-[.6rem] font-bold uppercase tracking-[.1em] mb-[8px]"
              style={{ background: `${slide.accent}3A`, border: `1px solid ${slide.accent}70`, color: slide.accent === '#C9A84C' ? '#F5DFA0' : slide.accent === '#10B981' ? '#10B981' : '#a5a3f8' }}
            >
              {slide.tag}
            </div>
            <div className="font-heading text-[1.05rem] font-bold text-white leading-[1.3]">{slide.label}</div>
          </div>
          {/* Progress bar at top of image */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
            <div
              className="h-full transition-none"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent}CC)`,
                transition: progress === 0 ? 'none' : 'width 50ms linear',
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Stat badge (bottom-right corner) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`stat-${current}`}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.92 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="absolute z-[4] bg-white/96 backdrop-blur-[18px] border border-[rgba(45,43,107,.1)] rounded-2xl px-4 py-3 shadow-[0_10px_36px_rgba(15,14,42,.14)]"
          style={{ bottom: '9%', right: '4%' }}
        >
          <div className="text-[.6rem] text-muted font-medium mb-[2px]">👁 {slide.stat.l}</div>
          <div className="font-heading text-[1.15rem] font-extrabold text-dark leading-none">{slide.stat.v}</div>
        </motion.div>
      </AnimatePresence>

      {/* ── Dot + number controls ── */}
      <div className="absolute z-[5] flex flex-col items-center gap-[7px]" style={{ right: '-6px', top: '50%', transform: 'translateY(-50%)' }}>
        {heroSlides.map((s, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            title={s.label}
            className="group flex items-center justify-center transition-all duration-300"
            style={{ width: 26, height: 26 }}
          >
            <div
              className="rounded-full transition-all duration-300 border-[2px]"
              style={{
                width: i === current ? 12 : 7,
                height: i === current ? 12 : 7,
                background: i === current ? slide.accent : 'transparent',
                borderColor: i === current ? slide.accent : 'rgba(45,43,107,.22)',
                boxShadow: i === current ? `0 0 10px ${slide.accent}80` : 'none',
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Decorative dashed ring ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 260, height: 260,
          bottom: '-10%', left: '-6%',
          borderRadius: '50%',
          border: '1.5px dashed rgba(72,69,168,.1)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 80, height: 80,
          bottom: '18%', left: '0%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,.14), transparent 70%)',
          filter: 'blur(12px)',
          zIndex: 0,
        }}
      />
    </div>
  );
}

/* ─── BG CANVAS ──────────────────────────────────────── */
function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    let W: number, H: number, pts: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    let animId: number;

    function resize() { W = c!.width = c!.parentElement!.offsetWidth; H = c!.height = c!.parentElement!.offsetHeight; }
    resize();

    function init() {
      pts = [];
      const n = Math.floor(W * H / 18000);
      for (let i = 0; i < n; i++) pts.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.18, vy: (Math.random()-.5)*.18, r: Math.random()*1.1+.3, a: Math.random()*.1+.04 });
    }
    init();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(45,43,107,${p.a})`; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<80){ctx.beginPath();ctx.strokeStyle=`rgba(45,43,107,${.05*(1-d/80)})`;ctx.lineWidth=.4;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    const resizeHandler = () => { resize(); init(); };
    window.addEventListener('resize', resizeHandler);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resizeHandler); };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas" className="absolute inset-0 z-[1] pointer-events-none w-full h-full" />;
}

/* ─── HOME PAGE ──────────────────────────────────────── */
export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen bg-page-dots grid grid-cols-1 lg:grid-cols-2 items-center px-[5%] gap-0 pt-[100px] md:pt-[130px]"
      >
        {/* Rings */}
        <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width:700,height:700,top:-200,right:-180,borderColor:'rgba(45,43,107,.05)' }} />
        <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width:480,height:480,top:-60,right:-40,borderColor:'rgba(201,168,76,.06)' }} />
        <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width:920,height:920,bottom:-420,left:-200,borderColor:'rgba(45,43,107,.04)' }} />
        {/* Glows */}
        <div className="absolute rounded-full pointer-events-none z-0 animate-fadeScale [animation-duration:3s] [animation-delay:100ms]" style={{ width:560,height:560,right:-60,top:-80,background:'radial-gradient(circle,rgba(45,43,107,.06),transparent 70%)',filter:'blur(50px)' }} />
        <div className="absolute rounded-full pointer-events-none z-0 animate-fadeScale [animation-duration:3.5s] [animation-delay:250ms]" style={{ width:420,height:420,left:-80,bottom:-80,background:'radial-gradient(circle,rgba(201,168,76,.05),transparent 70%)',filter:'blur(44px)' }} />
        <BgCanvas />

        {/* Left */}
        <motion.div 
          className="relative z-[2] pt-2 md:pt-10 pb-[72px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
          }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="inline-flex items-center gap-2 px-[14px] py-[5px] pl-2 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.71rem] font-bold text-b3 tracking-[.1em] uppercase mb-[22px]"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-blink" />
            IT Startup · Est. 2020 · India
          </motion.div>

          <h1 className="font-heading font-black text-[clamp(2.8rem,5vw,4.4rem)] leading-[1.03] tracking-[-0.04em] text-dark mb-5 flex flex-col gap-1">
            <span className="block overflow-hidden"><motion.span className="block origin-left" variants={{ hidden: { y: '110%', rotateZ: 3, opacity: 0 }, visible: { y: '0%', rotateZ: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>We Build the Tech</motion.span></span>
            <span className="block overflow-hidden"><motion.span className="block origin-left" variants={{ hidden: { y: '110%', rotateZ: 3, opacity: 0 }, visible: { y: '0%', rotateZ: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>That Powers</motion.span></span>
            <span className="block overflow-hidden"><motion.span className="block origin-left grad-text pb-2" variants={{ hidden: { y: '110%', rotateZ: 3, opacity: 0 }, visible: { y: '0%', rotateZ: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>Your Business.</motion.span></span>
          </h1>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, filter: 'blur(8px)', y: 20 },
              visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-[1.04rem] leading-[1.8] text-muted max-w-[455px] mb-[34px]"
          >
            TechSphere delivers custom software, cloud infrastructure, and digital products — built to your exact requirements, shipped faster than any enterprise vendor.
          </motion.p>

          <motion.div 
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            className="flex flex-wrap gap-2 mb-9"
          >
            {['☁️ Cloud Migration','🔐 Cybersecurity','⚡ 3× Faster Delivery','🌍 28 Countries'].map((c) => (
              <motion.div 
                key={c} 
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-[5px] px-3 py-[5px] rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-semibold text-b3"
              >
                {c}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex items-center gap-3 flex-wrap mb-0"
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="relative overflow-hidden inline-flex items-center gap-2 px-[26px] py-[13px] rounded-xl text-[.93rem] font-bold text-white bg-mg shadow-[0_8px_24px_rgba(20,16,58,.3)] transition-colors duration-[280ms] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.24),transparent_55%)] before:pointer-events-none hover:shadow-[0_16px_42px_rgba(20,16,58,.44)]">
                <span className="relative z-[1]">Start Your Project</span>
                <svg className="relative z-[1] w-4 h-4 transition-transform duration-[250ms] group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[.93rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-colors duration-[280ms] hover:bg-pale2 hover:border-b4 hover:text-dark">
              <span className="w-[30px] h-[30px] rounded-full bg-gm flex items-center justify-center text-[.58rem] text-white flex-shrink-0">▶</span>
              See How It Works
            </motion.button>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1 } }
            }}
            className="flex items-center gap-[14px] mt-10"
          >
            <div className="flex">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
              ].map((src, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className={`w-[33px] h-[33px] rounded-full border-[2.5px] border-white overflow-hidden shadow-[0_2px_8px_rgba(15,14,42,.1)] ${i > 0 ? '-ml-[9px]' : ''}`}
                >
                  <img src={src} alt="client" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-[.79rem] text-muted leading-[1.55]"
            >
              <strong className="text-dark">300+ happy clients</strong><br />across 28 countries worldwide
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — Hero Slider */}
        <motion.div 
          className="relative z-[2] hidden lg:flex items-center justify-center py-[60px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 40, filter: 'blur(12px)' },
              visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }
            }}
            className="w-full max-w-[520px]"
          >
            <HeroSlider />
          </motion.div>

          {/* Floating delivery card (left side) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20, y: 10 },
              visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 } }
            }}
            className="absolute z-[6] top-[22%] -left-6 animate-ffa"
          >
            <div className="bg-white/96 backdrop-blur-[18px] border border-[rgba(45,43,107,.1)] rounded-2xl px-4 py-3 flex items-center gap-[11px] shadow-[0_10px_36px_rgba(15,14,42,.12)] text-dark">
              <div className="w-[36px] h-[36px] rounded-[10px] flex-shrink-0 flex items-center justify-center text-[1rem] bg-pale border border-border">🚀</div>
              <div>
                <div className="text-[.65rem] text-muted mb-[2px] font-medium">Delivery Speed</div>
                <div className="font-heading text-[.92rem] font-extrabold leading-[1.2]">3× Faster <span className="text-[.62rem] text-[#10B981] font-bold">vs industry</span></div>
              </div>
            </div>
          </motion.div>

          {/* Floating retention card (left-lower) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20, y: 10 },
              visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.85 } }
            }}
            className="absolute z-[6] bottom-[24%] -left-4 animate-ffb"
          >
            <div className="bg-white/96 backdrop-blur-[18px] border border-[rgba(45,43,107,.1)] rounded-2xl px-4 py-3 flex items-center gap-[11px] shadow-[0_10px_36px_rgba(15,14,42,.12)] text-dark">
              <div className="w-[36px] h-[36px] rounded-[10px] flex-shrink-0 flex items-center justify-center text-[1rem] bg-pale border border-border">✅</div>
              <div>
                <div className="text-[.65rem] text-muted mb-[2px] font-medium">Client Retention</div>
                <div className="font-heading text-[.92rem] font-extrabold leading-[1.2]">96% <span className="text-[.62rem] text-[#10B981] font-bold">satisfaction</span></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] z-[3] cursor-pointer"
          onClick={() => document.getElementById('logos')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[.66rem] font-semibold text-light tracking-[.1em] uppercase">Scroll</span>
          <div className="w-[1.5px] h-9 bg-[linear-gradient(to_bottom,rgba(45,43,107,.3),transparent)] animate-scb" />
        </motion.div>
      </section>

      {/* LOGOS */}
      <div id="logos" className="bg-white px-[5%] py-[30px] border-t border-b border-border">
        <div className="max-w-[1240px] mx-auto flex items-center gap-[22px]">
          <span className="text-[.7rem] font-bold text-light uppercase tracking-[.1em] whitespace-nowrap">Trusted by</span>
          <div className="flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}>
            <div className="flex gap-[52px] items-center w-max animate-tick">
              {[...logos, ...logos].map((l, i) => (
                <span key={i} className="font-heading text-[.9rem] font-bold text-light whitespace-nowrap cursor-default hover:text-b4 transition-colors duration-[250ms]">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="bg-white py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex justify-between items-end gap-8 mb-14 flex-wrap">
            <div>
              <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Our Services</div>
              <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">IT Solutions Built<br /><span className="grad-text">For Your Exact Needs</span></h2>
            </div>
            <Link to="/services" className="sr d2 px-[22px] py-[10px] rounded-[10px] text-[.84rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-all duration-[250ms] hover:bg-pale2 hover:border-b4">View All Services →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className={`sr${s.feat ? '' : ''} d${Math.min(i,5)} group relative overflow-hidden rounded-[22px] border p-[34px_28px] cursor-pointer transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] shadow-sm ${
                s.feat
                  ? 'bg-gm border-transparent shadow-[0_16px_48px_rgba(15,14,42,.3)] hover:-translate-y-[7px] hover:shadow-[0_28px_64px_rgba(15,14,42,.42)]'
                  : 'bg-white border-border hover:border-[rgba(45,43,107,.18)] hover:-translate-y-[7px] hover:shadow-md'
              }`}>
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] origin-left scale-x-0 group-hover:scale-x-100 ${s.feat ? 'scale-x-100 bg-[rgba(201,168,76,.4)]' : 'bg-gg'}`} />
                {/* Hover bg tint */}
                {!s.feat && <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(160deg,#F0F0FA,transparent_55%)] transition-opacity duration-[380ms] pointer-events-none" />}
                {/* Shimmer for featured */}
                {s.feat && <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,168,76,.1),transparent_50%)] pointer-events-none" />}

                <div className={`text-[.66rem] font-bold tracking-[.12em] mb-5 relative z-[1] ${s.feat ? 'text-white' : 'text-light'}`}>{s.n}</div>
                <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[1.45rem] mb-5 relative z-[1] transition-transform duration-[380ms] ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.12] group-hover:-rotate-[5deg] border ${s.feat ? 'bg-[rgba(201,168,76,.15)] border-[rgba(201,168,76,.3)]' : 'bg-pale border-border'}`}>{s.ico}</div>
                <div className={`font-heading text-[1.06rem] font-bold mb-[10px] relative z-[1] ${s.feat ? 'text-white' : 'text-dark'}`}>{s.name}</div>
                <p className={`text-[.85rem] leading-[1.72] mb-5 relative z-[1] ${s.feat ? 'text-white' : 'text-muted'}`}>{s.info}</p>
                <span className={`inline-flex items-center gap-[6px] text-[.81rem] font-bold relative z-[1] transition-[gap] duration-300 group-hover:gap-3 ${s.feat ? 'text-gold3' : 'text-b4'}`}>Explore →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="bg-page py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Images */}
          <div className="sr-l relative" style={{ height: 'auto' }}>
            <div className="relative rounded-[30px] overflow-hidden aspect-[4/3] shadow-[0_28px_80px_rgba(15,14,42,.12)] border border-border group">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop" alt="IT team" loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.04]" />
            </div>
            {/* Thumb */}
            <div className="absolute -bottom-6 -right-6 w-[190px] rounded-card overflow-hidden border-[3px] border-white shadow-lg hidden md:block">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop" alt="Server" loading="lazy" className="w-full h-full object-cover aspect-square block" />
            </div>
            {/* Badge */}
            <div className="absolute -top-[22px] -left-[22px] w-24 h-24 rounded-full bg-gm shadow-brand border-[3px] border-white flex flex-col items-center justify-center text-white font-heading overflow-hidden hidden md:flex">
              <span className="text-[1.7rem] font-black leading-none relative z-[1]">12+</span>
              <span className="text-[.47rem] font-bold uppercase tracking-[.04em] text-center opacity-85 relative z-[1]">Years of Excellence</span>
            </div>
          </div>

          {/* Text */}
          <div className="sr-r d1">
            <div className="inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Why TechSphere</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark mb-[14px]">We Don't Just Build IT.<br />We <span className="grad-text">Partner With You.</span></h2>
            <p className="text-[1rem] leading-[1.8] text-muted max-w-[520px] mb-[38px]">Every business has unique technology challenges. We listen first, then engineer solutions that solve your actual problems — not generic ones.</p>
            <div className="flex flex-col gap-[14px]">
              {whyFeats.map((w, i) => (
                <div key={i} className={`sr d${i+2} group flex gap-[15px] items-start p-[18px_20px] rounded-card bg-white border border-border shadow-sm relative overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] hover:border-[rgba(45,43,107,.15)] hover:shadow-md hover:translate-x-[6px] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-gg before:scale-y-0 before:origin-bottom before:transition-transform before:duration-[350ms] hover:before:scale-y-100`}>
                  <div className="w-10 h-10 rounded-[10px] flex-shrink-0 bg-pale border border-border flex items-center justify-center text-[1rem] transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-110 group-hover:-rotate-[4deg]">{w.ico}</div>
                  <div>
                    <div className="font-heading text-[.93rem] font-bold text-dark mb-1">{w.t}</div>
                    <p className="text-[.83rem] leading-[1.65] text-muted">{w.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white pb-24 px-[5%]">
        <div className="sr-s max-w-[1240px] mx-auto bg-gm rounded-[30px] grid grid-cols-2 lg:grid-cols-4 overflow-hidden shadow-[0_24px_72px_rgba(15,14,42,.26)] relative before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(201,168,76,.14),transparent_50%)] before:pointer-events-none">
          {stats.map((s, i) => (
            <div key={i} className={`relative overflow-hidden text-center py-[52px] px-9 border-r border-white/8 last:border-r-0 hover:bg-white/6 transition-colors duration-[350ms] ${i === 1 || i === 3 ? 'lg:border-r-0' : ''}`}>
              <div className="font-heading text-[2.9rem] font-black text-white leading-none mb-[10px] relative">{s.num}<em className="not-italic grad-text">{s.suf}</em></div>
              <div className="text-[.82rem] text-white/52 relative">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-page py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex justify-between items-end mb-[52px] gap-7 flex-wrap">
            <div>
              <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Our Work</div>
              <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">Projects That <span className="grad-text">Speak for Themselves</span></h2>
            </div>
            <Link to="/projects" className="sr d2 px-[22px] py-[10px] rounded-[10px] text-[.84rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-all duration-[250ms] hover:bg-pale2 hover:border-b4">View Full Portfolio →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
            {portfolio.map((p, i) => (
              <div key={i} className={`${p.cls} group relative rounded-[30px] overflow-hidden aspect-video cursor-pointer shadow-sm`}>
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.07] block" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.94)_0%,rgba(8,7,28,.38)_55%,transparent_100%)] flex flex-col justify-end p-7">
                  <div className="inline-block px-[11px] py-1 rounded-full bg-[rgba(201,168,76,.25)] border border-[rgba(201,168,76,.45)] text-[.67rem] font-bold text-gold3 uppercase tracking-[.09em] mb-[9px] w-fit">{p.tag}</div>
                  <div className="font-heading text-[1.22rem] font-bold text-white mb-[7px]">{p.name}</div>
                  <div className="text-[.8rem] text-white/56 leading-[1.55]">{p.desc}</div>
                  <span className="inline-flex items-center gap-[6px] text-[.78rem] font-bold text-gold2 mt-3 opacity-0 translate-y-2 transition-all duration-[320ms] group-hover:opacity-100 group-hover:translate-y-0">View Case Study →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testi" className="overflow-hidden py-24 bg-white">
        <div className="px-[5%] max-w-[1240px] mx-auto mb-[52px]">
          <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Testimonials</div>
          <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">What Our Clients <span className="grad-text">Actually Say</span></h2>
          <p className="sr d2 text-[1rem] leading-[1.8] text-muted max-w-[520px]">Hear what our clients have to say about their experience.</p>
        </div>
        <div className="relative overflow-hidden flex flex-col gap-4 [&:hover_>_div]:[animation-play-state:paused]" style={{ mask: 'none' }}>
          <div className="absolute top-0 bottom-0 left-0 z-[2] pointer-events-none w-[160px] bg-[linear-gradient(90deg,#fff,transparent)]" />
          <div className="absolute top-0 bottom-0 right-0 z-[2] pointer-events-none w-[160px] bg-[linear-gradient(-90deg,#fff,transparent)]" />
          <div className="flex gap-4 w-max animate-marqueeleft">
            {[...testimonials1, ...testimonials1].map((t, i) => <TCard key={i} {...t} />)}
          </div>
          <div className="flex gap-4 w-max animate-marqueeright">
            {[...testimonials2, ...testimonials2].map((t, i) => <TCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech" className="py-24 px-[5%] relative">
        <div className="absolute inset-0 bg-page-dots pointer-events-none z-[-1]" />
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[54px]">
            <div className="sr inline-flex items-center justify-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Technology Stack</div>
            <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark text-center">Powered by Industry-Leading<br /><span className="grad-text">Technologies</span></h2>
          </div>
          <div className="max-w-[1240px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[13px]">
            {techStack.map((t, i) => (
              <div key={i} className={`sr-s${i > 0 ? ` d${Math.min(i % 3 + 1, 5)}` : ''} group p-[22px_12px] rounded-card bg-white border border-border text-center cursor-default shadow-sm transition-all duration-[350ms] ease-[cubic-bezier(.34,1.56,.64,1)] hover:border-[rgba(45,43,107,.2)] hover:bg-pale hover:-translate-y-[6px] hover:scale-[1.02] hover:shadow-md`}>
                <div className="text-[1.85rem] mb-[9px] transition-transform duration-[350ms] ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.15] group-hover:-rotate-[5deg]">{t.ico}</div>
                <div className="text-[.74rem] font-semibold text-muted">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-white px-[5%] pt-20 pb-[110px]">
        <div className="sr-s max-w-[1240px] mx-auto bg-gm rounded-[30px] px-14 py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
          {/* Decorative */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1.5px,transparent 1.5px)', backgroundSize: '32px 32px' }} />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(201,168,76,.07),transparent_45%)]" />
          <div className="absolute rounded-full pointer-events-none" style={{ width:640,height:640,top:-220,right:-160,background:'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',filter:'blur(24px)' }} />
          <h2 className="relative z-[1] font-heading text-[clamp(1.9rem,3.8vw,3.05rem)] font-black text-white mb-4 tracking-[-0.03em]">Have a Project in Mind?<br />Let's Build It Together.</h2>
          <p className="relative z-[1] text-[1rem] leading-[1.76] text-white/62 max-w-[520px] mx-auto mb-10">Share your requirements with us — big or small. We'll analyze your needs and come back with a detailed proposal, timeline, and transparent pricing. No strings attached.</p>
          <div className="relative z-[1] flex items-center justify-center gap-[14px] flex-wrap">
            <Link to="/contact" className="px-[34px] py-[14px] rounded-xl text-[.92rem] font-bold text-white bg-mg shadow-brand transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_18px_42px_rgba(20,16,58,.42)]">Start Your Project →</Link>
            <Link to="/contact" className="px-8 py-[13px] rounded-xl text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">Schedule a Call</Link>
          </div>
          <div className="relative z-[1] text-[.77rem] text-white/42 mt-[22px]">
            <span className="text-gold2 mr-[5px]">✓</span>Free consultation &nbsp;·&nbsp; <span className="text-gold2 mr-[5px]">✓</span>No commitment &nbsp;·&nbsp; <span className="text-gold2 mr-[5px]">✓</span>Response within 24 hrs
          </div>
        </div>
      </section>

      <Footer variant="home" />
      <BackToTop />
    </>
  );
}
