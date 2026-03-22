import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const allTestimonials = [
  { title: 'Smooth and Professional Experience',    q: "Flowoid built the complete management system for Hiyasha Solar, and we couldn't be happier. From tracking inventory to managing customer orders, everything runs smoothly now. Their team understood our solar business needs perfectly and delivered on time.",                                     init:'HP', name:'Hemalbhai Pethapara',   role:'Director @Hiyasha Solar System',          rating:5 },
  { title: 'Simplified Our Daily Operations',       q: "Before Flowoid stepped in, managing our solar panel installations and service records was a headache. They built us a clean, easy-to-use system that our entire team adopted within a week. Very responsive and genuinely helpful throughout the project.",                                   init:'GP', name:'Girishbhai Pethapara',  role:'Co-Director @Hiyasha Solar System',       rating:4.5 },
  { title: 'Beautiful Website, Great Results',      q: "Flowoid designed and developed our interior design portfolio website, and we've been getting more client inquiries since it launched. The design is elegant, loads fast, and showcases our work beautifully. They truly captured the essence of our brand.",                                    init:'BP', name:'Bharatbhai Pithadiya',  role:'Founder @Pithdiya Interior',              rating:5 },
  { title: 'Professional Team, Quality Work',       q: "We needed a website that reflects the quality of our interior work, and Flowoid delivered exactly that. The attention to detail in the UI and the smooth animations make our portfolio stand out. Communication was clear and they met every deadline.",                                    init:'VP', name:'Vijaybhai Pithadiya',   role:'Co-Founder @Pithdiya Interior',           rating:4 },
  { title: 'Exactly What Our Business Needed',      q: "Flowoid developed a stock management system that transformed how we track our inventory. No more manual registers — everything is digital, fast, and accurate now. They took the time to understand our workflow before building, and it shows in the final product.",                       init:'MJ', name:'Maheshbhai Jakasaniya', role:'Owner @Jakasaniya Trading Co.',            rating:4.5 },
  { title: 'Reliable and Practical Solution',        q: "We approached Flowoid for a stock management system and they delivered a practical, no-nonsense solution. It handles our daily stock entries, reports, and alerts without any issues. The system is straightforward and our staff picked it up quickly.",                                       init:'MP', name:'Monojbhai Popat',       role:'Proprietor @Popat Enterprises',            rating:4 },
  { title: 'Modern Website for Our Tile Business',  q: "Flowoid created a modern, visually appealing website for Nilkanth Traders that showcases our tile collection perfectly. Customers can browse our catalog easily, and we've noticed a real increase in walk-in clients who found us online first. Great team to work with.",                  init:'NT', name:'Nilkanth Traders',      role:'Tiles & Sanitary @Nilkanth Traders',       rating:4.5 },
];

function Stars({ n }: { n: number }) {
  const full = Math.floor(n);
  const hasHalf = n % 1 !== 0;
  return (
    <div className="flex items-center gap-[2px] mb-[10px]">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`full-${i}`} className="text-gold text-[1.05rem]">★</span>
      ))}
      {hasHalf && (
        <span key="half" className="relative inline-block text-[1.05rem] w-[1.05rem]">
          <span className="text-border">★</span>
          <span className="absolute inset-0 overflow-hidden w-[50%] text-gold">★</span>
        </span>
      )}
      {Array.from({ length: 5 - full - (hasHalf ? 1 : 0) }).map((_, i) => (
        <span key={`empty-${i}`} className="text-border text-[1.05rem]">★</span>
      ))}
    </div>
  );
}

/* ── Animated stat counter ── */
function StatCounter({ end, suffix, label, delay = 0 }: { end: number; suffix: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;
    const dur = 1400;
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (step >= steps) { setCount(end); clearInterval(timer); }
    }, dur / steps);
  }

  return (
    <motion.div
      ref={ref}
      className="text-center py-4 border-r border-white/10 last:border-r-0"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay }}
    >
      <div className="font-heading text-[2.6rem] font-black text-white leading-none">
        {count}{suffix}
      </div>
      <div className="text-[.8rem] font-semibold text-white/55 mt-[5px]">{label}</div>
    </motion.div>
  );
}

