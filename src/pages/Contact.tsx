import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  Lock,
  MessageSquare,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

type ServiceType =
  | 'Website Development'
  | 'Custom Software / ERP'
  | 'Web Application'
  | 'Mobile App'
  | 'Consultation & Roadmap';

type BudgetRange =
  | 'Under ₹25,000'
  | '₹25k – ₹50k'
  | '₹50k – ₹1 Lakh'
  | '₹1L – ₹2.5L'
  | '₹2.5L+'
  | 'Not sure yet';

interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: ServiceType;
  budget: BudgetRange;
  message: string;
}

const inputCls = [
  'block w-full px-4 py-3.5 rounded-xl',
  'border border-border bg-white text-[.92rem] text-dark',
  'transition-all duration-200 outline-none',
  'focus:border-b4 focus:ring-[3px] focus:ring-[rgba(72,69,168,.12)]',
  'placeholder:text-muted/60',
].join(' ');

function Field({
  label,
  req,
  children,
}: {
  label: string;
  req?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[.82rem] font-bold text-dark">
        {label}
        {req && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const faqs = [
  {
    q: 'How quickly can our project begin after the initial call?',
    a: 'Typically within 5 to 7 business days. Once we agree on the scope, architecture, and sprint milestones, development begins immediately with a dedicated senior engineer.',
  },
  {
    q: 'What if our business workflows or requirements change during development?',
    a: 'We work in agile 2-week sprints. If you want to modify a feature, add an approval step, or reprioritize based on team feedback, we adjust your roadmap transparently without hidden penalty fees.',
  },
  {
    q: 'Do we receive full ownership of the source code and database?',
    a: '100% yes. Upon project completion and final payment, you receive full intellectual property ownership, the complete Git repository, database credentials, and deployment keys. We never hold your software hostage.',
  },
  {
    q: 'Can we meet in person in Rajkot to discuss our requirements?',
    a: 'Absolutely. We welcome local Gujarat founders, factory owners, and trade directors at our Rajkot studio for in-person whiteboard architecture and workflow discovery sessions.',
  },
  {
    q: 'What happens during the free 20-minute technical roadmap call?',
    a: 'We review your current spreadsheets, website, or new software vision. We give you honest engineering advice, tell you what stack fits best, point out hidden risks, and outline a realistic timeline and budget range.',
  },
];

export default function Contact() {
  useScrollReveal();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    location: '',
    service: 'Website Development',
    budget: '₹25k – ₹50k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const servicesList: ServiceType[] = [
    'Website Development',
    'Custom Software / ERP',
    'Web Application',
    'Mobile App',
    'Consultation & Roadmap',
  ];

  const budgetList: BudgetRange[] = [
    'Under ₹25,000',
    '₹25k – ₹50k',
    '₹50k – ₹1 Lakh',
    '₹1L – ₹2.5L',
    '₹2.5L+',
    'Not sure yet',
  ];

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const contactRef = useRef<HTMLDivElement>(null);
  const contactInView = useInView(contactRef, { once: true, amount: 0.1 });

  return (
    <>
      <Helmet>
        <title>Contact Flowoid | Talk to Senior Engineers in Rajkot</title>
        <meta
          name="description"
          content="Get in touch with Flowoid's engineering team in Rajkot, Gujarat. Get a free 20-minute technical roadmap for your website, custom software, or web application."
        />
      </Helmet>

      <Navbar />

      {/* ══ HERO SECTION ══ */}
      <div className="relative min-h-[52vh] bg-page-dots flex items-center px-[5%] pt-8 md:pt-16 pb-24 md:pb-28 mt-[80px] md:mt-[86px] overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)',
            backgroundSize: '36px 36px',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)',
          }}
        />
        <div
          className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',
            filter: 'blur(55px)',
          }}
        />
        <div
          className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)',
            filter: 'blur(45px)',
          }}
        />

        <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left Column */}
            <motion.div initial="hidden" animate="visible" variants={container}>
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5"
              >
                <Link to="/" className="text-muted no-underline hover:text-dark">
                  Home
                </Link>
                <span className="opacity-40">/</span>
                <span className="text-gold">Direct Contact</span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b3 tracking-[.1em] uppercase mb-5"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)]" />
                Response Within 4 Business Hours · Rajkot, Gujarat
              </motion.div>

              <h1 className="font-heading font-black text-[clamp(2.15rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease } },
                    }}
                  >
                    Talk directly with the
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        transition: { duration: 0.6, ease, delay: 0.08 },
                      },
                    }}
                  >
                    engineers who <span className="grad-text">build your code.</span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUp}
                className="text-[1.02rem] leading-[1.78] text-body max-w-[540px] mb-8"
              >
                No junior account managers. No high-pressure sales pitch. Just an
                honest, 20-minute conversation about your operational workflows,
                timeline, and transparent costs.
              </motion.p>

              {/* Direct channels */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-4 text-[.85rem] font-bold text-dark"
              >
                <a
                  href="tel:+919924855931"
                  className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-full bg-white border border-border hover:border-b4 shadow-2xs hover:shadow-xs transition-all"
                >
                  <Phone size={15} className="text-gold" />
                  <span>+91 99248 55931</span>
                </a>
                <a
                  href="mailto:contact@flowoid.tech"
                  className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-full bg-white border border-border hover:border-b4 shadow-2xs hover:shadow-xs transition-all"
                >
                  <Mail size={15} className="text-b4" />
                  <span>contact@flowoid.tech</span>
                </a>
                <div className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-full bg-pale border border-border/80 text-muted">
                  <Clock size={15} />
                  <span>Mon – Sat: 9am – 8pm IST</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: 3 Steps When You Reach Out */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 text-[.7rem] font-bold text-gold tracking-widest uppercase mb-4">
                <ShieldCheck size={15} />
                <span>WHAT HAPPENS NEXT?</span>
              </div>
              <h3 className="font-heading font-extrabold text-[1.25rem] text-dark leading-tight mb-4">
                Our 3-Step Discovery Process
              </h3>

              <div className="space-y-4 text-[.9rem] leading-[1.65]">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      Senior Engineer Review in 4 Hours
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      A developer reviews your brief and drafts initial technical
                      architecture notes before contacting you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      20-Minute Technical Roadmap
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      We schedule a call or meet in person in Rajkot to walk
                      through your workflows, edge cases, and best-fit tech stack.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      Fixed-Scope Proposal in Writing
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      You receive a detailed milestone roadmap with fixed
                      timelines and transparent rupee pricing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTACT FORM & DETAILS ══ */}
      <section className="bg-page py-20 md:py-28 px-[5%]">
        <div
          ref={contactRef}
          className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Direct Office & WhatsApp Connect */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate={contactInView ? 'visible' : 'hidden'}
            variants={container}
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-widest uppercase mb-2">
                DIRECT ACCESS
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-dark leading-tight mb-3">
                Reach our team in Rajkot.
              </h2>
              <p className="text-[.95rem] text-body leading-[1.75]">
                Whether you have an extensive functional specification or just a
                rough operational headache, we are ready to listen.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3.5">
              <a
                href="https://wa.me/919924855931?text=Hi%20Flowoid%20team,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-[#F0FDF4] rounded-2xl border border-emerald-200 transition-all duration-200 hover:shadow-md hover:border-emerald-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="text-[.74rem] font-bold text-emerald-800 uppercase tracking-wide">
                      Instant WhatsApp Chat
                    </div>
                    <div className="text-[.94rem] font-bold text-emerald-950">
                      Chat with an Engineer
                    </div>
                    <div className="text-[.76rem] text-emerald-700">
                      Average reply time: under 15 minutes
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-emerald-700 group-hover:translate-x-1 transition-transform"
                />
              </a>

              <a
                href="tel:+919924855931"
                className="group p-5 bg-white rounded-2xl border border-border transition-all duration-200 hover:border-b4 hover:shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 group-hover:bg-gm group-hover:text-white transition-colors">
                    <Phone size={19} />
                  </div>
                  <div>
                    <div className="text-[.72rem] font-bold text-muted uppercase tracking-wide">
                      Direct Telephone Line
                    </div>
                    <div className="text-[.95rem] font-bold text-dark">
                      +91 99248 55931
                    </div>
                    <div className="text-[.76rem] text-muted">
                      Direct connection to senior engineers
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-muted group-hover:text-b4 group-hover:translate-x-1 transition-all"
                />
              </a>

              <a
                href="mailto:contact@flowoid.tech"
                className="group p-5 bg-white rounded-2xl border border-border transition-all duration-200 hover:border-b4 hover:shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 group-hover:bg-gm group-hover:text-white transition-colors">
                    <Mail size={19} />
                  </div>
                  <div>
                    <div className="text-[.72rem] font-bold text-muted uppercase tracking-wide">
                      Project Inquiries & RFPs
                    </div>
                    <div className="text-[.95rem] font-bold text-dark">
                      contact@flowoid.tech
                    </div>
                    <div className="text-[.76rem] text-muted">
                      Send docs, wireframes, or spreadsheets
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-muted group-hover:text-b4 group-hover:translate-x-1 transition-all"
                />
              </a>

              <div className="p-5 bg-white rounded-2xl border border-border flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4">
                  <MapPin size={19} />
                </div>
                <div>
                  <div className="text-[.72rem] font-bold text-muted uppercase tracking-wide">
                    Engineering Studio
                  </div>
                  <div className="text-[.95rem] font-bold text-dark">
                    Rajkot, Gujarat, India
                  </div>
                  <div className="text-[.76rem] text-muted">
                    Open for in-person founder whiteboard sessions
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Whiteboard Guarantee Card */}
            <div className="p-6 rounded-2xl bg-gm text-white relative overflow-hidden shadow-md mt-2">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative z-[2]">
                <div className="text-gold font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>THE RAJKOT PROMISE</span>
                </div>
                <p className="font-heading font-semibold text-[.98rem] text-white/95 leading-relaxed mb-3">
                  "If you are in Gujarat, we invite you to sit down with us in
                  Rajkot. We'll map your whole database workflow on a whiteboard
                  before you spend a single rupee."
                </p>
                <div className="text-[.78rem] text-white/60 font-medium">
                  — Flowoid Engineering Team
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: The Inquiry Form */}
          <motion.div
            initial="hidden"
            animate={contactInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <div className="bg-white rounded-3xl border border-border p-7 sm:p-10 shadow-sm relative overflow-hidden">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-heading text-[1.45rem] font-black text-dark mb-1.5">
                      Request Your Technical Review
                    </h3>
                    <p className="text-[.88rem] text-muted leading-relaxed">
                      Fill out the form below. A senior software engineer will
                      review your project and respond within 4 business hours.
                    </p>
                  </div>

                  {/* 1. What service do you need? */}
                  <div>
                    <label className="block text-[.82rem] font-bold text-dark mb-2.5">
                      What are you looking to build?{' '}
                      <span className="text-gold">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((svc) => {
                        const isSelected = form.service === svc;
                        return (
                          <button
                            type="button"
                            key={svc}
                            onClick={() =>
                              setForm((f) => ({ ...f, service: svc }))
                            }
                            className={`px-3.5 py-2 rounded-xl text-[.82rem] font-bold transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-dark text-white shadow-xs'
                                : 'bg-pale/70 text-body border border-border hover:border-b4 hover:text-dark'
                            }`}
                          >
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Personal Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Your Full Name" req>
                      <input
                        className={inputCls}
                        type="text"
                        placeholder="e.g. Rajesh Patel"
                        value={form.name}
                        onChange={update('name')}
                        required
                      />
                    </Field>

                    <Field label="Phone / WhatsApp Number" req>
                      <input
                        className={inputCls}
                        type="tel"
                        placeholder="+91 99248 55931"
                        value={form.phone}
                        onChange={update('phone')}
                        required
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Work / Business Email" req>
                      <input
                        className={inputCls}
                        type="email"
                        placeholder="rajesh@yourcompany.com"
                        value={form.email}
                        onChange={update('email')}
                        required
                      />
                    </Field>

                    <Field label="City / Location">
                      <input
                        className={inputCls}
                        type="text"
                        placeholder="Rajkot, Ahmedabad, Surat..."
                        value={form.location}
                        onChange={update('location')}
                      />
                    </Field>
                  </div>

                  {/* 3. Budget Range */}
                  <div>
                    <label className="block text-[.82rem] font-bold text-dark mb-2.5">
                      Estimated Investment Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetList.map((b) => {
                        const isSelected = form.budget === b;
                        return (
                          <button
                            type="button"
                            key={b}
                            onClick={() =>
                              setForm((f) => ({ ...f, budget: b }))
                            }
                            className={`px-3 py-1.5 rounded-lg text-[.78rem] font-bold transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-b4 text-white shadow-2xs'
                                : 'bg-pale/60 text-muted border border-border hover:border-b4 hover:text-dark'
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Project Message */}
                  <Field label="Tell Us About Your Project & Operational Goals" req>
                    <textarea
                      className={`${inputCls} min-h-[130px] resize-none`}
                      placeholder="Describe what you want to build, what spreadsheets or manual processes you want to eliminate, or your current website challenges..."
                      value={form.message}
                      onChange={update('message')}
                      required
                    />
                  </Field>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative overflow-hidden flex items-center justify-center gap-2.5 w-full min-h-[50px] py-3.5 rounded-xl text-[.92rem] font-bold text-white bg-mg shadow-[0_8px_24px_rgba(20,16,58,.3)] hover:shadow-[0_12px_32px_rgba(20,16,58,.4)] transition-all duration-200 cursor-pointer"
                  >
                    <Send size={16} strokeWidth={2} />
                    <span>Send Project Inquiry →</span>
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 text-center text-[.76rem] text-muted">
                    <Lock size={12} strokeWidth={2} className="text-gold" />
                    <span>
                      100% Confidential. NDA available upon request. Zero spam
                      guarantee.
                    </span>
                  </div>
                </form>
              ) : (
                /* ─── SUCCESS STATE ─── */
                <motion.div
                  className="text-center py-12 px-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 mx-auto mb-5">
                    <CheckCircle2 size={36} className="text-emerald-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-dark mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-[.94rem] text-body leading-relaxed max-w-[420px] mx-auto mb-7">
                    Thank you, <strong>{form.name}</strong>. A senior developer
                    is reviewing your project brief and will reach out via
                    WhatsApp/Email within <strong>4 business hours</strong>.
                  </p>

                  <div className="p-5 rounded-2xl bg-pale/70 border border-border text-left max-w-[420px] mx-auto mb-8 text-[.85rem] space-y-2">
                    <div className="font-bold text-dark text-xs uppercase tracking-wider mb-2">
                      Your Submission Summary:
                    </div>
                    <div>
                      <span className="text-muted">Selected Service:</span>{' '}
                      <span className="font-bold text-dark">
                        {form.service}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted">Investment Budget:</span>{' '}
                      <span className="font-bold text-dark">{form.budget}</span>
                    </div>
                    <div>
                      <span className="text-muted">Contact Info:</span>{' '}
                      <span className="font-bold text-dark">{form.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a
                      href="https://wa.me/919924855931?text=Hi%20Flowoid%20team,%20I%20just%20submitted%20an%20inquiry%20form."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[.85rem] font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                    >
                      <MessageSquare size={14} />
                      <span>Follow up on WhatsApp</span>
                    </a>
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1.5 text-[.85rem] font-bold text-b4 hover:text-dark transition-colors"
                    >
                      <span>Explore our live projects</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FREQUENTLY ASKED QUESTIONS ══ */}
      <section className="bg-white py-20 md:py-24 px-[5%] border-t border-border/60">
        <div className="max-w-[920px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[.7rem] font-bold text-gold tracking-widest uppercase mb-2">
              <HelpCircle size={15} />
              <span>FREQUENT QUESTIONS</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-dark leading-tight mb-3">
              Everything you need to know before reaching out.
            </h2>
            <p className="text-[.95rem] text-body leading-relaxed max-w-[560px] mx-auto">
              Straightforward answers to the most common questions clients ask
              about our process, timelines, and code ownership.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-page overflow-hidden transition-all duration-200 hover:border-b4/40"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-[1.02rem] text-dark leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-b4 text-white border-b4' : 'text-muted'
                      }`}
                    >
                      <ChevronDown size={15} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-[.92rem] leading-[1.8] text-body border-t border-border/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CLOSING ROADMAP CTA ══ */}
      <div className="bg-page px-[5%] py-28 md:py-32 border-t border-border/40">
        <motion.div
          className="max-w-[1240px] mx-auto bg-gm rounded-[32px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 640,
              height: 640,
              top: -220,
              right: -160,
              background:
                'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',
              filter: 'blur(24px)',
            }}
          />

          <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
            FIRST STEP
          </div>
          <h2 className="relative z-[2] font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold text-white leading-[1.14] tracking-[-0.025em] mb-4 max-w-[780px] mx-auto">
            Get a free 20-minute technical roadmap. No Commitment-Just discovery, no invoice.
          </h2>
          <p className="relative z-[2] text-white/75 text-[1.02rem] leading-[1.78] max-w-[620px] mx-auto mb-9">
            Bring us your current website, spreadsheet dilemma, or new software
            vision. We will review what technology fits best, give you a
            realistic timeline, and outline an honest budget estimate.
          </p>

          <div className="relative z-[2] flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/919924855931?text=Hi%20Flowoid%20team,%20I%20would%20like%20to%20start%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-gold rounded-full min-h-[50px] px-8 py-3.5 group"
            >
              <span>Start Your Project</span>
              <ArrowRight size={17} strokeWidth={2.4} className="btn-arrow" />
            </a>
            <a
              href="tel:+919924855931"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-full text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55"
            >
              <Phone size={15} className="text-gold" />
              <span>Call +91 99248 55931</span>
            </a>
          </div>

          <div className="relative z-[2] mt-7 flex flex-wrap items-center justify-center gap-3 text-[.82rem] text-white/60 font-medium">
            <span>✓ Zero sales pressure</span>
            <span>·</span>
            <span>✓ Direct discussion with a senior engineer</span>
            <span>·</span>
            <span>✓ Technical roadmap is yours to keep</span>
          </div>
        </motion.div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
