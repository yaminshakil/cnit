import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Site-wide effects, all driven by a few passive listeners:
 *  - hero parallax ([data-parallax] elements)
 *  - pointer spotlight + 3D tilt on .fx cards
 *  - pointer glow on [data-glow] banners
 * Only transform/opacity/CSS variables are touched, so nothing triggers layout.
 */
export default function FxManager() {
  const { pathname } = useLocation();

  // hero parallax
  useEffect(() => {
    if (reduced()) return;
    const items = [...document.querySelectorAll('[data-parallax]')];
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      for (const el of items) {
        if (y > window.innerHeight * 1.2) continue;
        el.style.transform = `translate3d(0, ${(y * Number(el.dataset.parallax)).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [pathname]);

  // pointer effects (one delegated listener, desktop only)
  useEffect(() => {
    if (reduced() || !canHover()) return;
    let raf = 0;
    let tilted = null;

    const onMove = e => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const fx = t.closest('.fx');
      const glow = t.closest('[data-glow]');
      if (!fx && !glow && !tilted) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (glow) {
          const r = glow.getBoundingClientRect();
          glow.style.setProperty('--gx', `${e.clientX - r.left}px`);
          glow.style.setProperty('--gy', `${e.clientY - r.top}px`);
        }
        if (tilted && tilted !== fx) release(tilted);
        if (fx) {
          const r = fx.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          fx.classList.add('tilt');
          fx.style.setProperty('--mx', `${e.clientX - r.left}px`);
          fx.style.setProperty('--my', `${e.clientY - r.top}px`);
          fx.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
          fx.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
          tilted = fx;
        }
      });
    };
    const release = el => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      setTimeout(() => { if (el !== tilted) el.classList.remove('tilt'); }, 450);
      if (tilted === el) tilted = null;
    };
    const onLeave = e => { if (tilted && !tilted.contains(e.relatedTarget)) release(tilted); };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onLeave, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
