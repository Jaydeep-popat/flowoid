import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Hero Slides Data ───────────────────────────────── */
const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=500&fit=crop',
    tag: 'Dev Teams', label: 'Collaborative Engineering', stat: { v: '10+', l: 'Projects Shipped' },
    shape: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))',
    peekShape: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)',
    accent: '#4845A8',
  },
  {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop',
    tag: 'Enterprise', label: 'Enterprise-Grade Solutions', stat: { v: '10+', l: 'Happy Clients' },
    shape: 'polygon(48px 0%, 100% 0%, calc(100% - 48px) 100%, 0% 100%)',
    peekShape: 'polygon(30px 0%, 100% 0%, calc(100% - 30px) 100%, 0% 100%)',
    accent: '#C9A84C',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=500&fit=crop',
    tag: 'Strategy', label: 'Strategic IT Consulting', stat: { v: '100%', l: 'Client Satisfaction' },
    shape: 'ellipse(50% 48% at 50% 50%)', peekShape: 'ellipse(48% 46% at 50% 50%)',
    accent: '#10B981',
  },
  {
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=680&fit=crop',
    peek: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=500&fit=crop',
    tag: 'Cybersecurity', label: 'Zero-Trust Security', stat: { v: '24/7', l: 'Active Monitoring' },
    shape: 'polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%)',
    peekShape: 'polygon(50% 0%, 100% 28%, 100% 100%, 0% 100%, 0% 28%)',
    accent: '#6B67D4',
  },
];

const SLIDE_DURATION = 5000;

