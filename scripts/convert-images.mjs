// Convert master PNGs (masters/*.png) to AVIF / WebP / JPG at
// 480 / 800 / 1200 / 1600w (capped at the native width, never upscaled).
// Run: node scripts/convert-images.mjs
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const mastersDir = path.join(root, 'masters');
const outDir = path.join(root, 'public', 'images');
const widths = [480, 800, 1200, 1600];

await mkdir(outDir, { recursive: true });

const files = (await readdir(mastersDir)).filter((f) => f.endsWith('.png'));
if (files.length === 0) {
  console.error('No master PNGs found in masters/.');
  process.exit(1);
}

for (const file of files) {
  const name = path.basename(file, '.png');
  const input = path.join(mastersDir, file);
  const image = sharp(input);
  const { width: native } = await image.metadata();
  if (!native) throw new Error(`No width for ${file}`);

  for (const w of widths.filter((w) => w <= native)) {
    const base = sharp(input).resize(w);
    await base.clone().avif({ quality: 50 }).toFile(path.join(outDir, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, `${name}-${w}.jpg`));
    console.log(`${name} — ${w}w done`);
  }
}
console.log(`Converted ${files.length} masters.`);
