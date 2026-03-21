import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/global.css';
import '../styles/projects.css';

const projects = [
  {
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    tag: 'Enterprise Software', cat: 'software',
    title: 'Real-Time Analytics Platform',
    desc: 'Built for a Fortune 500 financial client — processes 50M events/day with sub-second latency using Apache Kafka and ClickHouse.',
    tags: ['React', 'Node.js', 'Kafka', 'ClickHouse'],
    stat1: '50M', stat1l: 'Events/Day', stat2: '<100ms', stat2l: 'Latency',
  },
  {
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    tag: 'Cybersecurity', cat: 'security',
    title: 'Zero-Trust Security Framework',
    desc: 'Deployed across 12 global offices, protecting sensitive financial data. Achieved SOC2 Type II and ISO 27001 compliance.',
    tags: ['Zero-Trust', 'SIEM', 'SOC2', 'ISO 27001'],
    stat1: '12', stat1l: 'Global Offices', stat2: '0', stat2l: 'Breaches',
  },
  {
    img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop',
    tag: 'Cloud Migration', cat: 'cloud',
    title: 'Multi-Cloud Migration for HealthTech',
    desc: 'Migrated 14-year-old legacy EHR systems to AWS with zero downtime, 60% cost reduction, and HIPAA compliance maintained.',
    tags: ['AWS', 'Terraform', 'Docker', 'HIPAA'],
    stat1: '60%', stat1l: 'Cost Reduction', stat2: '0', stat2l: 'Downtime Hours',
  },
  {
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    tag: 'ERP Integration', cat: 'software',
    title: 'SAP + Custom CRM Integration',
    desc: 'Unified 8 disconnected enterprise systems for a 200+ store retail chain. Automated 70% of reconciliation workflows.',
    tags: ['SAP', 'REST API', 'Python', 'PostgreSQL'],
    stat1: '8', stat1l: 'Systems Unified', stat2: '15h', stat2l: 'Saved/Week',
  },
  {
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
    tag: 'AI / ML', cat: 'data',
    title: 'AI-Powered Customer Support Platform',
    desc: 'LLM-powered support system handling 80% of tier-1 queries automatically, reducing support costs by 55% for a SaaS company.',
    tags: ['OpenAI', 'LangChain', 'FastAPI', 'React'],
    stat1: '80%', stat1l: 'Queries Automated', stat2: '55%', stat2l: 'Cost Reduction',
  },
  {
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
    tag: 'DevOps', cat: 'cloud',
    title: 'Enterprise DevSecOps Pipeline',
    desc: 'Built a fully automated CI/CD infrastructure for a 150-person engineering team. Reduced deployment time from 4 hours to 8 minutes.',
    tags: ['Kubernetes', 'GitHub Actions', 'Terraform', 'ArgoCD'],
    stat1: '97%', stat1l: 'Deploy Success', stat2: '8m', stat2l: 'Deploy Time',
  },
];

const stats = [
  { n: '1,200+', l: 'Projects Delivered' },
  { n: '300+', l: 'Enterprise Clients' },
  { n: '28', l: 'Countries' },
  { n: '99%', l: 'On-Time Rate' },
];

export default function Projects() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="ph-glow1" /><div className="ph-glow2" />
        <div className="ph-ring ph-r1" /><div className="ph-ring ph-r2" />
        <div className="ph-inner">
          <div className="ph-crumb">Home <span className="c-sep">/</span> <span className="c-cur">Projects</span></div>
          <div className="ph-badge"><span className="ph-dot" />Our Portfolio</div>
          <h1 className="ph-h1">Work That <span className="grad">Speaks</span><br />For Itself</h1>
          <p className="ph-sub">1,200+ projects delivered across 28 countries — from Fortune 500 platforms to high-growth start-ups. Every case study is a proof of what's possible.</p>
        </div>
      </div>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="wrap">
          {stats.map((s, i) => (
            <div key={i} className={`sb-item sr d${i + 1}`}>
              <div className="sb-num">{s.n}</div>
              <div className="sb-lbl">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="centered" style={{ marginBottom: 52 }}>
            <div className="sec-label">Case Studies</div>
            <h2 className="sec-h2">Featured <em>Projects</em></h2>
            <p className="sec-desc">Real challenges, real solutions, real results — backed by data.</p>
          </div>
          <div className="proj-grid">
            {projects.map((p, i) => (
              <div key={i} className={`proj-card sr d${(i % 3) + 1}`}>
                <div className="proj-img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <div className="proj-overlay">
                    <span className="proj-view">View Case Study →</span>
                  </div>
                </div>
                <div className="proj-body">
                  <div className="proj-tag">{p.tag}</div>
                  <div className="proj-title">{p.title}</div>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-chips">
                    {p.tags.map((t, j) => <span key={j} className="proj-chip">{t}</span>)}
                  </div>
                  <div className="proj-stats">
                    <div className="proj-stat">
                      <div className="ps-num">{p.stat1}</div>
                      <div className="ps-lbl">{p.stat1l}</div>
                    </div>
                    <div className="proj-stat-div" />
                    <div className="proj-stat">
                      <div className="ps-num">{p.stat2}</div>
                      <div className="ps-lbl">{p.stat2l}</div>
                    </div>
                  </div>
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
          <h2>Want Results Like These?</h2>
          <p>Every project starts with a conversation. Share your challenge and let's architect the right solution together.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-w">Start a Project →</Link>
            <Link to="/services" className="cta-o">Explore Services</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
