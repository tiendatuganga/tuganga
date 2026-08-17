"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CartIcon, MenuIcon, MonogramTG, SearchIcon, UserIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Header() {
  const { cart, openDrawer } = useCart();
  const [isScrolled, setScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-colors duration-200",
          isScrolled ? "border-tg-lavender-soft" : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-tg-ink">
            <MonogramTG className="h-6 w-6 text-tg-primary" />
            <span className="font-display text-lg font-bold tracking-tight">TU GANGA</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-tg-ink/75 transition-colors hover:text-tg-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="rounded-full p-2.5 text-tg-ink/70 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Cuenta"
              title="Próximamente"
              className="hidden rounded-full p-2.5 text-tg-ink/70 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary lg:inline-flex"
            >
              <UserIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openDrawer}
              aria-label="Abrir carrito"
              className="relative rounded-full p-2.5 text-tg-ink/70 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary"
            >
              <CartIcon className="h-5 w-5" />
              {cart.totalQuantity > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-tg-primary px-1 text-[10px] font-semibold text-white">
                  {cart.totalQuantity}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="rounded-full p-2.5 text-tg-ink/70 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
