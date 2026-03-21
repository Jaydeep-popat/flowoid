import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/* ── Flowoid F mark (SVG) ───────────────────────────────── */
function FlowoidMark() {
  return (
    <svg viewBox="0 0 90 105" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 50, height: 58 }}>
      <defs>
        <linearGradient id="pm1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60c8f5" />
          <stop offset="100%" stopColor="#2e7fd8" />
        </linearGradient>
        <linearGradient id="pm2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93daf8" stopOpacity={0.85} />
          <stop offset="100%" stopColor="#3a8ee0" />
        </linearGradient>
        <linearGradient id="pm3" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#baeeff" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#4aa8e8" />
        </linearGradient>
        <linearGradient id="pm4" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a0d8f5" stopOpacity={0.65} />
          <stop offset="100%" stopColor="#2563b8" stopOpacity={0.8} />
        </linearGradient>
      </defs>
      <path d="M8 90 C8 90 10 70 18 62 C26 54 34 54 42 56 C34 64 30 72 30 82 C30 92 36 100 44 102 C38 104 30 104 22 100 C14 96 8 90 8 90Z" fill="url(#pm3)" opacity={0.8} />
      <path d="M14 56 C14 56 20 40 32 34 C44 28 58 32 68 40 C56 38 44 40 36 48 C28 56 28 68 32 78 C26 74 20 68 18 62 C16 58 14 56 14 56Z" fill="url(#pm2)" opacity={0.88} />
      <path d="M22 42 C22 42 28 34 40 32 C52 30 68 34 80 42 C68 40 54 38 44 42 C34 46 30 54 32 62 C28 56 24 50 22 44 C22 42 22 42 22 42Z" fill="url(#pm1)" opacity={0.95} />
      <path d="M24 6 C24 6 38 2 54 6 C70 10 82 20 86 34 C78 26 64 20 50 20 C36 20 26 28 22 38 C20 32 20 22 24 14 C26 10 24 6 24 6Z" fill="url(#pm1)" />
      <path d="M34 4 C34 4 52 0 68 8 C80 14 86 26 84 38 C76 28 62 22 48 24 C36 26 28 34 26 44 C24 36 26 24 32 16 C34 10 34 4 34 4Z" fill="url(#pm4)" opacity={0.6} />
      <path d="M38 8 C46 4 60 6 70 14 C60 10 48 12 40 20 C42 16 40 10 38 8Z" fill="white" opacity={0.32} />
    </svg>
  );
}

