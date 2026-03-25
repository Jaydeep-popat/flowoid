import { Link } from 'react-router-dom';

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-page py-16 md:py-20 px-[5%] text-center">
      <div className="max-w-[800px] mx-auto">
        <div className="sr inline-flex items-center gap-[7px] text-[.75rem] font-extrabold tracking-[.14em] uppercase text-gold mb-4 before:content-[''] before:w-6 before:h-[2px] before:rounded-sm before:bg-gg after:content-[''] after:w-6 after:h-[2px] after:rounded-sm after:bg-gg">Our Experience</div>
        
        <h2 className="sr d1 font-heading font-extrabold text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-dark mb-5">
          We Let Our Work<br />
          <span className="grad-text">Do The Talking.</span>
        </h2>
        
        <p className="sr d2 text-[1.1rem] leading-[1.8] text-muted mb-8 max-w-[640px] mx-auto">
          Every project we take on is built with clean architecture, modern frameworks, and a focus on outcomes — lead-generating sites, product catalogues, and operations systems that teams actually use. From cloud-powered web apps to intelligent chatbots, our work reflects how we engineer.
        </p>
        
        <Link 
          to="/projects" 
          className="sr d3 inline-flex items-center justify-center gap-2 px-9 py-[18px] rounded-2xl text-[1rem] font-bold text-white bg-mg shadow-[0_12px_32px_rgba(20,16,58,.28)] relative overflow-hidden transition-all duration-[300ms] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(20,16,58,.45)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.25)_0%,transparent_55%)] before:pointer-events-none"
        >
          Explore Our Projects →
        </Link>
      </div>
    </section>
  );
}
