import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// logo-source.png is the immutable brand artwork (see docs/07_AI_IMPLEMENTATION_RULES.md
// Rule 6). Everything below is a mechanical derivative: the flat white background is keyed
// out, the padding is trimmed, and each surface gets the variant it needs. Never edit the
// source file by hand.
const SRC = "public/logo/logo-source.png";
const OUT = "public/logo";

// Displayed logo heights are 40–56px, so this keeps the assets crisp on 2x/3x screens
// without shipping the full-size master to every visitor.
const LOGO_HEIGHT = 240;
const PAPER = "#F7F5F0"; // matches manifest background_color and --paper

await mkdir(OUT, { recursive: true });

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v));

// --- 1. Key the flat white background to transparency ------------------------
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const rgba = Buffer.alloc(W * H * 4);
const colInk = new Int32Array(W);
let minX = W;
let minY = H;
let maxX = -1;
let maxY = -1;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // On a white plate the darkest channel is the ink coverage, so it doubles as alpha.
    const a = 255 - Math.min(r, g, b);

    let nr = 0;
    let ng = 0;
    let nb = 0;
    if (a > 0) {
      // Un-premultiply against white so edge pixels keep the ink colour instead of fading
      // to grey.
      nr = clamp(((r - (255 - a)) * 255) / a);
      ng = clamp(((g - (255 - a)) * 255) / a);
      nb = clamp(((b - (255 - a)) * 255) / a);
    }

    rgba[i] = nr;
    rgba[i + 1] = ng;
    rgba[i + 2] = nb;
    rgba[i + 3] = a;

    if (a > 8) {
      colInk[x]++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const keyed = await sharp(rgba, { raw: info }).png().toBuffer();

// --- 2. Split the lockup into emblem and wordmark ----------------------------
// The widest ink-free column inside the artwork separates the illustrated emblem from the
// wordmark. Derived at runtime so replacing the source cannot silently break the split.
let gapStart = -1;
let gapEnd = -1;
let bestGap = 0;
let runFrom = -1;
for (let x = minX; x <= maxX + 1; x++) {
  const empty = x > maxX || colInk[x] === 0;
  if (empty) {
    if (runFrom < 0) runFrom = x;
  } else if (runFrom >= 0) {
    if (x - runFrom > bestGap) {
      bestGap = x - runFrom;
      gapStart = runFrom;
      gapEnd = x - 1;
    }
    runFrom = -1;
  }
}

const emblemRight = gapStart > minX ? gapStart - 1 : Math.round(minX + (maxX - minX) * 0.38);

let emblemTop = H;
let emblemBottom = -1;
for (let y = 0; y < H; y++) {
  for (let x = minX; x <= emblemRight; x++) {
    if (rgba[(y * W + x) * 4 + 3] > 8) {
      if (y < emblemTop) emblemTop = y;
      if (y > emblemBottom) emblemBottom = y;
      break;
    }
  }
}

// --- 3. logo.png — light surfaces, trimmed, transparent ----------------------
const trimmed = await sharp(keyed)
  .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .png()
  .toBuffer();

const logo = await sharp(trimmed)
  .resize({ height: Math.min(LOGO_HEIGHT, maxY - minY + 1) })
  .png()
  .toFile(`${OUT}/logo.png`);

// --- 4. logo-reversed.png — dark surfaces, white knockout --------------------
// Only the pixels change colour; the silhouette is untouched. A navy lockup is invisible on
// the navy footer, so dark surfaces get the standard reversed treatment.
const trimmedRaw = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < trimmedRaw.data.length; i += 4) {
  trimmedRaw.data[i] = 255;
  trimmedRaw.data[i + 1] = 255;
  trimmedRaw.data[i + 2] = 255;
}
await sharp(trimmedRaw.data, { raw: trimmedRaw.info })
  .resize({ height: Math.min(LOGO_HEIGHT, maxY - minY + 1) })
  .png()
  .toFile(`${OUT}/logo-reversed.png`);

// --- 5. Favicons and app icons — emblem-only mark, per the brand system ------
const emblemW = emblemRight - minX + 1;
const emblemH = emblemBottom - emblemTop + 1;
const emblem = await sharp(keyed)
  .extract({ left: minX, top: emblemTop, width: emblemW, height: emblemH })
  .png()
  .toBuffer();

const side = Math.round(Math.max(emblemW, emblemH) * 1.06);
const master = await sharp({
  create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: emblem, left: Math.round((side - emblemW) / 2), top: Math.round((side - emblemH) / 2) },
  ])
  .png()
  .toBuffer();

for (const size of [32, 192, 512, 64]) {
  const name = size === 64 ? "favicon.png" : `favicon-${size}.png`;
  await sharp(master).resize(size, size).png().toFile(`${OUT}/${name}`);
}

// iOS renders transparency as black, so the apple icon sits on an opaque paper plate.
await sharp({ create: { width: 180, height: 180, channels: 4, background: PAPER } })
  .composite([{ input: await sharp(master).resize(150, 150).png().toBuffer(), left: 15, top: 15 }])
  .png()
  .toFile(`${OUT}/apple-touch-icon.png`);

console.log(`brand assets written (logo ${logo.width}x${logo.height}, emblem ${side}px)`);
