// Converts the source PNGs in assets-src/ into responsive WebP files in public/img/
// and writes src/lib/images.generated.ts (intrinsic sizes for next/image).
// Static export can't use Next's on-demand optimizer, so we do it at build time.
import sharp from "sharp";
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(root, "assets-src");
const OUT = path.join(root, "public/img");
// Must match images.deviceSizes + images.imageSizes in next.config.ts
export const WIDTHS = [160, 240, 320, 480, 640, 828, 1080, 1280, 1600, 2048];

await mkdir(OUT, { recursive: true });

async function isFresh(src, out) {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

async function emit(name, input, srcPath) {
  const meta = await sharp(input).metadata();
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${name}-${w}.webp`);
    if (srcPath && (await isFresh(srcPath, out))) continue;
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, alphaQuality: 85, effort: 5 })
      .toFile(out);
  }
  return { width: meta.width, height: meta.height };
}

// Footer logo: recolour the dark wordmark to off-white so it reads on #0A0A0A.
async function lightLogo(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max < 110 && max - min < 40) {
      data[i] = 248; data[i + 1] = 249; data[i + 2] = 250;
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

// The hero photo has an opaque light-grey studio background. Flood-fill it from the
// edges and turn it into transparency (keeping its soft floor shadow as translucent
// black) so the car sits cleanly on any page background, without CSS masks.
async function cutOutStudioBackground(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  // Light, neutral pixels are background. Near the floor (bottom 30%) accept darker greys
  // too, so the floor shadow fades out smoothly; higher up that would eat body reflections.
  const floorY = Math.round(h * 0.7);
  const isBg = (i, y) =>
    lum(i) > (y >= floorY ? 95 : 165) &&
    Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) < 24;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    const i = p * 4;
    if (!isBg(i, Math.floor(p / w))) continue;
    seen[p] = 1;
    const l = lum(i);
    const a = Math.max(0, Math.min(1, (238 - l) / (238 - 95)));
    data[i] = data[i + 1] = data[i + 2] = 15;
    data[i + 3] = Math.round(a * a * 255 * 0.7);
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

const manifest = {};
const files = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();
for (const f of files) {
  const name = f.replace(/\.png$/, "");
  const srcPath = path.join(SRC, f);
  // Car cut-outs: trim transparent margins so every car fills its card the same way.
  let input = srcPath;
  if (name === "hero-bmw") input = await sharp(await cutOutStudioBackground(srcPath)).trim({ threshold: 10 }).toBuffer();
  else if (/^(fleet|why)-/.test(name)) input = await sharp(srcPath).trim({ threshold: 10 }).toBuffer();
  manifest[name] = await emit(name, input, srcPath);
  if (name === "lad-logo-on-light") {
    manifest["lad-logo-on-dark"] = await emit("lad-logo-on-dark", await lightLogo(srcPath), srcPath);
  }
}

// Open Graph image (1200x630)
const ogPath = path.join(root, "public/og.png");
if (!(await isFresh(path.join(SRC, "hero-bmw.png"), ogPath))) {
  const car = await sharp(path.join(SRC, "hero-bmw.png")).resize({ width: 1040 }).toBuffer();
  const logo = await sharp(path.join(SRC, "lad-logo-on-light.png")).resize({ width: 300 }).toBuffer();
  const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <text x="600" y="232" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="56" font-weight="300" fill="#0F1512" letter-spacing="-2">Reliable Cars at <tspan font-weight="700" fill="#1A8F3C">Affordable Prices</tspan></text>
  </svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#FFFFFF" } })
    .composite([
      { input: logo, top: 28, left: 450 },
      { input: text, top: 0, left: 0 },
      { input: car, top: 262, left: 80 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(ogPath);
}

await writeFile(
  path.join(root, "src/lib/images.generated.ts"),
  `// Generated by scripts/optimize-images.mjs. Do not edit.\nexport const IMAGES = ${JSON.stringify(manifest, null, 2)} as const;\nexport type ImageName = keyof typeof IMAGES;\n`,
);
console.log(`images: ${Object.keys(manifest).length} sources → public/img`);
