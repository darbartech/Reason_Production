import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const OUT = "public/og";
const DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://reasons.edu.np").replace(/^https?:\/\//, "");
const FONTS = path.resolve("scripts/fonts");
const CACHE = path.join(os.tmpdir(), "reasons-fontconfig");

await mkdir(OUT, { recursive: true });
await mkdir(CACHE, { recursive: true });

const conf = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONTS}</dir>
  <dir>C:/Windows/Fonts</dir>
  <cachedir>${CACHE}</cachedir>
</fontconfig>`;
const confPath = path.join(CACHE, "fonts.conf");
await writeFile(confPath, conf);
process.env.FONTCONFIG_FILE = confPath;

const { default: sharp } = await import("sharp");

const PAPER = "#F6F3EE";
const NAVY = "#071A33";
const CRIMSON = "#B8324A";

const esc = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const entries = [
  { slug: "home", photo: "hero-counselling", lines: ["Study abroad,", "planned one step", "at a time."], size: 64 },
  { slug: "study-abroad", photo: "study-abroad", lines: ["Study abroad from Nepal:", "one clear process."], size: 54 },
  { slug: "ielts", photo: "blog-ielts", lines: ["IELTS & PTE classes", "in New Baneshwor."], size: 64 },
  { slug: "services", photo: "services-documents", lines: ["Counselling, documents", "and visa support."], size: 60 },
  { slug: "b2b", photo: "b2b-meeting", lines: ["Partner with", "Reasons Education."], size: 64 },
  { slug: "countries", photo: "dest-canada", lines: ["Seven study destinations,", "compared honestly."], size: 54 },
  { slug: "usa", photo: "dest-usa", lines: ["Study in the USA", "from Nepal."], size: 66 },
  { slug: "canada", photo: "dest-canada", lines: ["Study in Canada", "from Nepal."], size: 66 },
  { slug: "uk", photo: "dest-uk", lines: ["Study in the UK", "from Nepal."], size: 66 },
  { slug: "australia", photo: "dest-australia", lines: ["Study in Australia", "from Nepal."], size: 62 },
  { slug: "new-zealand", photo: "dest-new-zealand", lines: ["Study in New Zealand", "from Nepal."], size: 58 },
  { slug: "europe", photo: "dest-europe", lines: ["Study in Europe", "from Nepal."], size: 66 },
  { slug: "japan", photo: "dest-japan", lines: ["Study in Japan", "from Nepal."], size: 66 },
];

for (const entry of entries) {
  const lineHeight = Math.round(entry.size * 1.14);
  const first = 326 - ((entry.lines.length - 1) * lineHeight) / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="684" y="0" width="6" height="630" fill="${CRIMSON}" fill-opacity=".9"/>
  <rect x="72" y="72" width="56" height="6" fill="${CRIMSON}"/>
  <text x="72" y="146" font-family="Hanken Grotesk" font-size="22" font-weight="600" letter-spacing="3" fill="${PAPER}" fill-opacity=".7">REASONS EDUCATION · KATHMANDU</text>
  <g font-family="Newsreader Display" font-weight="400" fill="${PAPER}">
    ${entry.lines
      .map(
        (line, i) =>
          `<text x="72" y="${Math.round(first + i * lineHeight)}" font-size="${entry.size}">${esc(line)}</text>`
      )
      .join("\n    ")}
  </g>
  <text x="72" y="562" font-family="Hanken Grotesk" font-size="24" fill="${PAPER}" fill-opacity=".6">${DOMAIN}</text>
</svg>`;

  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  let image = sharp(base);
  try {
    const photo = await sharp(`public/images/photos/${entry.photo}-1200.webp`)
      .resize(504, 630, { fit: "cover" })
      .toBuffer();
    image = image.composite([{ input: photo, left: 696, top: 0 }]);
  } catch {
    console.warn("missing photo for og", entry.slug);
  }

  await image.png({ compressionLevel: 9 }).toFile(`${OUT}/${entry.slug}.png`);
  console.log("og", entry.slug);
}

console.log("OG images done.");
