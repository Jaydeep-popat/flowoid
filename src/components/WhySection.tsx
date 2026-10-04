import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck } from 'lucide-react';

const whyFeatures = [
  {
    icon: Target,
    title: 'We understand before we build.',
    desc: 'We start with your goals, users, and day-to-day workflow before deciding what to build.',
  },
  {
    icon: Eye,
    title: 'You see the progress.',
    desc: 'We break the work into clear steps and keep you involved so there are no surprises at the end.',
  },
  {
    icon: ShieldCheck,
    title: 'We build for the long run.',
    desc: 'Clean architecture, testing, and practical technology help keep your software reliable as your business grows.',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

export default function WhySection() {
  return (
    <section id="why" className="bg-page py-24 px-[5%] border-b border-[rgba(45,43,107,.05)]">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Primary Visual */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full max-w-[560px] mx-auto"
        >
          <div className="rounded-2xl md:rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_16px_48px_rgba(15,14,42,.08)] border border-border bg-white">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
              alt="Modern software development workspace"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right: Text & Three Benefits */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
            WHY FLOWOID
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={fadeUpVariants} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.14] tracking-[-0.03em] text-dark mb-[14px]">
            We build <span className="grad-text">with you,</span><br />
            not just for you.
          </motion.h2>

          {/* Description */}
          <motion.p variants={fadeUpVariants} className="text-[.98rem] md:text-[1.02rem] leading-[1.75] text-muted max-w-[520px] mb-8">
            Good software starts with understanding the problem. We take the time to understand how your team works, then build, test, and improve the solution with you along the way.
          </motion.p>

          {/* Three Feature Cards */}
          <div className="flex flex-col gap-3.5">
            {whyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={cardItemVariants}
                  className="group flex gap-4 items-start p-5 rounded-xl bg-white border border-[rgba(45,43,107,.09)] transition-all duration-200 hover:-translate-y-[2px] hover:border-b4/30 hover:shadow-[0_6px_20px_rgba(15,14,42,.05)]"
                >
                  <div className="w-9 h-9 rounded-lg bg-page border border-border/80 flex-shrink-0 flex items-center justify-center text-b4 group-hover:bg-pale group-hover:text-dark transition-colors duration-200 mt-0.5">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[.98rem] font-bold text-dark mb-1 tracking-[-0.01em]">
                      {feat.title}
                    </h3>
                    <p className="text-[.86rem] leading-[1.65] text-muted">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
