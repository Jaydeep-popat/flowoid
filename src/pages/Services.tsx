import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

type Category = 'all' | 'cloud' | 'security' | 'software' | 'data';

const services = [
  { cat: 'cloud' as Category,    ico: '☁️', badge: 'Most Popular', t: 'Cloud Infrastructure & Migration',    d: 'Seamlessly move your workloads to AWS, Azure, or GCP. We architect, migrate, optimize, and manage your cloud for maximum performance and cost efficiency.',         feats: ['Multi-cloud architecture design','Zero-downtime migrations','Cost optimization & FinOps','24/7 cloud monitoring & SLA'] },
  { cat: 'security' as Category, ico: '🔒', badge: 'Enterprise',    t: 'Cybersecurity & Compliance',          d: 'Protect your business with multi-layered security frameworks — threat detection, SOC monitoring, ISO 27001, SOC 2, and full GDPR compliance automation.',       feats: ['Penetration testing & audits','SIEM & SOC implementation','Compliance automation','Incident response planning'], feat: true },
  { cat: 'software' as Category, ico: '💻', badge: 'Custom Build',  t: 'Custom Software Development',         d: 'Bespoke applications built to your exact specifications — web platforms, mobile apps, enterprise portals, and SaaS products that scale with your ambitions.',    feats: ['Full-stack web development','Native iOS & Android apps','API design & integration','Scalable microservices'] },
  { cat: 'data' as Category,     ico: '📊', badge: 'Analytics',     t: 'Data Engineering & Analytics',        d: 'Transform raw data into strategic intelligence. We build pipelines, warehouses, dashboards, and ML models that turn your data into a competitive advantage.',     feats: ['Data warehouse architecture','Real-time streaming pipelines','BI dashboards & reporting','ML model deployment'] },
  { cat: 'software' as Category, ico: '🔄', badge: 'DevOps',        t: 'DevOps & CI/CD Automation',           d: 'Accelerate delivery cycles with modern DevOps practices — automated pipelines, container orchestration, and infrastructure-as-code that eliminate bottlenecks.', feats: ['CI/CD pipeline setup','Kubernetes & Docker','Terraform IaC automation','Observability & monitoring'] },
  { cat: 'data' as Category,     ico: '🤖', badge: 'AI / ML',       t: 'AI Integration & Automation',         d: 'Embed intelligent automation into your workflows — NLP chatbots, predictive analytics, computer vision, and LLM-powered enterprise tools that save real time.',   feats: ['LLM & GenAI integration','Process automation (RPA)','Predictive analytics models','Computer vision solutions'] },
];

const process = [
  { n: '01', t: 'Discovery & Strategy',     d: 'Deep-dive into your goals, tech requirements, and market to build a bulletproof blueprint.' },
  { n: '02', t: 'Architecture & Design',    d: 'Scalable system design and polished UI/UX prototypes reviewed and approved by you.' },
  { n: '03', t: 'Agile Development',        d: '2-week sprints with live demos. See real progress every fortnight, course-correct early.' },
  { n: '04', t: 'Launch & Support',         d: 'Rigorous QA, seamless deployment, and 24/7 ongoing support to keep you running flawlessly.' },
];

const techCats = [
  { ico: '☁️', label: 'Cloud Platforms', chips: ['AWS','Microsoft Azure','Google Cloud','DigitalOcean'] },
  { ico: '💻', label: 'Frontend',         chips: ['React','Next.js','Vue.js','TypeScript','Tailwind CSS'] },
  { ico: '⚙️', label: 'Backend',          chips: ['Node.js','Python','Go','Java Spring','.NET Core'] },
  { ico: '🗄️', label: 'Databases',        chips: ['PostgreSQL','MongoDB','Redis','Snowflake','Elasticsearch'] },
  { ico: '🔄', label: 'DevOps',           chips: ['Kubernetes','Docker','Terraform','Jenkins','GitHub Actions'] },
  { ico: '🤖', label: 'AI / ML',          chips: ['TensorFlow','PyTorch','OpenAI API','LangChain','Apache Spark'] },
];

