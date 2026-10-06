import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import Locations from '../components/Locations.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';
import { VM, VALUES, STEPS } from '../data.jsx';

export default function AboutPage() {
  usePageTitle('About us', 'Clothing Trims International is a garment trims manufacturer in Dhaka, Bangladesh: timely delivery, competitive pricing and uncompromising quality for global brands.');
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About us"
        lead="Premium garment accessories from Dhaka, Bangladesh. Timely delivery, competitive pricing and uncompromising quality for brands around the world."
        image="/assets/factory.webp"
        caption="Uttarkhan · Dhaka"
      >
        The finishing touch that sets garments <em>apart.</em>
      </PageHero>

      <section className="block">
        <div className="wrap twocol">
          <Reveal as="figure" className="photo">
            <img src="/assets/factory.webp" alt="Clothing Trims International factory" loading="lazy" />
            <figcaption>Our factory · Uttarkhan, Dhaka</figcaption>
          </Reveal>
          <div>
            <Reveal className="label">Who we are</Reveal>
            <Reveal as="h2" delay={1}>Accessories that <em>complete</em> your creation.</Reveal>
            <Reveal as="p" delay={2} className="body">
              Backed by years of experience and advanced manufacturing partnerships, Clothing Trims International is renowned as a nominated trims supplier for several global brands — noted for strong client relationships and a genuine commitment to sustainability.
            </Reveal>
            <Reveal as="p" className="body">
              From sewing thread to cartons, we bring the full trims package together under one roof, from everyday wear to high-end fashion.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="vm2">
            {VM.map(([n, t, p], i) => (
              <Reveal key={n} delay={i} className="v">
                <i>{n}</i><h3>{t}</h3><p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <Reveal className="label">Our values</Reveal>
          <Reveal as="h2" delay={1}>Principles behind <em>every trim.</em></Reveal>
          <div className="cards6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i % 3} className="c fx">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <Reveal className="label">How we work</Reveal>
          <Reveal as="h2" delay={1}>From enquiry to <em>delivery.</em></Reveal>
          <div className="steps">
            {STEPS.map(([n, t, p], i) => (
              <Reveal key={n} delay={i % 3} className="s">
                <i>{n}</i><h3>{t}</h3><p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <Reveal className="label">Find us</Reveal>
          <Reveal as="h2" delay={1}>Head office &amp; <em>factory.</em></Reveal>
          <Locations />
        </div>
      </section>

      <CtaBand
        title="Let's work together."
        text="Speak directly with our Managing Director. We reply promptly."
      />
    </>
  );
}
