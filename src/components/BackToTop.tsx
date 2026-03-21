import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-6 right-6 z-[900] w-11 h-11 rounded-xl bg-gm text-white text-[1.05rem] flex items-center justify-center shadow-brand overflow-hidden cursor-pointer transition-all duration-[350ms] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(201,168,76,.28),transparent_60%)] before:pointer-events-none hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(15,14,42,.45)] ${show ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-3'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
