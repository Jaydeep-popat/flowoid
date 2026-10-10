const testimonials1 = [
  { tf: true,  title: 'Smooth, Professional & Truly Transformative', q: "Flowoid built the complete management system for Hiyasha Solar. Everything runs smoothly now — from inventory to customer orders. Delivered on time.", init: 'HP', name: 'Hemalbhai Pethapara', role: 'Director @Hiyasha Solar' },
  { tf: false, title: 'Noticeable Increase in Inquiries',            q: "The design is elegant, loads instantly, and showcases our interior work beautifully. We've seen a 2.5× rise in high-ticket client inquiries.", init: 'BP', name: 'Bharatbhai Pithadiya', role: 'Founder @Pithadiya Interior' },
  { tf: false, title: 'Fast D2C Mobile Checkout & Effortless Orders', q: "Our online store for natural soaps runs effortlessly with instant UPI checkout and automated WhatsApp notifications. Fantastic work.", init: 'VK', name: 'Vraj Kasundra', role: 'Founder @Naturals Soap' },
  { tf: false, title: 'Transformed How We Track Our Stock',          q: "No more manual registers — everything is digital, fast, and accurate now. They took the time to understand our workflow before building.", init: 'MJ', name: 'Maheshbhai Jakasaniya', role: 'Owner @Jakasaniya Trading Co.' },
];

const testimonials2 = [
  { tf: false, title: 'Simplified Daily Operations for Field Crews', q: "Managing our solar installations was a headache. Flowoid built a clean, easy system that our entire team adopted within a week.", init: 'GP', name: 'Girishbhai Pethapara', role: 'Co-Director @Hiyasha Solar' },
  { tf: true,  title: 'Reliable, Practical & Zero-Nonsense',         q: "Handles our daily stock entries, reports, and alerts without any issues. The system is straightforward and staff picked it up quickly.", init: 'MP', name: 'Manojbhai Popat', role: 'Proprietor @Popat Enterprises' },
  { tf: false, title: 'Drives Real Walk-In Clients Online',         q: "Showcases our product collection perfectly. Customers browse easily, and we've noticed a real increase in walk-in clients finding us online.", init: 'MK', name: 'Mr. Meet Kalola', role: 'Owner @Nilkanth Traders' },
  { tf: true,  title: 'Modern Digital Catalogue for Our Collection', q: "Transformed how we present our imitation jewellery to B2B and retail buyers. Fast, intuitive catalogue with direct inquiry flow.", init: 'VP', name: 'Vatsal Pithadiya', role: 'Founder @Ayanshi Imitation' },
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
