import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to all elements with
 * class sr, sr-l, sr-r, or sr-s and adds 'vis' when they enter viewport.
 * Re-runs whenever the component that calls it re-mounts.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.sr,.sr-l,.sr-r,.sr-s');
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, []);
}
