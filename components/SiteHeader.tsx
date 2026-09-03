"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartButton from "@/components/CartButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Plain `overflow: hidden` on body isn't enough on iOS Safari: once the
  // page has been scrolled, a `position: fixed` overlay's hit-testing can
  // desync from where it's painted, so taps land on nothing. Pinning body
  // to the current scroll position (and restoring it on close) is the
  // standard fix.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  function handleNavClick() {
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b pt-[env(safe-area-inset-top)] ${
        scrolled ? "border-iron bg-void" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" aria-label="HustleHome home" className="relative block h-9 w-[66px] shrink-0 sm:h-12 sm:w-[88px]">
          <Image
            src="/images/logo.png"
            alt="HustleHome"
            fill
            priority
            sizes="88px"
            className="object-contain object-left"
          />
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link font-mono text-meta ${
                    active ? "nav-link-active text-lime" : "text-bone"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <CartButton />

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center font-mono text-meta uppercase tracking-wide text-bone transition-colors hover:text-lime md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        onClick={(e) => {
          // Tap on empty space (not a link/button) closes the menu, same as
          // tapping a backdrop would.
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="fixed inset-0 z-[65] flex flex-col bg-void pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] md:hidden"
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
          <span className="relative block h-9 w-[66px]">
            <Image src="/images/logo.png" alt="HustleHome" fill sizes="66px" className="object-contain object-left" />
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center font-mono text-meta uppercase tracking-wide text-bone transition-colors hover:text-lime"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={handleNavClick}
                className={`nav-link font-display text-display-sm ${
                  active ? "nav-link-active text-lime" : "text-bone"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
