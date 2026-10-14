import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  ExternalLink,
  Factory,
  Flame,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Since 1979, Paxfab has fabricated structural steel for North American infrastructure from Gonzales and DeRidder, Louisiana — with Peddinghaus CNC capacity and AISC quality standards.",
};

const timeline = [
  {
    year: "1979",
    title: "Founded in Gonzales",
    body: "Dan and David Phillips establish PAX, LLC with a clear operating philosophy: move skilled crews to the work — not the material around the shop — to protect schedule, quality, and safety.",
  },
  {
    year: "1995",
    title: "DeRidder Expansion",
    body: "A second fabrication plant opens in DeRidder, LA, effectively doubling production capacity and extending rail-served heavy fabrication across the Gulf Coast.",
  },
  {
    year: "Today",
    title: "2,750 Tons / Month",
    body: "Two Louisiana facilities, full Peddinghaus CNC structural lines, and an experienced management team supporting EPC contractors across the United States and Canada.",
  },
];

const facilities = [
  {
    id: "gonzales",
    label: "Facility 1",
    title: "Main Office & Plant",
    city: "Gonzales, LA",
    address: "39386 Babin Road, Gonzales, LA 70737",
    description:
      "Corporate headquarters housing executive leadership, engineering, purchasing, and project management alongside a high-capacity structural fabrication plant.",
    capacity: "1,500 Tons/Month · 120,000 sq. ft · On-site rail spur",
    phone: "(225) 644-6885",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=39386+Babin+Road,+Gonzales,+LA+70737",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80",
    alt: "Structural steel beams staged at an industrial fabrication yard",
  },
  {
    id: "deridder",
    label: "Facility 2",
    title: "Fabrication Plant",
    city: "DeRidder, LA",
    address: "522 Bolivar Bishop Dr., DeRidder, LA 70634",
    description:
      "Dedicated heavy fabrication plant supporting overflow and parallel production for large-tonnage industrial, energy, and petrochemical programs.",
    capacity: "1,250 Tons/Month · 70,000 sq. ft · On-site rail spur",
    phone: "(337) 462-4950",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=522+Bolivar+Bishop+Dr,+DeRidder,+LA+70634",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
    alt: "Heavy industrial steel fabrication workshop interior",
  },
];

const equipment = [
  {
    qty: "2",
    name: "Plasma Drill Plate Machines",
    detail: "High-speed plate drilling and plasma processing for precision plate work.",
    icon: Flame,
  },
  {
    qty: "2",
    name: "Peddinghaus AFPS 623 Anglemaster",
    detail: "Automated angle and plate processing for consistent structural profiles.",
    icon: Wrench,
  },
  {
    qty: "4",
    name: "Peddinghaus CNC Drill Lines",
    detail: "CNC drilling lines delivering repeatable hole patterns at production scale.",
    icon: Factory,
  },
  {
    qty: "4",
    name: "Peddinghaus Structural Saws",
    detail: "Structural saw systems for accurate cut lengths across beam and column stock.",
    icon: Wrench,
  },
  {
    qty: "2",
    name: "Peddinghaus ABCM 125 Copers",
    detail: "Beam coping systems for complex fit-up geometry and shop efficiency.",
    icon: Factory,
  },
  {
    qty: "88",
    name: "Industrial Welding Power Sources",
    detail: "Shop-wide welding capacity supporting certified procedures and heavy assembly.",
    icon: Flame,
  },
];

const team = [
  {
    name: "Marcus Boyer",
    title: "General Manager",
    email: "MBoyer@paxfab.com",
    phone: "(225) 621-0422",
  },
  {
    name: "Scott Kleinpeter",
    title: "Operation Manager",
    email: "SKleinpeter@paxfab.com",
    phone: "(225) 621-0424",
  },
  {
    name: "Bill Kitto",
    title: "Director, Commercial Operations",
    email: "BKitto@paxfab.com",
    phone: "(225) 621-0412",
  },
  {
    name: "Shanon Phillips",
    title: "Production Manager",
    email: "SPhillips@paxfab.com",
    phone: "(225) 621-0417",
  },
  {
    name: "Huong Hoang",
    title: "Data Control / Programming Manager",
    email: "HHoang@paxfab.com",
    phone: "(225) 621-0418",
  },
  {
    name: "Kevin Schumaker",
    title: "Director of Sales",
    email: "KSchuma@paxfab.com",
    phone: "(713) 594-9420",
  },
  {
    name: "Randy Braud, P.E.",
    title: "Engineering",
    email: "RBraud@paxfab.com",
    phone: null,
  },
  {
    name: "Blake Hewitt",
    title: "Safety Director",
    email: "BHewitt@paxfab.com",
    phone: "(225) 621-0410",
  },
  {
    name: "Ben Leach",
    title: "Project Manager",
    email: "BLeach@paxfab.com",
    phone: "(225) 621-0411",
  },
  {
    name: "Markkevin Spencer",
    title: "QA/QC",
    email: "MSpencer@paxfab.com",
    phone: "(225) 621-0404",
  },
  {
    name: "Nathan Baldwin",
    title: "Project Manager",
    email: "NBaldwin@paxfab.com",
    phone: "(225) 621-0409",
  },
];

function phoneHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2000&q=80"
          alt="Industrial structural steel beams in a fabrication facility"
          fill
          className="object-cover"
          preload
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/95 via-brand/40 to-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal-deep/50" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            About Paxfab · Est. 1979
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building North America&apos;s Infrastructure Since 1979
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver/90">
            Four decades of structural steel fabrication for EPC contractors,
            industrial owners, and energy projects across the United States and
            Canada.
          </p>
        </div>
      </section>

      {/* History & Mission */}
      <section className="bg-charcoal py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Our History &amp; Mission
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Founded by Dan &amp; David Phillips
            </h2>
            <p className="mt-5 text-base leading-relaxed text-silver/80">
              In 1979, brothers Dan and David Phillips founded PAX, LLC with a
              shop-floor philosophy that still defines our operations today:
            </p>
            <blockquote className="mt-6 border-l-4 border-brand bg-surface/60 px-5 py-4">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                &ldquo;We move the men not the material&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed text-silver/75">
                By minimizing material handling, we protect schedule certainty,
                elevate fabrication quality, and maintain a safer working
                environment for every crew on the floor.
              </p>
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-silver/80">
              Our mission is to deliver exceptional structural steel fabrication
              services with uncompromising safety, superior quality, and
              sustainable partnership alongside our customers.
            </p>
          </div>

          <div className="relative min-h-[320px] overflow-hidden border border-white/10 lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1504328345609-9859ee39fc5e?auto=format&fit=crop&w=1400&q=80"
              alt="Industrial welder fabricating structural steel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="grid gap-4 md:grid-cols-3">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="border border-white/10 bg-charcoal-deep p-6 transition-colors hover:border-brand/60"
              >
                <p className="font-display text-3xl font-bold text-brand">
                  {item.year}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-silver/75">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Facilities */}
      <section className="border-t border-white/10 bg-charcoal-deep py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Facilities &amp; Locations
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Two Louisiana Plants. One Fabrication Standard.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-silver/80">
              Combined capacity of approximately 2,750 tons per month with full
              Peddinghaus CNC structural systems and dedicated rail access at
              both sites.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {facilities.map((facility) => (
              <article
                key={facility.id}
                className="overflow-hidden border border-white/10 bg-charcoal transition-colors hover:border-brand/50"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={facility.image}
                    alt={facility.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      {facility.label}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {facility.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand">
                    {facility.city}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-silver/80">
                    {facility.description}
                  </p>
                  <p className="mt-4 flex items-start gap-2 text-sm text-silver/90">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      aria-hidden
                    />
                    {facility.address}
                  </p>
                  <p className="mt-2 pl-6 text-xs text-silver/55">
                    {facility.capacity}
                  </p>
                  <a
                    href={phoneHref(facility.phone)}
                    className="mt-2 flex items-center gap-2 pl-6 text-sm text-silver/80 transition-colors hover:text-brand"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand" aria-hidden />
                    {facility.phone}
                  </a>
                  <a
                    href={facility.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border border-brand/60 bg-brand/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-brand hover:bg-brand"
                  >
                    View on Google Maps
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="border-t border-white/10 bg-charcoal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Major Equipment &amp; Capacity
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                Modern CNC Lines Built for Heavy Tonnage
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-silver/80">
                Full Peddinghaus structural fabrication systems and industrial
                welding capacity underpin reliable monthly output for
                schedule-critical EPC programs.
              </p>
            </div>
            <div className="relative hidden aspect-[16/10] overflow-hidden border border-white/10 lg:block">
              <Image
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80"
                alt="Heavy industrial CNC and fabrication machinery"
                fill
                className="object-cover"
                sizes="40vw"
              />
              <div className="absolute inset-0 bg-brand/20 mix-blend-multiply" />
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.name}
                  className="group border border-white/10 bg-charcoal-deep p-6 transition-all duration-300 hover:border-brand hover:bg-surface"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-4xl font-bold text-brand transition-colors group-hover:text-brand-hover">
                      ({item.qty})
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-brand/40 bg-brand/10 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-silver/70">
                    {item.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="border-t border-white/10 bg-charcoal-deep py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Management Team
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                Leadership Across Operations, Quality &amp; Delivery
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver/80">
                Connect directly with the managers responsible for commercial
                coordination, production, engineering, safety, and QA/QC.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-silver/60">
              <Users className="h-4 w-4 text-brand" aria-hidden />
              {team.length} leadership contacts
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.email}
                className="group border border-white/10 bg-charcoal p-5 transition-all duration-300 hover:border-brand hover:shadow-[0_0_28px_rgba(101,53,177,0.18)]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-brand/40 bg-brand/10 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <Briefcase className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand">
                  {member.title}
                </p>
                <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-silver/80 transition-colors hover:text-brand"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {member.email}
                  </a>
                  {member.phone ? (
                    <a
                      href={phoneHref(member.phone)}
                      className="flex items-center gap-2 text-sm text-silver/80 transition-colors hover:text-brand"
                    >
                      <Phone
                        className="h-4 w-4 shrink-0 text-brand"
                        aria-hidden
                      />
                      {member.phone}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-brand/30 bg-brand/10 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="font-display text-xl font-semibold text-white">
                  Partner with Paxfab on your next program
                </p>
                <p className="mt-1 text-sm text-silver/75">
                  Request a quote or connect with commercial operations for
                  drawing review and capacity planning.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
