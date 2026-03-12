import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgstore from 'svgstore';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const rawIconsDir = path.join(packageRoot, 'src/assets/icons/raw');
const outputDir = path.join(packageRoot, 'src/assets/icons');
const spriteFile = path.join(outputDir, 'sprite.svg');

const toSymbolId = (fileName) =>
  `icon-${path
    .basename(fileName, '.svg')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

const build = async () => {
  await mkdir(outputDir, { recursive: true });

  const entries = await readdir(rawIconsDir, { withFileTypes: true });
  const svgFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => entry.name)
    .sort();

  if (svgFiles.length === 0) {
    throw new Error(`No SVG icons found in ${rawIconsDir}`);
  }

  const sprites = svgstore();

  for (const fileName of svgFiles) {
    const iconPath = path.join(rawIconsDir, fileName);
    const sourceSvg = await readFile(iconPath, 'utf8');
    sprites.add(toSymbolId(fileName), sourceSvg);
  }

  let spriteMarkup = sprites.toString({ inline: true });

  if (!spriteMarkup.includes('xmlns="http://www.w3.org/2000/svg"')) {
    spriteMarkup = spriteMarkup.replace(
      '<svg',
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1" height="1"',
    );
  }

  await writeFile(spriteFile, spriteMarkup, 'utf8');
  console.log(`Built icon sprite: ${spriteFile}`);
};

build().catch((error) => {
  console.error(error);
  globalThis.process.exit(1);
});
