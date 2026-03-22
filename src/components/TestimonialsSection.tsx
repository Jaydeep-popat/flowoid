const testimonials1 = [
  { tf: true,  title: 'Amazing to work with',                   q: "Our redesign result is thrilling. Flowoid was amazing to work with, making the process fun and stress-free. They are always super responsive.",                   init: 'RK', name: 'Rajesh Kumar', role: 'CEO & Founder @ClickMagick' },
  { tf: false, title: 'Outstanding product design',             q: "Their creativity and technical skills resulted in visually stunning, user-friendly designs. An absolute pleasure working with such talented people. Highly recommend!", init: 'SR', name: 'Sneha Reddy',   role: 'Product Owner @Plix' },
  { tf: false, title: 'Reliable, Fast, Easy',                   q: "Flowoid was incredibly fast, offering numerous options. They solicit feedback constantly and worked hard to create the perfect design for us.",                      init: 'VS', name: 'Vikram Singh',  role: 'Co-Founder @Legacy Blueprint' },
  { tf: true,  title: 'Flowoid is one of the most talented', q: "Flowoid is one of the most talented teams I've worked with. They go above and beyond in understanding and executing design excellence.",                          init: 'AP', name: 'Aarav Patel',   role: 'Marketing Lead @Stepsize' },
  { tf: false, title: 'Game-Changing Partnership',              q: "Working with Flowoid was a game-changer. Their mobile app development expertise helped us launch our product successfully and reach new market heights.",            init: 'AM', name: 'Arjun Mehta',   role: 'CTO @InnovateCorp' },
  { tf: false, title: 'Brilliant cloud architects',             q: "The team migrated our entire infrastructure to AWS with zero downtime. Their cloud expertise saved us 60% on costs and improved performance dramatically.",             init: 'PK', name: 'Priya Kapoor',  role: 'CTO @FinanceFirst' },
];

const testimonials2 = [
  { tf: false, title: 'Incredibly professional team',  q: "The Flowoid team is incredibly professional and talented. They delivered our e-commerce platform on time, within budget, and with outstanding quality.",        init: 'PS', name: 'Priya Sharma',  role: 'Marketing Director @GrowthFirst' },
  { tf: true,  title: 'Excellent Design',              q: "Working with Flowoid has been a pleasure. They were fast, communicative, and crafted an excellent design that met all our requirements perfectly.",                  init: 'AG', name: 'Ananya Gupta',  role: 'CEO & Co-Founder @Prönö' },
  { tf: false, title: 'Transformed our digital presence', q: "Flowoid completely transformed our digital presence. Their team delivered exceptional results that far exceeded our expectations and business goals.",           init: 'NS', name: 'Neha Sharma',   role: 'CEO @TechFlow Solutions' },
  { tf: false, title: 'Security experts',              q: "Their cybersecurity audit identified 23 critical vulnerabilities we didn't know existed. The remediation was swift and thorough. Now we sleep easy.",                  init: 'RT', name: 'Ravi Tiwari',   role: 'CISO @DataVault' },
  { tf: true,  title: 'ERP integration experts',       q: "Our 8 disconnected systems now talk seamlessly. Flowoid's ERP integration saved our team 15 hours a week. The ROI was visible in month one.",                       init: 'SM', name: 'Suresh Menon',  role: 'COO @RetailGiant' },
  { tf: false, title: '5-star consulting',             q: "Their IT consulting roadmap became our company's technology bible. 6 months in, we've automated 70% of manual processes. Exceptional team.",                           init: 'KP', name: 'Kavya Pillai',  role: 'VP Operations @ScaleUp' },
];

/* ─── TCARD ─────────────────────────────────────────────── */
function TCard({ tf, title, q, init, name, role }: typeof testimonials1[0]) {
  return (
    <div className={`flex-shrink-0 w-[340px] sm:w-[300px] p-[28px_26px] rounded-[20px] border cursor-default transition-[transform,box-shadow] duration-300 hover:-translate-y-1 ${
      tf
        ? 'bg-[linear-gradient(145deg,#3730a3_0%,#4845A8_100%)] border-transparent shadow-[0_8px_32px_rgba(45,43,107,.35)] hover:shadow-[0_16px_48px_rgba(45,43,107,.45)]'
        : 'bg-white border-border shadow-[0_4px_20px_rgba(15,14,42,.07)] hover:shadow-[0_12px_36px_rgba(15,14,42,.12)]'
    }`}>
      <div className={`font-heading text-[1rem] font-bold mb-3 leading-[1.3] ${tf ? 'text-white' : 'text-dark'}`}>{title}</div>
      <p className={`text-[.87rem] leading-[1.78] mb-5 ${tf ? 'text-white/82' : 'text-muted'}`}>{q}</p>
      <hr className={`border-none border-t mb-4 ${tf ? 'border-white/20' : 'border-border'}`} />
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-heading text-[.8rem] font-bold flex-shrink-0 ${tf ? 'bg-white/20 border-white/30 text-white' : 'bg-pale2 border-border text-b3'}`}>{init}</div>
        <div>
          <div className={`font-heading text-[.88rem] font-bold ${tf ? 'text-white/90' : 'text-dark'}`}>
            {name}<span className="inline-block w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)] ml-[5px] align-middle animate-blink" />
          </div>
          <div className={`text-[.75rem] ${tf ? 'text-white/60' : 'text-muted'}`}>{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testi" className="overflow-hidden py-24 bg-white">
      <div className="px-[5%] max-w-[1240px] mx-auto mb-[52px]">
        <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Testimonials</div>
        <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">What Our Clients <span className="grad-text">Actually Say</span></h2>
        <p className="sr d2 text-[1rem] leading-[1.8] text-muted max-w-[520px]">Hear what our clients have to say about their experience.</p>
      </div>
      <div className="relative overflow-hidden flex flex-col gap-4 [&:hover_>_div]:[animation-play-state:paused]" style={{ mask: 'none' }}>
        <div className="absolute top-0 bottom-0 left-0 z-[2] pointer-events-none w-[160px] bg-[linear-gradient(90deg,#fff,transparent)]" />
        <div className="absolute top-0 bottom-0 right-0 z-[2] pointer-events-none w-[160px] bg-[linear-gradient(-90deg,#fff,transparent)]" />
        <div className="flex gap-4 w-max animate-marqueeleft">
          {[...testimonials1, ...testimonials1].map((t, i) => <TCard key={i} {...t} />)}
        </div>
        <div className="flex gap-4 w-max animate-marqueeright">
          {[...testimonials2, ...testimonials2].map((t, i) => <TCard key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}
