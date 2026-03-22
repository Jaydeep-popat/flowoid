import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const statItems = [
  { end: 10, suf: '+', lbl: 'Happy Clients', ico: '🏢', desc: 'Startups & growing businesses', color: '#6B67D4', prog: 75 },
  { end: 10, suf: '+', lbl: 'Projects Delivered', ico: '🚀', desc: 'On time & within budget', color: '#C9A84C', prog: 90 },
  { end: 100, suf: '%', lbl: 'Client Satisfaction', ico: '⚡', desc: 'We don\'t stop until you\'re happy', color: '#10B981', prog: 99 },
  { end: 24, suf: '/7', lbl: 'Support & Availability', ico: '🛡️', desc: 'Always reachable when you need us', color: '#4845A8', prog: 100 },
];

function useCountUp(end: number, duration = 2200, delay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts + delay;
      const elapsed = ts - startTime;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(ease(progress) * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration, delay]);

  return { count, ref };
}

function StatCard({
  end, suf, lbl, ico, desc, prog, index,
}: typeof statItems[0] & { index: number }) {
  const { count, ref } = useCountUp(end, 2000, index * 180);
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const [vis, setVis] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dashOffset = vis ? circ * (1 - prog / 100) : circ;

  const display = useMemo(() => {
    if (end >= 1000) return (count / 1000).toFixed(count < 1000 ? 0 : 1).replace(/\.0$/, '') + 'K';
    return count.toString();
  }, [count, end]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.11 }}
      whileHover={{ y: -7, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
      className="relative group overflow-hidden rounded-[26px] p-[32px_28px] cursor-default bg-[#F6F9FC]"
      style={{
        border: '1px solid rgba(15, 23, 42, 0.04)',
        boxShadow: '0 8px 32px rgba(15,14,42,0.03), 0 1px 4px rgba(15,14,42,0.02), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[26px]"
        style={{ background: 'radial-gradient(circle at 50% -10%, rgba(201,168,76,0.14) 0%, transparent 65%)' }}
      />
      <div
        className="absolute top-0 left-[30%] right-[30%] h-[3px] rounded-b-full transition-all duration-500 group-hover:left-0 group-hover:right-0"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #F5DFA0, #C9A84C, transparent)' }}
      />

      <div className="flex items-center justify-between mb-[18px]">
        <div
          className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-[1.5rem] flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.18),rgba(245,223,160,0.12))', border: '1.5px solid rgba(201,168,76,0.30)' }}
        >
          {ico}
        </div>
        <svg width="70" height="70" viewBox="0 0 72 72" className="flex-shrink-0">
          <defs>
            <linearGradient id={`goldGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#F5DFA0" />
            </linearGradient>
          </defs>
          <circle cx="36" cy="36" r={radius} fill="none" strokeWidth="3.5" stroke="rgba(201,168,76,0.12)" />
          <circle
            cx="36" cy="36" r={radius} fill="none" strokeWidth="3.5"
            stroke={`url(#goldGrad-${index})`}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 36 36)"
            style={{ transition: vis ? 'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)' : 'none', filter: 'drop-shadow(0 0 5px rgba(201,168,76,0.55))' }}
          />
          <text x="36" y="40" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#B8922E" fontFamily="inherit">
            {prog}%
          </text>
        </svg>
      </div>

      <div ref={ref} className="font-heading leading-none mb-[8px] tracking-[-0.04em]" style={{ fontSize: 'clamp(2.3rem,3.8vw,3rem)' }}>
        <span style={{ color: '#1a1740' }}>{display}</span>
        <span style={{ background: 'linear-gradient(90deg,#C9A84C,#F5DFA0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>{suf}</span>
      </div>

      <div className="font-heading text-[.9rem] font-bold mb-[5px] leading-[1.3]" style={{ color: '#1a1740' }}>{lbl}</div>
      <div className="text-[.75rem] leading-[1.55]" style={{ color: '#7a7095' }}>{desc}</div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[26px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
      />
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-white pb-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.32) 50%, rgba(201,168,76,0.18) 70%, transparent 95%)' }} />

      <div className="text-center mb-10 px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase mb-3 text-gold"
        >
          <span className="w-5 h-[2px] rounded-sm bg-gg" />
          By The Numbers
          <span className="w-5 h-[2px] rounded-sm bg-gg" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.55rem)] text-dark leading-[1.12] tracking-[-0.03em]"
        >
          Results That Speak <span className="grad-text">For Themselves</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-[5%]">
        {statItems.map((s, i) => (
          <StatCard key={i} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}
