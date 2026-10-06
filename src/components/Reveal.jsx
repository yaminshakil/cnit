import useReveal from '../useReveal.js';

/** Fade-up wrapper. `delay` is 0-2 and maps to the .d1/.d2 CSS classes. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, shown] = useReveal();
  const cls = ['reveal', delay ? `d${delay}` : '', shown ? 'in' : '', className].filter(Boolean).join(' ');
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}
