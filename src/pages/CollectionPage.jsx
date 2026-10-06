import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import ZoomDialog from '../components/ZoomDialog.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';
import { CATEGORIES } from '../data.jsx';

const NOTES = ['Samples before production', 'Made to your artwork and colours', 'Delivered on schedule'];
const pad = i => String(i + 1).padStart(2, '0');

export default function CollectionPage() {
  usePageTitle('Collection', 'Sewing thread, twill tape, elastic, drawcords, labels, hang tags, buttons, zippers and cartons: nine categories of garment trims from one supplier in Dhaka.');
  const [zoom, setZoom] = useState(null);

  return (
    <>
      <PageHero
        crumb="Collection"
        eyebrow="The collection"
        lead="Nine categories of garment trims and packing materials, one partner for your complete trims package. Browse every product, then request samples or a quotation."
        image="/assets/range-flatlay.webp"
        caption="Nine categories"
      >
        Every detail, <em>under one roof.</em>
      </PageHero>

      <div className="catnav">
        <div className="wrap" role="navigation" aria-label="Product categories">
          {CATEGORIES.map((c, i) => <a key={c.slug} href={`#${c.slug}`}><i>{pad(i)}</i> {c.title}</a>)}
        </div>
      </div>

      <div className="dlbar">
        <a href="/Clothing-Trims-Catalogue.pdf" download className="btn line">Download full catalogue (PDF) <span>↓</span></a>
      </div>

      {CATEGORIES.map((c, i) => (
        <section key={c.slug} id={c.slug} className={`csec${i % 2 ? ' rev' : ''}`}>
          <div className="wrap">
            <div className="copy">
              <Reveal className="label">{pad(i)} · {c.title}</Reveal>
              <Reveal as="h2" delay={1}>{c.intro}</Reveal>
              <Reveal as="p" delay={2} className="desc">{c.desc}</Reveal>
              <Reveal as="ul" className="variants">
                {c.variants.map(v => <li key={v}>{v}</li>)}
              </Reveal>
              <Reveal as="ul" className="notes">
                {NOTES.map(n => <li key={n}>{n}</li>)}
              </Reveal>
              <Reveal className="actions">
                <Link to={`/contact?product=${encodeURIComponent(c.title)}`} className="btn solid">Request a quote <span>→</span></Link>
                <button className="btn line" onClick={() => setZoom(c)}>View full size <span>↗</span></button>
              </Reveal>
            </div>
            <Reveal delay={1} className="sheetbox">
              <div className="sheet" onClick={() => setZoom(c)}>
                <img src={c.gallery} alt={`${c.title} catalogue`} loading="lazy" />
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBand
        title="Can't find what you need?"
        text="Tell us what you're looking for. We'll point you to the right product, send samples and prepare a quotation."
        label="Ask our team"
      />
      <ZoomDialog item={zoom} onClose={() => setZoom(null)} />
    </>
  );
}
