import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Terminal, Cpu, Database, Phone } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] bg-page-dots flex items-center px-[5%] pt-[110px] md:pt-[140px] pb-20 overflow-hidden">
      {/* Subtle Ambient Depth Circles */}
      <div className="absolute rounded-full pointer-events-none border border-[rgba(45,43,107,.05)] z-[1]" style={{ width: 700, height: 700, top: -200, right: -180 }} />
      <div className="absolute rounded-full pointer-events-none border border-[rgba(201,168,76,.06)] z-[1]" style={{ width: 480, height: 480, top: -60, right: -40 }} />
      <div className="absolute rounded-full pointer-events-none z-0" style={{ width: 560, height: 560, right: -60, top: -80, background: 'radial-gradient(circle,rgba(45,43,107,.05),transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute rounded-full pointer-events-none z-0" style={{ width: 420, height: 420, left: -80, bottom: -80, background: 'radial-gradient(circle,rgba(201,168,76,.05),transparent 70%)', filter: 'blur(44px)' }} />

      <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (60% width on desktop -> 7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          >

            {/* Headline */}
            <h1 className="font-heading font-black text-[clamp(2.3rem,4.6vw,4.1rem)] leading-[1.06] tracking-[-0.035em] text-dark mb-6">
              We build custom software &amp; web apps for{' '}
              <span className="grad-text">growing businesses.</span>
            </h1>

            {/* Subheading */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: 0.16 } } }}
              className="text-[1.05rem] leading-[1.78] text-muted max-w-[540px] mb-8"
            >
              Flowoid is an independent engineering team in Rajkot. We take ideas trapped in spreadsheets and manual paperwork and build clean, custom software your team will actually enjoy using.
            </motion.p>

            {/* Primary Action Button + Direct Contact Line */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: 0.22 } } }}
              className="flex items-center gap-3.5 flex-wrap mb-9"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[.93rem] font-bold text-white bg-mg shadow-[0_8px_24px_rgba(20,16,58,.28)] hover:shadow-[0_16px_40px_rgba(20,16,58,.42)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Get a Free 20-Min Review</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
              <a
                href="tel:+919924855931"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[.9rem] font-semibold text-b3 border border-[rgba(45,43,107,.14)] bg-white/70 hover:bg-white hover:border-b4 hover:text-dark transition-all duration-200"
              >
                <Phone size={15} className="text-gold" />
                <span>Call +91 99248 55931</span>
              </a>
            </motion.div>

            {/* Micro-Trust Signals */}
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-border/60 max-w-[520px]"
            >
              {[
                'In-person in Rajkot',
                'IT consulting',
                '100% client code ownership',
              ].map((item) => (
                <div key={item} className="inline-flex items-center gap-1.5 text-[.8rem] font-medium text-body">
                  <span className="text-gold font-bold text-sm">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Asymmetric Crafted Operational UI Window (5 cols, offset 24px) */}
          <motion.div
            className="lg:col-span-5 lg:translate-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 16 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <div className="relative">
              {/* Outer Browser Window Frame */}
              <div className="bg-white rounded-[22px] border border-border/90 shadow-[0_20px_50px_rgba(15,14,42,.12)] overflow-hidden">
                {/* Title Bar */}
                <div className="bg-[#FAFBFD] px-4 py-3 border-b border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="ml-2 text-[.72rem] font-mono text-muted font-medium">dispatch-hub.flowoid.internal</span>
                  </div>
                  <span className="text-[.68rem] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live System
                  </span>
                </div>

                {/* Window Body */}
                <div className="p-5 sm:p-6 bg-white space-y-4">
                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-pale/60 border border-border/80">
                      <div className="flex items-center justify-between text-[.7rem] text-muted font-medium mb-1">
                        <span>Today's Dispatches</span>
                        <Terminal size={12} className="text-b4" />
                      </div>
                      <div className="font-heading text-xl font-black text-dark">142 Units</div>
                      <div className="text-[.68rem] text-emerald-600 font-semibold mt-0.5">↑ 18% vs paper logs</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-pale/60 border border-border/80">
                      <div className="flex items-center justify-between text-[.7rem] text-muted font-medium mb-1">
                        <span>Turnaround</span>
                        <Cpu size={12} className="text-gold" />
                      </div>
                      <div className="font-heading text-xl font-black text-dark">3.8 min</div>
                      <div className="text-[.68rem] text-muted font-medium mt-0.5">was 45 min manual</div>
                    </div>
                  </div>

                  {/* Operational Data Rows */}
                  <div className="border border-border/70 rounded-xl overflow-hidden text-[.75rem]">
                    <div className="bg-pale/40 px-3 py-2 border-b border-border/70 flex justify-between font-bold text-dark text-[.7rem] uppercase tracking-wide">
                      <span>Order Ref</span>
                      <span>Client &amp; City</span>
                      <span>Status</span>
                    </div>

                    <div className="p-2.5 flex justify-between items-center border-b border-border/50 hover:bg-pale/20 transition-colors">
                      <span className="font-mono font-semibold text-b4">#ORD-9021</span>
                      <span className="text-dark font-medium truncate max-w-[130px]">Rajkot Precision</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[.66rem] font-bold">Dispatched</span>
                    </div>

                    <div className="p-2.5 flex justify-between items-center border-b border-border/50 hover:bg-pale/20 transition-colors">
                      <span className="font-mono font-semibold text-b4">#ORD-9022</span>
                      <span className="text-dark font-medium truncate max-w-[130px]">Morbi Ceramics Hub</span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[.66rem] font-bold">Packing</span>
                    </div>

                    <div className="p-2.5 flex justify-between items-center hover:bg-pale/20 transition-colors">
                      <span className="font-mono font-semibold text-b4">#ORD-9023</span>
                      <span className="text-dark font-medium truncate max-w-[130px]">Shapar Industrial</span>
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[.66rem] font-bold">In Review</span>
                    </div>
                  </div>

                  {/* Architecture & Integration Tag */}
                  <div className="flex items-center justify-between text-[.72rem] text-muted pt-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Database size={12} className="text-[#10B981]" />
                      PostgreSQL · Auto-Syncs with Tally / GST
                    </span>
                    <span className="font-mono font-bold text-dark text-xs">99.98% uptime</span>
                  </div>
                </div>
              </div>

              {/* Offset Engineering Stamp Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-border/90 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pale border border-border flex items-center justify-center text-b4 font-bold">
                  <ShieldCheck size={18} className="text-[#10B981]" />
                </div>
                <div>
                  <div className="text-[.68rem] text-muted font-bold uppercase tracking-wider">Engineering Standard</div>
                  <div className="font-heading text-[.82rem] font-bold text-dark">Built with React &amp; Node · 100% Client-Owned</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
