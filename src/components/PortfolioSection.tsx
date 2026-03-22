import { Link } from 'react-router-dom';

const portfolio = [
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', tag: 'Enterprise Software', name: 'Real-Time Analytics Platform',       desc: 'Built for a Fortune 500 client — processes 50M events/day with sub-second latency.', cls: 'sr-l' },
  { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop', tag: 'Cybersecurity',      name: 'Zero-Trust Security Framework',       desc: 'Deployed across 12 global offices, protecting sensitive financial data with SOC2 compliance.', cls: 'sr-r d1' },
  { img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop', tag: 'Cloud Migration',    name: 'Multi-Cloud Migration for HealthTech', desc: 'Migrated legacy EHR systems to AWS with zero downtime and 60% cost reduction.', cls: 'sr-l d2' },
  { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', tag: 'ERP Integration',    name: 'SAP + Custom CRM Integration',        desc: 'Unified 8 disconnected systems for a retail chain of 200+ stores with zero downtime.', cls: 'sr-r d3' },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-page py-24 px-[5%]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex justify-between items-end mb-[52px] gap-7 flex-wrap">
          <div>
            <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Our Work</div>
            <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">Projects That <span className="grad-text">Speak for Themselves</span></h2>
          </div>
          <Link to="/projects" className="sr d2 px-[22px] py-[10px] rounded-[10px] text-[.84rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-all duration-[250ms] hover:bg-pale2 hover:border-b4">View Full Portfolio →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          {portfolio.map((p, i) => (
            <div key={i} className={`${p.cls} group relative rounded-[30px] overflow-hidden aspect-video cursor-pointer shadow-sm`}>
              <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.07] block" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.94)_0%,rgba(8,7,28,.38)_55%,transparent_100%)] flex flex-col justify-end p-7">
                <div className="inline-block px-[11px] py-1 rounded-full bg-[rgba(201,168,76,.25)] border border-[rgba(201,168,76,.45)] text-[.67rem] font-bold text-gold3 uppercase tracking-[.09em] mb-[9px] w-fit">{p.tag}</div>
                <div className="font-heading text-[1.22rem] font-bold text-white mb-[7px]">{p.name}</div>
                <div className="text-[.8rem] text-white/56 leading-[1.55]">{p.desc}</div>
                <span className="inline-flex items-center gap-[6px] text-[.78rem] font-bold text-gold2 mt-3 opacity-0 translate-y-2 transition-all duration-[320ms] group-hover:opacity-100 group-hover:translate-y-0">View Case Study →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
