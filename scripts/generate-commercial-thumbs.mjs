/**
 * Regenerates optimized WebP thumbnails for commercial assets.
 *
 * Usage: npm run thumbs:commercial
 * Requires ImageMagick (`magick`) on PATH.
 *
 * Output: public/commercial/thumbs/** mirrored from originals
 * Max edge: 900px, quality 78, EXIF stripped, auto-oriented
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../public/commercial");
const THUMBS = path.join(ROOT, "thumbs");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const SKIP_DIR_NAMES = new Set(["thumbs"]);

async function walk(dir: string, relative = ""): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (SKIP_DIR_NAMES.has(entry.name)) continue;

    // Skip accidental nested duplicate folder
    if (
      relative === "Photography Commercial" &&
      entry.name === "Photography Commercial"
    ) {
      continue;
    }

    const abs = path.join(dir, entry.name);
    const rel = relative ? path.join(relative, entry.name) : entry.name;

    if (entry.isDirectory()) {
      files.push(...(await walk(abs, rel)));
    } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(rel);
    }
  }

  return files;
}

function runMagick(input: string, output: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "magick",
      [input, "-auto-orient", "-resize", "900x900>", "-strip", "-quality", "78", output],
      { stdio: "inherit", shell: true }
    );
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`magick failed (${code}) for ${input}`));
    });
  });
}

async function main() {
  const files = await walk(ROOT);
  let ok = 0;

  for (const rel of files) {
    const input = path.join(ROOT, rel);
    const outRel = rel.replace(/\.[^.]+$/, ".webp");
    const output = path.join(THUMBS, outRel);
    await mkdir(path.dirname(output), { recursive: true });
    await runMagick(input, output);
    const size = (await stat(output)).size;
    console.log(`✓ ${outRel} (${Math.round(size / 1024)} KB)`);
    ok++;
  }

  console.log(`\nGenerated ${ok} thumbnails in public/commercial/thumbs/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
