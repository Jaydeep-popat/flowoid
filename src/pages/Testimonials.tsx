import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const allTestimonials = [
  { tf: true,  title: 'Amazing to work with',                   q: "Our redesign result is thrilling. TechSphere was amazing to work with, making the process fun and stress-free. They are always super responsive.",                                            init:'RK', name:'Rajesh Kumar',  role:'CEO & Founder @ClickMagick',      rating:5 },
  { tf: false, title: 'Outstanding product design',             q: "Their creativity and technical skills resulted in visually stunning, user-friendly designs. An absolute pleasure working with such talented people. Highly recommend!",                           init:'SR', name:'Sneha Reddy',    role:'Product Owner @Plix',             rating:5 },
  { tf: false, title: 'Reliable, Fast, Easy',                   q: "TechSphere was incredibly fast, offering numerous options. They solicit feedback constantly and worked hard to create the perfect design for us.",                                               init:'VS', name:'Vikram Singh',   role:'Co-Founder @Legacy Blueprint',   rating:5 },
  { tf: true,  title: 'TechSphere is one of the most talented', q: "TechSphere is one of the most talented teams I've worked with. They go above and beyond in understanding and executing design excellence.",                                                    init:'AP', name:'Aarav Patel',    role:'Marketing Lead @Stepsize',        rating:5 },
  { tf: false, title: 'Game-Changing Partnership',              q: "Working with TechSphere was a game-changer. Their mobile app development expertise helped us launch our product successfully and reach new market heights.",                                      init:'AM', name:'Arjun Mehta',    role:'CTO @InnovateCorp',               rating:5 },
  { tf: false, title: 'Brilliant cloud architects',             q: "The team migrated our entire infrastructure to AWS with zero downtime. Their cloud expertise saved us 60% on costs and improved performance dramatically.",                                       init:'PK', name:'Priya Kapoor',   role:'CTO @FinanceFirst',              rating:5 },
  { tf: false, title: 'Incredibly professional team',           q: "The TechSphere team is incredibly professional and talented. They delivered our e-commerce platform on time, within budget, and with outstanding quality.",                                       init:'PS', name:'Priya Sharma',   role:'Marketing Director @GrowthFirst', rating:5 },
  { tf: true,  title: 'Excellent Design',                       q: "Working with TechSphere has been a pleasure. They were fast, communicative, and crafted an excellent design that met all our requirements perfectly.",                                            init:'AG', name:'Ananya Gupta',   role:"CEO & Co-Founder @Prönö",        rating:5 },
  { tf: false, title: 'Transformed our digital presence',       q: "TechSphere completely transformed our digital presence. Their team delivered exceptional results that far exceeded our expectations and business goals.",                                         init:'NS', name:'Neha Sharma',    role:'CEO @TechFlow Solutions',         rating:5 },
  { tf: false, title: 'Security experts',                       q: "Their cybersecurity audit identified 23 critical vulnerabilities we didn't know existed. The remediation was swift and thorough. Now we sleep easy.",                                             init:'RT', name:'Ravi Tiwari',    role:'CISO @DataVault',                 rating:5 },
  { tf: true,  title: 'ERP integration experts',                q: "Our 8 disconnected systems now talk seamlessly. TechSphere's ERP integration saved our team 15 hours a week. The ROI was visible in month one.",                                                 init:'SM', name:'Suresh Menon',   role:'COO @RetailGiant',               rating:5 },
  { tf: false, title: '5-star consulting',                      q: "Their IT consulting roadmap became our company's technology bible. 6 months in, we've automated 70% of manual processes. Exceptional team.",                                                     init:'KP', name:'Kavya Pillai',   role:'VP Operations @ScaleUp',          rating:5 },
];

function Stars({ n }: { n: number }) {
  return <div className="text-gold text-[1.05rem] tracking-[2px] mb-[10px]">{'★'.repeat(n)}</div>;
}

