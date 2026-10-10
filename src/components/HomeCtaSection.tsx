import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HomeCtaSection() {
  return (
    <section id="cta" className="bg-white px-[5%] pt-20 pb-[110px]">
      <div className="sr-s max-w-[1240px] mx-auto bg-gm rounded-[30px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1.5px,transparent 1.5px)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(201,168,76,.07),transparent_45%)]" />
        <div className="absolute rounded-full pointer-events-none" style={{ width:640,height:640,top:-220,right:-160,background:'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',filter:'blur(24px)' }} />
        
        <div className="relative z-[1] inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
          FIRST STEP
        </div>
        <h2 className="relative z-[1] font-heading text-[clamp(1.9rem,3.8vw,3.05rem)] font-black text-white mb-4 tracking-[-0.03em]">Have a Project in Mind?<br />Let's Build It Together.</h2>
        <p className="relative z-[1] text-[1.02rem] leading-[1.76] text-white/80 max-w-[560px] mx-auto mb-10">Share your requirements with us — big or small. We'll analyze your needs and come back with a detailed proposal, timeline, and transparent pricing. No strings attached.</p>
        
        <div className="relative z-[1] flex items-center justify-center gap-4 flex-wrap">
          <Link to="/contact" className="btn-cta-gold group">
            <span>Start Your Project</span>
            <ArrowRight size={17} strokeWidth={2.4} className="btn-arrow" />
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-[14px] rounded-xl text-[.92rem] font-semibold text-white/95 border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55 hover:-translate-y-0.5 shadow-sm">
            Schedule a Call
          </Link>
        </div>
        
        <div className="relative z-[1] text-[.82rem] font-medium text-white/80 mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5"><span className="text-gold font-bold">✓</span> Free consultation</span>
          <span className="text-white/40">·</span>
          <span className="inline-flex items-center gap-1.5"><span className="text-gold font-bold">✓</span> No commitment</span>
          <span className="text-white/40">·</span>
          <span className="inline-flex items-center gap-1.5"><span className="text-gold font-bold">✓</span> Reply within 4 business hours</span>
        </div>
      </div>
    </section>
  );
}
