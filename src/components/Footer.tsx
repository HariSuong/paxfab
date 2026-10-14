import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Printer, Mail } from "lucide-react";

const associations = [
  {
    abbr: "AISC",
    name: "American Institute of Steel Construction",
    tagline: "Smarter. Stronger. Steel.",
  },
  {
    abbr: "AMPP",
    name: "Association for Materials Protection and Performance",
    tagline: "Materials Protection & Performance",
  },
  {
    abbr: "AWS",
    name: "American Welding Society",
    tagline: "American Welding Society",
  },
  {
    abbr: "LADBS",
    name: "City of Los Angeles Department of Building and Safety",
    tagline: "Certified Fabricator",
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Capabilities / Services" },
  { href: "/work-history", label: "Work History" },
  { href: "/client-portal", label: "Client Portal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      {/* Associations Banner */}
      <div className="border-b border-white/10 bg-charcoal-deep">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-silver/50">
            Industry Associations &amp; Certifications
          </p>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {associations.map((item) => (
              <li key={item.abbr}>
                <div
                  className="group flex h-full flex-col items-center justify-center border border-silver/20 bg-gradient-to-b from-surface to-charcoal-deep px-4 py-5 text-center transition-all duration-300 hover:border-brand hover:from-brand/15 hover:to-charcoal-deep hover:shadow-[0_0_24px_rgba(101,53,177,0.25)]"
                  title={item.name}
                >
                  <span className="font-display text-2xl font-bold tracking-wide text-silver/70 transition-colors duration-300 group-hover:text-brand sm:text-3xl">
                    {item.abbr}
                  </span>
                  <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-silver/40 transition-colors duration-300 group-hover:text-silver/80">
                    {item.tagline}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4-column footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {/* Column 1 — Vision & Brand */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo.jpg"
              alt="Paxfab — PAX, LLC"
              width={461}
              height={148}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-silver/80">
            PAX, LLC vision is to be the first and best choice manufacturer of
            fabricated structural steel through exceptional quality, on-time
            delivery, and competitive pricing.
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-brand">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-silver/80 transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Our Facilities */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-brand">
            Our Facilities
          </h3>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-semibold text-white">Gonzales, LA</p>
              <p className="mt-1 flex items-start gap-2 text-sm text-silver/75">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-safety-red"
                  aria-hidden
                />
                39386 Babin Road, Gonzales, LA 70737
              </p>
              <p className="mt-1 pl-5 text-xs text-silver/50">
                1,500 Tons/Month · 120,000 sq. ft · Rail Spur
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">DeRidder, LA</p>
              <p className="mt-1 flex items-start gap-2 text-sm text-silver/75">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-safety-red"
                  aria-hidden
                />
                522 Mayeaux Dr / Bolivar Bishop Dr, DeRidder, LA 70634
              </p>
              <p className="mt-1 pl-5 text-xs text-silver/50">
                1,250 Tons/Month · 70,000 sq. ft · Rail Spur
              </p>
            </div>
          </div>
        </div>

        {/* Column 4 — Contact Office */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-brand">
            Contact Office
          </h3>
          <address className="mt-5 space-y-3 not-italic">
            <p className="flex items-start gap-2 text-sm text-silver/80">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                aria-hidden
              />
              39386 Babin Road
              <br />
              Gonzales, LA 70737
            </p>
            <a
              href="tel:+12256446885"
              className="flex items-center gap-2 text-sm text-silver/80 transition-colors hover:text-brand"
            >
              <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              Phone: (225) 644-6885
            </a>
            <p className="flex items-center gap-2 text-sm text-silver/80">
              <Printer className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              Fax: (225) 647-5268
            </p>
            <a
              href="mailto:info@paxfab.com"
              className="flex items-center gap-2 text-sm text-silver/80 transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              info@paxfab.com
            </a>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 bg-charcoal-deep">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-silver/50 sm:px-6 lg:px-8">
          <p>© 2026 PAX, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
