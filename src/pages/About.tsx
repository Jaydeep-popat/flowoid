import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

/* ─── Shared page-hero block ─────────────────────────── */
interface PageHeroProps {
  crumb: string;
  badge: string;
  greenDot?: boolean;
  h1: React.ReactNode;
  sub: string;
}
function PageHero({ crumb, badge, greenDot, h1, sub }: PageHeroProps) {
  return (
    <div className="relative min-h-[54vh] bg-white flex items-center px-[6%] pt-32 pb-20 mt-[106px] overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(201,168,76,.04),transparent 60%)' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize:'36px 36px', maskImage:'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
      {/* Glow blobs */}
      <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',filter:'blur(55px)' }} />
      <div className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)',filter:'blur(45px)' }} />
      {/* Rings */}
      <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none" style={{ width:700,height:700,right:-220,top:-220 }} />
      <div className="absolute rounded-full border border-[rgba(201,168,76,.04)] pointer-events-none" style={{ width:480,height:480,right:-120,top:-120 }} />

      <div className="relative z-[2] max-w-[1240px] w-full">
        <div className="flex items-center gap-2 text-[.74rem] font-semibold text-muted tracking-[.08em] uppercase mb-[18px]">
          Home <span className="opacity-40">/</span> <span className="text-gold">{crumb}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-[22px]">
          <span className={`w-[7px] h-[7px] rounded-full ${greenDot ? 'bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2' : 'bg-b4 shadow-[0_0_8px_rgba(72,69,168,.5)]'}`} />
          {badge}
        </div>
        <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-[18px]">{h1}</h1>
        <p className="text-[1.05rem] leading-[1.82] text-body max-w-[580px]">{sub}</p>
      </div>
    </div>
  );
}

