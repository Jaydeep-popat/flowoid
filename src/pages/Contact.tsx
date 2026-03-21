import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  ArrowRight, Lock, MessageCircle, Zap,
} from 'lucide-react';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

/* ─── Form state ───────────────────────────────── */
interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}



/* ─── Shared input class ───────────────────────── */
const inputCls = [
  'block w-full px-4 py-3 rounded-xl',
  'border border-border bg-white text-[.9rem] text-dark',
  'transition-all duration-200 outline-none',
  'focus:border-b4 focus:ring-[3px] focus:ring-[rgba(72,69,168,.1)]',
  'placeholder:text-light',
].join(' ');

/* ─── Field wrapper ────────────────────────────── */
function Field({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[.8rem] font-semibold text-dark">
        {label}{req && <span className="text-b4 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  useScrollReveal();

  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', location: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <Navbar />

      {/* ══ HERO ════════════════════════════════════════ */}
      <div
        className="relative min-h-[52vh] flex items-center px-[6%] pt-6 md:pt-20 pb-16 mt-[90px] md:mt-[106px] overflow-hidden bg-white"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 90% 10%,rgba(45,43,107,.09),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 90%,rgba(15,14,42,.06),transparent 55%)' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.055) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 90% 10%,black 10%,transparent 70%)' }} />
        {/* Glow */}
        <div className="absolute right-[-80px] top-[-100px] w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.08),transparent 70%)', filter: 'blur(55px)' }} />

        <div className="relative z-[2] max-w-[1240px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — headline */}
          <div className="animate-hup">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5">
              Home <span className="opacity-35">/</span> <span className="text-gold">Contact</span>
            </div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2" />
              We Respond Within 4 Hours
            </div>
            <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
              Let's Build Something<br />
              <span className="grad-text">Extraordinary</span> Together
            </h1>
            <p className="text-[1rem] leading-[1.82] text-body max-w-[480px]">
              Whether you have a fully-formed brief or just a back-of-napkin idea — our team is ready to listen, advise, and help turn your vision into reality.
            </p>
          </div>

          {/* Right — contact highlights */}
          <div className="animate-hup grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ animationDelay: '.15s' }}>
            {[
              { icon: Mail, lbl: 'Email Us', val: 'contact@flowoid.tech' },
              { icon: Phone, lbl: 'Call Us', val: '+91 99248 55931' },
              { icon: MapPin, lbl: 'Location', val: 'Ahmedabad, Gujarat, India' },
              { icon: Clock, lbl: 'Working Hours', val: '7 Days a Week, 9am – 9pm IST' },
            ].map(({ icon: Icon, lbl, val }, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white/80 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-b4 transition-all duration-200">
                <div className="w-9 h-9 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[.72rem] font-bold text-muted tracking-[.05em] uppercase mb-[2px]">{lbl}</div>
                  <div className="text-[.85rem] font-medium text-dark leading-[1.45]">{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CONTACT MAIN ════════════════════════════════ */}
      <section className="bg-page py-20 px-[6%]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-14">

          {/* ── Left: Info ─────────────────────────────── */}
          <div className="sr-l flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-[1.75rem] font-extrabold text-dark tracking-[-0.02em] mb-2">
                Get in <em className="not-italic grad-text">Touch</em>
              </h2>
              <p className="text-[.88rem] text-muted leading-[1.72]">
                Our team is available 7 days a week, 9am–9pm IST. Drop us a message and we'll get back to you within 4 business hours.
              </p>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, lbl: 'Call Us', val: '+91 99248 55931', href: 'tel:+919924855931' },
                { icon: Mail, lbl: 'Email Us', val: ' contact@flowoid.tech', href: 'mailto:contact@flowoid.tech' },
                { icon: MapPin, lbl: 'Our Location', val: 'Ahmedabad, Gujarat, India', href: '#' },
                { icon: Clock, lbl: 'Working Hours', val: '7 Days a Week, 9am–9pm IST', href: '#' },
              ].map(({ icon: Icon, lbl, val, href }, i) => (
                <a key={i} href={href}
                  className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-border
                              transition-all duration-200 hover:border-b4 hover:shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0
                                  text-b4 group-hover:bg-gm group-hover:border-transparent group-hover:text-white transition-all duration-200">
                    <Icon size={17} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[.72rem] font-bold text-muted tracking-[.05em] uppercase">{lbl}</div>
                    <div className="text-[.87rem] font-medium text-dark">{val}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Punchline */}
            <div className="mt-auto p-5 bg-gm rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.25),transparent 70%)', filter: 'blur(20px)' }} />
              <p className="relative z-[1] font-heading text-[.95rem] font-semibold text-white/90 leading-[1.65] mb-3">
                "Have an idea? Let's turn it into something powerful. We're ready when you are."
              </p>
              <div className="relative z-[1] flex items-center gap-1.5 text-[.75rem] font-bold text-gold tracking-[.06em]">
                <Zap size={13} strokeWidth={2.5} /> Let's get started
              </div>
            </div>
          </div>

          {/* ── Right: Form ────────────────────────────── */}
          <div className="sr-r">
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Heading */}
                  <div>
                    <h3 className="font-heading text-[1.3rem] font-extrabold text-dark mb-1">Send Us a Message</h3>
                    <p className="text-[.83rem] text-muted">Fill in the details below and we'll respond within 4 business hours.</p>
                  </div>

                  {/* Name */}
                  <Field label="Full Name" req>
                    <input className={inputCls} type="text" placeholder="Your full name" value={form.name} onChange={update('name')} required />
                  </Field>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Gmail Address" req>
                      <input className={inputCls} type="email" placeholder="you@gmail.com" value={form.email} onChange={update('email')} required />
                    </Field>
                    <Field label="Phone Number">
                      <input className={inputCls} type="tel" placeholder="+91 99248 55931" value={form.phone} onChange={update('phone')} />
                    </Field>
                  </div>

                  {/* Location */}
                  <Field label="Your Location">
                    <input className={inputCls} type="text" placeholder="City, State, Country" value={form.location} onChange={update('location')} />
                  </Field>

                  {/* Message */}
                  <Field label="Your Message" req>
                    <textarea
                      className={`${inputCls} min-h-[140px] resize-none`}
                      placeholder="Tell us about your project, idea, or what you need help with..."
                      value={form.message}
                      onChange={update('message')}
                      required
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="relative overflow-hidden flex items-center justify-center gap-2 w-full py-3.5
                               rounded-xl text-[.92rem] font-bold text-dark bg-gg
                               shadow-[0_6px_24px_rgba(201,168,76,.38)] transition-all duration-[280ms]
                               hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(201,168,76,.55)]
                               before:content-[''] before:absolute before:inset-0
                               before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)]
                               before:pointer-events-none"
                  >
                    <Send size={16} strokeWidth={2} className="relative z-[1]" />
                    <span className="relative z-[1]">Send Message</span>
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-[.74rem] text-muted">
                    <Lock size={11} strokeWidth={2} /> 100% confidential — NDA on request before any discussion.
                  </p>
                </form>
              ) : (
                /* Success state */
                <div className="text-center py-14">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(16,185,129,.1)] border border-[rgba(16,185,129,.2)] mx-auto mb-5">
                    <CheckCircle size={32} strokeWidth={1.6} className="text-[#10B981]" />
                  </div>
                  <div className="font-heading text-[1.4rem] font-extrabold text-dark mb-2">Message Sent!</div>
                  <p className="text-[.88rem] text-muted leading-[1.72] max-w-[340px] mx-auto">
                    Thank you for reaching out. A senior team member will review your project and respond within 4 business hours.
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                    <Link to="/projects" className="inline-flex items-center gap-1.5 text-[.84rem] font-semibold text-b4 hover:text-gold transition-colors">
                      View our work <ArrowRight size={14} />
                    </Link>
                    <span className="text-border">|</span>
                    <Link to="/services" className="inline-flex items-center gap-1.5 text-[.84rem] font-semibold text-b4 hover:text-gold transition-colors">
                      Our services <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STILL UNSURE BANNER ══════════════════════════ */}
      <section className="bg-white py-16 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="sr relative overflow-hidden rounded-3xl border border-[rgba(45,43,107,.1)] bg-pale p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-[340px] h-[340px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(72,69,168,.09),transparent 65%)', filter: 'blur(40px)', transform: 'translate(30%,-30%)' }} />

            {/* Icon badge */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gm flex items-center justify-center shadow-[0_8px_28px_rgba(45,43,107,.28)]">
              <MessageCircle size={28} strokeWidth={1.6} className="text-white" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold text-dark tracking-[-0.02em] mb-2">
                Not Sure About Your Idea Yet? <em className="not-italic grad-text">That's Perfectly Fine.</em>
              </h3>
              <p className="text-[.92rem] text-body leading-[1.75] max-w-[580px] mx-auto md:mx-0">
                You don't need a fully formed plan to reach out. Share what's on your mind — a rough concept, a challenge you're facing, or even just a question. Our team will help you explore the possibilities, ask the right questions, and map out the best path forward.
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <a href="mailto:popatjaydeep21@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[.88rem] font-bold text-dark bg-gg
                            shadow-[0_6px_22px_rgba(201,168,76,.38)] relative overflow-hidden transition-all duration-[280ms]
                            hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(201,168,76,.52)]
                            before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">
                <Mail size={15} strokeWidth={2} className="relative z-[1]" />
                <span className="relative z-[1]">Ask Us Anything</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════ */}
      <div className="bg-page px-[6%] py-16">
        <div className="sr max-w-[1240px] mx-auto bg-gm rounded-3xl px-12 py-16 text-center relative overflow-hidden shadow-[0_28px_80px_rgba(15,14,42,.26)]">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-[-180px] right-[-130px] w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.2),transparent 70%)', filter: 'blur(28px)' }} />
          <div className="relative z-[2]">
            <h2 className="font-heading text-[clamp(1.7rem,3vw,2.7rem)] font-black text-white tracking-[-0.025em] mb-3">
              Ready to Start? Let's Talk.
            </h2>
            <p className="text-white/60 text-[.97rem] leading-[1.75] max-w-[460px] mx-auto mb-8">
              No obligation, no pressure — just an honest conversation about your project and how we can help.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="mailto:popatjaydeep21@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[.9rem] font-bold text-dark bg-gg
                            shadow-[0_8px_28px_rgba(201,168,76,.38)] relative overflow-hidden transition-all duration-[280ms]
                            hover:-translate-y-[3px] hover:shadow-[0_14px_38px_rgba(201,168,76,.55)]
                            before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">
                <Mail size={15} strokeWidth={2} className="relative z-[1]" />
                <span className="relative z-[1]">Email Us Directly</span>
              </a>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-7 py-[13px] rounded-full text-[.9rem] font-semibold
                               text-white border border-white/25 bg-white/8 transition-all duration-[280ms]
                               hover:bg-white/18 hover:border-white/50">
                See Our Work <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