export default function Testimonials() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <div className="relative min-h-[54vh] bg-white flex items-center px-[6%] pt-32 pb-20 mt-[68px] overflow-hidden"
        style={{ background:'radial-gradient(ellipse 70% 60% at 85% 10%,rgba(45,43,107,.10),transparent 60%),radial-gradient(ellipse 50% 50% at 5% 95%,rgba(15,14,42,.07),transparent 55%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)',backgroundSize:'36px 36px',maskImage:'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
        <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background:'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',filter:'blur(55px)' }} />
        <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none" style={{ width:700,height:700,right:-220,top:-220 }} />
        <div className="relative z-[2] max-w-[1240px] w-full">
          <div className="flex items-center gap-2 text-[.74rem] font-semibold text-muted tracking-[.08em] uppercase mb-[18px]">Home <span className="opacity-40">/</span> <span className="text-gold">Testimonials</span></div>
          <div className="inline-flex items-center gap-2 px-4 py-[5px] rounded-full bg-pale border-[1.5px] border-[rgba(45,43,107,.12)] text-[.7rem] font-bold text-gold tracking-[.1em] uppercase mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-pulse2" />
            300+ Happy Clients
          </div>
          <h1 className="font-heading font-black text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.07] tracking-[-0.032em] text-dark mb-[18px]">What Our Clients<br /><span className="grad-text">Actually Say</span></h1>
          <p className="text-[1.05rem] leading-[1.82] text-body max-w-[580px]">Don't take our word for it — hear from the 300+ companies and leaders who've trusted TechSphere to power their digital transformation.</p>
        </div>
      </div>

      {/* STATS BAND */}
      <div className="bg-gm px-[6%] py-14 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(201,168,76,.12),transparent_50%)] before:pointer-events-none">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 relative z-[1]">
          {[{ n:'300+', l:'Happy Clients' },{ n:'96%', l:'Satisfaction Rate' },{ n:'4.9/5', l:'Average Rating' },{ n:'96%', l:'Client Retention' }].map((s, i) => (
            <div key={i} className={`sr d${i+1} text-center py-4 border-r border-white/10 last:border-r-0`}>
              <div className="font-heading text-[2.6rem] font-black text-white leading-none">{s.n}</div>
              <div className="text-[.8rem] font-semibold text-white/55 mt-[5px]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS GRID */}
      <section className="bg-white py-24 px-[6%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[52px]">
            <div className="inline-flex items-center justify-center gap-2 text-[.7rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Client Stories</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-[-0.025em] text-dark">Trusted by <em className="not-italic grad-text">Industry Leaders</em></h2>
            <p className="text-[.97rem] leading-[1.8] text-muted max-w-[520px] mx-auto">Real clients, real outcomes, real feedback — unfiltered.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {allTestimonials.map((t, i) => (
              <div key={i} className={`sr d${(i%3)+1} group relative overflow-hidden rounded-[20px] border-[1.5px] p-[28px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${t.tf ? 'bg-gm border-transparent shadow-brand' : 'bg-page border-border hover:border-b4'}`}>
                {/* Gold shimmer for featured */}
                {t.tf && <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,168,76,.07),transparent_50%)] pointer-events-none" />}
                <Stars n={t.rating} />
                <div className={`font-heading text-[.98rem] font-bold mb-[11px] leading-[1.35] ${t.tf ? 'text-white' : 'text-dark'}`}>{t.title}</div>
                <p className={`text-[.87rem] leading-[1.78] mb-5 flex-1 ${t.tf ? 'text-white/80' : 'text-body'}`}>{t.q}</p>
                <hr className={`border-none border-t mb-[17px] ${t.tf ? 'border-white/15' : 'border-border'}`} />
                <div className="flex items-center gap-[14px]">
                  <div className={`w-[44px] h-[44px] rounded-full border-2 flex items-center justify-center font-heading text-[.88rem] font-black flex-shrink-0 ${t.tf ? 'bg-white/20 border-white/30 text-white' : 'bg-pale2 border-[rgba(45,43,107,.12)] text-b3'}`}>{t.init}</div>
                  <div>
                    <div className={`font-heading text-[.9rem] font-bold leading-tight ${t.tf ? 'text-white' : 'text-dark'}`}>
                      {t.name}
                      <span className="inline-block w-[8px] h-[8px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.55)] ml-[6px] align-middle animate-blink" />
                    </div>
                    <div className={`text-[.74rem] mt-[2px] ${t.tf ? 'text-white/55' : 'text-muted'}`}>{t.role}</div>
                  </div>
                </div>
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
          <h2 className="relative z-[2] font-heading text-[clamp(1.8rem,3vw,2.9rem)] font-black text-white tracking-[-0.025em] mb-[14px]">Ready to Join 300+ Happy Clients?</h2>
          <p className="relative z-[2] text-white/65 text-[1rem] leading-[1.75] max-w-[500px] mx-auto mb-[38px]">Let's start with a free consultation. No commitment, no pressure — just a conversation about your goals.</p>
          <div className="relative z-[2] flex items-center justify-center gap-[14px] flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-[9px] px-[34px] py-[14px] rounded-xl text-[.93rem] font-bold text-dark bg-gg shadow-[0_8px_28px_rgba(201,168,76,.4)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_14px_38px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none">Start Your Project →</Link>
            <Link to="/services" className="inline-flex items-center gap-[9px] px-7 py-[13px] rounded-xl text-[.93rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">See Our Services</Link>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
