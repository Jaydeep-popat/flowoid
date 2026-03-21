import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/global.css';
import '../styles/about.css';

const values = [
  { ico: '🔒', t: 'Security First', d: 'Every solution is built with enterprise-grade security baked in from day one — not bolted on as an afterthought.' },
  { ico: '💡', t: 'Continuous Innovation', d: 'We invest 15% of revenue into R&D so clients always have access to cutting-edge technology.' },
  { ico: '🌱', t: 'Sustainable Growth', d: 'We build scalable architectures that grow with your business, preventing costly rebuilds down the road.' },
  { ico: '🤝', t: 'True Partnership', d: 'We embed ourselves in your team, understanding your culture to deliver solutions that truly fit.' },
  { ico: '⚡', t: 'Speed & Quality', d: 'Agile at our core — we deliver fast without sacrificing the quality that defines our reputation.' },
  { ico: '🌍', t: 'Global Mindset', d: 'Operating in 28 countries gives us unique insights to build products for global audiences.' },
];

const team = [
  { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=face', name: 'Arjun Mehta', role: 'CEO & Co-Founder', bio: '15+ years in enterprise software. Former CTO at Infosys. IIT Bombay alumnus.' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face', name: 'Sarah Chen', role: 'CTO & Co-Founder', bio: 'Cloud architect & security expert. AWS certified. Ex-Google Engineering Lead.' },
  { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face', name: 'James Okafor', role: 'VP Engineering', bio: 'Full-stack architect specializing in microservices and DevOps at scale.' },
  { img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&crop=face', name: 'Priya Sharma', role: 'Head of Design', bio: 'UX visionary blending user psychology with stunning visual design systems.' },
];

const timeline = [
  { year: '2010', t: 'Founded in Bangalore', d: 'TechSphere was born with 5 engineers and a bold dream — to democratize enterprise technology for growing businesses.' },
  { year: '2013', t: 'First 50 Clients & Series A Funding', d: 'Secured $4M Series A. Expanded into cloud solutions and grew to 40 team members across 2 offices.' },
  { year: '2016', t: 'Global Expansion — 10 Countries', d: 'Opened offices in London, Singapore, and Dubai. Launched our proprietary DevSecOps framework.' },
  { year: '2019', t: '200+ Clients & ISO 27001 Certification', d: 'Achieved ISO 27001 security certification. Launched our AI-powered monitoring suite.' },
  { year: '2022', t: '1,000 Projects Milestone', d: 'Delivered our 1,000th project. Expanded to 200 team members and 28 countries globally.' },
  { year: '2024', t: 'TechSphere 3.0 — AI & Automation Platform', d: 'Launched our next-gen platform integrating AI automation, predictive analytics, and real-time cloud orchestration.' },
];

export default function About() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="ph-glow1" /><div className="ph-glow2" />
        <div className="ph-ring ph-r1" /><div className="ph-ring ph-r2" />
        <div className="ph-inner">
          <div className="ph-crumb">Home <span className="c-sep">/</span> <span className="c-cur">About Us</span></div>
          <div className="ph-badge"><span className="ph-dot" />Our Story</div>
          <h1 className="ph-h1">Built on <span className="grad">Trust,</span><br />Driven by Innovation</h1>
          <p className="ph-sub">Since 2010, we've been the technology backbone for hundreds of enterprises — turning complex challenges into elegant, scalable digital solutions across 28 countries.</p>
        </div>
      </div>

      {/* STORY */}
      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="story-grid">
            <div className="story-imgs sr-l">
              <div className="si-main"><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=420&fit=crop" alt="Team" /></div>
              <div className="si-sub"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=260&fit=crop" alt="Working" /></div>
              <div className="si-badge"><strong>14+</strong><span>Years of Excellence</span></div>
            </div>
            <div className="sr-r">
              <div className="sec-label">Who We Are</div>
              <h2 className="sec-h2">A Team of <em>Passionate</em> Problem Solvers</h2>
              <p className="sec-desc" style={{ marginBottom: 14 }}>TechSphere was founded in 2010 with a single mission: to make enterprise-grade technology accessible to every business, regardless of size or industry. What started as a team of five developers has grown into a 200-person powerhouse serving clients across 28 countries.</p>
              <p className="sec-desc">We don't just write code — we architect digital futures. Our multidisciplinary team of engineers, designers, strategists, and cybersecurity experts work in lockstep to deliver solutions that transform your business.</p>
              <div className="story-vals">
                {[
                  { ico: '🎯', t: 'Mission-Focused', d: 'Every project aligns with your core business objectives' },
                  { ico: '🔬', t: 'Research-Driven', d: 'Data and insights guide every technical decision' },
                  { ico: '🤝', t: 'Long-Term Partner', d: '96% of our clients return for their next project' },
                  { ico: '⚡', t: 'Agile Delivery', d: '3× faster delivery vs industry average, every sprint' },
                ].map((v, i) => (
                  <div key={i} className="sv">
                    <div className="sv-ico">{v.ico}</div>
                    <div className="sv-t">{v.t}</div>
                    <div className="sv-d">{v.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-band">
        <div className="wrap">
          {[
            { num: '300+', lbl: 'Enterprise Clients' },
            { num: '1.2K', lbl: 'Projects Delivered' },
            { num: '28', lbl: 'Countries Served' },
            { num: '200+', lbl: 'Expert Team Members' },
          ].map((s, i) => (
            <div key={i} className={`sb-item sr d${i + 1}`}>
              <div className="sb-num">{s.num}</div>
              <div className="sb-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <section className="values-section">
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">Core Values</div>
            <h2 className="sec-h2">Principles That <em>Guide</em> Everything We Do</h2>
            <p className="sec-desc">These aren't words on a wall — they're the foundation of every decision, every line of code, and every client relationship.</p>
          </div>
          <div className="vals-grid">
            {values.map((v, i) => (
              <div key={i} className={`vc sr d${(i % 3) + 1}`}>
                <div className="vc-ico">{v.ico}</div>
                <div className="vc-t">{v.t}</div>
                <div className="vc-d">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section">
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">Leadership Team</div>
            <h2 className="sec-h2">The <em>Brilliant Minds</em> Behind TechSphere</h2>
            <p className="sec-desc">Decades of combined experience across software engineering, cloud, cybersecurity, and digital strategy.</p>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className={`tc sr d${i + 1}`}>
                <div className="tc-photo">
                  <img src={m.img} alt={m.name} />
                  <div className="tc-overlay" />
                </div>
                <div className="tc-info">
                  <div className="tc-name">{m.name}</div>
                  <div className="tc-role">{m.role}</div>
                  <div className="tc-bio">{m.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">Our Journey</div>
            <h2 className="sec-h2">14 Years of <em>Growth</em> &amp; Milestones</h2>
          </div>
          <div className="tl-wrap">
            {timeline.map((t, i) => (
              <div key={i} className={`tl-item sr d${(i % 3) + 1}`}>
                <div className="tl-dot" />
                <div className="tl-year">{t.year}</div>
                <div className="tl-title">{t.t}</div>
                <div className="tl-desc">{t.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box-inner sr">
          <div className="cta-glow cg1" /><div className="cta-glow cg2" />
          <h2>Ready to Build Something Great Together?</h2>
          <p>Join 300+ companies that trust TechSphere to power their digital transformation. Let's talk about your vision.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-w">Start Your Project →</Link>
            <Link to="/services" className="cta-o">Explore Our Services</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
