import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { optimize } from 'svgo';
import sharp from 'sharp';

const source = new URL('../src/assets/banner9.svg', import.meta.url);
const destination = new URL('../src/assets/optimized/banner9.svg', import.meta.url);
const original = await readFile(source, 'utf8');
const photos = new Map();

// Parse the SVG without the default optimizations, which can round geometry.
const imageVisitor = (visit) => ({
  name: 'lossless-embedded-photos',
  fn: () => ({ element: { enter(node) {
    if (node.name === 'image') visit(node);
  } } }),
});
optimize(original, { plugins: [imageVisitor((node) => {
  const href = node.attributes['xlink:href'];
  assert(href?.startsWith('data:image/png;base64,'), 'Expected an embedded PNG');
  photos.set(href, null);
})] });

for (const href of photos.keys()) {
  const png = Buffer.from(href.slice('data:image/png;base64,'.length), 'base64');
  // Lossless encoding only: no resizing, quantization, or quality reduction.
  const compressed = await sharp(png).webp({ lossless: true, effort: 6 }).toBuffer();
  const before = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(compressed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.deepEqual(before.info, after.info, 'Embedded photo dimensions changed');
  assert(before.data.equals(after.data), 'Embedded photo pixels changed');
  photos.set(href, compressed.length < png.length ? `data:image/webp;base64,${compressed.toString('base64')}` : href);
}

const { data } = optimize(original, { plugins: [imageVisitor((node) => {
  node.attributes['xlink:href'] = photos.get(node.attributes['xlink:href']);
})] });

await mkdir(new URL('.', destination), { recursive: true });
await writeFile(destination, data);
console.log(`Losslessly compressed ${photos.size} unique embedded photos.`);
console.log(`${Buffer.byteLength(original)} -> ${Buffer.byteLength(data)} bytes; all embedded photo dimensions and pixels are identical.`);
