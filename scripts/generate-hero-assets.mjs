/**
 * Generates branded, transparent, high-resolution PNG "cutout" assets for the
 * Reasons hero sections (see REASONS_HERO_TRANSFORMATION_2026.md, §5).
 *
 * These are on-brand vector illustrations (flat editorial style) used as
 * swap-ready placeholders until real photographic cutouts are shot.
 * Marked TODO(asset) in components until replaced.
 *
 * Regenerate with:  node scripts/generate-hero-assets.mjs
 * Requires sharp (install locally, not saved):  npm install --no-save sharp
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "images", "hero");

const C = {
  navy: "#103158", navy900: "#0C2749", navy700: "#1B4577",
  blue: "#0B6E8F", cyan: "#339BBA", cyanL: "#8FD0E3",
  p200: "#C9D3E0", p100: "#E4EAF3", p50: "#F1F4F9",
  crimson: "#B8324A", crimsonD: "#9C2A3F",
  paper: "#F7F5F0", white: "#FFFFFF", ink: "#14213A", muted: "#55657A",
  skin1: "#E9C4A0", skin2: "#CE9166", skin3: "#F0D2B4",
  hair1: "#14213A", hair2: "#3A2A1E", hair3: "#103158",
};

/* ------------------------------------------------------------------ */
/* A stylised, faceless flat figure (cutout, transparent background)  */
/* ------------------------------------------------------------------ */
function figure(x, y, scale, o = {}) {
  const skin = o.skin ?? C.skin1;
  const hair = o.hair ?? C.hair1;
  const top = o.top ?? C.blue;
  const bottom = o.bottom ?? C.navy;
  const shoe = o.shoe ?? C.ink;
  const accent = o.accent ?? C.crimson;
  const folder = o.folder ?? true;

  const shirt = o.shirt
    ? `<path d="M332 300 q28 44 56 0 l-8 118 q-40 18 -40 0 z" fill="${C.p100}"/>`
    : "";
  const folderEl = folder
    ? `<g transform="rotate(8 552 560)">
         <rect x="470" y="486" width="168" height="126" rx="12" fill="${C.paper}" stroke="#E3E7EE" stroke-width="3"/>
         <rect x="470" y="486" width="86" height="28" rx="8" fill="${accent}"/>
         <rect x="498" y="550" width="116" height="9" rx="4.5" fill="${C.p200}"/>
         <rect x="498" y="574" width="84" height="9" rx="4.5" fill="${C.p200}"/>
       </g>`
    : `<circle cx="532" cy="590" r="31" fill="${skin}"/>`;

  return `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <rect x="236" y="596" width="90" height="336" rx="45" fill="${bottom}"/>
    <rect x="372" y="596" width="90" height="336" rx="45" fill="${bottom}"/>
    <rect x="188" y="896" width="168" height="60" rx="30" fill="${shoe}"/>
    <rect x="352" y="896" width="168" height="60" rx="30" fill="${shoe}"/>
    <path d="M200 440 q0 -150 160 -150 q160 0 160 150 l0 120 q0 66 -66 66 l-188 0 q-66 0 -66 -66 z" fill="${top}"/>
    ${shirt}
    <rect x="150" y="322" width="74" height="268" rx="37" fill="${top}" transform="rotate(7 187 340)"/>
    <circle cx="196" cy="590" r="31" fill="${skin}"/>
    <rect x="488" y="322" width="74" height="268" rx="37" fill="${top}" transform="rotate(-7 525 340)"/>
    ${folderEl}
    <rect x="330" y="256" width="60" height="66" rx="24" fill="${skin}"/>
    <ellipse cx="360" cy="192" rx="94" ry="98" fill="${hair}"/>
    <ellipse cx="360" cy="212" rx="80" ry="82" fill="${skin}"/>
    <path d="M280 196 A94 98 0 0 1 440 196 L420 172 Q360 124 300 172 Z" fill="${hair}"/>
  </g>`;
}

/* ------------------------------------------------------------------ */
/* Objects & landmarks                                                 */
/* ------------------------------------------------------------------ */
const assets = [];

