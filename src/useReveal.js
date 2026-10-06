import { useEffect, useRef, useState } from 'react';

// One shared IntersectionObserver for every reveal on the page (far cheaper than one each).
const callbacks = new WeakMap();
let observer;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          callbacks.get(e.target)?.();
          observer.unobserve(e.target);
        }
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
  }
  return observer;
}

/** Returns [ref, shown]; `shown` flips true once the element scrolls into view. */
export default function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setShown(true); return; }
    callbacks.set(el, () => setShown(true));
    getObserver().observe(el);
    // safety net so content never stays hidden
    const fallback = setTimeout(() => setShown(true), 5000);
    return () => { observer?.unobserve(el); callbacks.delete(el); clearTimeout(fallback); };
  }, []);

  return [ref, shown];
}
