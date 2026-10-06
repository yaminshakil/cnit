/** Royal divider: two gold rules and a crown. Draws itself in when its parent is revealed. */
export default function Ornament({ className = '' }) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 240 36" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path className="o-line" pathLength="1" d="M2 18H92" />
      <path className="o-line" pathLength="1" d="M238 18H148" />
      <path className="o-crown" pathLength="1" d="M104 26 100 12l9 6 11-12 11 12 9-6-4 14Z" />
      <path className="o-crown" pathLength="1" d="M104 30h32" />
      <circle className="o-gem" cx="120" cy="21" r="1.6" fill="currentColor" stroke="none" />
      <circle className="o-gem" cx="100" cy="10" r="1.3" fill="currentColor" stroke="none" />
      <circle className="o-gem" cx="140" cy="10" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
