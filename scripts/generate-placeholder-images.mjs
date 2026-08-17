// Genera arte de producto/categoría abstracto y original en la paleta de TU GANGA.
// No usa fotos de stock ni marcas reales: son composiciones geométricas (blob +
// icono de línea) pensadas como placeholder hasta conectar imágenes reales de Shopify.
// Uso: node scripts/generate-placeholder-images.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = path.join(__dirname, "..", "public", "products");
const CATEGORIES_DIR = path.join(__dirname, "..", "public", "categories");

const COLORS = {
  primary: "#592570",
  deep: "#492169",
  dark: "#3D1B5C",
  purple: "#71297A",
  lavender: "#C6AECA",
  lavenderSoft: "#F1EAF4",
  white: "#FFFFFF",
  offwhite: "#FAF8FB",
  ink: "#17131A",
};

// Pares de degradado que se reparten entre los productos/categorías.
const GRADIENTS = [
  { from: COLORS.lavenderSoft, to: COLORS.lavender, ink: COLORS.dark, dark: false },
  { from: COLORS.primary, to: COLORS.deep, ink: COLORS.white, dark: true },
  { from: COLORS.purple, to: COLORS.dark, ink: COLORS.white, dark: true },
  { from: COLORS.lavender, to: COLORS.purple, ink: COLORS.white, dark: true },
];

// Iconos de línea propios (viewBox local -60..60), un trazo simple por producto/categoría.
const ICONS = {
  "lampara-luna": `<path d="M8,-30 A30,30 0 1 0 8,30 A22,22 0 1 1 8,-30 Z"/><line x1="0" y1="34" x2="0" y2="46"/><line x1="-14" y1="46" x2="14" y2="46"/>`,
  "mini-aspirador": `<rect x="-16" y="-30" width="32" height="44" rx="14"/><line x1="0" y1="14" x2="0" y2="34"/><line x1="-16" y1="34" x2="16" y2="34"/><circle cx="0" cy="-8" r="6"/>`,
  "organizador-modular": `<rect x="-32" y="-32" width="26" height="26" rx="4"/><rect x="6" y="-32" width="26" height="26" rx="4"/><rect x="-32" y="6" width="26" height="26" rx="4"/><rect x="6" y="6" width="26" height="26" rx="4"/>`,
  "altavoz-mini": `<rect x="-18" y="-32" width="36" height="64" rx="18"/><circle cx="0" cy="-4" r="10"/><circle cx="0" cy="-4" r="3"/>`,
  "lampara-portatil": `<line x1="-24" y1="36" x2="24" y2="36"/><line x1="0" y1="36" x2="0" y2="6"/><path d="M-26,6 L26,6 L14,-30 L-14,-30 Z"/>`,
  "soporte-magnetico": `<rect x="-16" y="-32" width="32" height="56" rx="8"/><circle cx="0" cy="34" r="14"/>`,
  "cepillo-facial": `<circle cx="0" cy="-6" r="24"/><line x1="0" y1="18" x2="0" y2="40"/><line x1="-10" y1="34" x2="10" y2="34"/>`,
  "difusor-aura": `<path d="M-14,10 L14,10 L20,38 A20,14 0 0 1 -20,38 Z"/><path d="M-10,10 L-10,-6 L10,-6 L10,10"/><path d="M-4,-26 C-4,-20 4,-20 4,-26"/><path d="M-14,-20 C-14,-14 -6,-14 -6,-20"/><path d="M6,-20 C6,-14 14,-14 14,-20"/>`,
  "mochila-urbana": `<rect x="-22" y="-18" width="44" height="52" rx="16"/><path d="M-12,-18 L-12,-30 A12,12 0 0 1 12,-30 L12,-18"/><rect x="-10" y="-2" width="20" height="16" rx="4"/>`,
  "gadget-cocina": `<path d="M-24,30 L14,-28 A8,8 0 0 1 26,-16 L-16,26 Z"/><line x1="-24" y1="30" x2="-32" y2="38"/>`,
  "accesorio-mascotas": `<circle cx="0" cy="10" r="18"/><circle cx="-20" cy="-12" r="9"/><circle cx="0" cy="-22" r="9"/><circle cx="20" cy="-12" r="9"/>`,
  "proyector-ambiente": `<rect x="-30" y="-14" width="44" height="28" rx="6"/><circle cx="24" cy="0" r="8"/><path d="M32,0 L52,-14 M32,0 L54,0 M32,0 L52,14"/>`,
  hogar: `<path d="M-30,4 L0,-28 L30,4"/><path d="M-20,4 L-20,32 L20,32 L20,4"/><rect x="-6" y="14" width="12" height="18"/>`,
  tecnologia: `<rect x="-22" y="-22" width="44" height="44" rx="8"/><rect x="-8" y="-8" width="16" height="16" rx="2"/><line x1="-30" y1="-10" x2="-22" y2="-10"/><line x1="-30" y1="10" x2="-22" y2="10"/><line x1="22" y1="-10" x2="30" y2="-10"/><line x1="22" y1="10" x2="30" y2="10"/><line x1="-10" y1="-30" x2="-10" y2="-22"/><line x1="10" y1="-30" x2="10" y2="-22"/>`,
  accesorios: `<path d="M-22,-6 L22,-6 L18,32 L-18,32 Z"/><path d="M-10,-6 L-10,-18 A10,10 0 0 1 10,-18 L10,-6"/>`,
  belleza: `<path d="M0,-32 C16,-8 24,6 24,18 A24,24 0 0 1 -24,18 C-24,6 -16,-8 0,-32 Z"/>`,
  mascotas: `<circle cx="0" cy="8" r="18"/><circle cx="-20" cy="-14" r="9"/><circle cx="0" cy="-24" r="9"/><circle cx="20" cy="-14" r="9"/>`,
  ocio: `<circle cx="0" cy="0" r="32"/><path d="M-8,-14 L18,0 L-8,14 Z"/>`,
  gadgets: `<path d="M6,-32 L-22,4 L-2,4 L-6,32 L24,-6 L2,-6 Z"/>`,
};

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1103515245 + 12345) % 2147483648;
    return value / 2147483648;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 2147483647;
  }
  return hash;
}