/* ─── Background Canvas ──────────────────────────────── */
function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    let W: number, H: number;
    let pts: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    let animId: number;
    function resize() { W = c!.width = c!.parentElement!.offsetWidth; H = c!.height = c!.parentElement!.offsetHeight; }
    resize();
    function init() {
      pts = [];
      const n = Math.floor(W * H / 18000);
      for (let i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, r: Math.random() * 1.1 + .3, a: Math.random() * .1 + .04 });
    }
    init();
    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,43,107,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) { ctx.beginPath(); ctx.strokeStyle = `rgba(45,43,107,${.05 * (1 - d / 80)})`; ctx.lineWidth = .4; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
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

/* ─── Hero Slider ────────────────────────────────────── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number, dir: 'next' | 'prev' = 'next') => {
    setDirection(dir); setCurrent(idx); setProgress(0);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    const totalSteps = SLIDE_DURATION / 50;
    let step = 0;
    progressRef.current = setInterval(() => { step++; setProgress(Math.min((step / totalSteps) * 100, 100)); }, 50);
    timerRef.current = setTimeout(() => { goTo((current + 1) % heroSlides.length, 'next'); }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, goTo]);

  const slide = heroSlides[current];
  const enterV = { next: { clipPath: 'inset(0 100% 0 0)', opacity: 0, scale: 1.06 }, prev: { clipPath: 'inset(0 0 0 100%)', opacity: 0, scale: 1.06 } };
  const exitV = { next: { clipPath: 'inset(0 0 0 100%)', opacity: 0, scale: 0.97 }, prev: { clipPath: 'inset(0 100% 0 0)', opacity: 0, scale: 0.97 } };

  return (
    <div className="relative w-full select-none" aria-label="Hero image slideshow" style={{ height: 520 }}>
      <div className="absolute pointer-events-none transition-colors duration-[1200ms]"
        style={{ width: 340, height: 340, top: '50%', left: '50%', transform: 'translate(-42%,-48%)', borderRadius: '50%', background: `radial-gradient(circle, ${slide.accent}28 0%, transparent 70%)`, filter: 'blur(40px)', zIndex: 0 }} />

      <AnimatePresence mode="wait">
        <motion.div key={`peek-${current}`} initial={{ opacity: 0, rotate: 9, scale: 0.88, x: 30, y: -30 }} animate={{ opacity: 1, rotate: 8, scale: 0.92, x: 24, y: -22 }} exit={{ opacity: 0, rotate: 12, scale: 0.84 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute overflow-hidden border-[3px] border-white shadow-[0_16px_48px_rgba(15,14,42,.22)] animate-heroPeek"
          style={{ width: 210, height: 162, top: '12%', right: '-8px', clipPath: slide.peekShape, transformOrigin: 'center center', zIndex: 1 }}>
          <img src={slide.peek} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `${slide.accent}1A` }} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={`slide-${current}`} custom={direction}
          variants={{ enter: (d: 'next' | 'prev') => ({ ...enterV[d] }), center: { clipPath: 'inset(0 0% 0 0)', opacity: 1, scale: 1 }, exit: (d: 'next' | 'prev') => ({ ...exitV[d] }) }}
          initial="enter" animate="center" exit="exit" transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="absolute overflow-hidden border-[3.5px] border-white shadow-[0_28px_72px_rgba(15,14,42,.24)]"
          style={{ width: '82%', height: 400, top: '8%', left: '2%', clipPath: slide.shape, transformOrigin: 'center center', zIndex: 2 }}>
          <img src={slide.src} alt={slide.label} loading="lazy" className="w-full h-full object-cover animate-heroKenBurns" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.85)_0%,rgba(8,7,28,.25)_50%,transparent_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-[22px_24px]">
            <div className="inline-block px-[10px] py-[3px] rounded-full text-[.6rem] font-bold uppercase tracking-[.1em] mb-[8px]"
              style={{ background: `${slide.accent}3A`, border: `1px solid ${slide.accent}70`, color: slide.accent === '#C9A84C' ? '#F5DFA0' : slide.accent === '#10B981' ? '#10B981' : '#a5a3f8' }}>
              {slide.tag}
            </div>
            <div className="font-heading text-[1.05rem] font-bold text-white leading-[1.3]">{slide.label}</div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
            <div className="h-full" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent}CC)`, transition: progress === 0 ? 'none' : 'width 50ms linear' }} />
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={`stat-${current}`} initial={{ opacity: 0, y: 18, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.92 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="absolute z-[4] bg-white/96 backdrop-blur-[18px] border border-[rgba(45,43,107,.1)] rounded-2xl px-4 py-3 shadow-[0_10px_36px_rgba(15,14,42,.14)]"
          style={{ bottom: '9%', right: '4%' }}>
          <div className="text-[.6rem] text-muted font-medium mb-[2px]">👁 {slide.stat.l}</div>
          <div className="font-heading text-[1.15rem] font-extrabold text-dark leading-none">{slide.stat.v}</div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute z-[5] flex flex-col items-center gap-[7px]" style={{ right: '-6px', top: '50%', transform: 'translateY(-50%)' }}>
        {heroSlides.map((s, i) => (
          <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => goTo(i, i > current ? 'next' : 'prev')} title={s.label} className="group flex items-center justify-center transition-all duration-300" style={{ width: 26, height: 26 }}>
            <div className="rounded-full transition-all duration-300 border-[2px]" style={{ width: i === current ? 12 : 7, height: i === current ? 12 : 7, background: i === current ? slide.accent : 'transparent', borderColor: i === current ? slide.accent : 'rgba(45,43,107,.22)', boxShadow: i === current ? `0 0 10px ${slide.accent}80` : 'none' }} />
          </button>
        ))}
      </div>

      <div className="absolute pointer-events-none" style={{ width: 260, height: 260, bottom: '-10%', left: '-6%', borderRadius: '50%', border: '1.5px dashed rgba(72,69,168,.1)', zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ width: 80, height: 80, bottom: '18%', left: '0%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,.14), transparent 70%)', filter: 'blur(12px)', zIndex: 0 }} />
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────── */
// const clientAvatars = [
//   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
//   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
//   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
//   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
// ];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen bg-page-dots grid grid-cols-1 lg:grid-cols-2 items-center px-[5%] gap-0 pt-[100px] md:pt-[130px]">
      {/* Rings */}
      <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width: 700, height: 700, top: -200, right: -180, borderColor: 'rgba(45,43,107,.05)' }} />
      <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width: 480, height: 480, top: -60, right: -40, borderColor: 'rgba(201,168,76,.06)' }} />
      <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width: 920, height: 920, bottom: -420, left: -200, borderColor: 'rgba(45,43,107,.04)' }} />
      {/* Glows */}
      <div className="absolute rounded-full pointer-events-none z-0 animate-fadeScale [animation-duration:3s] [animation-delay:100ms]" style={{ width: 560, height: 560, right: -60, top: -80, background: 'radial-gradient(circle,rgba(45,43,107,.06),transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute rounded-full pointer-events-none z-0 animate-fadeScale [animation-duration:3.5s] [animation-delay:250ms]" style={{ width: 420, height: 420, left: -80, bottom: -80, background: 'radial-gradient(circle,rgba(201,168,76,.05),transparent 70%)', filter: 'blur(44px)' }} />
      <BgCanvas />

      {/* Left — copy */}
      <motion.div className="relative z-[2] pt-2 md:pt-10 pb-[72px]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}>
        <motion.div variants={{ hidden: { opacity: 0, y: 15, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
          className="inline-flex items-center gap-2 px-[14px] py-[5px] pl-2 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.71rem] font-bold text-b3 tracking-[.1em] uppercase mb-[22px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-blink" />
          IT Startup · Est. 2026 · India
        </motion.div>

        <h1 className="font-heading font-black text-[clamp(2.8rem,5vw,4.4rem)] leading-[1.03] tracking-[-0.04em] text-dark mb-5 flex flex-col gap-1">
          <span className="block overflow-hidden"><motion.span className="block origin-left" variants={{ hidden: { y: '110%', rotateZ: 3, opacity: 0 }, visible: { y: '0%', rotateZ: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>We Build the Tech</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="block origin-left" variants={{ hidden: { y: '110%', rotateZ: 3, opacity: 0 }, visible: { y: '0%', rotateZ: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>That Powers</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="block origin-left grad-text pb-2" variants={{ hidden: { y: '110%', rotateZ: 3, opacity: 0 }, visible: { y: '0%', rotateZ: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>Your Business.</motion.span></span>
        </h1>

        <motion.p variants={{ hidden: { opacity: 0, filter: 'blur(8px)', y: 20 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
          className="text-[1.04rem] leading-[1.8] text-muted max-w-[455px] mb-[34px]">
          Flowoid delivers custom software, cloud solutions, and digital products — built to your exact requirements with clean code and modern architecture.
        </motion.p>

        <motion.div variants={{ visible: { transition: { staggerChildren: 0.04 } } }} className="flex flex-wrap gap-2 mb-9">
          {['☁️ Cloud Solutions', '🔐 Secure by Default', '⚡ Agile Delivery', '🤖 AI-Powered Bots'].map((c) => (
            <motion.div key={c} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-[5px] px-3 py-[5px] rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-semibold text-b3">
              {c}
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } } }}
          className="flex items-center gap-3 flex-wrap mb-0">
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" className="relative overflow-hidden inline-flex items-center gap-2 px-[26px] py-[13px] rounded-xl text-[.93rem] font-bold text-white bg-mg shadow-[0_8px_24px_rgba(20,16,58,.3)] transition-colors duration-[280ms] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.24),transparent_55%)] before:pointer-events-none hover:shadow-[0_16px_42px_rgba(20,16,58,.44)]">
              <span className="relative z-[1]">Start Your Project</span>
              <svg className="relative z-[1] w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }} className="flex items-center gap-[14px] mt-10">
          <div className="flex">
            {clientAvatars.map((src, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                className={`w-[33px] h-[33px] rounded-full border-[2.5px] border-white overflow-hidden shadow-[0_2px_8px_rgba(15,14,42,.1)] ${i > 0 ? '-ml-[9px]' : ''}`}>
                <img src={src} alt="client" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
          <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="text-[.79rem] text-muted leading-[1.55]">
            <strong className="text-dark">Trusted by startups & businesses</strong><br />across India and beyond
          </motion.div>
        </motion.div> */}
      </motion.div>

      {/* Right — slider */}
      <motion.div className="relative z-[2] hidden lg:flex items-center justify-center py-[60px]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.div variants={{ hidden: { opacity: 0, x: 40, filter: 'blur(12px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 } } }} className="w-full max-w-[520px]">
          <HeroSlider />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, x: -20, y: 10 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 } } }} className="absolute z-[6] top-[22%] -left-6 animate-ffa">
          <div className="bg-white/96 backdrop-blur-[18px] border border-[rgba(45,43,107,.1)] rounded-2xl px-4 py-3 flex items-center gap-[11px] shadow-[0_10px_36px_rgba(15,14,42,.12)] text-dark">
            <div className="w-[36px] h-[36px] rounded-[10px] flex-shrink-0 flex items-center justify-center text-[1rem] bg-pale border border-border">🚀</div>
            <div>
              <div className="text-[.65rem] text-muted mb-[2px] font-medium">Delivery Speed</div>
              <div className="font-heading text-[.92rem] font-extrabold leading-[1.2]">On-Time <span className="text-[.62rem] text-[#10B981] font-bold">every sprint</span></div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, x: -20, y: 10 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.85 } } }} className="absolute z-[6] bottom-[24%] -left-4 animate-ffb">
          <div className="bg-white/96 backdrop-blur-[18px] border border-[rgba(45,43,107,.1)] rounded-2xl px-4 py-3 flex items-center gap-[11px] shadow-[0_10px_36px_rgba(15,14,42,.12)] text-dark">
            <div className="w-[36px] h-[36px] rounded-[10px] flex-shrink-0 flex items-center justify-center text-[1rem] bg-pale border border-border">✅</div>
            <div>
              <div className="text-[.65rem] text-muted mb-[2px] font-medium">Client Retention</div>
              <div className="font-heading text-[.92rem] font-extrabold leading-[1.2]">100% <span className="text-[.62rem] text-[#10B981] font-bold">dedication</span></div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] z-[3] cursor-pointer"
        onClick={() => document.getElementById('logos')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-[.66rem] font-semibold text-light tracking-[.1em] uppercase">Scroll</span>
        <div className="w-[1.5px] h-9 bg-[linear-gradient(to_bottom,rgba(45,43,107,.3),transparent)] animate-scb" />
      </motion.div> */}
    </section>
  );
}
