import { Link } from 'react-router-dom';

const services = [
  { n: '01', ico: '🖥️', name: 'Custom Software Development',     info: 'End-to-end development of web, mobile, and desktop applications tailored precisely to your business workflows and requirements.' },
  { n: '02', ico: '☁️', name: 'Cloud Infrastructure & Migration', info: 'Seamlessly migrate to AWS, Azure, or GCP. We design scalable, cost-efficient cloud architectures that grow with your business.', feat: true },
  { n: '03', ico: '🔐', name: 'Cybersecurity Solutions',          info: 'Comprehensive security audits, penetration testing, threat monitoring, and compliance frameworks to keep your data protected 24/7.' },
  { n: '04', ico: '📊', name: 'Data Analytics & BI',             info: 'Transform raw data into actionable intelligence. Real-time dashboards, data warehouses, and predictive analytics pipelines built for you.' },
  { n: '05', ico: '🔗', name: 'ERP & System Integration',        info: 'Connect disparate tools and systems. We implement and integrate ERP, CRM, and third-party platforms without disrupting operations.' },
  { n: '06', ico: '🤝', name: 'IT Consulting & Strategy',        info: 'Strategic technology advisory to align your IT investments with business goals — roadmaps, vendor selection, and digital transformation.' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-24 px-[5%]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex justify-between items-end gap-8 mb-14 flex-wrap">
          <div>
            <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Our Services</div>
            <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">IT Solutions Built<br /><span className="grad-text">For Your Exact Needs</span></h2>
          </div>
          <Link to="/services" className="sr d2 px-[22px] py-[10px] rounded-[10px] text-[.84rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-all duration-[250ms] hover:bg-pale2 hover:border-b4">View All Services →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className={`sr d${Math.min(i, 5)} group relative overflow-hidden rounded-[22px] border p-[34px_28px] cursor-pointer transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] shadow-sm ${s.feat ? 'bg-gm border-transparent shadow-[0_16px_48px_rgba(15,14,42,.3)] hover:-translate-y-[7px] hover:shadow-[0_28px_64px_rgba(15,14,42,.42)]' : 'bg-white border-border hover:border-[rgba(45,43,107,.18)] hover:-translate-y-[7px] hover:shadow-md'}`}>
              <div className={`absolute top-0 left-0 right-0 h-[2px] transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] origin-left scale-x-0 group-hover:scale-x-100 ${s.feat ? 'scale-x-100 bg-[rgba(201,168,76,.4)]' : 'bg-gg'}`} />
              {!s.feat && <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(160deg,#F0F0FA,transparent_55%)] transition-opacity duration-[380ms] pointer-events-none" />}
              {s.feat && <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,168,76,.1),transparent_50%)] pointer-events-none" />}
              <div className={`text-[.66rem] font-bold tracking-[.12em] mb-5 relative z-[1] ${s.feat ? 'text-white' : 'text-light'}`}>{s.n}</div>
              <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[1.45rem] mb-5 relative z-[1] transition-transform duration-[380ms] ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.12] group-hover:-rotate-[5deg] border ${s.feat ? 'bg-[rgba(201,168,76,.15)] border-[rgba(201,168,76,.3)]' : 'bg-pale border-border'}`}>{s.ico}</div>
              <div className={`font-heading text-[1.06rem] font-bold mb-[10px] relative z-[1] ${s.feat ? 'text-white' : 'text-dark'}`}>{s.name}</div>
              <p className={`text-[.85rem] leading-[1.72] mb-5 relative z-[1] ${s.feat ? 'text-white' : 'text-muted'}`}>{s.info}</p>
              <span className={`inline-flex items-center gap-[6px] text-[.81rem] font-bold relative z-[1] transition-[gap] duration-300 group-hover:gap-3 ${s.feat ? 'text-gold3' : 'text-b4'}`}>Explore →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
