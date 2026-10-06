import { Link } from 'react-router-dom';
import Ornament from './Ornament.jsx';

/** Banner at the top of every inner page. `children` is the h1 content; `image` fills the right side. */
export default function PageHero({ crumb, eyebrow, lead, image, caption, children }) {
  return (
    <header className="phero" data-glow>
      <div className={`wrap${image ? ' has-art' : ''}`}>
        <div className="phero-text">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><i>◆</i><span>{crumb}</span>
        </nav>
        <div className="label">{eyebrow}</div>
        <h1>{children}</h1>
        {lead && <p className="lead">{lead}</p>}
        <Ornament className="phero-orn" />
        </div>
        {image && (
          <div className="arch phero-art" aria-hidden="true">
            <div className="frame"><img src={image} alt="" decoding="async" /></div>
            {caption && <small>{caption}</small>}
          </div>
        )}
      </div>
    </header>
  );
}