/* ─── Stats band ─────────────────────────────────────── */
function StatsBand({ items }: { items: { num: string; lbl: string }[] }) {
  return (
    <div className="bg-gm px-[6%] py-14 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(201,168,76,.12),transparent_50%)] before:pointer-events-none">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 relative z-[1]">
        {items.map((s, i) => (
          <div key={i} className={`sr d${i+1} text-center py-4 border-r border-white/10 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r`}>
            <div className="font-heading text-[2.6rem] font-black text-white leading-none">{s.num}</div>
            <div className="text-[.8rem] font-semibold text-white/55 mt-[5px] tracking-[.04em]">{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CTA Box ─────────────────────────────────────────── */
function CtaBox({ h2, p, links }: { h2: string; p: string; links: { label: string; to: string; primary: boolean }[] }) {
  return (
    <div className="bg-page px-[6%] py-20">
      <div className="sr max-w-[1240px] mx-auto bg-gm rounded-[28px] px-[60px] py-[72px] text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute pointer-events-none rounded-full" style={{ width:640,height:640,top:-220,right:-160,background:'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',filter:'blur(24px)' }} />
        <div className="absolute inset-0 pointer-events-none w-[420px] h-[420px] rounded-full bg-white/4" style={{ filter:'blur(70px)',top:-150,left:-120 }} />
        <h2 className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">{h2}</h2>
        <p className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">{p}</p>
        <div className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
          {links.map(l => l.primary
            ? <Link key={l.label} to={l.to} className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-dark bg-gg shadow-[0_8px_28px_rgba(201,168,76,.4)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_14px_38px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">{l.label}</Link>
            : <Link key={l.label} to={l.to} className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">{l.label}</Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Sec label / h2 helpers ─────────────────────────── */
function SLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg ${center ? 'justify-center' : ''}`}>{children}</div>
  );
}
function SH2({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={`font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark mb-4 ${center ? 'text-center' : ''}`}>
      {children}
    </h2>
  );
}

const values = [
  { ico: '🔒', t: 'Security First',       d: 'Every solution is built with enterprise-grade security baked in from day one — not bolted on as an afterthought.' },
  { ico: '💡', t: 'Continuous Innovation', d: 'We invest 15% of revenue into R&D so clients always have access to cutting-edge technology.' },
  { ico: '🌱', t: 'Sustainable Growth',    d: 'We build scalable architectures that grow with your business, preventing costly rebuilds down the road.' },
  { ico: '🤝', t: 'True Partnership',      d: 'We embed ourselves in your team, understanding your culture to deliver solutions that truly fit.' },
  { ico: '⚡', t: 'Speed & Quality',       d: 'Agile at our core — we deliver fast without sacrificing the quality that defines our reputation.' },
  { ico: '🌍', t: 'Global Mindset',        d: 'Operating in 28 countries gives us unique insights to build products for global audiences.' },
];

const team = [
  { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=face', name: 'Arjun Mehta',   role: 'CEO & Co-Founder',  bio: '15+ years in enterprise software. Former CTO at Infosys. IIT Bombay alumnus.' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face', name: 'Sarah Chen',    role: 'CTO & Co-Founder',  bio: 'Cloud architect & security expert. AWS certified. Ex-Google Engineering Lead.' },
  { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face', name: 'James Okafor',  role: 'VP Engineering',    bio: 'Full-stack architect specializing in microservices and DevOps at scale.' },
  { img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&crop=face', name: 'Priya Sharma',  role: 'Head of Design',    bio: 'UX visionary blending user psychology with stunning visual design systems.' },
];

const timeline = [
  { year: '2010', t: 'Founded in Bangalore',              d: 'TechSphere was born with 5 engineers and a bold dream — to democratize enterprise technology for growing businesses.' },
  { year: '2013', t: 'First 50 Clients & Series A',       d: 'Secured $4M Series A. Expanded into cloud solutions and grew to 40 team members across 2 offices.' },
  { year: '2016', t: 'Global Expansion — 10 Countries',   d: 'Opened offices in London, Singapore, and Dubai. Launched our proprietary DevSecOps framework.' },
  { year: '2019', t: '200+ Clients & ISO 27001',          d: 'Achieved ISO 27001 security certification. Launched our AI-powered monitoring suite.' },
  { year: '2022', t: '1,000 Projects Milestone',          d: 'Delivered our 1,000th project. Expanded to 200 team members and 28 countries globally.' },
  { year: '2024', t: 'TechSphere 3.0 — AI & Automation', d: 'Launched our next-gen platform integrating AI automation, predictive analytics, and real-time cloud orchestration.' },
];

export default function About() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      <PageHero
        crumb="About Us" badge="Our Story"
        h1={<>Built on <span className="grad-text">Trust,</span><br />Driven by Innovation</>}
        sub="Since 2010, we've been the technology backbone for hundreds of enterprises — turning complex challenges into elegant, scalable digital solutions across 28 countries."
      />

      {/* STORY */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-center">
            {/* Images */}
            <div className="sr-l relative" style={{ height: 500 }}>
              <div className="absolute top-0 left-0 w-[75%] rounded-[22px] overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=420&fit=crop" alt="Team" className="w-full h-[340px] object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] rounded-[18px] overflow-hidden border-4 border-white shadow-md">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=260&fit=crop" alt="Working" className="w-full h-[210px] object-cover" />
              </div>
              <div className="absolute left-[-18px] bg-gm text-white rounded-2xl px-5 py-[14px] shadow-brand z-[4]" style={{ bottom: 120 }}>
                <strong className="block font-heading text-[1.7rem] font-black leading-none">14+</strong>
                <span className="text-[.68rem] font-semibold opacity-80 mt-[2px] block">Years of Excellence</span>
              </div>
            </div>

            {/* Text */}
            <div className="sr-r">
              <SLabel>Who We Are</SLabel>
              <SH2>A Team of <em className="not-italic grad-text">Passionate</em> Problem Solvers</SH2>
              <p className="text-[.97rem] leading-[1.8] text-muted mb-[14px]">TechSphere was founded in 2010 with a single mission: to make enterprise-grade technology accessible to every business, regardless of size or industry. What started as a team of five developers has grown into a 200-person powerhouse serving clients across 28 countries.</p>
              <p className="text-[.97rem] leading-[1.8] text-muted mb-7">We don't just write code — we architect digital futures. Our multidisciplinary team of engineers, designers, strategists, and cybersecurity experts work in lockstep to deliver solutions that transform your business.</p>
              <div className="grid grid-cols-2 gap-[13px]">
                {[
                  { ico: '🎯', t: 'Mission-Focused',    d: 'Every project aligns with your core business objectives' },
                  { ico: '🔬', t: 'Research-Driven',    d: 'Data and insights guide every technical decision' },
                  { ico: '🤝', t: 'Long-Term Partner',  d: '96% of our clients return for their next project' },
                  { ico: '⚡', t: 'Agile Delivery',     d: '3× faster delivery vs industry average, every sprint' },
                ].map((v, i) => (
                  <div key={i} className="bg-pale border-[1.5px] border-border rounded-[13px] p-4 transition-all duration-[250ms] hover:border-b4 hover:bg-pale2 hover:-translate-y-[3px]">
                    <div className="text-[1.3rem] mb-[7px]">{v.ico}</div>
                    <div className="font-heading text-[.88rem] font-bold text-dark mb-[3px]">{v.t}</div>
                    <div className="text-[.77rem] text-muted leading-[1.5]">{v.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBand items={[{ num:'300+', lbl:'Enterprise Clients' },{ num:'1.2K', lbl:'Projects Delivered' },{ num:'28', lbl:'Countries Served' },{ num:'200+', lbl:'Expert Team Members' }]} />

      {/* VALUES */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <SLabel center>Core Values</SLabel>
            <SH2 center>Principles That <em className="not-italic grad-text">Guide</em> Everything We Do</SH2>
            <p className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">These aren't words on a wall — they're the foundation of every decision, every line of code, and every client relationship.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px] mt-[50px]">
            {values.map((v, i) => (
              <div key={i} className={`sr d${(i%3)+1} group relative overflow-hidden bg-page border-[1.5px] border-border rounded-[20px] p-[30px] transition-all duration-300 hover:-translate-y-[7px] hover:shadow-md hover:border-[rgba(45,43,107,.12)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gg before:scale-x-0 before:origin-left before:transition-transform before:duration-[350ms] hover:before:scale-x-100`}>
                <div className="w-[52px] h-[52px] rounded-[14px] bg-pale border-[1.5px] border-border flex items-center justify-center text-[1.4rem] mb-[17px] transition-all duration-300 group-hover:bg-gm group-hover:border-transparent">{v.ico}</div>
                <div className="font-heading text-[1rem] font-bold text-dark mb-[9px]">{v.t}</div>
                <div className="text-[.87rem] text-body leading-[1.7]">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-page py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center">
            <SLabel center>Leadership Team</SLabel>
            <SH2 center>The <em className="not-italic grad-text">Brilliant Minds</em> Behind TechSphere</SH2>
            <p className="text-[.97rem] leading-[1.8] text-muted max-w-[560px] mx-auto">Decades of combined experience across software engineering, cloud, cybersecurity, and digital strategy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] mt-[50px]">
            {team.map((m, i) => (
              <div key={i} className={`sr d${i+1} group bg-white border-[1.5px] border-border rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-lg hover:border-b4`}>
                <div className="h-[220px] overflow-hidden relative">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-[450ms] group-hover:scale-[1.07]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.75),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-[18px]">
                  <div className="font-heading text-[.98rem] font-bold text-dark mb-[3px]">{m.name}</div>
                  <div className="text-[.76rem] text-gold font-bold tracking-[.04em] mb-2">{m.role}</div>
                  <div className="text-[.77rem] text-muted leading-[1.55]">{m.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-0">
            <SLabel center>Our Journey</SLabel>
            <SH2 center>14 Years of <em className="not-italic grad-text">Growth</em> &amp; Milestones</SH2>
          </div>
          <div className="relative max-w-[820px] mx-auto mt-[50px] pl-11 before:content-[''] before:absolute before:left-0 before:top-[6px] before:bottom-[6px] before:w-[2px] before:rounded-sm before:bg-[linear-gradient(to_bottom,#C9A84C,#4845A8_80%,transparent)]">
            {timeline.map((t, i) => (
              <div key={i} className={`sr d${(i%3)+1} relative mb-11 last:mb-0`}>
                <div className="absolute -left-[50px] top-1 w-[14px] h-[14px] rounded-full bg-gg shadow-[0_0_0_4px_#F0F0FA,0_0_0_7px_rgba(201,168,76,.2)]" />
                <div className="font-heading text-[.76rem] font-extrabold text-gold tracking-[.1em] mb-[5px]">{t.year}</div>
                <div className="font-heading text-[1.08rem] font-bold text-dark mb-[7px]">{t.t}</div>
                <div className="text-[.89rem] text-body leading-[1.72]">{t.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBox
        h2="Ready to Build Something Great Together?"
        p="Join 300+ companies that trust TechSphere to power their digital transformation. Let's talk about your vision."
        links={[{ label: 'Start Your Project →', to: '/contact', primary: true }, { label: 'Explore Our Services', to: '/services', primary: false }]}
      />

      <Footer />
      <BackToTop />
    </>
  );
}
