"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import {
  HeartIcon,
  MenuIcon,
  SearchIcon,
  TugangaWordmark,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const iconButton =
  "relative rounded-full p-2.5 text-tg-ink/70 transition-colors hover:bg-tg-lavender-soft hover:text-tg-primary";

export function Header() {
  const { favoriteCount, openDrawer: openFavorites } = useFavorites();
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
          "sticky top-0 z-40 bg-white transition-shadow duration-200",
          isScrolled
            ? "border-b border-tg-border shadow-soft"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-5 sm:px-8 md:h-20">
          <Link href="/" aria-label="TU GANGA — Inicio" className="shrink-0">
            <TugangaWordmark className="h-5 w-auto text-tg-primary sm:h-6 md:h-8" />
          </Link>

          <div className="hidden min-w-0 flex-1 md:block">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar productos, marcas o categorías"
              className="group flex w-full items-center gap-3 rounded-full border border-tg-border bg-tg-offwhite py-2.5 pl-5 pr-4 text-left shadow-soft transition-[border-color,background-color,box-shadow] duration-200 hover:border-tg-lavender hover:bg-white hover:shadow-card focus-visible:outline-2 motion-reduce:transition-none"
            >
              <SearchIcon className="h-4 w-4 shrink-0 text-tg-primary/60 transition-colors group-hover:text-tg-primary" />
              <span className="truncate text-sm text-tg-ink/45">Buscar productos, marcas o categorías...</span>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-0.5 md:ml-0 md:gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className={cn(iconButton, "md:hidden")}
            >
              <SearchIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={openFavorites}
              aria-label="Favoritos"
              className={cn(iconButton, "relative hidden sm:inline-flex")}
            >
              <HeartIcon className="h-6 w-6" />
              {favoriteCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-tg-primary px-1 text-[11px] font-semibold text-white ring-2 ring-white">
                  {favoriteCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className={cn(iconButton, "lg:hidden")}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
