import { Link } from 'react-router-dom';
import { Code2, Bot, Globe, Smartphone, Cloud } from 'lucide-react';

const services = [
  { n: '01', id: 'custom-software', Icon: Code2, name: 'Custom Software Development',     info: 'Purpose-built systems for internal teams and operations — ERP-style tools, workflows, and integrations that match how you actually work.' },
  { n: '02', id: 'ai-chatbot',      Icon: Bot,   name: 'Custom AI Chatbot Development',   info: 'AI assistants that answer customers on your site, WhatsApp, or helpdesk — fewer repetitive tickets, consistent answers around the clock.' },
  { n: '03', id: 'web-apps',        Icon: Globe, name: 'Web Applications',                info: 'Fast, responsive web application development for dashboards, storefronts, and customer-facing sites — including businesses across Gujarat.' },
  { n: '04', id: 'mobile-apps',     Icon: Smartphone, name: 'Mobile Applications',        info: 'From concept to store listing, we ship iOS and Android apps focused on speed, reliability, and an experience people want to open again.' },
  { n: '05', id: 'cloud-solutions', Icon: Cloud, name: 'Cloud Solutions',                 info: 'Architecture, migration, and tuning on AWS, Azure, or GCP — so your stack stays resilient, observable, and cost-aware as you grow.' },
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
          {services.map((s, i) => {
            const SIcon = s.Icon;
            return (
              <Link to={`/services#${s.id}`} key={i} className={`sr d${Math.min(i, 5)} group relative overflow-hidden rounded-[22px] border p-[34px_28px] cursor-pointer transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] shadow-sm bg-white border-border hover:bg-gm hover:border-transparent hover:-translate-y-[7px] hover:shadow-[0_28px_64px_rgba(15,14,42,.42)]`}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[rgba(201,168,76,.4)] transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] origin-left scale-x-0 group-hover:scale-x-100" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(201,168,76,.1),transparent_50%)] transition-opacity duration-[380ms] pointer-events-none" />
                
                <div className="text-[.66rem] font-bold tracking-[.12em] mb-5 relative z-[1] text-light group-hover:text-white transition-colors duration-[380ms]">{s.n}</div>
                
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5 relative z-[1] transition-all duration-[380ms] ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.12] group-hover:-rotate-[5deg] border bg-pale border-border text-b4 group-hover:bg-[rgba(201,168,76,.15)] group-hover:border-[rgba(201,168,76,.3)] group-hover:text-gold2">
                  <SIcon size={22} strokeWidth={1.8} />
                </div>
                
                <div className="font-heading text-[1.06rem] font-bold mb-[10px] relative z-[1] text-dark group-hover:text-white transition-colors duration-[380ms]">{s.name}</div>
                
                <p className="text-[.85rem] leading-[1.72] mb-5 relative z-[1] text-muted group-hover:text-white/85 transition-colors duration-[380ms]">{s.info}</p>
                
                <span className="inline-flex items-center gap-[6px] text-[.81rem] font-bold relative z-[1] transition-all duration-300 group-hover:gap-3 text-b4 group-hover:text-gold3">Explore →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