const pricing = [
  { plan: 'Starter',    price: '$4,999',  sub: 'Best for MVPs & small business apps',   feats: ['Up to 5 core features','Responsive web app','Basic cloud deployment','30-day post-launch support'], noFeats: ['Custom integrations','Dedicated project manager'], btn: 'out', label: 'Get Started' },
  { plan: 'Growth',     price: '$14,999', sub: 'Best for scaling businesses',            feats: ['Unlimited features & modules','Mobile app (iOS + Android)','Advanced cloud architecture','Custom API integrations','Dedicated project manager','90-day post-launch support'], noFeats: [], btn: 'in', label: 'Get Started', pop: true },
  { plan: 'Enterprise', price: 'Custom',  sub: 'For large-scale enterprise projects',    feats: ['Full digital transformation','Multi-platform delivery','Dedicated engineering team','Security & compliance','SLA-backed 24/7 support','Ongoing retainer available'], noFeats: [], btn: 'out', label: 'Talk to Sales' },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Project timelines depend on complexity. An MVP typically takes 6–10 weeks. Mid-scale platforms take 3–5 months. Enterprise-grade systems can take 6–12 months. We provide a detailed timeline after the discovery phase.' },
  { q: 'Do you work with existing codebases?',  a: 'Absolutely. We frequently inherit legacy projects for modernization, refactoring, or expansion. Our team conducts a thorough technical audit before beginning any work on an existing codebase.' },
  { q: 'What happens after launch?',            a: 'Every project includes a post-launch support window. We offer ongoing retainer plans for maintenance, performance monitoring, feature development, and 24/7 emergency support.' },
  { q: "Can you sign an NDA before we discuss our project?", a: "Yes, always. We sign NDAs before any project discussion begins. Confidentiality is standard practice at TechSphere and built into every client relationship from day one." },
];

