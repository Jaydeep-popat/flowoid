import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const projects = [
  { img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', tag:'Enterprise Software', title:'Real-Time Analytics Platform', desc:'Built for a Fortune 500 financial client — processes 50M events/day with sub-second latency using Apache Kafka and ClickHouse.', tags:['React','Node.js','Kafka','ClickHouse'], stat1:'50M', stat1l:'Events/Day', stat2:'<100ms', stat2l:'Latency' },
  { img:'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop', tag:'Cybersecurity',      title:'Zero-Trust Security Framework', desc:'Deployed across 12 global offices, protecting sensitive financial data. Achieved SOC2 Type II and ISO 27001 compliance.', tags:['Zero-Trust','SIEM','SOC2','ISO 27001'], stat1:'12', stat1l:'Global Offices', stat2:'0', stat2l:'Breaches' },
  { img:'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop', tag:'Cloud Migration',    title:'Multi-Cloud Migration for HealthTech', desc:'Migrated 14-year-old legacy EHR systems to AWS with zero downtime, 60% cost reduction, and HIPAA compliance maintained.', tags:['AWS','Terraform','Docker','HIPAA'], stat1:'60%', stat1l:'Cost Reduction', stat2:'0', stat2l:'Downtime Hours' },
  { img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', tag:'ERP Integration',    title:'SAP + Custom CRM Integration', desc:'Unified 8 disconnected enterprise systems for a 200+ store retail chain. Automated 70% of reconciliation workflows.', tags:['SAP','REST API','Python','PostgreSQL'], stat1:'8', stat1l:'Systems Unified', stat2:'15h', stat2l:'Saved/Week' },
  { img:'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop', tag:'AI / ML',             title:'AI-Powered Customer Support Platform', desc:'LLM-powered support system handling 80% of tier-1 queries automatically, reducing support costs by 55% for a SaaS company.', tags:['OpenAI','LangChain','FastAPI','React'], stat1:'80%', stat1l:'Queries Automated', stat2:'55%', stat2l:'Cost Reduction' },
  { img:'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop', tag:'DevOps',              title:'Enterprise DevSecOps Pipeline', desc:'Built a fully automated CI/CD infrastructure for a 150-person engineering team. Reduced deployment time from 4 hours to 8 minutes.', tags:['Kubernetes','GitHub Actions','Terraform','ArgoCD'], stat1:'97%', stat1l:'Deploy Success', stat2:'8m', stat2l:'Deploy Time' },
];

const stats = [{ n:'1,200+', l:'Projects Delivered' },{ n:'300+', l:'Enterprise Clients' },{ n:'28', l:'Countries' },{ n:'99%', l:'On-Time Rate' }];

export default function Projects() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div className="relative min-h-[54vh] bg-white flex items-center px-[6%] pt-32 pb-20 mt-[68px] overflow-hidden"
        style={{ background:'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)',backgroundSize:'36px 36px',maskImage:'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
        <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',filter:'blur(55px)' }} />
        <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none" style={{ width:700,height:700,right:-220,top:-220 }} />
        <div className="relative z-[2] max-w-[1240px] w-full">
          <div className="flex items-center gap-2 text-[.74rem] font-semibold text-muted tracking-[.08em] uppercase mb-[18px]">Home <span className="opacity-40">/</span> <span className="text-gold">Projects</span></div>
          <div className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-b4 shadow-[0_0_8px_rgba(72,69,168,.5)]" />Our Portfolio
          </div>
          <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-[18px]">Work That <span className="grad-text">Speaks</span><br />For Itself</h1>
          <p className="text-[1.05rem] leading-[1.82] text-body max-w-[580px]">1,200+ projects delivered across 28 countries — from Fortune 500 platforms to high-growth start-ups. Every case study is a proof of what's possible.</p>
        </div>
      </div>

      {/* STATS BAND */}
      <div className="bg-gm px-[6%] py-14 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(201,168,76,.12),transparent_50%)] before:pointer-events-none">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 relative z-[1]">
          {stats.map((s, i) => (
            <div key={i} className={`sr d${i+1} text-center py-4 border-r border-white/10 last:border-r-0`}>
              <div className="font-heading text-[2.6rem] font-black text-white leading-none">{s.n}</div>
              <div className="text-[.8rem] font-semibold text-white/55 mt-[5px]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[52px]">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Case Studies</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">Featured <em className="not-italic grad-text">Projects</em></h2>
            <p className="text-[.97rem] leading-[1.8] text-muted max-w-[520px] mx-auto">Real challenges, real solutions, real results — backed by data.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {projects.map((p, i) => (
              <div key={i} className={`sr d${(i%3)+1} group bg-white border-[1.5px] border-border rounded-[20px] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-b4`}>
                <div className="h-[210px] overflow-hidden relative">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[500ms] group-hover:scale-[1.07]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.75),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-4">
                    <span className="text-white text-[.78rem] font-bold">View Case Study →</span>
                  </div>
                </div>
                <div className="p-[22px]">
                  <div className="inline-block px-[10px] py-[3px] rounded-full text-[.65rem] font-bold text-gold bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.2)] mb-3 tracking-[.04em]">{p.tag}</div>
                  <div className="font-heading text-[.98rem] font-bold text-dark mb-[7px] leading-[1.4]">{p.title}</div>
                  <p className="text-[.82rem] text-muted leading-[1.62] mb-[14px]">{p.desc}</p>
                  <div className="flex flex-wrap gap-[6px] mb-[18px]">
                    {p.tags.map((t, j) => (
                      <span key={j} className="px-[10px] py-[3px] bg-pale border border-border text-[.7rem] text-body rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 pt-3 border-t border-border">
                    <div className="text-center">
                      <div className="font-heading text-[1.4rem] font-black text-dark leading-none">{p.stat1}</div>
                      <div className="text-[.68rem] text-muted mt-[2px]">{p.stat1l}</div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-center">
                      <div className="font-heading text-[1.4rem] font-black text-dark leading-none">{p.stat2}</div>
                      <div className="text-[.68rem] text-muted mt-[2px]">{p.stat2l}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-page px-[6%] py-20">
        <div className="sr max-w-[1240px] mx-auto bg-gm rounded-[28px] px-[60px] py-[72px] text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)',backgroundSize:'28px 28px' }} />
          <div className="absolute pointer-events-none rounded-full" style={{ width:640,height:640,top:-220,right:-160,background:'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',filter:'blur(24px)' }} />
          <h2 className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">Want Results Like These?</h2>
          <p className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">Every project starts with a conversation. Share your challenge and let's architect the right solution together.</p>
          <div className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-dark bg-gg shadow-[0_8px_28px_rgba(201,168,76,.4)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_14px_38px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">Start a Project →</Link>
            <Link to="/services" className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">Explore Services</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
