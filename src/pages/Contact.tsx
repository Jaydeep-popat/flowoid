import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/global.css';
import '../styles/contact.css';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  timeline: string;
  budget: string;
  message: string;
}

const offices = [
  { flag: '🇮🇳', city: 'Bangalore', country: 'India — Headquarters', addr: 'TechSphere Tower, 12th Cross, Indiranagar, Bangalore 560038', ph: '+91 80 4567 8900' },
  { flag: '🇬🇧', city: 'London',    country: 'United Kingdom',        addr: 'Level 24, One Canada Square, Canary Wharf, London E14 5AB',   ph: '+44 20 7946 0320' },
  { flag: '🇸🇬', city: 'Singapore', country: 'Singapore',             addr: '1 Marina Boulevard, #28-00, One Marina Blvd, Singapore 018982', ph: '+65 6123 4567' },
  { flag: '🇦🇪', city: 'Dubai',     country: 'UAE',                   addr: 'Gate Village 4, Level 3, DIFC, Dubai 506589, UAE',            ph: '+971 4 123 4567' },
];

const whyCards = [
  { ico: '⚡', t: '4-Hour Response Guarantee', d: 'Every inquiry gets a personal response within 4 business hours — not an auto-reply, but a real conversation with a senior engineer or consultant.' },
  { ico: '📋', t: 'Free Project Assessment',   d: 'We provide a detailed technical feasibility report and rough cost estimate for your project at zero cost. No strings, no sales pressure.' },
  { ico: '🔒', t: 'NDA Before We Talk',        d: 'Your idea is safe with us. We sign a mutual NDA before any project discussions begin — it\'s standard practice for all client engagements.' },
];

const timelines = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months', 'Flexible', 'Ongoing'];
const budgets = ['Under $5K', '$5K – $15K', '$15K – $50K', '$50K+'];
const services = [
  'Cloud Infrastructure & Migration',
  'Custom Software Development',
  'Cybersecurity & Compliance',
  'Data Engineering & Analytics',
  'DevOps & CI/CD Automation',
  'AI Integration & Automation',
  'Digital Transformation',
  'Other / Multiple Services',
];

