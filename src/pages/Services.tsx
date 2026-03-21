import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/global.css';
import '../styles/services.css';

type Category = 'all' | 'cloud' | 'security' | 'software' | 'data';

const services = [
  { cat: 'cloud' as Category, ico: '☁️', badge: 'Most Popular', t: 'Cloud Infrastructure & Migration', d: 'Seamlessly move your workloads to AWS, Azure, or GCP. We architect, migrate, optimize, and manage your cloud for maximum performance and cost efficiency.', feats: ['Multi-cloud architecture design', 'Zero-downtime migrations', 'Cost optimization & FinOps', '24/7 cloud monitoring & SLA'] },
  { cat: 'security' as Category, ico: '🔒', badge: 'Enterprise', t: 'Cybersecurity & Compliance', d: 'Protect your business with multi-layered security frameworks — threat detection, SOC monitoring, ISO 27001, SOC 2, and full GDPR compliance automation.', feats: ['Penetration testing & audits', 'SIEM & SOC implementation', 'Compliance automation', 'Incident response planning'], feat: true },
  { cat: 'software' as Category, ico: '💻', badge: 'Custom Build', t: 'Custom Software Development', d: 'Bespoke applications built to your exact specifications — web platforms, mobile apps, enterprise portals, and SaaS products that scale with your ambitions.', feats: ['Full-stack web development', 'Native iOS & Android apps', 'API design & integration', 'Scalable microservices'] },
  { cat: 'data' as Category, ico: '📊', badge: 'Analytics', t: 'Data Engineering & Analytics', d: 'Transform raw data into strategic intelligence. We build pipelines, warehouses, dashboards, and ML models that turn your data into a competitive advantage.', feats: ['Data warehouse architecture', 'Real-time streaming pipelines', 'BI dashboards & reporting', 'ML model deployment'] },
  { cat: 'software' as Category, ico: '🔄', badge: 'DevOps', t: 'DevOps & CI/CD Automation', d: 'Accelerate delivery cycles with modern DevOps practices — automated pipelines, container orchestration, and infrastructure-as-code that eliminate bottlenecks.', feats: ['CI/CD pipeline setup', 'Kubernetes & Docker', 'Terraform IaC automation', 'Observability & monitoring'] },
  { cat: 'data' as Category, ico: '🤖', badge: 'AI / ML', t: 'AI Integration & Automation', d: 'Embed intelligent automation into your workflows — NLP chatbots, predictive analytics, computer vision, and LLM-powered enterprise tools that save real time.', feats: ['LLM & GenAI integration', 'Process automation (RPA)', 'Predictive analytics models', 'Computer vision solutions'] },
];

const process = [
  { n: '01', t: 'Discovery & Strategy', d: 'Deep-dive into your goals, tech requirements, and market to build a bulletproof blueprint.' },
  { n: '02', t: 'Architecture & Design', d: 'Scalable system design and polished UI/UX prototypes reviewed and approved by you.' },
  { n: '03', t: 'Agile Development', d: '2-week sprints with live demos. See real progress every fortnight, course-correct early.' },
  { n: '04', t: 'Launch & Support', d: 'Rigorous QA, seamless deployment, and 24/7 ongoing support to keep you running flawlessly.' },
];

