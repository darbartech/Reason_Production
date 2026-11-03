import sharp from "sharp";
import { glob, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "src-photos";
const OUT = "public/images/photos";
const WIDTHS = [640, 1200, 1920];

const build = async (source, base, metaWidth) => {
  for (const w of WIDTHS) {
    if (metaWidth && w > metaWidth) continue;
    const img = sharp(source).rotate().resize({ width: w });
    await img.clone().avif({ quality: 55, effort: 6 }).toFile(`${OUT}/${base}-${w}.avif`);
    await img.clone().webp({ quality: 78 }).toFile(`${OUT}/${base}-${w}.webp`);
  }
  console.log("built", base);
};

await mkdir(OUT, { recursive: true });

try {
  for await (const file of glob(`${SRC}/**/*.{jpg,jpeg,png}`)) {
    const base = path.basename(file).replace(/\.[^.]+$/, "");
    const meta = await sharp(file).metadata();
    await build(file, base, meta.width);
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  console.log(`No ${SRC}/ folder — skipping photo build and keeping committed derivatives.`);
}

console.log("Photo pipeline done.");
