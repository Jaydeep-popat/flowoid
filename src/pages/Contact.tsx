import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  Lock,
  MessageCircle,
  Zap,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import useScrollReveal from "../hooks/useScrollReveal";

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease } },
};
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

/* ─── Form state ─── */
interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}

/* ─── Input class ─── */
const inputCls = [
  "block w-full px-4 py-3 rounded-xl",
  "border border-border bg-white text-[.9rem] text-dark",
  "transition-all duration-200 outline-none",
  "focus:border-b4 focus:ring-[3px] focus:ring-[rgba(72,69,168,.1)]",
  "placeholder:text-light",
].join(" ");

/* ─── Field wrapper ─── */
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
    <div className="flex flex-col gap-[6px]">
      <label className="text-[.8rem] font-semibold text-dark">
        {label}
        {req && <span className="text-b4 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  useScrollReveal();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* Refs for contact section animations */
  const contactRef = useRef<HTMLDivElement>(null);
  const contactInView = useInView(contactRef, { once: true, amount: 0.1 });

  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerInView = useInView(bannerRef, { once: true, amount: 0.2 });

  return (
    <>
      <Navbar />

      {/* ══ HERO ══ */}
      <div
        className="relative min-h-[52vh] bg-page-dots flex items-center px-[5%] pt-3 md:pt-12 pb-16 mt-[80px] md:mt-[86px] overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(45,43,107,.055) 1.5px,transparent 1.5px)",
            backgroundSize: "36px 36px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 90% 10%,black 10%,transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-80px] top-[-100px] w-[520px] h-[520px] rounded-full pointer-events-none animate-pulse3"
          style={{
            background:
              "radial-gradient(circle,rgba(45,43,107,.08),transparent 70%)",
            filter: "blur(55px)",
          }}
        />

        <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={container}>
            <div className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5">
              Home <span className="opacity-35">/</span>{" "}
              <span className="text-gold">Contact</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2" />
              We Respond Within 4 Hours
            </div>
            <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      transition: { duration: 0.85, ease },
                    },
                  }}
                >
                  Let's Build Something
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      transition: { duration: 0.85, ease, delay: 0.08 },
                    },
                  }}
                >
                  <span className="grad-text">Extraordinary</span> Together
                </motion.span>
              </span>
            </h1>
            <p className="text-[1rem] leading-[1.82] text-body max-w-[480px]">
              Whether you have a fully-formed brief or just a back-of-napkin
              idea — our team is ready to listen, advise, and help turn your
              vision into reality.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div className="flex flex-col gap-4 min-w-[260px]" initial="hidden" animate="visible" variants={container} style={{ transition: 'none' }}>
            {[
              { icon: Mail, title: "Email Us", sub: "contact@flowoid.tech" },
              { icon: Phone, title: "Call Us", sub: "+91 99248 55931" },
              { icon: MapPin, title: "Location", sub: "Rajkot, Gujarat, India" },
              { icon: Clock, title: "Working Hours", sub: "7 Days a Week, 9am - 9pm" },
            ].map(({ icon: Icon, title, sub }, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease, delay: 0.2 + i * 0.08 } } }}
                whileHover={{ x: -4, transition: { duration: 0.2 } }}
                className="group flex items-center gap-3 p-4 bg-white/80 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:bg-white hover:border-b4 transition-[border,box-shadow,background] duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 transition-all duration-300 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-110">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[.82rem] font-bold text-dark">{title}</div>
                  <div className="text-[.73rem] text-muted">{sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

      {/* ══ CONTACT MAIN ══ */}
      <section className="bg-page py-20 px-[5%]">
        <div
          ref={contactRef}
          className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-14"
        >
          {/* Left: Info */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-[1.75rem] font-extrabold text-dark tracking-[-0.02em] mb-2">
                Get in <em className="not-italic grad-text">Touch</em>
              </h2>
              <p className="text-[.88rem] text-muted leading-[1.72]">
                Our team is available 7 days a week, 9am–9pm IST. Drop us a
                message and we'll get back to you within 4 business hours.
              </p>
            </motion.div>

            <motion.div variants={container} className="flex flex-col gap-3">
              {[
                {
                  icon: Phone,
                  lbl: "Call Us",
                  val: "+91 99248 55931",
                  href: "tel:+919924855931",
                },
                {
                  icon: Mail,
                  lbl: "Email Us",
                  val: "contact@flowoid.tech",
                  href: "mailto:contact@flowoid.tech",
                },
                {
                  icon: MapPin,
                  lbl: "Our Location",
                  val: "Rajkot, Gujarat, India",
                  href: "#",
                },
                {
                  icon: Clock,
                  lbl: "Working Hours",
                  val: "7 Days a Week, 9am–9pm IST",
                  href: "#",
                },
              ].map(({ icon: Icon, lbl, val, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  variants={fadeUp}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-border transition-all duration-200 hover:border-b4 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-pale border border-border flex items-center justify-center flex-shrink-0 text-b4 group-hover:bg-gm group-hover:border-transparent group-hover:text-white transition-all duration-200 group-hover:scale-110">
                    <Icon size={17} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[.72rem] font-bold text-muted tracking-[.05em] uppercase">
                      {lbl}
                    </div>
                    <div className="text-[.87rem] font-medium text-dark">
                      {val}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Punchline */}
            <motion.div
              variants={scaleIn}
              className="mt-auto p-5 bg-gm rounded-2xl relative overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,.07) 1px,transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div
                className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle,rgba(201,168,76,.25),transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <p className="relative z-[1] font-heading text-[.95rem] font-semibold text-white/90 leading-[1.65] mb-3">
                "Have an idea? Let's turn it into something powerful. We're
                ready when you are."
              </p>
              <div className="relative z-[1] flex items-center gap-1.5 text-[.75rem] font-bold text-gold tracking-[.06em]">
                <Zap size={13} strokeWidth={2.5} /> Let's get started
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={fadeRight}
          >
            <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-heading text-[1.3rem] font-extrabold text-dark mb-1">
                      Send Us a Message
                    </h3>
                    <p className="text-[.83rem] text-muted">
                      Fill in the details below and we'll respond within 4
                      business hours.
                    </p>
                  </div>

                  <Field label="Full Name" req>
                    <input
                      className={inputCls}
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={update("name")}
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Gmail Address" req>
                      <input
                        className={inputCls}
                        type="email"
                        placeholder="you@gmail.com"
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                    </Field>
                    <Field label="Phone Number">
                      <input
                        className={inputCls}
                        type="tel"
                        placeholder="+91 99248 55931"
                        value={form.phone}
                        onChange={update("phone")}
                      />
                    </Field>
                  </div>

                  <Field label="Your Location">
                    <input
                      className={inputCls}
                      type="text"
                      placeholder="City, State, Country"
                      value={form.location}
                      onChange={update("location")}
                    />
                  </Field>

                  <Field label="Your Message" req>
                    <textarea
                      className={`${inputCls} min-h-[140px] resize-none`}
                      placeholder="Tell us about your project, idea, or what you need help with..."
                      value={form.message}
                      onChange={update("message")}
                      required
                    />
                  </Field>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-[.92rem] font-bold text-white bg-mg shadow-[0_6px_24px_rgba(201,168,76,.38)] transition-shadow duration-[280ms] hover:shadow-[0_16px_42px_rgba(20,16,58,.44)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none"
                  >
                    <Send
                      size={16}
                      strokeWidth={2}
                      className="relative z-[1]"
                    />
                    <span className="relative z-[1]">Send Message</span>
                  </motion.button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-[.74rem] text-muted">
                    <Lock size={11} strokeWidth={2} /> 100% confidential — NDA
                    on request before any discussion.
                  </p>
                </form>
              ) : (
                /* Success state */
                <motion.div
                  className="text-center py-14"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(16,185,129,.1)] border border-[rgba(16,185,129,.2)] mx-auto mb-5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.2,
                    }}
                  >
                    <CheckCircle
                      size={32}
                      strokeWidth={1.6}
                      className="text-[#10B981]"
                    />
                  </motion.div>
                  <div className="font-heading text-[1.4rem] font-extrabold text-dark mb-2">
                    Message Sent!
                  </div>
                  <p className="text-[.88rem] text-muted leading-[1.72] max-w-[340px] mx-auto">
                    Thank you for reaching out. A senior team member will review
                    your project and respond within 4 business hours.
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1.5 text-[.84rem] font-semibold text-b4 hover:text-gold transition-colors"
                    >
                      View our work <ArrowRight size={14} />
                    </Link>
                    <span className="text-border">|</span>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-[.84rem] font-semibold text-b4 hover:text-gold transition-colors"
                    >
                      Our services <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ STILL UNSURE BANNER ══ */}
      <section className="bg-white py-16 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <motion.div
            ref={bannerRef}
            className="relative overflow-hidden rounded-3xl border border-[rgba(45,43,107,.1)] bg-pale p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 40 }}
            animate={bannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease }}
          >
            <div
              className="absolute top-0 right-0 w-[340px] h-[340px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle,rgba(72,69,168,.09),transparent 65%)",
                filter: "blur(40px)",
                transform: "translate(30%,-30%)",
              }}
            />

            <motion.div
              className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gm flex items-center justify-center shadow-[0_8px_28px_rgba(45,43,107,.28)]"
              initial={{ scale: 0, rotate: -12 }}
              animate={bannerInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.2,
              }}
            >
              <MessageCircle
                size={28}
                strokeWidth={1.6}
                className="text-white"
              />
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold text-dark tracking-[-0.02em] mb-2">
                Not Sure About Your Idea Yet?{" "}
                <em className="not-italic grad-text">That's Perfectly Fine.</em>
              </h3>
              <p className="text-[.92rem] text-body leading-[1.75] max-w-[580px] mx-auto md:mx-0">
                You don't need a fully formed plan to reach out. Share what's on
                your mind — a rough concept, a challenge you're facing, or even
                just a question.
              </p>
            </div>

            <div className="flex-shrink-0">
              <motion.a
                href="mailto:contact@flowoid.tech"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[.88rem] font-bold text-white bg-mg shadow-[0_8px_24px_rgba(20,16,58,.28)] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none"
              >
                <Mail size={15} strokeWidth={2} className="relative z-[1]" />
                <span className="relative z-[1]">Ask Us Anything</span>
              </motion.a>
            </div>
          </motion.div>
        </div >
      </section >

      {/* ══ CTA ══ */}
      < div className="bg-page px-[5%] py-16" >
        <motion.div
          className="max-w-[1240px] mx-auto bg-gm rounded-3xl px-12 py-16 text-center relative overflow-hidden shadow-[0_28px_80px_rgba(15,14,42,.26)]"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute top-[-180px] right-[-130px] w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,rgba(201,168,76,.2),transparent 70%)",
              filter: "blur(28px)",
            }}
          />
          <div className="relative z-[2]">
            <h2 className="font-heading text-[clamp(1.7rem,3vw,2.7rem)] font-black text-white tracking-[-0.025em] mb-3">
              Ready to Start? Let's Talk.
            </h2>
            <p className="text-white/60 text-[.97rem] leading-[1.75] max-w-[460px] mx-auto mb-8">
              No obligation, no pressure — just an honest conversation about
              your project and how we can help.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <motion.a
                href="mailto:contact@flowoid.tech"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[.9rem] font-bold text-white bg-mg shadow-[0_10px_30px_rgba(20,16,58,.3)] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none"
              >
                <Mail size={15} strokeWidth={2} className="relative z-[1]" />
                <span className="relative z-[1]">Email Us Directly</span>
              </motion.a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-[13px] rounded-full text-[.9rem] font-semibold text-white border border-white/25 bg-white/8 transition-all duration-[280ms] hover:bg-white/18 hover:border-white/50"
              >
                See Our Work <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div >

      <Footer />
      <BackToTop />
    </>
  );
}
