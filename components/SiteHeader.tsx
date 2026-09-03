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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b ${
        scrolled ? "border-iron bg-void" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" aria-label="HustleHome home" className="relative block h-10 w-[73px] shrink-0 sm:h-12 sm:w-[88px]">
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
            className="font-mono text-meta uppercase tracking-wide text-bone transition-colors hover:text-lime md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col bg-void md:hidden"
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
          <span className="relative block h-10 w-[73px]">
            <Image src="/images/logo.png" alt="HustleHome" fill sizes="73px" className="object-contain object-left" />
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-meta uppercase tracking-wide text-bone transition-colors hover:text-lime"
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
