'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const SILK = [0.16, 1, 0.3, 1] as const;
const SHARP = [0.76, 0, 0.24, 1] as const;

const BRAND_PRIMARY = '#2f6bff';
const BRAND_PURPLE  = '#9b4bff';
const BRAND_ORANGE  = '#ff6b4a';
const BRAND_GRADIENT = `linear-gradient(120deg, ${BRAND_PRIMARY} 0%, ${BRAND_PURPLE} 55%, ${BRAND_ORANGE} 100%)`;

const STAGES = [
  { pct: 18, label: 'Initialising',    chip: 'Starting up',  ms: 300 },
  { pct: 45, label: 'Loading assets',  chip: 'Loading',      ms: 1000 },
  { pct: 78, label: 'Preparing',       chip: 'Almost ready', ms: 1800 },
  { pct: 100, label: 'Ready',          chip: 'Ready',        ms: 2600 },
] as const;

function useCounter(target: number, duration = 700) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    const start = performance.now();
    let id = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setValue(Math.round(from + (target - from) * ease));
      if (p < 1) id = requestAnimationFrame(tick);
      else setValue(target);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);

  return value;
}

function StageDots({ active }: { active: number }) {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          animate={
            i < active
              ? { scale: 1, background: BRAND_PRIMARY, boxShadow: '0 0 6px rgba(47,107,255,.45)' }
              : i === active
              ? { scale: 1.35, background: BRAND_ORANGE, boxShadow: '0 0 0 4px rgba(255,107,74,.25)' }
              : { scale: 1, background: 'rgba(47,107,255,.15)', boxShadow: 'none' }
          }
          transition={{ duration: 0.35, ease: SILK as any }}
          style={{ width: 5, height: 5, borderRadius: '50%' }}
        />
      ))}
    </div>
  );
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base: CSSProperties = {
    position: 'absolute', width: 16, height: 16,
    borderColor: 'rgba(47,107,255,.22)',
    borderStyle: 'solid', borderWidth: 0,
  };

  const sides: Record<string, CSSProperties> = {
    tl: { top: 22, left: 22, borderTopWidth: 1, borderLeftWidth: 1 },
    tr: { top: 22, right: 22, borderTopWidth: 1, borderRightWidth: 1 },
    bl: { bottom: 22, left: 22, borderBottomWidth: 1, borderLeftWidth: 1 },
    br: { bottom: 22, right: 22, borderBottomWidth: 1, borderRightWidth: 1 },
  };

  return (
    <motion.div
      style={{ ...base, ...sides[pos] }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.55, duration: 0.6, ease: SILK as any }}
    />
  );
}

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [stageIdx, setStageIdx] = useState(-1);
  const [exiting, setExiting] = useState(false);

  const stage = STAGES[stageIdx] ?? STAGES[0];
  const counter = useCounter(stageIdx >= 0 ? stage.pct : 0);

  useEffect(() => {
    const timers = STAGES.map((s, i) => setTimeout(() => setStageIdx(i), s.ms));
    const exitTimeout = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onComplete?.(), 900);
    }, 3600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="flowoid-preloader"
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', background: '#f6f7fb',
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0, scale: 1.03, filter: 'blur(16px)',
            transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(47,107,255,.03) 1px,transparent 1px),' +
              'linear-gradient(90deg,rgba(47,107,255,.03) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)',
          }} />

          {[
            { x: '18%', y: '25%', w: 500, c: 'rgba(47,107,255,.08)', blur: 95, delay: 0 },
            { x: '78%', y: '65%', w: 420, c: 'rgba(155,75,255,.05)', blur: 80, delay: 0.12 },
            { x: '48%', y: '8%',  w: 340, c: 'rgba(255,107,74,.04)', blur: 70, delay: 0.24 },
          ].map((blob, i) => (
            <motion.div key={i} style={{
              position: 'absolute', left: blob.x, top: blob.y,
              width: blob.w, height: blob.w, borderRadius: '50%',
              background: blob.c, filter: `blur(${blob.blur}px)`,
              transform: 'translate(-50%,-50%)', pointerEvents: 'none',
            }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: blob.delay, duration: 2.2, ease: SILK as any }}
            />
          ))}

          <motion.div style={{
            position: 'absolute', left: 0, right: 0, height: 1, top: '50%',
            background:
              'linear-gradient(90deg,transparent 0%,rgba(47,107,255,.45) 20%,' +
              'rgba(155,75,255,.75) 50%,rgba(255,107,74,.45) 80%,transparent 100%)',
            transformOrigin: 'left',
          }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SHARP as any }}
          />

          {(['tl', 'tr', 'bl', 'br'] as const).map(position => (
            <Corner key={position} pos={position} />
          ))}

          <motion.div style={{
            position: 'absolute', top: 22,
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '5px 14px', borderRadius: 99,
            border: '1px solid rgba(47,107,255,.13)',
            background: 'rgba(255,255,255,.8)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: SILK as any }}
          >
            <motion.div
              style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND_PRIMARY }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(47,107,255,.45)',
                  '0 0 0 5px rgba(47,107,255,0)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.span
              key={stage.chip}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: '"Sora",system-ui,sans-serif',
                fontSize: '.6rem', fontWeight: 600,
                letterSpacing: '.15em', textTransform: 'uppercase',
                color: 'rgba(24,32,78,.58)',
              }}
            >
              {stage.chip}
            </motion.span>
          </motion.div>

          <div style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
          }}>

            <motion.div style={{
              position: 'absolute',
              width: 280, height: 280, borderRadius: '50%',
              background:
                'radial-gradient(circle,rgba(47,107,255,.12) 0%,transparent 70%)',
              filter: 'blur(36px)',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-52%)',
              pointerEvents: 'none',
            }}
              animate={{
                scale: [0.85, 1.08, 0.85],
                opacity: [0.45, 1, 0.45],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div style={{ position: 'relative' }}>
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ delay: 0.55, duration: 0.85, ease: SHARP as any }}
              >
                <img
                  src="/Flowoid_final.png"
                  alt="Flowoid — Build to Flow"
                  style={{
                    width: 290,
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    filter:
                      'drop-shadow(0 14px 40px rgba(47,107,255,.18))' +
                      ' drop-shadow(0 4px 16px rgba(155,75,255,.12))',
                  }}
                  draggable={false}
                />
              </motion.div>

              <motion.div style={{
                position: 'absolute', inset: 0, borderRadius: 8,
                background:
                  'linear-gradient(105deg,transparent 25%,' +
                  'rgba(255,255,255,.65) 50%,transparent 75%)',
                pointerEvents: 'none',
              }}
                initial={{ x: '-130%' }}
                animate={{ x: '230%' }}
                transition={{ delay: 1.2, duration: 0.75, ease: 'easeOut' }}
              />
            </motion.div>

            <motion.span style={{
              marginTop: 18,
              fontFamily: '"Sora",system-ui,sans-serif',
              fontWeight: 700,
              letterSpacing: '.32em',
              textTransform: 'uppercase',
              fontSize: '.85rem',
              background: BRAND_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6, ease: SILK as any }}
            >
              Flowoid
            </motion.span>

            <motion.div style={{
              marginTop: 14,
              display: 'flex', alignItems: 'center', gap: 10,
            }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.65, ease: SILK as any }}
            >
              <div style={{
                width: 28, height: 1,
                background:
                  'linear-gradient(90deg,transparent,rgba(47,107,255,.28))',
              }} />
              <span style={{
                fontFamily: '"Sora",system-ui,sans-serif',
                fontSize: '.62rem', fontWeight: 500,
                letterSpacing: '.26em', textTransform: 'uppercase',
                color: 'rgba(24,32,78,.42)',
              }}>
                Est. 2020 · India · 28+ Countries
              </span>
              <div style={{
                width: 28, height: 1,
                background:
                  'linear-gradient(90deg,rgba(255,107,74,.28),transparent)',
              }} />
            </motion.div>

            <motion.div style={{
              width: 1, height: 30, marginTop: 16,
              background:
                'linear-gradient(180deg,transparent,rgba(47,107,255,.22),transparent)',
            }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.55, ease: SILK as any }}
            />

            <motion.div style={{
              width: 280, marginTop: 0,
              display: 'flex', flexDirection: 'column', gap: 11,
            }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.65, ease: SILK as any }}
            >
              <div style={{
                width: '100%', height: 1.4,
                background: 'rgba(47,107,255,.13)',
                borderRadius: 99, position: 'relative',
              }}>
                <motion.div style={{
                  position: 'absolute', inset: '0 auto 0 0',
                  borderRadius: 99,
                  background: BRAND_GRADIENT,
                  boxShadow: '0 0 10px rgba(155,75,255,.35)',
                }}
                  animate={{ width: `${stage.pct}%` }}
                  transition={{ duration: 0.7, ease: SHARP as any }}
                />
                <motion.div style={{
                  position: 'absolute', top: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 5, height: 5, borderRadius: '50%',
                  background: BRAND_ORANGE,
                  boxShadow:
                    '0 0 0 3px rgba(255,107,74,.25),' +
                    '0 0 8px rgba(255,107,74,.6)',
                }}
                  animate={{ left: `${stage.pct}%` }}
                  transition={{ duration: 0.7, ease: SHARP as any }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{
                    fontFamily: '"Sora",system-ui,sans-serif',
                    fontSize: '1.1rem', fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums', minWidth: 36,
                    background: BRAND_GRADIENT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', color: 'transparent',
                  }}>
                    {counter}
                  </span>
                  <span style={{
                    fontFamily: '"Sora",system-ui,sans-serif',
                    fontSize: '.62rem', fontWeight: 500,
                    color: 'rgba(24,32,78,.4)',
                  }}>
                    %
                  </span>
                </div>

                <StageDots active={stageIdx} />

                <motion.span
                  key={stage.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: '"Sora",system-ui,sans-serif',
                    fontSize: '.58rem', fontWeight: 500,
                    letterSpacing: '.2em', textTransform: 'uppercase',
                    color: 'rgba(24,32,78,.35)',
                  }}
                >
                  {stage.label}
                </motion.span>
              </div>
            </motion.div>
          </div>

          <motion.div style={{
            position: 'absolute', bottom: 22,
            display: 'flex', alignItems: 'center', gap: 10,
          }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {['Flowoid', '28+ Countries', 'Build to Flow'].map((text, index) => (
              <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontFamily: '"Sora",system-ui,sans-serif',
                  fontSize: '.55rem', fontWeight: 500,
                  letterSpacing: '.22em', textTransform: 'uppercase',
                  color: 'rgba(24,32,78,.25)',
                }}>
                  {text}
                </span>
                {index < 2 && (
                  <span style={{
                    width: 2, height: 2, borderRadius: '50%',
                    background: 'rgba(24,32,78,.18)',
                    display: 'inline-block',
                  }} />
                )}
              </span>
            ))}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
