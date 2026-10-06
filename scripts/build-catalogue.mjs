// Bundles the catalogue sheets (source-assets/g-*.jpg) into one downloadable PDF.
// Run: node scripts/build-catalogue.mjs   ->  public/Clothing-Trims-Catalogue.pdf
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const ORDER = ['thread', 'twill', 'elastic', 'drawcord', 'printed', 'button', 'label', 'carton', 'others'];
const pages = [];
for (const slug of ORDER) {
  const { data, info } = await sharp(`source-assets/g-${slug}.jpg`).resize({ width: 1300, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  pages.push({ data, w: info.width, h: info.height });
}

// Objects: 1 catalog, 2 pages, then per page: page, content stream, image.
const parts = [Buffer.from('%PDF-1.4\n')];
const offsets = [];
let size = parts[0].length;
const add = (id, body) => {
  offsets[id] = size;
  const b = Buffer.concat([Buffer.from(`${id} 0 obj\n`), body, Buffer.from('\nendobj\n')]);
  parts.push(b); size += b.length;
};
const txt = s => Buffer.from(s);
const kids = pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ');
add(1, txt('<< /Type /Catalog /Pages 2 0 R >>'));
add(2, txt(`<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`));
pages.forEach((p, i) => {
  const pg = 3 + i * 3, cs = pg + 1, im = pg + 2;
  const draw = `q ${p.w} 0 0 ${p.h} 0 0 cm /Im0 Do Q`;
  add(pg, txt(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${p.w} ${p.h}] /Resources << /XObject << /Im0 ${im} 0 R >> >> /Contents ${cs} 0 R >>`));
  add(cs, txt(`<< /Length ${draw.length} >>\nstream\n${draw}\nendstream`));
  add(im, Buffer.concat([
    txt(`<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.data.length} >>\nstream\n`),
    p.data, txt('\nendstream'),
  ]));
});
const n = 3 + pages.length * 3;
let xref = `xref\n0 ${n}\n0000000000 65535 f \n`;
for (let i = 1; i < n; i++) xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
parts.push(txt(`${xref}trailer\n<< /Size ${n} /Root 1 0 R >>\nstartxref\n${size}\n%%EOF\n`));
const out = Buffer.concat(parts);
writeFileSync('public/Clothing-Trims-Catalogue.pdf', out);
console.log(`catalogue: ${pages.length} pages, ${(out.length / 1048576).toFixed(1)} MB`);
