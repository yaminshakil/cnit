import { useState } from 'react';
import { Link } from 'react-router-dom';
import ZoomDialog from './ZoomDialog.jsx';
import Reveal from './Reveal.jsx';
import Ornament from './Ornament.jsx';
import { CATEGORIES, RANGE_TAGS } from '../data.jsx';

const pad = i => String(i + 1).padStart(2, '0');

export default function Products() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);
  const current = CATEGORIES[active];

  return (
    <section id="products" className="showcase">
      <div className="wrap">
        <div className="phead">
          <div>
            <Reveal className="label">The collection</Reveal>
            <Reveal as="h2" delay={1}>Every detail, <em>under one roof.</em></Reveal>
            <Reveal className="orn-wrap" delay={2}><Ornament /></Reveal>
          </div>
          <Reveal as="p" delay={2}>From sewing thread to cartons, one partner for your complete trims package. Choose a category to see the products.</Reveal>
        </div>

        <Reveal className="shw">
          <div className="cats" role="tablist" aria-label="Product categories">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                aria-selected={i === active}
                className={`cat${i === active ? ' on' : ''}`}
                onClick={() => setActive(i)}
              >
                <img src={c.thumb} alt="" loading="lazy" />
                <span className="t"><small>{pad(i)}</small><b>{c.title}</b></span>
                <span className="arr">→</span>
              </button>
            ))}
          </div>

          <div className="viewer" role="tabpanel">
            <div className="vbar">
              <h3>{current.dialogTitle}</h3>
              <button onClick={() => setZoom(current)}>View full size</button>
            </div>
            <div className="sheet" onClick={() => setZoom(current)}>
              <img key={current.gallery} src={current.gallery} alt={`${current.dialogTitle} products`} />
            </div>
          </div>
        </Reveal>

        <Reveal className="more"><Link to="/collection" className="btn line">Browse the full collection <span>→</span></Link></Reveal>

        <Reveal className="range">
          <img src="/assets/range-flatlay.webp" alt="Labels, buttons, zipper, cords and hang tags" loading="lazy" />
          <div>
            <div className="label">Full range</div>
            <h3>Twelve trims, one standard.</h3>
            <div className="tags">{RANGE_TAGS.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        </Reveal>
      </div>
      <ZoomDialog item={zoom} onClose={() => setZoom(null)} />
    </section>
  );
}
