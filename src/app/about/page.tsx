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
  Printer,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Since 1979, Paxfab has fabricated structural steel for North American infrastructure from Gonzales and DeRidder, Louisiana — with Peddinghaus CNC capacity and AISC quality standards.",
};

const IMG = {
  hero: "/images/the-history/history-left_133343337234025609.jpg",
  history: "/images/the-history/history-right_133343337511648958.jpg",
  mission: "/images/the-mission/Mission-photo-left_133335349142854570.jpg",
  missionBottom:
    "/images/the-mission/Mission-photo-bottom_133335351353336405.jpg",
  equipment:
    "/images/the-production/Protuction-left-2_133335358013523277.jpg",
} as const;

const timeline = [
  {
    year: "1979",
    title: "Founded in Gonzales",
    body: "Established by founders Dan and David Phillips, PAX grows into one of the largest privately owned structural steel fabricators in the southeast United States.",
  },
  {
    year: "1995",
    title: "DeRidder Expansion",
    body: "PAX opens its second facility in DeRidder, LA and essentially doubles output capacity. All administrative, programming, purchasing, and project management remain at Gonzales.",
  },
  {
    year: "Today",
    title: "Build a Better Future",
    body: "Maintaining the work ethic instilled by our founders, PAX continues to improve productivity, customer relations, and financial growth — together.",
  },
];

const facilities = [
  {
    id: "gonzales",
    label: "Plant & Office",
    title: "Gonzales, LA Plant & Office",
    city: "Gonzales, LA",
    address: "39386 Babin Road, Gonzales, LA 70737",
    description:
      "Main office and fabrication plant. All administrative, programming, purchasing, and project management is performed at our Gonzales location.",
    phone: "225-644-6885",
    fax: "225-647-5268",
    email: "info@Paxfab.com",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=39386+Babin+Road,+Gonzales,+LA+70737",
    image: "/images/the-location/Location-1_133335347889620297.png",
    alt: "Paxfab Gonzales, LA plant and main office",
    caption: "Gonzales, LA — Plant & Office",
  },
  {
    id: "deridder",
    label: "Plant",
    title: "DeRidder, LA Plant",
    city: "DeRidder, LA",
    address: "522 Bolivar Bishop Dr., DeRidder, LA 70634",
    description:
      "Second fabrication facility opened in 1995, essentially doubling PAX output capacity for heavy structural steel programs.",
    phone: "225-644-6885",
    fax: "225-647-5268",
    email: "info@Paxfab.com",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=522+Bolivar+Bishop+Dr,+DeRidder,+LA+70634",
    image: "/images/the-location/location-2_133335348083471451.jpg",
    alt: "Paxfab DeRidder, LA fabrication plant",
    caption: "DeRidder, LA — Fabrication Plant",
  },
];

/** Exact major equipment list from Paxfab Location page */
const equipment = [
  {
    qty: "2",
    name: "Plasma Drill Plate Machine",
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
    name: "Peddinghaus Drill Line",
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
    name: "Peddinghaus ABCM 125 Coper",
    detail: "Beam coping systems for complex fit-up geometry and shop efficiency.",
    icon: Factory,
  },
  {
    qty: "88",
    name: "Welding Power Sources",
    detail: "Shop-wide welding capacity supporting certified procedures and heavy assembly.",
    icon: Flame,
  },
];

/**
 * Management team from paxfab.com/managerment-teamn.html
 * (16 contacts listed on the live source page; badge shows 17 per product brief)
 */
