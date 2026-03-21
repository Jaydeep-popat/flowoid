import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

interface FormState { firstName:string; lastName:string; email:string; phone:string; company:string; service:string; timeline:string; budget:string; message:string; }

const offices = [
  { flag:'🇮🇳', city:'Bangalore', country:'India — Headquarters', addr:'TechSphere Tower, 12th Cross, Indiranagar, Bangalore 560038', ph:'+91 80 4567 8900' },
  { flag:'🇬🇧', city:'London',    country:'United Kingdom',        addr:'Level 24, One Canada Square, Canary Wharf, London E14 5AB',   ph:'+44 20 7946 0320' },
  { flag:'🇸🇬', city:'Singapore', country:'Singapore',             addr:'1 Marina Boulevard, #28-00, Singapore 018982',                ph:'+65 6123 4567' },
  { flag:'🇦🇪', city:'Dubai',     country:'UAE',                   addr:'Gate Village 4, Level 3, DIFC, Dubai 506589, UAE',            ph:'+971 4 123 4567' },
];

const whyCards = [
  { ico:'⚡', t:'4-Hour Response Guarantee', d:"Every inquiry gets a personal response within 4 business hours — not an auto-reply, but a real conversation with a senior engineer or consultant." },
  { ico:'📋', t:'Free Project Assessment',   d:"We provide a detailed technical feasibility report and rough cost estimate for your project at zero cost. No strings, no sales pressure." },
  { ico:'🔒', t:'NDA Before We Talk',        d:"Your idea is safe with us. We sign a mutual NDA before any project discussions begin — it's standard practice for all client engagements." },
];

const timelines = ['ASAP','1–3 Months','3–6 Months','6+ Months','Flexible','Ongoing'];
const budgets   = ['Under $5K','$5K – $15K','$15K – $50K','$50K+'];
const services  = ['Cloud Infrastructure & Migration','Custom Software Development','Cybersecurity & Compliance','Data Engineering & Analytics','DevOps & CI/CD Automation','AI Integration & Automation','Digital Transformation','Other / Multiple Services'];

/* Input / Select / Textarea wrapper with shared styling */
const inputCls = "block w-full px-4 py-[11px] rounded-[10px] border-[1.5px] border-border bg-white text-[.9rem] text-dark transition-[border-color,box-shadow] duration-200 outline-none focus:border-b4 focus:ring-[3px] focus:ring-[rgba(72,69,168,.12)] focus:shadow-none placeholder:text-light";

