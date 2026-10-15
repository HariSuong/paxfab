import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Printer, Mail } from "lucide-react";

const associations = [
  {
    src: "/images/associations/Associations-1_133253661939593127.png",
    alt: "AISC — American Institute of Steel Construction",
  },
  {
    src: "/images/associations/Associations-3_133253662262820497.png",
    alt: "AWS — American Welding Society",
  },
  {
    src: "/images/associations/Associations-4_133253662440274551.png",
    alt: "City of Los Angeles Department of Building and Safety",
  },
  {
    src: "/images/associations/Associations-6_133253662572886871.png",
    alt: "Industry association certification",
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
    <footer className="border-t border-gray-200 bg-muted">
      {/* Associations Banner */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-600">
            Industry Associations &amp; Certifications
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-10">
            {associations.map((logo) => (
              <li key={logo.src}>
                <div
                  className="flex h-20 w-36 items-center justify-center rounded border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md sm:h-24 sm:w-44"
                  title={logo.alt}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="max-h-14 w-auto object-contain sm:max-h-16"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4-column footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8">
        <div>
          <Link href="/" className="inline-block rounded bg-white p-2 shadow-sm">
            <Image
              src="/logo.jpg"
              alt="Paxfab — PAX, LLC"
              width={461}
              height={148}
              className="h-12 w-auto object-contain sm:h-14"
            />
          </Link>
          <p className="mt-5 text-sm font-normal leading-relaxed text-gray-700">
            PAX, LLC vision is to be the first and best choice manufacturer of
            fabricated structural steel through exceptional quality, on-time
            delivery, and competitive pricing.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-brand">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-normal text-gray-700 transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-brand">
            Our Facilities
          </h3>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-sm font-semibold text-gray-950">Gonzales, LA</p>
              <p className="mt-1 flex items-start gap-2 text-sm font-normal text-gray-700">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                  aria-hidden
                />
                39386 Babin Road, Gonzales, LA 70737
              </p>
              <p className="mt-1 pl-5 text-xs text-gray-600">
                1,500 Tons/Month · 120,000 sq. ft · Rail Spur
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-950">DeRidder, LA</p>
              <p className="mt-1 flex items-start gap-2 text-sm font-normal text-gray-700">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                  aria-hidden
                />
                522 Mayeaux Dr / Bolivar Bishop Dr, DeRidder, LA 70634
              </p>
              <p className="mt-1 pl-5 text-xs text-gray-600">
                1,250 Tons/Month · 70,000 sq. ft · Rail Spur
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-brand">
            Contact Office
          </h3>
          <address className="mt-5 space-y-3 not-italic">
            <p className="flex items-start gap-2 text-sm font-normal text-gray-700">
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
              className="flex items-center gap-2 text-sm font-normal text-gray-700 transition-colors hover:text-brand"
            >
              <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              Phone: (225) 644-6885
            </a>
            <p className="flex items-center gap-2 text-sm font-normal text-gray-700">
              <Printer className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              Fax: (225) 647-5268
            </p>
            <a
              href="mailto:info@paxfab.com"
              className="flex items-center gap-2 text-sm font-normal text-gray-700 transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              info@paxfab.com
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-muted-2">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-gray-600 sm:px-6 lg:px-8">
          <p>© 2026 PAX, LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
