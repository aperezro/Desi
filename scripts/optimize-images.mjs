import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const assets = new URL('../src/assets/', import.meta.url);
const output = new URL('optimized/', assets);
await mkdir(output, { recursive: true });

// Keep source artwork intact; the app imports these committed web-sized copies.
const images = [
  ['banner9.svg', 'banner9', [2400, 4800]],
  ['foodcourt.svg', 'foodcourt', [600, 1200]],
  ['desisquare.svg', 'desisquare', [600, 1200]],
  ['desi_logo.png', 'desi_logo', [440]],
  ['desi_writing.png', 'desi_writing', [624]],
  ['desi_main.png', 'desi_main', [300]],
  ['krish.jpg', 'krish', [800]],
  ...[1, 3, 4, 5, 6, 7, 8].map((number) => [`${number}.png`, `${number}`, [900]]),
];

let originalBytes = 0;
let optimizedBytes = 0;
for (const [source, name, widths] of images) {
  const input = fileURLToPath(new URL(source, assets));
  originalBytes += (await stat(input)).size;
  for (const width of widths) {
    // Render SVGs at the target density so their embedded artwork stays crisp.
    const metadata = await sharp(input).metadata();
    const density = source.endsWith('.svg')
      ? Math.max(72, Math.ceil(72 * width / metadata.width))
      : undefined;
    const destination = fileURLToPath(new URL(`${name}-${width}.webp`, output));
    const info = await sharp(input, { density })
      .rotate()
      .resize({ width, withoutEnlargement: !source.endsWith('.svg') })
      .webp({ quality: 84, alphaQuality: 100, effort: 6, lossless: name === 'banner9' })
      .toFile(destination);
    optimizedBytes += info.size;
    console.log(`${name}-${width}.webp: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
  }
}
console.log(`Source images: ${(originalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Optimized images (all sizes): ${(optimizedBytes / 1024 / 1024).toFixed(2)} MB`);
