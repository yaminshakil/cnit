// Builds public/Company-Profile.pdf (12 A4 pages) from the site's own content.
// Run: node scripts/profile/build.mjs        (needs Microsoft Edge or Chrome installed for the PDF step)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

// Chrome embeds images losslessly when printing, so hand it compact JPEGs to keep the PDF small.
mkdirSync('scripts/profile/img', { recursive: true });
const jpg = async (name, width) => sharp(`public/assets/${name}.webp`).resize({ width, withoutEnlargement: true }).flatten({ background: '#f5f1e9' }).jpeg({ quality: 70, mozjpeg: true }).toFile(`scripts/profile/img/${name}.jpg`);


for (const n of ['logo']) await jpg(n, 160);
await jpg('hero-flatlay', 800);
await jpg('factory', 1000);
// Pull the category list straight out of src/data.jsx so the profile never drifts from the website.
const data = readFileSync('src/data.jsx', 'utf8');
const block = data.match(/export const CATEGORIES = (\[[\s\S]*?\n\])\.map\(/)[1];
const CATEGORIES = new Function(`return ${block}`)();

for (const c of CATEGORIES) await jpg('g-' + c.slug, 1000);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const NOTES = ['Samples before production', 'Made to your artwork and colours', 'Delivered on schedule'];
const pad = i => String(i + 1).padStart(2, '0');
let page = 1;
const foot = () => `<div class="foot"><span>Clothing Trims International · Company Profile</span><span>${String(++page).padStart(2, '0')}</span></div>`;

const css = `
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
:root{--gold:#9a7a3e;--gold-l:#b9975b;--ink:#121214;--soft:#5d584f;--rule:#d9d1c0}
body{font-family:Georgia,'Times New Roman',serif;color:var(--ink);background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:296.5mm;position:relative;overflow:hidden;page-break-after:always;padding:20mm}
.page:last-child{page-break-after:auto}
.dark{background:#0a0a0b;color:#f5f1e9}
.eyebrow{font-family:Arial,sans-serif;font-size:8.5pt;letter-spacing:.38em;text-transform:uppercase;color:var(--gold-l);margin-bottom:5mm}
h1{font-weight:400;font-size:37pt;line-height:1.05}
h2{font-weight:400;font-size:25pt;line-height:1.1;margin-bottom:7mm}
h2 em,h1 em{color:var(--gold);font-style:italic}
.dark h2 em,.dark h1 em{color:var(--gold-l)}
p{font-family:Arial,sans-serif;font-size:10pt;line-height:1.7;color:var(--soft)}
.dark p{color:#bdb8ae}
.rule{width:18mm;height:1.2mm;background:var(--gold-l);margin:7mm 0}
.foot{position:absolute;left:20mm;right:20mm;bottom:9mm;display:flex;justify-content:space-between;font-family:Arial,sans-serif;font-size:7pt;letter-spacing:.2em;text-transform:uppercase;color:#8d8880;border-top:.3mm solid var(--rule);padding-top:3mm}
.dark .foot{border-color:#2a2a2e}
.cover{display:flex;flex-direction:column;justify-content:space-between}
.logo{display:flex;align-items:center;gap:5mm}
.logo img{width:16mm;height:16mm;border-radius:22%}
.logo b{font-weight:500;font-size:14pt;letter-spacing:.2em;text-transform:uppercase;line-height:1.2}
.logo small{display:block;font-family:Arial,sans-serif;font-size:6.5pt;letter-spacing:.5em;color:var(--gold-l);font-weight:400}
.cover .art{position:absolute;right:20mm;bottom:24mm;width:76mm;height:104mm;border-radius:38mm 38mm 0 0;overflow:hidden;border:.4mm solid var(--gold-l)}
.cover .art img{width:100%;height:100%;object-fit:cover}
.cover .tag{font-family:Arial,sans-serif;font-size:9pt;letter-spacing:.34em;text-transform:uppercase;color:var(--gold-l)}
.photo{width:100%;height:62mm;object-fit:cover;margin-bottom:7mm}
.vm{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin-top:7mm}
.vm div{border-top:.5mm solid var(--gold-l);padding-top:3.5mm}
.vm h3{font-weight:400;font-size:14pt;margin-bottom:1.5mm}
.values{display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;margin-top:8mm}
.values div{border-top:.3mm solid var(--rule);padding-top:3.5mm}
.values h3{font-weight:400;font-size:12pt;margin-bottom:1mm}
.values p{font-size:9pt;line-height:1.55}
/* category pages */
.cat{display:grid;grid-template-columns:62mm 1fr;gap:10mm;align-items:start;margin-top:4mm}
.cat .num{font-size:46pt;color:var(--gold-l);line-height:1}
.cat h2{font-size:23pt;margin:3mm 0 4mm}
.cat .intro{font-family:Georgia,serif;font-style:italic;font-size:12pt;line-height:1.5;color:var(--ink);margin-bottom:4mm}
.cat ul{list-style:none;margin:6mm 0 5mm;border-top:.3mm solid var(--rule)}
.cat li{font-family:Arial,sans-serif;font-size:9pt;padding:2mm 0 2mm 5mm;border-bottom:.3mm solid var(--rule);position:relative}
.cat li::before{content:"◆";position:absolute;left:0;top:2.6mm;font-size:5pt;color:var(--gold-l)}
.notes{font-family:Arial,sans-serif;font-size:7.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);line-height:2}
.sheet{border:.4mm solid var(--gold-l);padding:2.5mm;background:#f5f1e9}
.sheet img{width:100%;display:block}
.cta{position:absolute;left:20mm;right:20mm;bottom:19mm;background:#0a0a0b;color:#f5f1e9;padding:7mm 9mm;display:grid;grid-template-columns:1fr auto;gap:8mm;align-items:center}
.cta h4{font-weight:400;font-size:15pt;margin-bottom:2mm}
.cta .notes{color:var(--gold-l);line-height:1.9}
.cta .who{text-align:right;font-family:Arial,sans-serif;font-size:8.5pt;line-height:1.8;color:#bdb8ae}
.cta .who b{display:block;font-family:Georgia,serif;font-weight:400;font-size:13pt;color:#f5f1e9}
.cat.wide{grid-template-columns:1fr;gap:7mm}
.cat.wide .sheet{margin-top:0}
.cat.wide ul{columns:2;column-gap:10mm;margin:3mm 0 0}
.cat.wide h2{margin-bottom:2mm}
.cat.wide .num{font-size:34pt}
/* closing page */
.brands{display:flex;flex-wrap:wrap;gap:3mm;margin:5mm 0 7mm}
.brands span{font-family:Arial,sans-serif;font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;border:.3mm solid #3a3a40;padding:2.4mm 4.5mm;color:#f5f1e9}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:5mm;margin-top:5mm}
.steps div{border-top:.3mm solid #34343a;padding-top:3.5mm}
.steps i{font-style:normal;font-size:18pt;color:var(--gold-l)}
.steps h3{font-weight:400;font-size:11pt;margin:1.5mm 0 1mm}
.steps p{font-size:8.3pt;line-height:1.5}
.addr{display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:7mm}
.addr small,.contact small{display:block;font-family:Arial,sans-serif;font-size:7pt;letter-spacing:.34em;text-transform:uppercase;color:var(--gold-l);margin-bottom:1.5mm}
.addr p{color:#f5f1e9;font-size:9.5pt}
.contact{margin-top:8mm;border-top:.3mm solid #2a2a2e}
.contact div{padding:4.2mm 0;border-bottom:.3mm solid #2a2a2e}
.contact b{font-weight:400;font-size:17pt;color:#f5f1e9}
`;

const cover = `<section class="page dark cover">
  <div class="logo"><img src="img/logo.jpg" alt=""><b>Clothing Trims<small>INTERNATIONAL</small></b></div>
  <div><div class="eyebrow">Company profile</div><h1>Accessories<br>that complete<br>your <em>creation.</em></h1><div class="rule"></div><div class="tag">Dhaka · Bangladesh</div></div>
  <div class="art"><img src="img/hero-flatlay.jpg" alt=""></div><div style="height:1mm"></div></section>`;

const about = `<section class="page">
  <div class="eyebrow">About us</div>
  <h2>The finishing touch that sets garments <em>apart.</em></h2>
  <img class="photo" src="img/factory.jpg" alt="">
  <p>Backed by years of experience and advanced manufacturing partnerships, Clothing Trims International is renowned as a nominated trims supplier for several global brands, noted for strong client relationships and a genuine commitment to sustainability.</p>
  <p style="margin-top:3mm">We supply garment trims and packing materials from Dhaka, Bangladesh: timely delivery, competitive pricing and uncompromising quality for brands around the world. From sewing thread and labels to elastics, buttons, hang tags and export cartons, one partner can supply your complete trims package.</p>
  <div class="vm"><div><h3>Our vision</h3><p>To be the go-to brand for versatile, affordable accessories that enhance any outfit.</p></div><div><h3>Our mission</h3><p>To create high-quality, timeless pieces that blend fashion with function.</p></div></div>
  <div class="values">
    <div><h3>Quality First</h3><p>Every trim inspected to the exacting standards of the global fashion industry.</p></div>
    <div><h3>Reliability</h3><p>Timely delivery and consistent supply you can plan your production around.</p></div>
    <div><h3>Sustainability</h3><p>Responsible sourcing and manufacturing partners, with efforts recognised by our buyers.</p></div>
    <div><h3>Customer Focus</h3><p>Long-standing relationships built on listening first and responding fast.</p></div>
    <div><h3>Integrity</h3><p>Honest pricing, clear communication and promises we keep.</p></div>
  </div>${foot()}</section>`;

const catPages = CATEGORIES.map((c, i) => {
  const wide = c.slug === 'carton'; // the carton sheet is landscape, so it spans the page
  const text = `<div>
      <div class="num">${pad(i)}</div><h2>${esc(c.dialogTitle || c.title)}</h2>
      <div class="intro">${esc(c.intro)}</div><p>${esc(c.desc)}</p>
      <ul>${c.variants.map(v => `<li>${esc(v)}</li>`).join('')}</ul>
    </div>`;
  const sheet = `<div class="sheet"><img src="img/g-${c.slug}.jpg" alt=""></div>`;
  return `<section class="page"><div class="eyebrow">Our range · ${pad(i)} of ${pad(CATEGORIES.length - 1)}</div>
    <div class="cat${wide ? ' wide' : ''}">${text}${sheet}</div>
    <div class="cta"><div><h4>Request samples &amp; a quotation</h4><div class="notes">${NOTES.map(n => `✓ ${n}`).join('<br>')}</div></div>
      <div class="who"><b>+880 1713-490067</b>shahriar@clothingtrimsintl.com<br>clothingtrimsintl.com</div></div>${foot()}</section>`;
}).join('\n');

const closing = `<section class="page dark">
  <div class="eyebrow">Buying partners</div><h2>Trusted by <em>global brands.</em></h2>
  <p>We are a nominated trims supplier for several global brands, noted for strong client relationships and a genuine commitment to sustainability.</p>
  <div class="brands"><span>C&amp;A</span><span>G-Star Raw</span><span>Aldi</span><span>Primark</span><span>Inditex</span><span>Scanwear</span><span>Tesco</span><span>Carrefour</span></div>
  <div class="eyebrow" style="margin-top:8mm">How we work</div>
  <div class="steps">
    <div><i>01</i><h3>Share your requirement</h3><p>Tell us the trims you need, with quantities, specifications and artwork.</p></div>
    <div><i>02</i><h3>Samples &amp; approval</h3><p>We prepare samples for your review so you approve before production starts.</p></div>
    <div><i>03</i><h3>Production</h3><p>Your trims are produced to the approved sample, with quality checks along the way.</p></div>
    <div><i>04</i><h3>On-time delivery</h3><p>Goods are delivered on schedule so your production line is never kept waiting.</p></div>
  </div>
  <div class="addr">
    <div><small>Head office</small><p>House 44, Road 07, Sector 11,<br>Uttara, Dhaka-1230</p></div>
    <div><small>Factory</small><p>Holding No. 1327, Masterpara, Uzampur,<br>Uttarkhan, Dhaka-1230</p></div>
  </div>
  <div class="contact">
    <div><small>Call the Managing Director</small><b>+880 1713-490067</b></div>
    <div><small>Email</small><b>shahriar@clothingtrimsintl.com</b></div>
    <div><small>Website</small><b>clothingtrimsintl.com</b></div>
  </div>${foot()}</section>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Company Profile — Clothing Trims International</title><style>${css}</style></head><body>
${cover}\n${about}\n${catPages}\n${closing}</body></html>`;
const pages = 2 + CATEGORIES.length + 1;
writeFileSync('scripts/profile/profile.html', html);

const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const browser = browsers.find(existsSync);
if (!browser) throw new Error('Edge or Chrome not found');
execFileSync(browser, ['--headless', '--disable-gpu', '--allow-file-access-from-files', '--no-pdf-header-footer',
  `--print-to-pdf=${process.cwd()}/public/Company-Profile.pdf`, pathToFileURL(`${process.cwd()}/scripts/profile/profile.html`).href], { stdio: 'ignore' });
console.log(`Company-Profile.pdf written (${pages} pages)`);
