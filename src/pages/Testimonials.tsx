import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/global.css';
import '../styles/testimonials.css';

const allTestimonials = [
  { tf: true,  title: 'Amazing to work with',                    q: "Our redesign result is thrilling. TechSphere was amazing to work with, making the process fun and stress-free. They are always super responsive.",                                           init: 'RK', name: 'Rajesh Kumar',   role: 'CEO & Founder @ClickMagick',     rating: 5 },
  { tf: false, title: 'Outstanding product design',              q: "Their creativity and technical skills resulted in visually stunning, user-friendly designs. An absolute pleasure working with such talented people. Highly recommend!",                          init: 'SR', name: 'Sneha Reddy',     role: 'Product Owner @Plix',            rating: 5 },
  { tf: false, title: 'Reliable, Fast, Easy',                    q: "TechSphere was incredibly fast, offering numerous options. They solicit feedback constantly and worked hard to create the perfect design for us.",                                               init: 'VS', name: 'Vikram Singh',    role: 'Co-Founder @Legacy Blueprint',   rating: 5 },
  { tf: true,  title: 'TechSphere is one of the most talented',  q: "TechSphere is one of the most talented teams I've worked with. They go above and beyond in understanding and executing design excellence.",                                                    init: 'AP', name: 'Aarav Patel',     role: 'Marketing Lead @Stepsize',       rating: 5 },
  { tf: false, title: 'Game-Changing Partnership',               q: "Working with TechSphere was a game-changer. Their mobile app development expertise helped us launch our product successfully and reach new market heights.",                                     init: 'AM', name: 'Arjun Mehta',     role: 'CTO @InnovateCorp',              rating: 5 },
  { tf: false, title: 'Brilliant cloud architects',              q: "The team migrated our entire infrastructure to AWS with zero downtime. Their cloud expertise saved us 60% on costs and improved performance dramatically.",                                       init: 'PK', name: 'Priya Kapoor',    role: 'CTO @FinanceFirst',              rating: 5 },
  { tf: false, title: 'Incredibly professional team',            q: "The TechSphere team is incredibly professional and talented. They delivered our e-commerce platform on time, within budget, and with outstanding quality.",                                      init: 'PS', name: 'Priya Sharma',    role: 'Marketing Director @GrowthFirst',rating: 5 },
  { tf: true,  title: 'Excellent Design',                        q: "Working with TechSphere has been a pleasure. They were fast, communicative, and crafted an excellent design that met all our requirements perfectly.",                                           init: 'AG', name: 'Ananya Gupta',    role: 'CEO & Co-Founder @Prönö',       rating: 5 },
  { tf: false, title: 'Transformed our digital presence',        q: "TechSphere completely transformed our digital presence. Their team delivered exceptional results that far exceeded our expectations and business goals.",                                         init: 'NS', name: 'Neha Sharma',     role: 'CEO @TechFlow Solutions',        rating: 5 },
  { tf: false, title: 'Security experts',                        q: "Their cybersecurity audit identified 23 critical vulnerabilities we didn't know existed. The remediation was swift and thorough. Now we sleep easy.",                                          init: 'RT', name: 'Ravi Tiwari',     role: 'CISO @DataVault',                rating: 5 },
  { tf: true,  title: 'ERP integration experts',                 q: "Our 8 disconnected systems now talk seamlessly. TechSphere's ERP integration saved our team 15 hours a week. The ROI was visible in month one.",                                               init: 'SM', name: 'Suresh Menon',    role: 'COO @RetailGiant',               rating: 5 },
  { tf: false, title: '5-star consulting',                       q: "Their IT consulting roadmap became our company's technology bible. 6 months in, we've automated 70% of manual processes. Exceptional team.",                                                   init: 'KP', name: 'Kavya Pillai',    role: 'VP Operations @ScaleUp',         rating: 5 },
];

function Stars({ n }: { n: number }) {
  return <div className="t-stars">{'★'.repeat(n)}</div>;
}

export default function Testimonials() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="ph-glow1" /><div className="ph-glow2" />
        <div className="ph-ring ph-r1" /><div className="ph-ring ph-r2" />
        <div className="ph-inner">
          <div className="ph-crumb">Home <span className="c-sep">/</span> <span className="c-cur">Testimonials</span></div>
          <div className="ph-badge"><span className="ph-dot green" />300+ Happy Clients</div>
          <h1 className="ph-h1">What Our Clients<br /><span className="grad">Actually Say</span></h1>
          <p className="ph-sub">Don't take our word for it — hear from the 300+ companies and leaders who've trusted TechSphere to power their digital transformation.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-band">
        <div className="wrap">
          {[
            { n: '300+', l: 'Happy Clients' },
            { n: '96%', l: 'Satisfaction Rate' },
            { n: '4.9/5', l: 'Average Rating' },
            { n: '96%', l: 'Client Retention' },
          ].map((s, i) => (
            <div key={i} className={`sb-item sr d${i + 1}`}>
              <div className="sb-num">{s.n}</div>
              <div className="sb-lbl">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS GRID */}
      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="centered" style={{ marginBottom: 52 }}>
            <div className="sec-label">Client Stories</div>
            <h2 className="sec-h2">Trusted by <em>Industry Leaders</em></h2>
            <p className="sec-desc">Real clients, real outcomes, real feedback — unfiltered.</p>
          </div>
          <div className="testi-page-grid">
            {allTestimonials.map((t, i) => (
              <div key={i} className={`testi-full-card${t.tf ? ' tf' : ''} sr d${(i % 3) + 1}`}>
                <Stars n={t.rating} />
                <div className="tfc-title">{t.title}</div>
                <p className="tfc-q">{t.q}</p>
                <hr className="tfc-divider" />
                <div className="tfc-per">
                  <div className="tfc-av">{t.init}</div>
                  <div>
                    <div className="tfc-name">{t.name} <span className="ton" /></div>
                    <div className="tfc-role">{t.role}</div>
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
          <h2>Ready to Join 300+ Happy Clients?</h2>
          <p>Let's start with a free consultation. No commitment, no pressure — just a conversation about your goals.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-w">Start Your Project →</Link>
            <Link to="/services" className="cta-o">See Our Services</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
