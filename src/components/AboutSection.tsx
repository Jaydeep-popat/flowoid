import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Wrench, Users, RefreshCw } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const principles = [
  {
    icon: Target,
    title: 'Start with the problem',
    desc: "We understand what you're trying to achieve before deciding what to build.",
  },
  {
    icon: Wrench,
    title: 'Keep things practical',
    desc: "We choose technology because it fits the project, not because it's fashionable.",
  },
  {
    icon: Users,
    title: 'Work closely',
    desc: 'You work directly with the people designing and building your product.',
  },
  {
    icon: RefreshCw,
    title: 'Keep improving',
    desc: 'We build in clear, focused milestones, learn from feedback, and improve as we go.',
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="bg-white py-28 md:py-32 px-[5%] border-b border-border/40">
      <div className="max-w-[1240px] mx-auto">
        <div ref={ref} className="max-w-[920px] mx-auto">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={container}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
                Who We Are
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={fadeUp}>
              <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-5">
                A dedicated engineering team that{' '}
                <span className="grad-text">takes the work seriously.</span>
              </h2>
            </motion.div>

            {/* Paragraph 1 */}
            <motion.p
              variants={fadeUp}
              className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mb-4"
            >
              Flowoid is a software development studio built by developers who enjoy solving difficult problems and turning ideas into products people can actually use.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              variants={fadeUp}
              className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mb-10"
            >
              We keep the team focused, the communication direct, and the technology practical. Every project gets close attention from the people building it.
            </motion.p>

            {/* 2x2 Feature Cards */}
            <motion.div
              variants={container}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {principles.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-b4 transition-[border-color,box-shadow,transform] duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 mb-4 transition-all duration-200 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-[.98rem] font-bold text-dark mb-1.5">
                    {title}
                  </h3>
                  <p className="text-[.84rem] text-muted leading-[1.6]">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
