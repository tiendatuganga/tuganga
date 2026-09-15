export const NAV_LINKS = [
  { label: "Nuevo", href: "/productos?filtro=nuevo" },
  { label: "Como nuevo", href: "/productos?filtro=como-nuevo" },
  { label: "Reacondicionado", href: "/productos?filtro=reacondicionado" },
  { label: "Categorías", href: "/categorias" },
  { label: "Últimas oportunidades", href: "/productos?filtro=ultimas-oportunidades" },
] as const;

export const PRIMARY_NAV = [
  { label: "Explorar", href: "/categorias" },
  { label: "Tendencias", href: "/productos" },
  { label: "Ofertas", href: "/productos?filtro=ofertas" },
  { label: "Destacados", href: "/productos?filtro=destacados" },
] as const;

export const QUICK_PILLS = [
  { label: "Nuevo", href: "/productos?filtro=nuevo", icon: "sparkle", iconClass: "text-emerald-600" },
  { label: "Como nuevo", href: "/productos?filtro=como-nuevo", icon: "sparkle", iconClass: "text-tg-primary" },
  { label: "Reacondicionado", href: "/productos?filtro=reacondicionado", icon: "loop", iconClass: "text-orange-600" },
] as const;
