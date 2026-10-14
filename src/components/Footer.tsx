import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work-history", label: "Work History" },
  { href: "/contact", label: "Contact Us" },
  { href: "/client-portal", label: "Client Portal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold tracking-wide text-white">
            PAXFAB
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-silver/80">
            Structural steel fabricators delivering heavy industrial capacity for
            EPC contractors across North America.
          </p>
          <a
            href="mailto:info@paxfab.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 text-brand" aria-hidden />
            info@paxfab.com
          </a>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Main Office — Gonzales, LA
            </h3>
            <p className="mt-2 flex items-start gap-2 text-sm text-silver/90">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-safety-red" aria-hidden />
              39386 Babin Road, Gonzales, LA 70737
            </p>
            <a
              href="tel:+12256446885"
              className="mt-1 inline-flex items-center gap-2 text-sm text-silver hover:text-white"
            >
              <Phone className="h-4 w-4 text-brand" aria-hidden />
              (225) 644-6885
            </a>
            <p className="mt-1 pl-6 text-xs text-silver/60">
              1,500 Tons/Month · 120,000 sq. ft
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Facility 2 — DeRidder, LA
            </h3>
            <p className="mt-2 flex items-start gap-2 text-sm text-silver/90">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-safety-red" aria-hidden />
              522 Mayeaux Dr / Bolivar Bishop Dr, DeRidder, LA 70634
            </p>
            <a
              href="tel:+13374624950"
              className="mt-1 inline-flex items-center gap-2 text-sm text-silver hover:text-white"
            >
              <Phone className="h-4 w-4 text-brand" aria-hidden />
              (337) 462-4950
            </a>
            <p className="mt-1 pl-6 text-xs text-silver/60">
              1,250 Tons/Month · 70,000 sq. ft
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Quick Links
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-silver/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-silver/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 PAX, LLC (Paxfab). All rights reserved.</p>
          <p>Secure SSL · AISC &amp; AWS Certified Fabrication</p>
        </div>
      </div>
    </footer>
  );
}