export default function Testimonials() {
  useScrollReveal();
  const [expanded, setExpanded] = useState<number | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.06 });

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div
        className="relative min-h-[54vh] bg-white flex items-center px-[5%] pt-3 md:pt-12 pb-20 mt-[80px] md:mt-[86px] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
        <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)', filter: 'blur(55px)' }} />
        <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none animate-spinSlow" style={{ width: 700, height: 700, right: -220, top: -220 }} />

        <motion.div
          className="relative z-[2] max-w-[1240px] w-full"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 text-[.74rem] font-semibold text-muted tracking-[.08em] uppercase mb-[18px]">
            Home <span className="opacity-40">/</span> <span className="text-gold">Testimonials</span>
          </motion.div>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2" />
            10+ Happy Clients
          </motion.div>
          <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-[18px]">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.85, ease } } }}>
                What Our Clients
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block grad-text" variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.85, ease, delay: 0.08 } } }}>
                Actually Say
              </motion.span>
            </span>
          </h1>
          <motion.p variants={fadeUp} className="text-[1.05rem] leading-[1.82] text-body max-w-[580px]">
            Don't take our word for it — hear from the companies and leaders who've trusted Flowoid to power their digital transformation.
          </motion.p>
        </motion.div>
      </div>

      {/* STATS BAND */}
      <div className="bg-gm px-[5%] py-14 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(201,168,76,.12),transparent_50%)] before:pointer-events-none">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 relative z-[1]">
          <StatCounter end={10} suffix="+" label="Happy Clients" delay={0} />
          <StatCounter end={100} suffix="%" label="Satisfaction Rate" delay={0.1} />
          <StatCounter end={5} suffix="/5" label="Average Rating" delay={0.2} />
          <StatCounter end={100} suffix="%" label="Client Retention" delay={0.3} />
        </div>
      </div>

      {/* TESTIMONIALS GRID */}
      <section className="bg-white py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div
            className="text-center mb-[52px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Client Stories</motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">Trusted by <em className="not-italic grad-text">Industry Leaders</em></motion.h2>
            <motion.p variants={fadeUp} className="text-[.97rem] leading-[1.8] text-muted max-w-[520px] mx-auto">Real clients, real outcomes, real feedback — unfiltered.</motion.p>
          </motion.div>

          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]"
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={container}
          >
            {allTestimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 40, scale: 0.94 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } } }}
                whileHover={{ y: -7, transition: { duration: 0.35, ease } }}
                className="group relative overflow-hidden rounded-[20px] border-[1.5px] border-border bg-white p-[28px] cursor-default transition-all duration-300 hover:shadow-xl hover:border-b4 hover:bg-gm"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,.06),transparent_60%)]" />
                <Stars n={t.rating} />
                <div className="font-heading text-[.98rem] font-bold mb-[11px] leading-[1.35] text-dark group-hover:text-white transition-colors duration-300">{t.title}</div>
                <AnimatePresence>
                  <p className={`text-[.87rem] leading-[1.78] mb-5 text-body group-hover:text-white/80 transition-colors duration-300 ${expanded !== i ? 'line-clamp-3' : ''}`}>{t.q}</p>
                </AnimatePresence>
                <hr className="border-none border-t border-border group-hover:border-white/15 mb-[17px] transition-colors duration-300" />
                <div className="flex items-center gap-[14px]">
                  <div className="w-[44px] h-[44px] rounded-full border-2 flex items-center justify-center font-heading text-[.88rem] font-black flex-shrink-0 bg-pale2 border-[rgba(45,43,107,.12)] text-b3 group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-all duration-300">{t.init}</div>
                  <div>
                    <div className="font-heading text-[.9rem] font-bold leading-tight text-dark group-hover:text-white transition-colors duration-300">
                      {t.name}
                      <span className="inline-block w-[8px] h-[8px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.55)] ml-[6px] align-middle animate-blink" />
                    </div>
                    <div className="text-[.74rem] mt-[2px] text-muted group-hover:text-white/55 transition-colors duration-300">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-page px-[5%] py-20">
        <motion.div
          className="max-w-[1240px] mx-auto bg-gm rounded-[28px] px-[60px] py-[72px] text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute pointer-events-none rounded-full" style={{ width: 640, height: 640, top: -220, right: -160, background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(24px)' }} />
          <h2 className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">Ready to Build Something Great?</h2>
          <p className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">Let's start with a free consultation. No commitment, no pressure — just a conversation about your goals.</p>
          <div className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-white bg-mg shadow-[0_10px_30px_rgba(20,16,58,.32)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(20,16,58,.44)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">Start Your Project →</Link>
            <Link to="/services" className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">See Our Services</Link>
          </div>
        </motion.div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
