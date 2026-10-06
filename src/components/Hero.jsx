import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { TRIMS } from '../data.jsx';

export function Hero() {
  return (
    <div className="hero" data-glow>
      <div className="wrap">
        <div>
          <div className="label">Premium garment accessories</div>
          <h1>Accessories that <em>complete</em> your creation.</h1>
          <p>Timely delivery, competitive pricing and uncompromising quality — the finishing touch that sets garments apart, from everyday wear to high-end fashion.</p>
          <div className="cta-row">
            <Link to="/collection" className="btn solid">View collection <span>→</span></Link>
            <Link to="/contact" className="btn line">Speak to our MD</Link>
          </div>
        </div>
        <Reveal className="arch">
          <div className="frame" data-parallax="0.07"><img src="/assets/hero-flatlay.webp" alt="Zippers, buttons, hang tag and cord" width="800" height="700" fetchPriority="high" decoding="async" /></div>
          <small>Dhaka · Bangladesh</small>
        </Reveal>
      </div>
      <div className="scroll"></div>
    </div>
  );
}


export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div>{[...TRIMS, ...TRIMS].map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}
