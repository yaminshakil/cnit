import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from './data.jsx';

const BASE = 'Clothing Trims International';
const DEFAULT_DESC = 'Premium garment trims — lace, labels, elastics, sewing thread, drawcords, stickers, buttons and cartons for global brands. Dhaka, Bangladesh.';

function setMeta(selector, attr, value) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/** Sets the tab title plus the description, canonical and social-share tags for the current page. */
export default function usePageTitle(title, description = DEFAULT_DESC) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = title ? `${title} — ${BASE}` : `${BASE} — Accessories That Complete Your Creation`;
    const url = SITE_URL + (pathname === '/' ? '/' : pathname);
    document.title = full;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', full);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [title, description, pathname]);
}