function blobPath(rand, radius) {
  const points = 6;
  const angleStep = (Math.PI * 2) / points;
  const coords = Array.from({ length: points }, (_, i) => {
    const angle = i * angleStep;
    const r = radius * (0.82 + rand() * 0.3);
    return [Math.cos(angle) * r, Math.sin(angle) * r];
  });

  let d = `M ${coords[0][0]},${coords[0][1]} `;
  for (let i = 0; i < points; i++) {
    const [cx, cy] = coords[i];
    const [nx, ny] = coords[(i + 1) % points];
    const mx = (cx + nx) / 2 + (rand() - 0.5) * radius * 0.35;
    const my = (cy + ny) / 2 + (rand() - 0.5) * radius * 0.35;
    d += `Q ${mx},${my} ${nx},${ny} `;
  }
  return d + "Z";
}

function renderSvg({ id, iconKey, gradient, rotation, size = 480 }) {
  const rand = seededRandom(hashString(id));
  const half = size / 2;
  const gradId = `grad-${id}`;
  const icon = ICONS[iconKey] ?? ICONS.gadgets;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradient.from}" />
      <stop offset="100%" stop-color="${gradient.to}" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="${COLORS.offwhite}" />
  <g transform="translate(${half},${half}) rotate(${rotation})">
    <path d="${blobPath(rand, size * 0.4)}" fill="url(#${gradId})" />
  </g>
  <circle cx="${half + Math.cos(rotation) * size * 0.32}" cy="${half + Math.sin(rotation) * size * 0.32}" r="${size * 0.05}" fill="${gradient.dark ? COLORS.lavenderSoft : COLORS.purple}" opacity="0.55" />
  <g transform="translate(${half},${half})" stroke="${gradient.ink}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.92">
    ${icon}
  </g>
</svg>`;
}

const PRODUCT_ICONS = [
  "lampara-luna",
  "mini-aspirador",
  "organizador-modular",
  "altavoz-mini",
  "lampara-portatil",
  "soporte-magnetico",
  "cepillo-facial",
  "difusor-aura",
  "mochila-urbana",
  "gadget-cocina",
  "accesorio-mascotas",
  "proyector-ambiente",
];

const CATEGORY_ICONS = ["hogar", "tecnologia", "accesorios", "belleza", "mascotas", "ocio", "gadgets"];

mkdirSync(PRODUCTS_DIR, { recursive: true });
mkdirSync(CATEGORIES_DIR, { recursive: true });

PRODUCT_ICONS.forEach((slug, index) => {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const svg1 = renderSvg({ id: `${slug}-1`, iconKey: slug, gradient, rotation: 0 });
  const svg2 = renderSvg({ id: `${slug}-2`, iconKey: slug, gradient, rotation: 22 });
  writeFileSync(path.join(PRODUCTS_DIR, `${slug}-1.svg`), svg1, "utf8");
  writeFileSync(path.join(PRODUCTS_DIR, `${slug}-2.svg`), svg2, "utf8");
});

CATEGORY_ICONS.forEach((slug, index) => {
  const gradient = GRADIENTS[(index + 1) % GRADIENTS.length];
  const svg = renderSvg({ id: `cat-${slug}`, iconKey: slug, gradient, rotation: 8, size: 640 });
  writeFileSync(path.join(CATEGORIES_DIR, `${slug}.svg`), svg, "utf8");
});

console.log(`Generadas ${PRODUCT_ICONS.length * 2} imágenes de producto y ${CATEGORY_ICONS.length} de categoría.`);