/* ── Single orbital ring ─────────────────────────────────── */
function Ring({
  size, dir = 1, duration, color, dotColor,
}: {
  size: number; dir?: 1 | -1; duration: number; color: string; dotColor?: string;
}) {
  return (
    <motion.div
      style={{
        position: 'absolute', width: size, height: size, borderRadius: '50%',
        border: '1px solid transparent',
        borderTopColor: color,
        borderRightColor: `${color}44`,
        borderBottomColor: 'transparent',
        borderLeftColor: `${color}18`,
      }}
      animate={{ rotate: dir === 1 ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {dotColor && (
        <div style={{
          position: 'absolute', top: -1, left: '50%',
          transform: 'translateX(-50%)',
          width: 5, height: 5, borderRadius: '50%',
          background: dotColor,
          boxShadow: `0 0 6px ${dotColor}`,
        }} />
      )}
    </motion.div>
  );
}

export default function Preloader() {
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: 0.5 } },
  };

  const charVariant = {
    hidden: { y: '115%', rotateZ: 5, opacity: 0 },
    visible: { y: '0%', rotateZ: 0, opacity: 1, transition: { duration: 0.85, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', overflow: 'hidden',
        /* Clean light-blue-to-white background */
        background:
          'radial-gradient(ellipse 100% 80% at 50% 35%, #d6eefa 0%, #e8f5fd 38%, #f3faff 65%, #ffffff 100%)',
      }}
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1.06,
        filter: 'blur(18px)',
        transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
      }}
    >

      {/* Fine dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(42,120,200,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Large soft background rings */}
      {[360, 500, 640].map((s, i) => (
        <motion.div key={s} style={{
          position: 'absolute', width: s, height: s, borderRadius: '50%',
          border: `1px solid rgba(80,160,230,${0.065 - i * 0.012})`,
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.1 * i, ease: EASE }}
        />
      ))}

      {/* Ambient centre glow */}
      <motion.div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(100,190,255,0.14) 0%, rgba(60,140,220,0.06) 45%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />

      {/* ── Main content ───────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>

        {/* Logo + brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>

          {/* Spinner + mark */}
          <motion.div
            style={{ position: 'relative', width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <Ring size={94}  dir={1}  duration={3.0} color="rgba(50,140,225,0.55)"  dotColor="rgba(50,140,225,0.85)" />
            <Ring size={76}  dir={-1} duration={2.1} color="rgba(30,110,200,0.38)"  dotColor="rgba(30,110,200,0.7)" />
            <Ring size={60}  dir={1}  duration={4.5} color="rgba(100,185,250,0.25)" />

            {/* Centre glow pulse */}
            <motion.div style={{
              position: 'absolute', width: 48, height: 48, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(100,190,255,0.22), transparent 70%)',
            }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Logo mark */}
            <motion.div
              style={{ position: 'relative', zIndex: 2, filter: 'drop-shadow(0 2px 10px rgba(40,130,220,0.28))' }}
              animate={{ rotate: [0, 3, 0, -3, 0], scale: [1, 1.03, 1.05, 1.03, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FlowoidMark />
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

            {/* Flowoid – per-char */}
            <motion.div style={{ display: 'flex', alignItems: 'baseline' }}
              variants={stagger} initial="hidden" animate="visible"
            >
              {"Flowoid".split('').map((char, i) => (
                <span key={i} style={{ overflow: 'hidden', display: 'inline-block', lineHeight: 1, paddingBottom: 2 }}>
                  <motion.span
                    variants={charVariant}
                    style={{
                      display: 'inline-block',
                      fontFamily: '"DM Sans","Plus Jakarta Sans",system-ui,sans-serif',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      fontSize: 'clamp(1.9rem,4.8vw,3rem)',
                      lineHeight: 1,
                      color: '#0f2d50',
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </motion.div>

            {/* Technology */}
            <motion.span
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ delay: 1.1 }}
              style={{
                fontFamily: '"DM Sans",system-ui,sans-serif',
                fontWeight: 500, fontSize: 11,
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'rgba(30,100,180,0.46)',
              }}
            >
              Technology
            </motion.span>
          </div>
        </div>

        {/* Hairline separator */}
        <motion.div style={{
          width: 1, height: 26,
          background: 'linear-gradient(180deg,transparent,rgba(60,140,220,0.18),transparent)',
        }}
          initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        />

        {/* Tagline */}
        <div style={{ overflow: 'hidden' }}>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 1.1 }}
            style={{
              fontFamily: '"DM Sans",system-ui,sans-serif',
              fontWeight: 500, fontSize: '0.7rem',
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'rgba(30,100,180,0.38)', textAlign: 'center',
            }}
          >
            Build to Flow
          </motion.p>
        </div>

        {/* Progress bar */}
        <motion.div style={{
          width: 240, height: 1.5, borderRadius: 8,
          overflow: 'hidden', position: 'relative',
          background: 'rgba(60,140,220,0.09)',
        }}
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
        >
          <motion.div style={{
            position: 'absolute', inset: '0 auto 0 0', borderRadius: 8,
            background: 'linear-gradient(90deg,#93c5fd 0%,#3b82f6 55%,#1d4ed8 100%)',
            boxShadow: '0 0 6px rgba(59,130,246,0.35)',
          }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.0, duration: 1.4, ease: CURTAIN_EASE }}
          />
        </motion.div>

        {/* Pulse dots */}
        <motion.div style={{ display: 'flex', gap: 7 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {[0, 0.2, 0.4].map((d, i) => (
            <motion.div key={i}
              style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(60,140,220,0.25)' }}
              animate={{
                scale: [1, 1.6, 1],
                background: ['rgba(60,140,220,0.25)', 'rgba(59,130,246,0.85)', 'rgba(60,140,220,0.25)'],
              }}
              transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom meta */}
      <motion.div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
      }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
      >
        <span style={{
          fontFamily: '"DM Sans",system-ui,sans-serif',
          fontWeight: 500, fontSize: '0.6rem',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(30,100,180,0.2)',
        }}>
          Est. 2020 · India · 28+ Countries
        </span>
      </motion.div>

    </motion.div>
  );
}
