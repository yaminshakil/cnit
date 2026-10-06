import Reveal from './Reveal.jsx';
import { ADDRESSES } from '../data.jsx';

const mapUrl = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function Locations() {
  return (
    <div className="locs">
      {ADDRESSES.map((a, i) => (
        <Reveal key={a.name} delay={i} className="loc fx">
          <small>{a.name}</small>
          <p>{a.lines[0]}<br />{a.lines[1]}</p>
          <a href={mapUrl(a.map)} target="_blank" rel="noreferrer">Open in Maps ↗</a>
        </Reveal>
      ))}
    </div>
  );
}
