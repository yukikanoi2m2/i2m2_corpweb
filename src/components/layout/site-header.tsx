"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/company", label: "COMPANY" },
  { href: "/careers", label: "CAREERS" },
  { href: "/contact", label: "CONTACT" },
];

export const SiteHeader = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled || menuOpen
            ? "rgba(3, 3, 5, 0.92)"
            : "rgba(3, 3, 5, 0)",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "blur(0px)",
          borderBottomColor: scrolled || menuOpen
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(255, 255, 255, 0)",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          transition: "background-color 0.3s, backdrop-filter 0.3s, border-bottom-color 0.3s",
        }}
        className="pointer-events-auto fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-3.5 sm:px-10 sm:py-4"
      >
        <Link
          href="/"
          className="relative block h-8 w-24 shrink-0 sm:h-9 sm:w-28"
        >
          <Image
            src="/logo-i2m2.png"
            alt="i2m2"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-xs font-medium tracking-[0.15em] ${
                pathname === item.href
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-[101] flex size-10 items-center justify-center rounded-lg sm:hidden touch-manipulation"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-[1.5px] w-full bg-foreground transition-transform duration-200 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-foreground transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-foreground transition-transform duration-200 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <nav
          style={{
            animation: "mRevealMenu 0.25s ease-out forwards",
          }}
          className="pointer-events-auto fixed inset-x-0 top-[56px] z-[99] border-b border-foreground/5 bg-background/95 px-6 pb-6 pt-4 backdrop-blur-xl sm:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3.5 text-sm font-medium tracking-[0.1em] touch-manipulation ${
                  pathname === item.href
                    ? "bg-foreground/8 text-foreground"
                    : "text-foreground/70 active:bg-foreground/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Backdrop to close menu on tap outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[98] sm:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
