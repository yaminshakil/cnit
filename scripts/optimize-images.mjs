// Converts the originals in source-assets/ to compressed WebP in public/assets/.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdirSync, rmSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = 'source-assets';
const OUT = 'public/assets';
// max width per file group; catalogue sheets hold small text so they keep more width
const maxWidth = name =>
  name === 'logo' ? 160 :
  name.startsWith('g-') ? 1300 :
  name.startsWith('cat-') ? 640 :
  name === 'factory' || name === 'range-flatlay' ? 1400 :
  name === 'hero-flatlay' ? 1100 :
  name === 'bank-coins' ? 520 : 1000;

let before = 0, after = 0;
for (const file of readdirSync(SRC)) {
  const { name, ext } = parse(file);
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  if (name === 'contact-bg') { rmSync(join(OUT, file), { force: true }); continue; } // unused
  const out = join(OUT, `${name}.webp`);
  await sharp(join(SRC, file)).resize({ width: maxWidth(name), withoutEnlargement: true }).webp({ quality: name.startsWith('g-') ? 80 : 78, effort: 5 }).toFile(out);
  rmSync(join(OUT, file), { force: true });
  before += statSync(join(SRC, file)).size; after += statSync(out).size;
}
console.log(`${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
