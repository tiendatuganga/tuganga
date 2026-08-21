export const NAV_LINKS = [
  { label: "Nuevos", href: "/productos?filtro=nuevos" },
  { label: "Segunda vuelta", href: "/productos?filtro=segunda-vuelta" },
  { label: "Categorías", href: "/categorias" },
  { label: "Últimas oportunidades", href: "/productos?filtro=ultimas-oportunidades" },
] as const;

export const PRIMARY_NAV = [
  { label: "Explorar", href: "/categorias" },
  { label: "Tendencias", href: "/productos" },
  { label: "Ofertas", href: "/productos?filtro=ultimas-oportunidades" },
  { label: "Destacados", href: "/productos?filtro=destacados" },
] as const;

export const QUICK_PILLS = [
  { label: "Nuevos", href: "/productos?filtro=nuevos", icon: "sparkle", iconClass: "text-emerald-600" },
  { label: "Ofertas", href: "/productos?filtro=ofertas", icon: "bolt", iconClass: "text-red-600" },
  { label: "Segunda vuelta", href: "/productos?filtro=segunda-vuelta", icon: "loop", iconClass: "text-orange-600" },
] as const;
