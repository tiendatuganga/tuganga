import type { Product } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

function images(id1: string, id2: string, alt: string) {
  return [
    { url: unsplash(id1), alt },
    { url: unsplash(id2), alt },
  ];
}

const products: Array<Omit<Product, "whatsappEnabled">> = [
  {
    id: "p-lampara-luna",
    title: "Lámpara Luna LED",
    slug: "lampara-luna-led",
    description:
      "Lámpara ambiental en forma de luna con luz cálida regulable. Se carga por USB y aguanta hasta 12 horas de autonomía. Perfecta para la mesilla o el escritorio.",
    price: 24.99,
    compareAtPrice: 34.99,
    images: images(
      "photo-1632712535563-c30adb9a9e2e",
      "photo-1653638600619-6147335bd960",
      "Lámpara Luna LED"
    ),
    category: "hogar",
    status: ["NEW", "FEATURED"],
    tags: ["iluminación", "dormitorio", "regalo"],
    inventory: 1,
    externalChannel: "WALLAPOP",
    externalUrl: "https://www.wallapop.com/item/lampara-luna-led",
    delivery: "Envío disponible",
    featured: true,
    secondLife: false,
    createdAt: "2026-08-10",
  },
  {
    id: "p-mini-aspirador",
    title: "Mini Aspirador Compacto",
    slug: "mini-aspirador-compacto",
    description:
      "Aspirador de mano ligero para migas, pelo de mascota y polvo de escritorio. Unidad reacondicionada y revisada, con embalaje simplificado.",
    price: 19.99,
    compareAtPrice: 29.99,
    images: images(
      "photo-1746645297698-306ef29852ca",
      "photo-1569698134101-f15cde5cd66c",
      "Mini aspirador compacto"
    ),
    category: "hogar",
    status: ["SECOND_LIFE"],
    tags: ["limpieza", "reacondicionado"],
    inventory: 1,
    externalChannel: "VINTED",
    externalUrl: "https://www.vinted.es/items/mini-aspirador-compacto",
    delivery: "Envío disponible",
    featured: false,
    secondLife: true,
    createdAt: "2026-07-22",
  },
  {
    id: "p-organizador-modular",
    title: "Organizador Modular",
    slug: "organizador-modular",
    description:
      "Sistema de cajones apilables para armarios y cajones de cocina. Piezas modulares que se adaptan al espacio que tengas disponible.",
    price: 16.5,
    images: images(
      "photo-1783099780097-80df72615969",
      "photo-1786396798357-ac8ba6704d89",
      "Organizador modular apilable"
    ),
    category: "hogar",
    status: ["NEW"],
    tags: ["orden", "cocina", "armario"],
    inventory: 1,
    featured: false,
    secondLife: false,
    createdAt: "2026-08-12",
  },
  {
    id: "p-altavoz-mini",
    title: "Altavoz Mini Bluetooth",
    slug: "altavoz-mini-bluetooth",
    description:
      "Altavoz portátil con sonido envolvente y resistencia al agua IPX5. Hasta 8 horas de reproducción con una sola carga.",
    price: 22.9,
    compareAtPrice: 32.9,
    images: images(
      "photo-1608043152269-423dbba4e7e1",
      "photo-1518671678551-911467efe539",
      "Altavoz mini bluetooth"
    ),
    category: "tecnologia",
    status: ["LIMITED", "SALE"],
    tags: ["audio", "portátil", "resistente al agua"],
    inventory: 1,
    externalChannel: "WALLAPOP",
    externalUrl: "https://www.wallapop.com/item/altavoz-mini-bluetooth",
    delivery: "Envío disponible",
    featured: false,
    secondLife: false,
    createdAt: "2026-06-15",
  },
  {
    id: "p-lampara-portatil",
    title: "Lámpara Portátil",
    slug: "lampara-portatil",
    description:
      "Lámpara plegable de lectura con tres niveles de intensidad. Cabe en cualquier bolso y se recarga en menos de una hora.",
    price: 14.99,
    compareAtPrice: 19.99,
    images: images(
      "photo-1782292932625-faa11ba0d5f9",
      "photo-1579326882518-21eaa7893b02",
      "Lámpara portátil plegable"
    ),
    category: "hogar",
    status: ["SALE"],
    tags: ["iluminación", "viaje", "lectura"],
    inventory: 0,
    availability: "SOLD",
    externalChannel: "VINTED",
    externalUrl: "https://www.vinted.es/items/lampara-portatil",
    featured: false,
    secondLife: false,
    createdAt: "2026-05-30",
  },
  {
    id: "p-soporte-magnetico",
    title: "Soporte Magnético",
    slug: "soporte-magnetico",
    description:
      "Soporte magnético ajustable para el móvil, compatible con carga inalámbrica. Ideal para el coche o el escritorio.",
    price: 12.5,
    images: images(
      "photo-1536825591064-574efec257f2",
      "photo-1745210357088-5f3d9de04b3c",
      "Soporte magnético para móvil"
    ),
    category: "tecnologia",
    status: ["NEW"],
    tags: ["móvil", "coche", "escritorio"],
    inventory: 1,
    featured: false,
    secondLife: false,
    createdAt: "2026-08-14",
  },
  {
    id: "p-cepillo-facial",
    title: "Cepillo Facial",
    slug: "cepillo-facial",
    description:
      "Cepillo de limpieza facial con cerdas de silicona suave y modo masaje. Resistente al agua para usar en la ducha.",
    price: 18.9,
    images: images(
      "photo-1574193536364-13c21a87bac6",
      "photo-1761718209835-c8586b7dcac0",
      "Cepillo facial de silicona"
    ),
    category: "belleza",
    status: ["FEATURED"],
    tags: ["cuidado facial", "silicona"],
    inventory: 1,
    externalChannel: "WALLAPOP",
    externalUrl: "https://www.wallapop.com/item/cepillo-facial-silicona",
    delivery: "Envío disponible",
    featured: true,
    secondLife: false,
    createdAt: "2026-07-01",
  },
  {
    id: "p-difusor-aura",
    title: "Difusor Aura",
    slug: "difusor-aura",
    description:
      "Difusor de aromas ultrasónico con luz ambiental de siete colores. Unidad de exposición con embalaje abierto, funcionamiento probado.",
    price: 21.0,
    compareAtPrice: 27.99,
    images: images(
      "photo-1672925216623-f32a54d732e0",
      "photo-1605671507162-43e526ef6f97",
      "Difusor de aromas Aura"
    ),
    category: "hogar",
    status: ["SECOND_LIFE"],
    tags: ["bienestar", "aromaterapia", "reacondicionado"],
    inventory: 1,
    availability: "RESERVED",
    externalChannel: "VINTED",
    externalUrl: "https://www.vinted.es/items/difusor-aura",
    delivery: "Envío disponible",
    featured: false,
    secondLife: true,
    createdAt: "2026-06-28",
  },
  {
    id: "p-mochila-urbana",
    title: "Mochila Urbana",
    slug: "mochila-urbana",
    description:
      "Mochila resistente al agua con compartimento acolchado para portátil de hasta 15”. Espalda transpirable y bolsillo antirrobo.",
    price: 29.99,
    images: images(
      "photo-1553062407-98eeb64c6a62",
      "photo-1622560481156-01fc7e1693e6",
      "Mochila urbana"
    ),
    category: "accesorios",
    status: ["NEW", "FEATURED"],
    tags: ["mochila", "portátil", "viaje"],
    inventory: 1,
    externalChannel: "WALLAPOP",
    externalUrl: "https://www.wallapop.com/item/mochila-urbana",
    delivery: "Envío disponible",
    featured: true,
    secondLife: false,
    createdAt: "2026-08-05",
  },
  {
    id: "p-gadget-cocina",
    title: "Gadget de Cocina",
    slug: "gadget-de-cocina",
    description:
      "Cortador multifunción con seis cuchillas intercambiables para verdura, fruta y queso. Incluye base antideslizante.",
    price: 9.99,
    compareAtPrice: 14.99,
    images: images(
      "photo-1586797164983-65e0c6bd8b90",
      "photo-1759987384448-16ac3dbc27b1",
      "Gadget de cocina multifunción"
    ),
    category: "gadgets",
    status: ["LIMITED"],
    tags: ["cocina", "multifunción"],
    inventory: 1,
    featured: false,
    secondLife: false,
    createdAt: "2026-07-18",
  },
  {
    id: "p-accesorio-mascotas",
    title: "Accesorio para Mascotas",
    slug: "accesorio-para-mascotas",
    description:
      "Comedero elevado antideslizante con dos cuencos de acero inoxidable. Ayuda a una postura más cómoda al comer.",
    price: 17.9,
    images: images(
      "photo-1591946559594-8c6d3b7391eb",
      "photo-1679224106783-c21b1841412a",
      "Comedero elevado para mascotas"
    ),
    category: "mascotas",
    status: ["NEW"],
    tags: ["mascotas", "comedero"],
    inventory: 1,
    featured: false,
    secondLife: false,
    createdAt: "2026-08-08",
  },
  {
    id: "p-proyector-ambiente",
    title: "Proyector Ambiente",
    slug: "proyector-ambiente",
    description:
      "Mini proyector de estrellas y nebulosas con control por app. Crea una atmósfera envolvente en cualquier habitación.",
    price: 27.99,
    compareAtPrice: 39.99,
    images: images(
      "photo-1755414718613-3d45827fb9eb",
      "photo-1776436602106-f1b8cc6f6ccb",
      "Proyector ambiente de estrellas"
    ),
    category: "ocio",
    status: ["FEATURED", "SALE"],
    tags: ["ambiente", "decoración", "regalo"],
    inventory: 1,
    externalChannel: "VINTED",
    externalUrl: "https://www.vinted.es/items/proyector-ambiente",
    delivery: "Envío disponible",
    featured: true,
    secondLife: false,
    createdAt: "2026-06-02",
  },
];

export const mockProducts: Product[] = products.map((product) => ({
  ...product,
  externalChannel: product.externalChannel ?? "WHATSAPP",
  whatsappEnabled: true,
  condition: product.secondLife ? "Segunda vuelta · producto revisado" : "Nuevo",
  reviewed: product.secondLife,
  location: "Berja, Almería",
}));
