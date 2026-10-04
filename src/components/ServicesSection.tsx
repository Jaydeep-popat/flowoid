import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Globe, Monitor, Smartphone, ShoppingBag, Briefcase } from 'lucide-react';

const services = [
  {
    n: '01',
    id: 'custom-software',
    Icon: Code2,
    badge: 'Primary Specialization',
    title: 'Custom Software Development',
    description: 'Internal operational tools, warehouse inventory tracking, and billing systems designed around the way your team actually works — replacing chaotic spreadsheets.',
    examples: 'Dispatch Portals · Inventory Hubs · Billing Workflows',
    cta: 'See custom software',
  },
  {
    n: '02',
    id: 'website-dev',
    Icon: Globe,
    title: 'Website Development',
    description: 'Fast, responsive business websites and landing pages engineered to load in milliseconds and turn local visitors into paying customers.',
    examples: 'Business Sites · Landing Pages · Local SEO',
    cta: 'View website work',
  },
  {
    n: '03',
    id: 'web-apps',
    Icon: Monitor,
    title: 'Web Applications & Portals',
    description: 'Secure, browser-based customer portals, dealer ordering hubs, and live operational dashboards accessible from any device.',
    examples: 'Dealer Portals · Live Dashboards · Cloud Tools',
    cta: 'Explore web apps',
  },
  {
    n: '04',
    id: 'mobile-apps',
    Icon: Smartphone,
    title: 'Application & Mobile Dev',
    description: 'Practical Android and cross-platform mobile apps for field staff, warehouse workers, and customers with offline reliability.',
    examples: 'Android · Field Worker Tools · Offline Sync',
    cta: 'View mobile work',
  },
  {
    n: '05',
    id: 'e-commerce',
    Icon: ShoppingBag,
    title: 'E-Commerce Development',
    description: 'High-converting online stores, seamless checkout flows, payment gateway integrations, and live inventory sync built for growing brands.',
    examples: 'Online Stores · Payment Gateways · Catalogs',
    cta: 'Explore e-commerce',
  },
  {
    n: '06',
    id: 'portfolio-websites',
    Icon: Briefcase,
    title: 'Portfolio Websites',
    description: 'Visually compelling showcase websites for agencies, studios, consultants, and creators crafted to highlight your work and convert clients.',
    examples: 'Personal Portfolios · Showcases · Studio Sites',
    cta: 'View portfolio sites',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease,
    },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-28 md:py-32 px-[5%] border-b border-border/40">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
          className="flex justify-between items-end gap-8 mb-14 md:mb-16 flex-wrap"
        >
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
              WHAT WE BUILD
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
              Practical software built around <span className="grad-text">your business.</span>
            </h2>
            <p className="text-[1rem] leading-[1.75] text-body max-w-[65ch]">
              We only build what solves real operational bottlenecks: custom software, websites, browser web applications, mobile apps, e-commerce stores, and portfolio showcase sites.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[.88rem] font-bold text-white bg-mg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>View all services</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Services Composition — 6 Services in a balanced 3-column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => {
            const SIcon = s.Icon;
            return (
              <motion.div key={s.id} variants={cardVariants} className="flex">
                <Link
                  to={`/services#${s.id}`}
                  className="group relative flex flex-col justify-between w-full p-7 md:p-8 rounded-2xl bg-white border border-border hover:border-b4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    {/* Top: Icon, Badge & Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-pale border border-border flex items-center justify-center text-b4 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105 transition-all duration-200">
                        <SIcon size={20} strokeWidth={1.8} />
                      </div>
                      <div className="flex items-center gap-2">
                        {s.badge && (
                          <span className="text-[.68rem] font-bold uppercase tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-pale border border-border">
                            {s.badge}
                          </span>
                        )}
                        <span className="text-[.75rem] font-mono font-bold text-muted/70 tracking-wider">
                          {s.n}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-[1.18rem] font-bold text-dark mb-2.5 tracking-[-0.01em] group-hover:text-b4 transition-colors duration-200">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[.88rem] leading-[1.65] text-muted mb-6">
                      {s.description}
                    </p>
                  </div>

                  {/* Bottom: Examples & Contextual CTA */}
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-3 mt-auto">
                    <span className="text-[.76rem] text-muted font-medium tracking-tight">
                      {s.examples}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[.84rem] font-bold text-b4 group-hover:text-dark transition-colors duration-200 flex-shrink-0">
                      {s.cta} <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