function PageHero() {
  return (
    <div className="relative min-h-[54vh] bg-white flex items-center px-[6%] pt-32 pb-20 mt-[68px] overflow-hidden"
      style={{ background:'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(201,168,76,.04),transparent 60%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)',backgroundSize:'36px 36px',maskImage:'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
      <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',filter:'blur(55px)' }} />
      <div className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)',filter:'blur(45px)' }} />
      <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none" style={{ width:700,height:700,right:-220,top:-220 }} />
      <div className="absolute rounded-full border border-[rgba(201,168,76,.04)] pointer-events-none" style={{ width:480,height:480,right:-120,top:-120 }} />
      <div className="relative z-[2] max-w-[1240px] w-full">
        <div className="flex items-center gap-2 text-[.74rem] font-semibold text-muted tracking-[.08em] uppercase mb-[18px]">Home <span className="opacity-40">/</span> <span className="text-gold">Services</span></div>
        <div className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-[22px]">
          <span className="w-[7px] h-[7px] rounded-full bg-b4 shadow-[0_0_8px_rgba(72,69,168,.5)]" />What We Offer
        </div>
        <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-[18px]">End-to-End IT Solutions<br />Built for <span className="grad-text">Scale &amp; Speed</span></h1>
        <p className="text-[1.05rem] leading-[1.82] text-body max-w-[580px]">From cloud infrastructure and custom software to cybersecurity and AI integration — every service is crafted to solve your real business problems, not just check a box.</p>
      </div>
    </div>
  );
}

export default function Services() {
  useScrollReveal();
  const [activeCat, setActiveCat] = useState<Category>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filters: { label: string; cat: Category }[] = [
    { label: 'All Services', cat: 'all' },
    { label: '☁️ Cloud', cat: 'cloud' },
    { label: '🔒 Security', cat: 'security' },
    { label: '💻 Software', cat: 'software' },
    { label: '📊 Data & AI', cat: 'data' },
  ];

  const filtered = activeCat === 'all' ? services : services.filter(s => s.cat === activeCat);

  return (
    <>
      <Navbar />
      <PageHero />

      {/* SERVICES */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="sr flex items-center gap-[10px] flex-wrap mb-[46px]">
            {filters.map(f => (
              <button
                key={f.cat}
                onClick={() => setActiveCat(f.cat)}
                className={`px-5 py-2 rounded-full text-[.81rem] font-semibold border-[1.5px] transition-all duration-[250ms] ${activeCat === f.cat ? 'bg-gm border-transparent text-white shadow-brand' : 'bg-white border-border text-body hover:bg-gm hover:border-transparent hover:text-white hover:shadow-brand'}`}
              >{f.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => (
              <div key={i} className={`sr d${(i%3)+1} group relative overflow-hidden rounded-[22px] border p-[30px] transition-all duration-[350ms] ${s.feat ? 'bg-gm border-transparent' : 'bg-page border-border hover:bg-white hover:-translate-y-2 hover:shadow-lg hover:border-[rgba(45,43,107,.12)]'} before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:transition-transform before:duration-[350ms] before:origin-left ${s.feat ? 'before:scale-x-100 before:bg-gm' : 'before:scale-x-0 group-hover:before:scale-x-100 before:bg-gm'}`}>
                <div className={`sr d${(i%3)+1} group relative overflow-hidden rounded-[22px] p-0`} />
                <div className="flex justify-between items-start mb-[18px]">
                  <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[1.45rem] flex-shrink-0 border-[1.5px] transition-all duration-[350ms] ${s.feat ? 'bg-white/20 border-white/30' : 'bg-pale border-border group-hover:bg-gm group-hover:border-transparent group-hover:scale-110 group-hover:-rotate-[5deg]'}`}>{s.ico}</div>
                  <span className={`text-[.66rem] font-bold px-[10px] py-1 rounded-full ${s.feat ? 'bg-white/20 text-white' : 'bg-[rgba(201,168,76,.12)] text-gold'}`}>{s.badge}</span>
                </div>
                <div className={`font-heading text-[1.1rem] font-extrabold mb-[9px] ${s.feat ? 'text-white' : 'text-dark'}`}>{s.t}</div>
                <div className={`text-[.87rem] leading-[1.7] mb-[18px] ${s.feat ? 'text-white/78' : 'text-body'}`}>{s.d}</div>
                <ul className="list-none flex flex-col gap-[7px] mb-[22px]">
                  {s.feats.map((feat, j) => (
                    <li key={j} className={`flex items-center gap-2 text-[.79rem] ${s.feat ? 'text-white/85' : 'text-body'}`}>
                      <span className={`w-[18px] h-[18px] min-w-[18px] rounded-full flex items-center justify-center text-[.62rem] font-black ${s.feat ? 'bg-white/20 text-white' : 'bg-pale text-gold'}`}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`inline-flex items-center gap-[5px] text-[.81rem] font-bold transition-[gap] duration-200 hover:gap-[9px] ${s.feat ? 'text-white/90' : 'text-b4'}`}>Get Started →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-page py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">How We Work</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark mb-4">Our <em className="not-italic grad-text">Proven</em> 4-Step Delivery Process</h2>
            <p className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">Transparent, structured, and designed to keep you informed at every stage — zero surprises at launch.</p>
          </div>
          <div className="mt-[52px] relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-0">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-[30px] left-[12.5%] right-[12.5%] h-[2px] bg-[linear-gradient(90deg,#C9A84C,#4845A8)] z-0" />
            {process.map((p, i) => (
              <div key={i} className={`sr d${i+1} text-center px-[14px] relative z-[1] group`}>
                <div className="w-[60px] h-[60px] rounded-full bg-white border-2 border-[rgba(45,43,107,.12)] flex items-center justify-center font-heading text-[1.1rem] font-black text-b4 mx-auto mb-5 shadow-sm transition-all duration-300 group-hover:bg-gm group-hover:text-white group-hover:border-transparent group-hover:shadow-brand">{p.n}</div>
                <div className="font-heading text-[.94rem] font-bold text-dark mb-[7px]">{p.t}</div>
                <div className="text-[.79rem] text-muted leading-[1.6]">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[50px]">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Technology Stack</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">The <em className="not-italic grad-text">Tools &amp; Technologies</em> We Master</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {techCats.map((t, i) => (
              <div key={i} className={`sr d${(i%3)+1} bg-page border-[1.5px] border-border rounded-[18px] p-[22px] transition-all duration-[280ms] hover:border-b4 hover:shadow-sm`}>
                <div className="flex items-center gap-[10px] font-heading text-[.88rem] font-bold text-dark mb-[14px] pb-3 border-b border-border">
                  <span className="w-[28px] h-[28px] rounded-[7px] bg-pale flex items-center justify-center text-[.8rem]">{t.ico}</span>
                  {t.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.chips.map((c, j) => (
                    <span key={j} className="px-[13px] py-[5px] rounded-full text-[.74rem] font-semibold text-body bg-white border-[1.5px] border-border cursor-default transition-all duration-200 hover:bg-pale hover:border-b4 hover:text-gold">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-page py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[50px]">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Transparent Pricing</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">Plans for Every <em className="not-italic grad-text">Stage of Growth</em></h2>
            <p className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">No hidden fees, no surprises. Choose the engagement model that fits — or talk to us for a custom quote.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricing.map((p, i) => (
              <div key={i} className={`sr d${i+1} relative overflow-hidden bg-white border-[1.5px] rounded-3xl p-[34px] transition-all duration-300 ${p.pop ? 'border-gold shadow-md hover:-translate-y-1 hover:shadow-lg' : 'border-border hover:-translate-y-1 hover:shadow-md hover:border-b4'}`}>
                {p.pop && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gm text-white text-[.66rem] font-bold px-5 py-1 rounded-b-[10px] whitespace-nowrap tracking-[.06em]">★ Most Popular</div>}
                <div className="text-[.7rem] font-bold tracking-[.1em] text-muted uppercase mt-5">{p.plan}</div>
                <div className="font-heading text-[2.7rem] font-black text-dark leading-none mt-[11px] mb-[5px]">{p.price}<span className="text-[.95rem] font-medium text-muted">{p.price === 'Custom' ? ' pricing' : ' /project'}</span></div>
                <div className="text-[.79rem] text-muted mb-[22px]">{p.sub}</div>
                <div className="h-px bg-border mb-[18px]" />
                <ul className="list-none flex flex-col gap-[10px] mb-7">
                  {p.feats.map((feat, j) => (
                    <li key={j} className="flex items-center gap-[10px] text-[.84rem] text-body">
                      <span className="w-5 h-5 rounded-[6px] bg-pale text-gold flex items-center justify-center text-[.64rem] font-black flex-shrink-0">✓</span>{feat}
                    </li>
                  ))}
                  {p.noFeats.map((feat, j) => (
                    <li key={j} className="flex items-center gap-[10px] text-[.84rem] text-body opacity-50">
                      <span className="w-5 h-5 rounded-[6px] bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center text-[.64rem] font-black flex-shrink-0">✗</span>{feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-[13px] rounded-xl text-[.89rem] font-bold transition-all duration-[280ms] ${
                    p.btn === 'in'
                      ? 'text-white bg-gm shadow-brand hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(45,43,107,.4)]'
                      : 'text-b4 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale hover:bg-pale2 hover:border-b4'
                  }`}
                >{p.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-0">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">FAQs</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">Questions We Get <em className="not-italic grad-text">All the Time</em></h2>
          </div>
          <div className="max-w-[760px] mx-auto mt-[42px]">
            {faqs.map((f, i) => (
              <div key={i} className={`sr d${i+1} border-[1.5px] rounded-[14px] mb-3 overflow-hidden transition-all duration-[250ms] ${openFaq === i ? 'border-gold' : 'border-border'}`}>
                <div
                  className={`flex items-center justify-between px-[22px] py-[18px] cursor-pointer font-heading text-[.93rem] font-bold text-dark gap-[14px] transition-colors duration-200 select-none ${openFaq === i ? 'bg-pale' : 'bg-white'}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <div className={`w-[27px] h-[27px] flex-shrink-0 rounded-[7px] flex items-center justify-center text-[.7rem] transition-all duration-300 ${openFaq === i ? 'bg-gm text-white rotate-180' : 'bg-pale text-gold'}`}>▾</div>
                </div>
                <div className={`overflow-hidden transition-[max-height] duration-[380ms] ease-in-out ${openFaq === i ? 'max-h-[220px]' : 'max-h-0'}`}>
                  <div className="px-[22px] pb-5 text-[.87rem] leading-[1.75] text-body">{f.a}</div>
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
          <h2 className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">Let's Build Your Next Big Thing</h2>
          <p className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">Get a free consultation and project estimate. No commitment — just absolute clarity on what's possible.</p>
          <div className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-dark bg-gg shadow-[0_8px_28px_rgba(201,168,76,.4)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_14px_38px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">Book Free Consultation →</Link>
            <Link to="/projects" className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">See Our Work</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
