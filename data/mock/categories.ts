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
    id: "cat-tecnologia",
    title: "Tecnología",
    slug: "tecnologia",
    description: "Gadgets útiles para el día a día.",
    image: unsplash("photo-1504610926078-a1611febcad3"),
  },
  {
    id: "cat-accesorios",
    title: "Accesorios",
    slug: "accesorios",
    description: "Detalles que marcan la diferencia.",
    image: unsplash("photo-1511556820780-d912e42b4980"),
  },
  {
    id: "cat-belleza",
    title: "Belleza",
    slug: "belleza",
    description: "Cuidado personal sin complicaciones.",
    image: unsplash("photo-1596462502278-27bfdc403348"),
  },
  {
    id: "cat-mascotas",
    title: "Mascotas",
    slug: "mascotas",
    description: "Todo para tu compañero favorito.",
    image: unsplash("photo-1598134493136-7b63ebbd7b64"),
  },
  {
    id: "cat-ocio",
    title: "Ocio",
    slug: "ocio",
    description: "Momentos para desconectar.",
    image: unsplash("photo-1782290547044-acb38dfe735a"),
  },
  {
    id: "cat-gadgets",
    title: "Gadgets",
    slug: "gadgets",
    description: "Curiosidades que resuelven la vida.",
    image: unsplash("photo-1634990677553-4a2a6b2dcaac"),
  },
];