export default function Contact() {
  useScrollReveal();

  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', service: '', timeline: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="ph-glow1" /><div className="ph-glow2" />
        <div className="ph-ring ph-r1" /><div className="ph-ring ph-r2" />
        <div className="ph-inner">
          <div className="ph-crumb">Home <span className="c-sep">/</span> <span className="c-cur">Contact</span></div>
          <div className="ph-badge"><span className="ph-dot green" />We Respond Within 4 Hours</div>
          <h1 className="ph-h1">Let's Build Something<br /><span className="grad">Extraordinary</span> Together</h1>
          <p className="ph-sub">Whether you have a fully-formed brief or just a back-of-napkin idea — our team is ready to listen, advise, and help turn your vision into reality.</p>
        </div>
      </div>

      {/* CONTACT MAIN */}
      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="contact-grid">
            {/* LEFT INFO */}
            <div className="sr-l">
              <div className="ci-title">Get in <em>Touch</em></div>
              <p className="ci-desc">Our team is available Monday–Friday, 9am–7pm IST. For urgent matters, existing clients can access 24/7 support through our dedicated portal.</p>
              <div className="ci-cards">
                <div className="ci-card"><div className="ci-ico">📧</div><div><div className="ci-lbl">Email Us</div><div className="ci-val">hello@techsphere.io</div></div></div>
                <div className="ci-card"><div className="ci-ico">📞</div><div><div className="ci-lbl">Call Us</div><div className="ci-val">+91 80 4567 8900</div></div></div>
                <div className="ci-card"><div className="ci-ico">💬</div><div><div className="ci-lbl">Live Chat</div><div className="ci-val">Available Mon–Fri, 9am–6pm IST</div></div></div>
                <div className="ci-card"><div className="ci-ico">🗓️</div><div><div className="ci-lbl">Book a Meeting</div><div className="ci-val">Schedule a 30-min discovery call</div></div></div>
              </div>
              <div className="offices-hd">Our Global Offices</div>
              <div className="offices-list">
                <div className="of"><div className="of-city">🇮🇳 Bangalore</div><div className="of-addr">HQ — Indiranagar, 560038</div></div>
                <div className="of"><div className="of-city">🇬🇧 London</div><div className="of-addr">Canary Wharf, E14 5AB</div></div>
                <div className="of"><div className="of-city">🇸🇬 Singapore</div><div className="of-addr">Marina Bay, 018982</div></div>
                <div className="of"><div className="of-city">🇦🇪 Dubai</div><div className="of-addr">DIFC, Dubai 506589</div></div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="form-wrap sr-r">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="fw-title">Tell Us About Your Project</div>
                  <p className="fw-sub">Fill in the details and we'll respond within 4 business hours.</p>

                  <div className="frow">
                    <div className="fg">
                      <label>First Name *</label>
                      <input type="text" placeholder="Arjun" value={form.firstName} onChange={update('firstName')} required />
                    </div>
                    <div className="fg">
                      <label>Last Name *</label>
                      <input type="text" placeholder="Mehta" value={form.lastName} onChange={update('lastName')} required />
                    </div>
                  </div>
                  <div className="frow">
                    <div className="fg">
                      <label>Work Email *</label>
                      <input type="email" placeholder="arjun@company.com" value={form.email} onChange={update('email')} required />
                    </div>
                    <div className="fg">
                      <label>Phone</label>
                      <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={update('phone')} />
                    </div>
                  </div>
                  <div className="fg">
                    <label>Company Name</label>
                    <input type="text" placeholder="Your Company Ltd." value={form.company} onChange={update('company')} />
                  </div>
                  <div className="fg">
                    <label>Service You Need *</label>
                    <select value={form.service} onChange={update('service')} required>
                      <option value="" disabled>Select a service...</option>
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="fg">
                    <label>Project Timeline</label>
                    <div className="opts-grid">
                      {timelines.map(t => (
                        <label key={t} className="opt-lbl">
                          <input
                            type="radio" name="tl"
                            checked={form.timeline === t}
                            onChange={() => setForm(f => ({ ...f, timeline: t }))}
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="fg">
                    <label>Estimated Budget</label>
                    <div className="budget-grid">
                      {budgets.map(b => (
                        <label key={b} className="opt-lbl">
                          <input
                            type="radio" name="bgt"
                            checked={form.budget === b}
                            onChange={() => setForm(f => ({ ...f, budget: b }))}
                          />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="fg">
                    <label>Tell Us About Your Project *</label>
                    <textarea
                      placeholder="Describe your project, goals, challenges, and anything that would help us understand what you're building..."
                      value={form.message}
                      onChange={update('message')}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <p className="form-note">🔒 100% confidential. We sign NDAs on request before any discussion.</p>
                </form>
              ) : (
                <div className="form-success">
                  <div className="fs-icon">🎉</div>
                  <div className="fs-title">Message Sent!</div>
                  <p className="fs-desc">
                    Thank you for reaching out. A senior team member will review your project and get back to you within 4 business hours.<br /><br />
                    In the meantime, explore our <Link to="/projects" style={{ color: 'var(--b3)', fontWeight: 600 }}>recent projects</Link> or <Link to="/services" style={{ color: 'var(--b3)', fontWeight: 600 }}>services</Link>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section style={{ background: 'var(--page)' }}>
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">Why TechSphere</div>
            <h2 className="sec-h2">What Happens When <em>You Contact Us</em></h2>
          </div>
          <div className="why-grid">
            {whyCards.map((w, i) => (
              <div key={i} className={`wcard sr d${i + 1}`}>
                <div className="wcard-ico">{w.ico}</div>
                <div className="wcard-t">{w.t}</div>
                <div className="wcard-d">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL OFFICES */}
      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="centered">
            <div className="sec-label">Global Presence</div>
            <h2 className="sec-h2">We're <em>Close to You</em> Wherever You Are</h2>
          </div>
          <div className="off-grid">
            {offices.map((o, i) => (
              <div key={i} className={`ocard sr d${i + 1}`}>
                <div className="oc-flag">{o.flag}</div>
                <div className="oc-city">{o.city}</div>
                <div className="oc-ctry">{o.country}</div>
                <div className="oc-addr">{o.addr}</div>
                <div className="oc-ph">{o.ph}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box-inner sr">
          <div className="cta-glow cg1" /><div className="cta-glow cg2" />
          <h2>Ready to Start? Let's Talk.</h2>
          <p>No obligation, no pressure — just an honest conversation about your project and how we can help.</p>
          <div className="cta-btns">
            <a href="mailto:hello@techsphere.io" className="cta-w">Email Us Directly →</a>
            <Link to="/projects" className="cta-o">See Our Work First</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
