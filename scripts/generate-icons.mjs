// Generate PWA icons from SVG
// Run: node scripts/generate-icons.mjs

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const sizes = [192, 512];
const outDir = join(process.cwd(), 'public', 'icons');

mkdirSync(outDir, { recursive: true });

// SVG template for the icon
function createSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.25}" fill="#4f46e5"/>
  <g transform="translate(${size * 0.25}, ${size * 0.2}) scale(${size * 0.025})">
    <path d="M19 7H12a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M19 7v3a1 1 0 0 0 1 1h2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M13.4 21v-4h1.3a1.3 1.3 0 0 1 0 2.6h-1.3" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}

// Write SVG files (can be used directly or converted to PNG)
for (const size of sizes) {
  const svg = createSvg(size);
  writeFileSync(join(outDir, `icon-${size}.svg`), svg);
  console.log(`Created icon-${size}.svg`);
}

console.log('\nIcons generated! For PNG conversion, use an online tool or sharp package.');