const techCats = [
  { ico: '☁️', label: 'Cloud Platforms', chips: ['AWS', 'Microsoft Azure', 'Google Cloud', 'DigitalOcean'] },
  { ico: '💻', label: 'Frontend', chips: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
  { ico: '⚙️', label: 'Backend', chips: ['Node.js', 'Python', 'Go', 'Java Spring', '.NET Core'] },
  { ico: '🗄️', label: 'Databases', chips: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake', 'Elasticsearch'] },
  { ico: '🔄', label: 'DevOps', chips: ['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'GitHub Actions'] },
  { ico: '🤖', label: 'AI / ML', chips: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Apache Spark'] },
];

const pricing = [
  { plan: 'Starter', price: '$4,999', sub: 'Best for MVPs & small business apps', feats: ['Up to 5 core features', 'Responsive web app', 'Basic cloud deployment', '30-day post-launch support'], noFeats: ['Custom integrations', 'Dedicated project manager'], btn: 'pc-out', label: 'Get Started' },
  { plan: 'Growth', price: '$14,999', sub: 'Best for scaling businesses', feats: ['Unlimited features & modules', 'Mobile app (iOS + Android)', 'Advanced cloud architecture', 'Custom API integrations', 'Dedicated project manager', '90-day post-launch support'], noFeats: [], btn: 'pc-in', label: 'Get Started', pop: true },
  { plan: 'Enterprise', price: 'Custom', sub: 'For large-scale enterprise projects', feats: ['Full digital transformation', 'Multi-platform delivery', 'Dedicated engineering team', 'Security & compliance', 'SLA-backed 24/7 support', 'Ongoing retainer available'], noFeats: [], btn: 'pc-out', label: 'Talk to Sales' },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Project timelines depend on complexity. An MVP typically takes 6–10 weeks. Mid-scale platforms take 3–5 months. Enterprise-grade systems can take 6–12 months. We provide a detailed timeline after the discovery phase.' },
  { q: 'Do you work with existing codebases?', a: 'Absolutely. We frequently inherit legacy projects for modernization, refactoring, or expansion. Our team conducts a thorough technical audit before beginning any work on an existing codebase.' },
  { q: 'What happens after launch?', a: 'Every project includes a post-launch support window. We offer ongoing retainer plans for maintenance, performance monitoring, feature development, and 24/7 emergency support.' },
  { q: 'Can you sign an NDA before we discuss our project?', a: 'Yes, always. We sign NDAs before any project discussion begins. Confidentiality is standard practice at TechSphere and built into every client relationship from day one.' },
];

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

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="ph-glow1" /><div className="ph-glow2" />
        <div className="ph-ring ph-r1" /><div className="ph-ring ph-r2" />
        <div className="ph-inner">
          <div className="ph-crumb">Home <span className="c-sep">/</span> <span className="c-cur">Services</span></div>
          <div className="ph-badge"><span className="ph-dot" />What We Offer</div>
          <h1 className="ph-h1">End-to-End IT Solutions<br />Built for <span className="grad">Scale &amp; Speed</span></h1>
          <p className="ph-sub">From cloud infrastructure and custom software to cybersecurity and AI integration — every service is crafted to solve your real business problems, not just check a box.</p>
        </div>
      </div>

      {/* SERVICES */}
      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="srv-filter sr">
            {filters.map(f => (
              <button
                key={f.cat}
                className={`sf${activeCat === f.cat ? ' on' : ''}`}
                onClick={() => setActiveCat(f.cat)}
              >{f.label}</button>
            ))}
          </div>
          <div className="srv-grid">
            {filtered.map((s, i) => (
              <div key={i} className={`scard sr d${(i % 3) + 1}${s.feat ? ' feat' : ''}`}>
                <div className="sc-top">
                  <div className="sc-ico">{s.ico}</div>
                  <span className="sc-badge">{s.badge}</span>
                </div>
                <div className="sc-t">{s.t}</div>
                <div className="sc-d">{s.d}</div>
                <ul className="sc-feats">
                  {s.feats.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <Link to="/contact" className="sc-lnk">Get Started →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="proc-section">
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">How We Work</div>
            <h2 className="sec-h2">Our <em>Proven</em> 4-Step Delivery Process</h2>
            <p className="sec-desc">Transparent, structured, and designed to keep you informed at every stage — zero surprises at launch.</p>
          </div>
          <div className="proc-grid">
            {process.map((p, i) => (
              <div key={i} className={`proc-item sr d${i + 1}`}>
                <div className="proc-num">{p.n}</div>
                <div className="proc-t">{p.t}</div>
                <div className="proc-d">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="tech-section">
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">Technology Stack</div>
            <h2 className="sec-h2">The <em>Tools &amp; Technologies</em> We Master</h2>
          </div>
          <div className="tech-cats">
            {techCats.map((t, i) => (
              <div key={i} className={`tcat sr d${(i % 3) + 1}`}>
                <div className="tcat-hd"><span className="tcat-ico">{t.ico}</span>{t.label}</div>
                <div className="chips">
                  {t.chips.map((c, j) => <span key={j} className="chip">{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="price-section">
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">Transparent Pricing</div>
            <h2 className="sec-h2">Plans for Every <em>Stage of Growth</em></h2>
            <p className="sec-desc">No hidden fees, no surprises. Choose the engagement model that fits — or talk to us for a custom quote.</p>
          </div>
          <div className="price-grid">
            {pricing.map((p, i) => (
              <div key={i} className={`pcard sr d${i + 1}${p.pop ? ' pop' : ''}`}>
                {p.pop && <div className="pop-tag">★ Most Popular</div>}
                <div className={`pc-plan${p.pop ? '' : ''}`}>{p.plan}</div>
                <div className="pc-price">{p.price}<span>{p.price === 'Custom' ? ' pricing' : ' /project'}</span></div>
                <div className="pc-sub">{p.sub}</div>
                <div className="pc-div" />
                <ul className="pc-feats">
                  {p.feats.map((f, j) => <li key={j}><span className="chk">✓</span>{f}</li>)}
                  {p.noFeats.map((f, j) => <li key={j}><span className="chk no">✗</span>{f}</li>)}
                </ul>
                <Link to="/contact" className={`pc-btn ${p.btn}`}>{p.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="wrap">
          <div className="centered" style={{ marginBottom: 0 }}>
            <div className="sec-label">FAQs</div>
            <h2 className="sec-h2">Questions We Get <em>All the Time</em></h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item sr d${i + 1}${openFaq === i ? ' on' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}<div className="faq-arr">▾</div>
                </div>
                <div className="faq-a">
                  <div className="faq-ai">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box-inner sr">
          <div className="cta-glow cg1" /><div className="cta-glow cg2" />
          <h2>Let's Build Your Next Big Thing</h2>
          <p>Get a free consultation and project estimate. No commitment — just absolute clarity on what's possible.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-w">Book Free Consultation →</Link>
            <Link to="/projects" className="cta-o">See Our Work</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
