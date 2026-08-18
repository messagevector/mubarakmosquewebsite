"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ANSAR_AUXILIARY_URL, BOOKS_URL, SITE } from "@/lib/site";

const services = [
  { href: "/services", label: "Our Services" },
  { href: "/gym", label: "Gym" },
  { href: "/hall", label: "Hall" },
  { href: BOOKS_URL, label: "Books", external: true },
];

const about = [
  { href: "/about", label: "About the Mosque" },
  { href: ANSAR_AUXILIARY_URL, label: "Ansar Auxiliary", external: true },
];

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.58l3.3-3.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.42Z" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "whitespace-nowrap px-1 py-2 text-[15px] tracking-wide text-white/85 transition hover:text-gold";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-ink/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-ink/80"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-white.png"
            alt={SITE.name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full ring-1 ring-white/40"
          />
          <span className="leading-tight lg:hidden">
            <span className="block font-display text-[20px] text-white">{SITE.shortName}</span>
            <span className="block text-[9.5px] tracking-[0.28em] text-gold uppercase">
              {SITE.motto}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <Link href="/about" className={`${linkClass} inline-flex items-center gap-1`}>
              About <Chevron open={aboutOpen} />
            </Link>
            {aboutOpen && (
              <div className="absolute left-0 top-[calc(100%-0.5rem)] min-w-[180px] rounded-xl border border-white/10 bg-ink/95 py-2 pt-4 shadow-2xl backdrop-blur">
                {about.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-2 text-sm text-white/85 hover:text-gold"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-white/85 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link href="/services" className={`${linkClass} inline-flex items-center gap-1`}>
              Services <Chevron open={servicesOpen} />
            </Link>
            {servicesOpen && (
              <div className="absolute left-0 top-[calc(100%-0.5rem)] min-w-[180px] rounded-xl border border-white/10 bg-ink/95 py-2 pt-4 shadow-2xl backdrop-blur">
                {services.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-2 text-sm text-white/85 hover:text-gold"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-white/85 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
          <a
            href={SITE.phoneHref}
            className="rounded border border-white/70 px-6 py-3 font-sans text-[15px] text-white transition-all hover:border-gold hover:bg-gold hover:text-olive"
          >
            {SITE.phone}
          </a>
        </div>

        <button
          type="button"
          className="p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeWidth="1.8" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeWidth="1.8" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1 font-sans text-white">
            <Link href="/" className="py-2.5 hover:text-gold">
              Home
            </Link>
            <Link href="/about" className="py-2.5 hover:text-gold">
              About
            </Link>
            {about
              .filter((i) => i.external)
              .map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 pl-4 text-sm text-white/80 hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
            <Link href="/services" className="py-2.5 hover:text-gold">
              Services
            </Link>
            {services.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 pl-4 text-sm text-white/80 hover:text-gold"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="py-2 pl-4 text-sm text-white/80 hover:text-gold">
                  {item.label}
                </Link>
              ),
            )}
            <Link href="/contact" className="py-2.5 hover:text-gold">
              Contact
            </Link>
            <a
              href={SITE.phoneHref}
              className="mt-3 inline-flex items-center gap-2 rounded bg-gold px-5 py-3 font-medium text-olive"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
