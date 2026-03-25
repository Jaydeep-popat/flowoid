import { useRef, useCallback, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/* ─── Types ──────────────────────────────────────────── */
interface Tech {
  iconUrl: string;
  name: string;
  color: string;
  delay: number; // float animation delay in seconds
}

/* ─── Data ───────────────────────────────────────────── */
// Correct simpleicons CDN slugs — all verified
const techStack: Tech[] = [
  { iconUrl: "https://cdn.simpleicons.org/react/61DAFB",             name: "React",       color: "#61dafb", delay: 0.0  },
  { iconUrl: "https://cdn.simpleicons.org/typescript/3178C6",        name: "TypeScript",  color: "#3178c6", delay: 0.4  },
  { iconUrl: "https://cdn.simpleicons.org/nextdotjs/111827",         name: "Next.js",     color: "#888",    delay: 0.8  },
  { iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4",       name: "Tailwind",    color: "#06b6d4", delay: 1.2  },
  { iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E",         name: "Node.js",     color: "#68a063", delay: 1.6  },
  { iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1",        name: "PostgreSQL",  color: "#4169e1", delay: 2.0  },
  { iconUrl: "https://cdn.simpleicons.org/firebase/DD2C00",          name: "Firebase",    color: "#ffca28", delay: 0.2  },
  { iconUrl: "https://cdn.simpleicons.org/docker/2496ED",            name: "Docker",      color: "#2496ed", delay: 0.6  },
  { iconUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900", name: "AWS",         color: "#ff9900", delay: 1.0  },
  { iconUrl: "https://cdn.simpleicons.org/openai/10A37F",            name: "OpenAI",      color: "#10a37f", delay: 1.4  },
  { iconUrl: "https://cdn.simpleicons.org/redis/FF4438",             name: "Redis",       color: "#dc382d", delay: 1.8  },
  { iconUrl: "https://cdn.simpleicons.org/graphql/E10098",           name: "GraphQL",     color: "#e10098", delay: 2.2  },
];

const marqueeItems = [...techStack, ...techStack];

/* ─── Icon with letter fallback ──────────────────────── */
function TechIcon({ t, size = 36 }: { t: Tech; size?: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="rounded-xl flex items-center justify-center font-black text-white flex-shrink-0 text-[1rem] leading-none"
        style={{
          width: size,
          height: size,
          backgroundColor: t.color + "CC",
          fontSize: size * 0.38,
        }}
      >
        {t.name[0]}
      </span>
    );
  }

  return (
    <img
      src={t.iconUrl}
      alt={t.name}
      loading="lazy"
      decoding="async"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="object-contain flex-shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

/* ─── Magnetic Card ───────────────────────────────────── */
function MagneticCard({ t, i }: { t: Tech; i: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 240, damping: 26, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 240, damping: 26, mass: 0.5 });

  // RAF-throttled: fires at most once per frame, not on every pixel move
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafId.current !== null) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const el = containerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((clientX - r.left - r.width / 2) * 0.2);
        my.set((clientY - r.top - r.height / 2) * 0.2);
      });
    },
    [mx, my]
  );

  const onMouseLeave = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={containerRef}
      style={{ x: sx, y: sy, willChange: "transform" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.48,
        ease: [0.34, 1.15, 0.64, 1],
        delay: i * 0.045,
      }}
      className="group relative"
    >
      {/* Brand-colour glow — opacity transition only, GPU composited */}
      <div
        className="absolute inset-[-8px] rounded-[22px] opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 -z-10 blur-xl will-change-[opacity]"
        style={{ backgroundColor: t.color + "44" }}
      />

      {/* Card shell — only transform + border-color + box-shadow on hover */}
      <div
        className="relative flex flex-col items-center justify-center gap-3
                   py-6 px-3 rounded-[18px] cursor-default select-none overflow-hidden
                   bg-white border border-[rgba(45,43,107,.09)]
                   shadow-[0_2px_12px_rgba(15,14,42,.05)]
                   group-hover:border-[rgba(45,43,107,.18)]
                   group-hover:shadow-[0_10px_32px_rgba(15,14,42,.11)]
                   group-hover:-translate-y-[6px] group-hover:scale-[1.04]
                   transition-[border-color,box-shadow,transform] duration-300 will-change-transform"
        style={{
          animation: `float 5.5s ease-in-out infinite`,
          animationDelay: `${t.delay}s`,
        }}
      >
        {/* Shimmer — CSS translateX transition, no JS */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                     transition-transform duration-[650ms] ease-out pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg,transparent 38%,rgba(255,255,255,.5) 50%,transparent 62%)",
          }}
        />

        {/* Bottom colour bar — width: 0 → 55% on hover */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full
                     w-0 group-hover:w-[55%] transition-[width] duration-300"
          style={{ backgroundColor: t.color }}
        />

        {/* Icon */}
        <div className="group-hover:scale-[1.12] group-hover:-rotate-6
                        transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]">
          <TechIcon t={t} size={36} />
        </div>

        {/* Name */}
        <span className="text-[.8rem] font-bold tracking-wide text-center leading-tight
                         text-[#6B69A0] group-hover:text-dark transition-colors duration-300">
          {t.name}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Marquee row — 100% CSS animation, zero JS ─────── */
function MarqueeRow({ reversed = false }: { reversed?: boolean }) {
  return (
    <div
      className="flex overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right,transparent,black 8%,black 92%,transparent)",
        WebkitMaskImage:
          "linear-gradient(to right,transparent,black 8%,black 92%,transparent)",
      }}
    >
      <div
        className="flex gap-3 shrink-0 will-change-transform"
        style={{
          animation: reversed
            ? "marqueeright 36s linear infinite"
            : "marqueeleft 38s linear infinite",
        }}
      >
        {marqueeItems.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-[9px] px-4 py-[8px] rounded-full shrink-0
                       bg-white border border-[rgba(45,43,107,.08)]
                       shadow-[0_1px_5px_rgba(15,14,42,.05)]"
          >
            <TechIcon t={t} size={18} />
            <span className="text-[.74rem] font-semibold text-[#6B69A0] whitespace-nowrap">
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat Pill ──────────────────────────────────────── */
function StatPill({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-[5px]"
    >
      <span className="font-heading text-[1.9rem] font-black text-dark tracking-tighter leading-none">
        {value}
      </span>
      <span className="text-[.64rem] font-bold text-[#9997C2] tracking-[.15em] uppercase">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────── */
export default function TechStackSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative py-28 px-[5%] overflow-hidden bg-page-dots"
    >
      {/* Static ambient orbs — opacity pulse only, GPU safe */}
      <div
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full
                   pointer-events-none animate-pulse3 will-change-[opacity]"
        style={{
          background:
            "radial-gradient(circle,rgba(45,43,107,.08) 0%,transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full
                   pointer-events-none animate-pulse3 will-change-[opacity]"
        style={{
          background:
            "radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%)",
          animationDelay: "2.5s",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-[9px] text-[.72rem] font-extrabold
                       tracking-[.16em] uppercase text-gold mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span className="w-5 h-[2px] rounded-sm bg-gg" />
            Technology Stack
            <span className="w-5 h-[2px] rounded-sm bg-gg" />
          </motion.div>

          <motion.h2
            className="font-heading font-black text-[clamp(2rem,3.4vw,2.9rem)]
                       leading-[1.1] tracking-[-0.04em] text-dark"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14, duration: 0.55 }}
          >
            Powered by Industry‑Leading
            <br />
            <span className="grad-text">Technologies</span>
          </motion.h2>

          <motion.p
            className="mt-[14px] text-[.97rem] font-medium text-muted
                       max-w-[400px] mx-auto leading-[1.72]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.24, duration: 0.5 }}
          >
            Every tool chosen for performance, security in production, and long-term maintainability — so your product stays fast and evolvable.
          </motion.p>
        </motion.div>

        {/* Stat pills card */}
        <motion.div
          className="flex justify-center items-stretch gap-8 sm:gap-12 mb-14
                     px-8 py-5 mx-auto max-w-fit rounded-2xl
                     bg-white border border-[rgba(45,43,107,.09)]
                     shadow-[0_2px_18px_rgba(15,14,42,.06)]"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.5 }}
        >
          <StatPill value="12+" label="Technologies" />
          <div className="w-px bg-[rgba(45,43,107,.1)] self-stretch" />
          <StatPill value="5★" label="Stack Rating" />
          <div className="w-px bg-[rgba(45,43,107,.1)] self-stretch" />
          <StatPill value="100%" label="Production-Grade" />
        </motion.div>

        {/* Magnetic card grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[13px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {techStack.map((t, i) => (
            <MagneticCard key={t.name} t={t} i={i} />
          ))}
        </motion.div>

        {/* Infinite marquee — pure CSS keyframes from tailwind.config */}
        <motion.div
          className="mt-10 flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.55 }}
        >
          <MarqueeRow />
          <MarqueeRow reversed />
        </motion.div>

      </div>
    </section>
  );
}
