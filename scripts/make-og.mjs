// Builds public/og.png, the link-preview image shown by iMessage, WhatsApp, Instagram, etc.
// Run after `npm run images` (it uses the processed hero car) and commit the result:
//   node scripts/make-og.mjs
// It's committed rather than built on deploy so the text renders with the same fonts every time.
import sharp from "sharp";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const W = 1200;
const H = 630;

const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="78%" r="60%" fx="50%" fy="78%" gradientTransform="translate(0.5 0.78) scale(1 0.55) translate(-0.5 -0.78)">
      <stop offset="0" stop-color="#E3E7E2"/>
      <stop offset="1" stop-color="#F6F7F4"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#F6F7F4"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
</svg>`);

const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <g font-family="Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif" text-anchor="middle">
    <text x="${W / 2}" y="214" font-size="66" font-weight="300" fill="#0F1512" letter-spacing="-2.6">Reliable Cars at</text>
    <text x="${W / 2}" y="290" font-size="66" font-weight="700" fill="#1A8F3C" letter-spacing="-2.6">Affordable Prices</text>
  </g>
</svg>`);

const logo = await sharp(path.join(root, "assets-src/lad-logo-on-light.png")).trim({ threshold: 10 }).resize({ height: 92 }).toBuffer();
const logoW = (await sharp(logo).metadata()).width;
const car = await sharp(path.join(root, "public/img/hero-bmw-1080.webp")).resize({ width: 940 }).png().toBuffer();
const carH = (await sharp(car).metadata()).height;

await sharp(bg)
  .composite([
    { input: logo, top: 34, left: Math.round((W - logoW) / 2) },
    { input: text, top: 0, left: 0 },
    { input: car, top: H - carH - 18, left: Math.round((W - 940) / 2) },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public/og.png"));
console.log("wrote public/og.png");
