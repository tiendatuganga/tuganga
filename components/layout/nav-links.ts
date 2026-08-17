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
  { label: "Destacados", href: "/productos?filtro=destacados", icon: "star", iconClass: "text-amber-500" },
  { label: "Ofertas", href: "/productos?filtro=ultimas-oportunidades", icon: "bolt", iconClass: "text-tg-primary" },
  { label: "Segunda vuelta", href: "/productos?filtro=segunda-vuelta", icon: "loop", iconClass: "text-orange-500" },
  { label: "Nuevos", href: "/productos?filtro=nuevos", icon: "sparkle", iconClass: "text-emerald-500" },
] as const;