const add = (relPath, vb, width, height, body) => {
  assets.push({ relPath, width, height, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${vb[0]}" height="${vb[1]}" viewBox="0 0 ${vb[0]} ${vb[1]}" fill="none">${body}</svg>` });
};

/* People cutouts --------------------------------------------------- */
add("cutouts/home-student.png", [720, 1000], 1080, 1500,
  figure(0, 0, 1, { top: C.blue, bottom: C.navy, skin: C.skin1, hair: C.hair1, folder: true }));

add("cutouts/about-team.png", [1120, 1000], 1560, 1393,
  figure(390, 40, 0.86, { top: C.navy, bottom: C.navy900, skin: C.skin2, hair: C.hair1, shirt: true, folder: false, accent: C.crimson }) +
  figure(30, 70, 0.8, { top: C.cyan, bottom: C.navy, skin: C.skin3, hair: C.hair3, folder: true }));

add("cutouts/services-counsellor.png", [720, 1000], 1080, 1500,
  figure(0, 0, 1, { top: C.navy, bottom: C.navy900, skin: C.skin1, hair: C.hair2, shirt: true, folder: true }));

add("cutouts/study-abroad-student.png", [980, 1000], 1370, 1399,
  figure(0, 0, 1, { top: C.blue, bottom: C.navy, skin: C.skin3, hair: C.hair1, folder: true }) +
  `<g transform="translate(560 660)">
     <rect x="0" y="40" width="200" height="250" rx="24" fill="${C.navy}"/>
     <rect x="18" y="58" width="164" height="214" rx="16" fill="${C.navy700}"/>
     <rect x="18" y="150" width="164" height="16" fill="${C.crimson}"/>
     <path d="M40 40 q0 -54 60 -54 q60 0 60 54" stroke="${C.ink}" stroke-width="14" fill="none" stroke-linecap="round"/>
     <circle cx="44" cy="300" r="18" fill="${C.ink}"/>
     <circle cx="156" cy="300" r="18" fill="${C.ink}"/>
   </g>` +
  `<g transform="rotate(12 200 520)">
     <rect x="120" y="470" width="150" height="96" rx="10" fill="${C.white}"/>
     <rect x="120" y="470" width="150" height="22" rx="8" fill="${C.crimson}"/>
   </g>`);

/* IELTS: seated student at a desk with laptop + headphones -------- */
add("cutouts/ielts-student.png", [900, 820], 1350, 1230, `
  <g>
    <path d="M300 470 q0 -150 160 -150 q160 0 160 150 l0 60 l-320 0 z" fill="${C.blue}"/>
    <rect x="150" y="322" width="72" height="220" rx="36" fill="${C.blue}" transform="rotate(28 186 340)"/>
    <rect x="690" y="322" width="72" height="220" rx="36" fill="${C.blue}" transform="rotate(-28 726 340)"/>
    <circle cx="322" cy="500" r="30" fill="${C.skin3}"/>
    <circle cx="588" cy="500" r="30" fill="${C.skin3}"/>
    <rect x="390" y="256" width="58" height="64" rx="24" fill="${C.skin3}"/>
    <ellipse cx="420" cy="196" rx="90" ry="94" fill="${C.hair1}"/>
    <ellipse cx="420" cy="214" rx="76" ry="78" fill="${C.skin3}"/>
    <path d="M344 198 A90 94 0 0 1 496 198 L478 174 Q420 126 362 174 Z" fill="${C.hair1}"/>
    <path d="M322 176 q98 -70 196 0" stroke="${C.cyan}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <rect x="300" y="150" width="30" height="56" rx="14" fill="${C.cyan}"/>
    <rect x="510" y="150" width="30" height="56" rx="14" fill="${C.cyan}"/>
  </g>
  <rect x="130" y="566" width="640" height="26" rx="10" fill="${C.navy}"/>
  <rect x="170" y="592" width="22" height="210" rx="8" fill="${C.navy900}"/>
  <rect x="708" y="592" width="22" height="210" rx="8" fill="${C.navy900}"/>
  <rect x="360" y="452" width="230" height="128" rx="10" fill="${C.navy900}"/>
  <rect x="376" y="466" width="198" height="100" rx="6" fill="${C.cyan}"/>
  <rect x="330" y="566" width="290" height="18" rx="9" fill="${C.p200}"/>
  <g transform="translate(650 500)">
    <rect x="0" y="30" width="66" height="40" rx="8" fill="${C.white}"/>
    <rect x="46" y="36" width="26" height="28" rx="8" fill="none" stroke="${C.white}" stroke-width="7"/>
    <rect x="8" y="8" width="50" height="26" rx="6" fill="${C.crimson}"/>
  </g>`);

/* B2B: two professionals ----------------------------------------- */
add("cutouts/b2b-partners.png", [1000, 1000], 1500, 1500, `
  ${figure(40, 60, 0.9, { top: C.navy, bottom: C.navy900, skin: C.skin1, hair: C.hair1, shirt: true, folder: false })}
  ${figure(560, 60, 0.9, { top: C.blue, bottom: C.navy, skin: C.skin3, hair: C.hair1, shirt: true, folder: false })}
  <rect x="360" y="330" width="200" height="66" rx="33" fill="${C.navy}" transform="rotate(14 460 363)"/>
  <rect x="440" y="330" width="200" height="66" rx="33" fill="${C.blue}" transform="rotate(-14 540 363)"/>
  <circle cx="470" cy="392" r="42" fill="${C.skin1}"/>
  <circle cx="530" cy="392" r="42" fill="${C.skin3}"/>
  <rect x="400" y="600" width="240" height="150" rx="16" fill="${C.navy900}"/>
  <rect x="400" y="600" width="240" height="28" rx="12" fill="${C.crimson}"/>
  <path d="M470 600 v150 M560 600 v150" stroke="${C.navy}" stroke-width="8"/>`);

add("objects/blog-books.png", [660, 560], 990, 840, `
  <rect x="150" y="360" width="360" height="54" rx="10" fill="${C.navy}"/>
  <rect x="130" y="420" width="400" height="54" rx="10" fill="${C.blue}"/>
  <rect x="170" y="300" width="320" height="54" rx="10" fill="${C.cyan}"/>
  <rect x="170" y="300" width="60" height="54" fill="${C.crimson}"/>
  <rect x="150" y="360" width="60" height="54" fill="${C.crimsonD}"/>
  <rect x="130" y="420" width="60" height="54" fill="${C.navy700}"/>
  <g transform="translate(430 250)">
    <rect x="0" y="60" width="150" height="150" rx="16" fill="${C.white}" stroke="${C.p200}" stroke-width="4"/>
    <path d="M150 90 q60 0 60 45 q0 45 -60 45" fill="none" stroke="${C.white}" stroke-width="18"/>
    <rect x="20" y="30" width="110" height="40" rx="8" fill="${C.crimson}"/>
  </g>
  <g transform="translate(120 120)">
    <circle cx="60" cy="40" r="42" fill="none" stroke="${C.ink}" stroke-width="12"/>
    <circle cx="180" cy="40" r="42" fill="none" stroke="${C.ink}" stroke-width="12"/>
    <path d="M100 34 q20 -16 40 0" stroke="${C.ink}" stroke-width="12" fill="none"/>
    <path d="M20 34 l-40 -14 M220 34 l40 -14" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>
  </g>`);

/* Landmark silhouettes ------------------------------------------- */
add("objects/landmark-canada.png", [600, 600], 900, 900, `
  <path d="M300 80 L312 220 L352 232 Q372 238 372 258 L372 300 Q372 320 352 326 L312 338 L312 520 L288 520 L288 338 L248 326 Q228 320 228 300 L228 258 Q228 238 248 232 L288 220 Z" fill="${C.navy}"/>
  <rect x="294" y="40" width="12" height="60" rx="6" fill="${C.crimson}"/>
  <g fill="${C.blue}">
    <path d="M120 470 l40 -70 l40 70 z"/><path d="M70 470 l40 -70 l40 70 z"/>
    <rect x="60" y="470" width="340" height="14" rx="7" fill="${C.navy}"/>
  </g>
  <path d="M430 300 l16 32 l36 6 l-26 24 l6 34 l-32 -18 l-32 18 l6 -34 l-26 -24 l36 -6 z" fill="${C.crimson}"/>`);

add("objects/landmark-uk.png", [600, 600], 900, 900, `
  <rect x="120" y="220" width="90" height="280" rx="10" fill="${C.navy}"/>
  <rect x="390" y="220" width="90" height="280" rx="10" fill="${C.navy}"/>
  <path d="M120 220 h90 l-45 -60 z" fill="${C.navy}"/>
  <path d="M390 220 h90 l-45 -60 z" fill="${C.navy}"/>
  <rect x="120" y="300" width="360" height="26" fill="${C.blue}"/>
  <path d="M210 313 q90 -34 180 0" stroke="${C.blue}" stroke-width="10" fill="none"/>
  <rect x="80" y="500" width="440" height="18" rx="9" fill="${C.navy}"/>
  <path d="M60 540 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="${C.cyan}" stroke-width="10" fill="none" stroke-linecap="round"/>`);

add("objects/landmark-japan.png", [600, 600], 900, 900, `
  <circle cx="420" cy="150" r="70" fill="${C.crimson}"/>
  <path d="M60 430 Q300 150 540 430 Z" fill="${C.blue}"/>
  <path d="M232 265 Q300 205 368 265 Q300 250 232 265 Z" fill="${C.white}"/>
  <g fill="${C.navy}">
    <rect x="150" y="330" width="24" height="180" rx="8"/>
    <rect x="426" y="330" width="24" height="180" rx="8"/>
    <rect x="120" y="330" width="360" height="22" rx="10"/>
    <rect x="150" y="372" width="300" height="18" rx="9"/>
  </g>`);

add("objects/landmark-new-zealand.png", [600, 600], 900, 900, `
  <path d="M120 470 L300 140 L480 470 Z" fill="${C.navy}"/>
  <path d="M258 220 L300 140 L342 220 Q300 200 258 220 Z" fill="${C.white}"/>
  <path d="M60 500 h480 v18 h-480 z" fill="${C.blue}"/>
  <path d="M120 540 q30 -12 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="${C.cyan}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <g fill="${C.crimson}">
    <circle cx="430" cy="150" r="8"/><circle cx="490" cy="200" r="8"/>
    <circle cx="470" cy="90" r="8"/><circle cx="520" cy="130" r="8"/>
  </g>`);

add("objects/landmark-australia.png", [600, 600], 900, 900, `
  <rect x="60" y="440" width="480" height="60" rx="12" fill="${C.navy900}"/>
  <path d="M140 440 q10 -60 60 -70 q40 -8 90 20 q30 20 34 50 z" fill="${C.navy}"/>
  <path d="M250 420 q14 -70 70 -84 q46 -12 92 24 q26 22 30 60 z" fill="${C.blue}"/>
  <path d="M360 400 q16 -60 64 -72 q40 -10 78 20 q22 18 26 52 z" fill="${C.cyan}"/>
  <path d="M90 520 q30 -12 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="${C.cyan}" stroke-width="10" fill="none" stroke-linecap="round"/>`);

add("objects/landmark-usa.png", [600, 600], 900, 900, `
  <g fill="${C.navy}">
    <rect x="90" y="300" width="60" height="220" rx="6"/>
    <rect x="160" y="240" width="54" height="280" rx="6"/>
    <rect x="222" y="330" width="60" height="190" rx="6"/>
    <rect x="292" y="200" width="60" height="320" rx="6"/>
    <rect x="360" y="300" width="54" height="220" rx="6"/>
    <rect x="424" y="250" width="60" height="270" rx="6"/>
    <rect x="70" y="510" width="460" height="18" rx="9"/>
  </g>
  <rect x="316" y="150" width="12" height="60" fill="${C.crimson}"/>
  <path d="M322 100 l10 22 l24 2 l-18 16 l6 24 l-22 -14 l-22 14 l6 -24 l-18 -16 l24 -2 z" fill="${C.crimson}"/>`);

add("objects/landmark-europe.png", [600, 600], 900, 900, `
  <g fill="${C.navy}">
    <path d="M80 300 l50 -60 l50 60 v210 h-100 z"/>
    <path d="M190 280 l50 -70 l50 70 v230 h-100 z"/>
    <path d="M300 300 l50 -60 l50 60 v210 h-100 z"/>
    <path d="M410 280 l50 -70 l50 70 v230 h-100 z"/>
    <rect x="60" y="510" width="480" height="18" rx="9"/>
  </g>
  <g fill="${C.crimson}">
    <rect x="112" y="340" width="36" height="36" rx="4"/>
    <rect x="222" y="330" width="36" height="36" rx="4"/>
    <rect x="332" y="340" width="36" height="36" rx="4"/>
    <rect x="442" y="330" width="36" height="36" rx="4"/>
  </g>`);

/* ------------------------------------------------------------------ */
async function main() {
  for (const a of assets) {
    const outPath = join(OUT, a.relPath);
    await mkdir(dirname(outPath), { recursive: true });
    await sharp(Buffer.from(a.svg))
      .resize({ width: a.width, height: a.height, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, palette: false })
      .toFile(outPath);
    console.log("wrote", a.relPath);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
