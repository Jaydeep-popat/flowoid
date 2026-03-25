import { Link } from 'react-router-dom';

export default function HomeCtaSection() {
  return (
    <section id="cta" className="bg-white px-[5%] pt-20 pb-[110px]">
      <div className="sr-s max-w-[1240px] mx-auto bg-gm rounded-[30px] px-14 py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1.5px,transparent 1.5px)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(201,168,76,.07),transparent_45%)]" />
        <div className="absolute rounded-full pointer-events-none" style={{ width:640,height:640,top:-220,right:-160,background:'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',filter:'blur(24px)' }} />
        <h2 className="relative z-[1] font-heading text-[clamp(1.9rem,3.8vw,3.05rem)] font-black text-white mb-4 tracking-[-0.03em]">Have a Project in Mind?<br />Let's Build It Together.</h2>
        <p className="relative z-[1] text-[1rem] leading-[1.76] text-white max-w-[520px] mx-auto mb-10">Share your requirements with us — big or small. We'll analyze your needs and come back with a detailed proposal, timeline, and transparent pricing. No strings attached.</p>
        <div className="relative z-[1] flex items-center justify-center gap-[14px] flex-wrap">
          <Link to="/contact" className="px-[34px] py-[14px] rounded-xl text-[.92rem] font-bold text-white bg-mg shadow-brand transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_18px_42px_rgba(20,16,58,.42)]">Start Your Project →</Link>
          <Link to="/contact" className="px-8 py-[13px] rounded-xl text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">Schedule a Call</Link>
        </div>
        <div className="relative z-[1] text-[.82rem] font-medium text-white/90 mt-[26px]">
          <span className="text-gold2 mr-[6px]">✓</span>Free consultation &nbsp;·&nbsp; <span className="text-gold2 mr-[6px]">✓</span>No commitment &nbsp;·&nbsp; <span className="text-gold2 mr-[6px]">✓</span>Reply within 4 business hours
        </div>
      </div>
    </section>
  );
}
