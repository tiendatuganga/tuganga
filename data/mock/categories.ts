import type { Category } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

export const mockCategories: Category[] = [
  {
    id: "cat-hogar",
    title: "Hogar",
    slug: "hogar",
    description: "Pequeños cambios que transforman tu casa.",
    image: unsplash("photo-1726091097680-5da84f593ccd"),
  },
  {
    id: "cat-electronica",
    title: "Electrónica",
    slug: "electronica",
    description: "Electrónica útil para el día a día.",
    image: unsplash("photo-1504610926078-a1611febcad3"),
  },
  {
    id: "cat-salud",
    title: "Salud y Cuidado Personal",
    slug: "salud",
    description: "Bienestar, recuperación y cuidado personal revisado.",
    image: "/categories/salud.svg",
  },
  {
    id: "cat-belleza",
    title: "Belleza",
    slug: "belleza",
    description: "Cuidado personal sin complicaciones.",
    image: unsplash("photo-1596462502278-27bfdc403348"),
  },
  {
    id: "cat-accesorios",
    title: "Accesorios",
    slug: "accesorios",
    description: "Detalles que marcan la diferencia.",
    image: unsplash("photo-1511556820780-d912e42b4980"),
  },
  {
    id: "cat-herramientas",
    title: "Herramientas",
    slug: "herramientas",
    description: "Soluciones prácticas para reparar, montar y crear.",
    image: unsplash("photo-1782290547044-acb38dfe735a"),
  },
];