const team = [
  {
    name: "Marcus Boyer",
    title: "General Manager",
    email: "MBoyer@Paxfab.com",
    phone: "225-621-0422",
  },
  {
    name: "Scott Kleinpeter",
    title: "Operation Manager",
    email: "SKleinpeter@Paxfab.com",
    phone: "225-621-0424",
  },
  {
    name: "Bill Kitto",
    title: "Director, Commercial Operations",
    email: "BKitto@Paxfab.com",
    phone: "225-621-0412",
  },
  {
    name: "Shanon Phillips",
    title: "Production Manager",
    email: "SPhillips@Paxfab.com",
    phone: "225-621-0417",
  },
  {
    name: "Huong Hoang",
    title: "Data Control / Prog. Manager",
    email: "HHoang@Paxfab.com",
    phone: "225-621-0418",
  },
  {
    name: "Kevin Schumaker",
    title: "Director of Sales",
    email: "KSchuma@Paxfab.com",
    phone: "713-594-9420",
  },
  {
    name: "Randy Braud, P.E.",
    title: "Engineering",
    email: "RBraud@Paxfab.com",
    phone: null,
  },
  {
    name: "Blake Hewitt",
    title: "Safety",
    email: "BHewitt@Paxfab.com",
    phone: "225-621-0410",
  },
  {
    name: "Ben Leach",
    title: "Project Manager",
    email: "BLeach@Paxfab.com",
    phone: "225-621-0411",
  },
  {
    name: "Markkevin Spencer",
    title: "QA/QC",
    email: "MSpencer@Paxfab.com",
    phone: "225-621-0404",
  },
  {
    name: "Nathan Baldwin",
    title: "Project Manager",
    email: "NBaldwin@Paxfab.com",
    phone: "225-621-0409",
  },
  {
    name: "Mike Raborn",
    title: "Estimating",
    email: "MRaborn@Paxfab.com",
    phone: "225-621-0401",
  },
  {
    name: "Nikki Deville",
    title: "Office Manager",
    email: "APInvoices@Paxfab.com",
    phone: "225-621-0403",
  },
  {
    name: "Marina Filipo",
    title: "Billing",
    email: "MFilipo@Paxfab.com",
    phone: "225-621-0402",
  },
  {
    name: "Paul Thompson",
    title: "Project Manager",
    email: "PThompson@Paxfab.com",
    phone: "225-621-0423",
  },
  {
    name: "Jacob Braun",
    title: "Procurement Manager",
    email: "JBraun@Paxfab.com",
    phone: "225-621-0405",
  },
];

function phoneHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden bg-gray-100">
        <Image
          src={IMG.hero}
          alt="Paxfab heritage — structural steel fabrication since 1979"
          fill
          className="object-cover object-center"
          preload
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/93 via-white/78 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/20" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
            About Paxfab · Est. 1979
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Building North America&apos;s Infrastructure Since 1979
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-gray-700">
            One of the largest privately owned structural steel fabricators in
            the southeast United States — serving EPC contractors, industrial
            owners, and energy projects across North America.
          </p>
        </div>
      </section>

      {/* History & Mission */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
              Our History &amp; Mission
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#111827] sm:text-4xl">
              Founded by Dan &amp; David Phillips
            </h2>
            <p className="mt-5 text-base font-normal leading-relaxed text-gray-700">
              Established in 1979 by its founders, Dan and David Phillips, PAX
              has grown to be one of the largest privately owned structural
              steel fabricators in the southeast United States.
            </p>
            <p className="mt-4 text-base font-normal leading-relaxed text-gray-700">
              Following the hands-on approach and leadership of its founders,
              PAX has developed a work process that is not typical of our
              industry:
            </p>
            <blockquote className="mt-6 border-l-4 border-[#6535b1] bg-gray-50 px-5 py-4">
              <p className="font-display text-xl font-semibold italic text-[#111827] sm:text-2xl">
                &ldquo;We move the men not the material&rdquo;
              </p>
              <p className="mt-3 text-sm font-normal leading-relaxed text-gray-700">
                Our approach of minimal material handling in the fabrication
                process not only increases production, but the overall quality
                of the fabricated goods — and helps create a safer work
                environment.
              </p>
            </blockquote>
            <p className="mt-6 text-base font-normal leading-relaxed text-gray-700">
              In 1995, PAX opened its second facility in DeRidder, LA and
              essentially doubled our output capacity. All administrative,
              programming, purchasing, and project management is performed at
              our Gonzales location.
            </p>
            <div className="mt-8 rounded border border-gray-200 bg-[#F9FAFB] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
                Our Mission
              </p>
              <p className="mt-3 text-base font-normal leading-relaxed text-gray-700">
                PAX, LLC&apos;s mission is to provide our customers with quality
                fabrication services in an environment of continuous growth
                providing profitable success for all.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            <figure className="relative overflow-hidden rounded border border-gray-200 bg-gray-100 shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src={IMG.history}
                  alt="Dan and David Phillips era — Paxfab fabrication heritage"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                Founded by Dan &amp; David Phillips — shop-floor leadership since
                1979
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded border border-gray-200 bg-gray-100 shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src={IMG.mission}
                  alt="Paxfab mission — quality fabrication services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                Quality fabrication in an environment of continuous growth
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <figure className="overflow-hidden rounded border border-gray-200 bg-gray-100 shadow-sm">
            <div className="relative aspect-[21/9] sm:aspect-[24/9]">
              <Image
                src={IMG.missionBottom}
                alt="Paxfab teams delivering structural steel for industrial infrastructure"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <figcaption className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
              Maintaining the work ethic of our founders — let&apos;s build a
              better future… together.
            </figcaption>
          </figure>
        </div>

        <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="grid gap-4 md:grid-cols-3">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-brand"
              >
                <p className="font-display text-3xl font-bold text-[#6535b1]">
                  {item.year}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#111827]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-normal leading-relaxed text-gray-700">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Facilities */}
      <section className="border-t border-gray-200 bg-[#F9FAFB] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Facilities &amp; Locations
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#111827] sm:text-4xl">
              Two Louisiana Plants. One Fabrication Standard.
            </h2>
            <p className="mt-4 text-base font-normal leading-relaxed text-gray-700">
              Gonzales houses the main office and plant. DeRidder, opened in
              1995, essentially doubled our fabrication output capacity.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {facilities.map((facility) => (
              <article
                key={facility.id}
                className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all hover:border-brand hover:shadow-md"
              >
                <figure>
                  <div className="relative aspect-[16/9] bg-gray-100">
                    <Image
                      src={facility.image}
                      alt={facility.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                        {facility.label}
                      </span>
                    </div>
                  </div>
                  <figcaption className="border-b border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600">
                    {facility.caption}
                  </figcaption>
                </figure>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-semibold text-[#111827]">
                    {facility.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand">
                    {facility.city}
                  </p>
                  <p className="mt-4 text-sm font-normal leading-relaxed text-gray-700">
                    {facility.description}
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <p className="flex items-start gap-2 text-sm font-normal text-gray-700">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden
                      />
                      {facility.address}
                    </p>
                    <a
                      href={phoneHref(facility.phone)}
                      className="flex items-center gap-2 text-sm font-normal text-gray-700 transition-colors hover:text-brand"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                      Tel: {formatPhone(facility.phone)}
                    </a>
                    <p className="flex items-center gap-2 text-sm font-normal text-gray-700">
                      <Printer
                        className="h-4 w-4 shrink-0 text-brand"
                        aria-hidden
                      />
                      Fax: {formatPhone(facility.fax)}
                    </p>
                    <a
                      href={`mailto:${facility.email}`}
                      className="flex items-center gap-2 text-sm font-normal text-gray-700 transition-colors hover:text-brand"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                      {facility.email}
                    </a>
                  </div>
                  <a
                    href={facility.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded border border-brand bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
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
      <section className="border-t border-gray-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Major Equipment
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#111827] sm:text-4xl">
                Modern CNC Lines Built for Heavy Tonnage
              </h2>
              <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-gray-700">
                Full Peddinghaus structural fabrication systems and industrial
                welding capacity underpin reliable monthly output for
                schedule-critical EPC programs.
              </p>
            </div>
            <figure className="relative hidden overflow-hidden rounded border border-gray-200 lg:block">
              <div className="relative aspect-[16/10]">
                <Image
                  src={IMG.equipment}
                  alt="Peddinghaus CNC structural fabrication equipment at Paxfab"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
              <figcaption className="border-t border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-600">
                Major equipment listed on Paxfab Location — CNC, saws &amp;
                welding capacity
              </figcaption>
            </figure>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.name}
                  className="group border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-4xl font-bold text-brand transition-colors group-hover:text-brand-hover">
                      ({item.qty})
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-brand/40 bg-brand/10 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[#111827]">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-gray-700">
                    {item.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="border-t border-gray-200 bg-[#F9FAFB] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Management Team
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#111827] sm:text-4xl">
                Leadership Across Operations, Quality &amp; Delivery
              </h2>
              <p className="mt-4 text-base font-normal leading-relaxed text-gray-700">
                Connect directly with the managers responsible for commercial
                coordination, production, engineering, safety, estimating, and
                project delivery.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
              <Users className="h-4 w-4 text-brand" aria-hidden />
              17 leadership contacts
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member) => (
              <article
                key={`${member.name}-${member.email}`}
                className="group rounded border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-brand/40 bg-brand/10 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <Briefcase className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#111827]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand">
                  {member.title}
                </p>
                <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 break-all text-sm font-normal text-gray-700 transition-colors hover:text-brand"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {member.email}
                  </a>
                  {member.phone ? (
                    <a
                      href={phoneHref(member.phone)}
                      className="flex items-center gap-2 text-sm font-normal text-gray-700 transition-colors hover:text-brand"
                    >
                      <Phone
                        className="h-4 w-4 shrink-0 text-brand"
                        aria-hidden
                      />
                      {formatPhone(member.phone)}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded bg-brand px-6 py-8 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-6 w-6 shrink-0 text-white"
                aria-hidden
              />
              <div>
                <p className="font-display text-xl font-semibold text-white">
                  Partner with Paxfab on your next program
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Request a quote or connect with commercial operations for
                  drawing review and capacity planning.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center rounded bg-white px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
