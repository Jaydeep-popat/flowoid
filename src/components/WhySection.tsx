const whyFeats = [
  { ico: '🎯', t: 'Understanding Your Vision First', d: 'We patiently listen to your ideas and business goals before starting, making sure our final solution is exactly what your business needs.' },
  { ico: '⚡', t: 'Fast & Transparent Progress', d: 'We keep you involved at every step. We build your project in small chunks and share regular updates so you can see your ideas coming to life.' },
  { ico: '🛡️', t: 'Reliable & Secure Software', d: 'We build thoroughly tested, secure applications with clean architecture. You can trust our work to run smoothly and support your business for years.' },
];

export default function WhySection() {
  return (
    <section id="why" className="bg-page py-24 px-[5%]">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Images */}
        <div className="sr-l relative" style={{ height: 'auto' }}>
          <div className="relative rounded-[30px] overflow-hidden aspect-[4/3] shadow-[0_28px_80px_rgba(15,14,42,.12)] border border-border group">
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop" alt="Modern computer workspace" loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.04]" />
          </div>
          {/* Thumb */}
          <div className="absolute -bottom-6 -right-6 w-[190px] rounded-card overflow-hidden border-[3px] border-white shadow-lg hidden md:block">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop" alt="Global technology network" loading="lazy" className="w-full h-full object-cover aspect-square block" />
          </div>

        </div>

        {/* Text */}
        <div className="sr-r d1">
          <div className="inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Why Flowoid</div>
          <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark mb-[14px]">More Than Just Coders.<br />We Are <span className="grad-text">Your Tech Partners</span> in Rajkot.</h2>
          <p className="text-[1rem] leading-[1.8] text-muted max-w-[520px] mb-[38px]">Technology shouldn't be complicated. As a trusted software development company in Rajkot, we turn your raw ideas into simple, effective digital tools — for smoother day-to-day operations and a stronger customer-facing presence.</p>
          <div className="flex flex-col gap-[14px]">
            {whyFeats.map((w, i) => (
              <div key={i} className={`sr d${i + 2} group flex gap-[15px] items-start p-[18px_20px] rounded-card bg-white border border-border shadow-sm relative overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] hover:border-[rgba(45,43,107,.15)] hover:shadow-md hover:translate-x-[6px] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-gg before:scale-y-0 before:origin-bottom before:transition-transform before:duration-[350ms] hover:before:scale-y-100`}>
                <div className="w-10 h-10 rounded-[10px] flex-shrink-0 bg-pale border border-border flex items-center justify-center text-[1rem] transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-110 group-hover:-rotate-[4deg]">{w.ico}</div>
                <div>
                  <div className="font-heading text-[.93rem] font-bold text-dark mb-1">{w.t}</div>
                  <p className="text-[.83rem] leading-[1.65] text-muted">{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
