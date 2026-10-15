"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lock, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work-history", label: "Work History" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.jpg"
            alt="Paxfab — Structural Steel Fabricators"
            width={461}
            height={148}
            className="h-9 w-auto object-contain sm:h-10"
            preload
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium tracking-wide text-body transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Contact Us
          </Link>
          <Link
            href="/client-portal"
            className="inline-flex items-center gap-2 rounded bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <Lock className="h-4 w-4" aria-hidden />
            Client Portal (FTP Login)
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-body hover:text-brand lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-gray-200 bg-white px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-3 py-2.5 text-sm font-medium text-body hover:bg-muted hover:text-brand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4">
            <Link
              href="/contact"
              className="rounded border border-gray-300 px-4 py-2.5 text-center text-sm font-semibold text-ink hover:border-brand hover:text-brand"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/client-portal"
              className="inline-flex items-center justify-center gap-2 rounded bg-brand px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <Lock className="h-4 w-4" aria-hidden />
              Client Portal (FTP Login)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