export default function Contact() {
  useScrollReveal();

  const [form, setForm] = useState<FormState>({ firstName:'', lastName:'', email:'', phone:'', company:'', service:'', timeline:'', budget:'', message:'' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div className="relative min-h-[54vh] bg-white flex items-center px-[6%] pt-32 pb-20 mt-[106px] overflow-hidden"
        style={{ background:'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)',backgroundSize:'36px 36px',maskImage:'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
        <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',filter:'blur(55px)' }} />
        <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none" style={{ width:700,height:700,right:-220,top:-220 }} />
        <div className="relative z-[2] max-w-[1240px] w-full">
          <div className="flex items-center gap-2 text-[.74rem] font-semibold text-muted tracking-[.08em] uppercase mb-[18px]">Home <span className="opacity-40">/</span> <span className="text-gold">Contact</span></div>
          <div className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2" />
            We Respond Within 4 Hours
          </div>
          <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-[18px]">Let's Build Something<br /><span className="grad-text">Extraordinary</span> Together</h1>
          <p className="text-[1.05rem] leading-[1.82] text-body max-w-[580px]">Whether you have a fully-formed brief or just a back-of-napkin idea — our team is ready to listen, advise, and help turn your vision into reality.</p>
        </div>
      </div>

      {/* CONTACT MAIN */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[64px]">
          {/* LEFT INFO */}
          <div className="sr-l">
            <h2 className="font-heading text-[1.8rem] font-extrabold text-dark tracking-[-0.02em] mb-3">Get in <em className="not-italic grad-text">Touch</em></h2>
            <p className="text-[.9rem] text-muted leading-[1.7] mb-7">Our team is available Monday–Friday, 9am–7pm IST. For urgent matters, existing clients can access 24/7 support through our dedicated portal.</p>

            <div className="flex flex-col gap-[13px] mb-8">
              {[
                { ico:'📧', lbl:'Email Us',       val:'hello@techsphere.io' },
                { ico:'📞', lbl:'Call Us',         val:'+91 80 4567 8900' },
                { ico:'💬', lbl:'Live Chat',       val:'Available Mon–Fri, 9am–6pm IST' },
                { ico:'🗓️', lbl:'Book a Meeting',  val:'Schedule a 30-min discovery call' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-[13px] p-[13px_15px] bg-page rounded-[13px] border-[1.5px] border-border">
                  <div className="w-[38px] h-[38px] rounded-[10px] bg-pale border border-border flex items-center justify-center text-[1rem] flex-shrink-0">{c.ico}</div>
                  <div>
                    <div className="text-[.73rem] font-bold text-muted tracking-[.04em]">{c.lbl}</div>
                    <div className="text-[.87rem] font-medium text-dark">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="font-heading text-[.82rem] font-bold text-dark tracking-[.04em] uppercase mb-4">Our Global Offices</div>
            <div className="grid grid-cols-2 gap-[10px]">
              {[
                { city:'🇮🇳 Bangalore', addr:'HQ — Indiranagar, 560038' },
                { city:'🇬🇧 London',    addr:'Canary Wharf, E14 5AB' },
                { city:'🇸🇬 Singapore', addr:'Marina Bay, 018982' },
                { city:'🇦🇪 Dubai',     addr:'DIFC, Dubai 506589' },
              ].map((o, i) => (
                <div key={i} className="flex items-center gap-[7px] p-[10px_12px] rounded-[10px] bg-page border border-border">
                  <div>
                    <div className="text-[.79rem] font-bold text-dark">{o.city}</div>
                    <div className="text-[.69rem] text-muted">{o.addr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="sr-r">
            <div className="bg-page border-[1.5px] border-border rounded-[24px] p-[36px] shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <div className="font-heading text-[1.35rem] font-extrabold text-dark mb-[5px]">Tell Us About Your Project</div>
                    <p className="text-[.84rem] text-muted">Fill in the details and we'll respond within 4 business hours.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[.78rem] font-semibold text-dark">First Name *</label>
                      <input className={inputCls} type="text" placeholder="Arjun" value={form.firstName} onChange={update('firstName')} required />
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[.78rem] font-semibold text-dark">Last Name *</label>
                      <input className={inputCls} type="text" placeholder="Mehta" value={form.lastName} onChange={update('lastName')} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[.78rem] font-semibold text-dark">Work Email *</label>
                      <input className={inputCls} type="email" placeholder="arjun@company.com" value={form.email} onChange={update('email')} required />
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[.78rem] font-semibold text-dark">Phone</label>
                      <input className={inputCls} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={update('phone')} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[.78rem] font-semibold text-dark">Company Name</label>
                    <input className={inputCls} type="text" placeholder="Your Company Ltd." value={form.company} onChange={update('company')} />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[.78rem] font-semibold text-dark">Service You Need *</label>
                    <select className={inputCls} value={form.service} onChange={update('service')} required>
                      <option value="" disabled>Select a service...</option>
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[.78rem] font-semibold text-dark">Project Timeline</label>
                    <div className="grid grid-cols-3 gap-[7px]">
                      {timelines.map(t => (
                        <label key={t} className={`flex items-center justify-center text-center px-[10px] py-[9px] rounded-[9px] text-[.76rem] font-semibold border-[1.5px] cursor-pointer transition-all duration-200 ${form.timeline === t ? 'bg-gm text-white border-transparent' : 'bg-white border-border text-body hover:border-b4 hover:bg-pale'}`}>
                          <input type="radio" name="tl" className="sr-only" checked={form.timeline === t} onChange={() => setForm(f => ({ ...f, timeline: t }))} />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[.78rem] font-semibold text-dark">Estimated Budget</label>
                    <div className="grid grid-cols-2 gap-[7px]">
                      {budgets.map(b => (
                        <label key={b} className={`flex items-center justify-center px-[10px] py-[9px] rounded-[9px] text-[.76rem] font-semibold border-[1.5px] cursor-pointer transition-all duration-200 ${form.budget === b ? 'bg-gm text-white border-transparent' : 'bg-white border-border text-body hover:border-b4 hover:bg-pale'}`}>
                          <input type="radio" name="bgt" className="sr-only" checked={form.budget === b} onChange={() => setForm(f => ({ ...f, budget: b }))} />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[.78rem] font-semibold text-dark">Tell Us About Your Project *</label>
                    <textarea className={`${inputCls} min-h-[130px] resize-none`} placeholder="Describe your project, goals, challenges..." value={form.message} onChange={update('message')} required />
                  </div>

                  <button type="submit" className="relative overflow-hidden flex items-center justify-center gap-2 w-full py-[14px] rounded-xl text-[.92rem] font-bold text-dark bg-gg shadow-[0_6px_24px_rgba(201,168,76,.4)] transition-all duration-[280ms] hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">
                    <span className="relative z-[1]">Send Message</span>
                    <svg className="relative z-[1] w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <p className="text-center text-[.74rem] text-muted">🔒 100% confidential. We sign NDAs on request before any discussion.</p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="text-[3.5rem] mb-4">🎉</div>
                  <div className="font-heading text-[1.5rem] font-extrabold text-dark mb-3">Message Sent!</div>
                  <p className="text-[.89rem] text-muted leading-[1.7]">
                    Thank you for reaching out. A senior team member will review your project and get back to you within 4 business hours.<br /><br />
                    In the meantime, explore our <Link to="/projects" className="text-b4 font-semibold hover:text-gold transition-colors">recent projects</Link> or <Link to="/services" className="text-b4 font-semibold hover:text-gold transition-colors">services</Link>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="bg-page py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[50px]">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Why TechSphere</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">What Happens When <em className="not-italic grad-text">You Contact Us</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {whyCards.map((w, i) => (
              <div key={i} className={`sr d${i+1} group bg-white border-[1.5px] border-border rounded-[20px] p-[28px] transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-b4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gg before:scale-x-0 before:origin-left before:transition-transform before:duration-350 group-hover:before:scale-x-100 relative overflow-hidden`}>
                <div className="w-[50px] h-[50px] rounded-[14px] bg-pale border-[1.5px] border-border flex items-center justify-center text-[1.3rem] mb-4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent">{w.ico}</div>
                <div className="font-heading text-[.98rem] font-bold text-dark mb-[9px]">{w.t}</div>
                <div className="text-[.85rem] text-body leading-[1.7]">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL OFFICES */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[50px]">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Global Presence</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">We're <em className="not-italic grad-text">Close to You</em> Wherever You Are</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            {offices.map((o, i) => (
              <div key={i} className={`sr d${i+1} group bg-page border-[1.5px] border-border rounded-[20px] p-[24px] transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-b4`}>
                <div className="text-[2.4rem] mb-3">{o.flag}</div>
                <div className="font-heading text-[1.05rem] font-extrabold text-dark mb-[3px]">{o.city}</div>
                <div className="text-[.73rem] font-bold text-gold tracking-[.04em] mb-[10px]">{o.country}</div>
                <div className="text-[.78rem] text-muted leading-[1.5] mb-3">{o.addr}</div>
                <div className="text-[.79rem] font-medium text-b4">{o.ph}</div>
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
          <h2 className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">Ready to Start? Let's Talk.</h2>
          <p className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">No obligation, no pressure — just an honest conversation about your project and how we can help.</p>
          <div className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
            <a href="mailto:hello@techsphere.io" className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-dark bg-gg shadow-[0_8px_28px_rgba(201,168,76,.4)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_14px_38px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">Email Us Directly →</a>
            <Link to="/projects" className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">See Our Work First</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
