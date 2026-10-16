import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Factory,
  HardHat,
  Lock,
  PencilRuler,
} from "lucide-react";

/**
 * Assets live under public/images/.
 * Paths are verified against the on-disk folders (home, banner, the-*, associations).
 */
const IMG = {
  // Panoramic industrial site — home/ preferred; banner/pax-flash.jpg is the alternate hero
  hero: "/images/home/Houses-of-the-Future_133335346014256868.jpg",
  engineering:
    "/images/the-engineering/engineering-right_133335347027589802.jpg",
  production:
    "/images/the-production/Protuction-left-1_133335357752481870.jpg",
  quality: "/images/the-quality/the-quality_133335360668580547.jpeg",
  // Folder is case-sensitive on Linux deploy: the-Safety
  safety: "/images/the-Safety/safety-right-2_133335361182901788.jpg",
  projects: [
    "/images/the-work-history/Project-Paxfab-8_133335369592307836.jpg",
    "/images/the-work-history/Project-Paxfab-6_133335366732099198.jpg",
    "/images/the-work-history/Project-Paxfab-4_133335365501532481.jpg",
  ],
  associations: [
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
  ],
} as const;

const stats = [
  { value: "1979", label: "Established Heritage" },
  { value: "~2,750 Tons", label: "Monthly Production Capacity" },
  { value: "AISC & LADBS", label: "Certified Type 1 Fabricator" },
  { value: "AWS QC1 & NACE", label: "On-Staff Inspection Team" },
];

const capabilities = [
  {
    title: "Engineering (BIM / Tekla)",
    description:
      "3D detailing in Tekla and SDS-2 environments coordinates connections, clash detection, and shop drawings before steel hits the floor — protecting fit-up and erection sequence for EPC packages.",
    href: "/services#engineering",
    image: IMG.engineering,
    icon: PencilRuler,
  },
  {
    title: "High-Capacity CNC Production",
    description:
      "Peddinghaus CNC drill lines, saws, and plate processing across Gonzales and DeRidder deliver ~2,750 tons/month with rail-served staging for heavy industrial programs.",
    href: "/services#production",
    image: IMG.production,
    icon: Factory,
  },
  {
    title: "AWS / AISC Quality Assurance",
    description:
      "Documented weld procedures, visual acceptance, and NDT — including ultrasonic testing — aligned with AISC and LADBS Type 1 fabricator standards.",
    href: "/services#quality",
    image: IMG.quality,
    icon: ClipboardCheck,
  },
  {
    title: "Safety First Culture",
    description:
      "Mandatory PPE, controlled hot-work, and daily toolbox talks keep people ahead of schedule. Safety is a shop-floor discipline, not a slogan.",
    href: "/services#safety",
    image: IMG.safety,
    icon: HardHat,
  },
];

const featuredProjects = [
  {
    name: "Shell Upgrader",
    client: "Bechtel · Ft. Saskatchewan, Alberta",
    summary:
      "Landmark structural tonnage for a major energy upgrader — precision-fabricated steel supporting one of North America's most demanding petrochemical programs.",
    image: IMG.projects[0],
    tons: "33,400 Tons",
  },
  {
    name: "Sabine Pass LNG",
    client: "Cheniere Energy · Cameron Parish, LA",
    summary:
      "Heavy structural packages for Gulf Coast LNG export infrastructure — delivered to AISC quality standards on a schedule-critical EPC path.",
    image: IMG.projects[1],
    tons: "28,000 Tons",
  },
  {
    name: "Motiva Refinery",
    client: "Motiva · Port Arthur, TX",
    summary:
      "Refinery structural steel supporting continuous operations and expansion work for one of the largest refining complexes on the U.S. Gulf Coast.",
    image: IMG.projects[2],
    tons: "Major EPC",
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative min-h-[88vh] overflow-hidden bg-gray-100">
        <Image
          src={IMG.hero}
          alt="Paxfab heavy structural steel fabrication at a North American industrial facility"
          fill
          className="object-cover object-center"
          preload
          sizes="100vw"
        />
        {/* Light industrial overlay — readable copy without washing the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/93 via-white/78 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-white/15" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
            Paxfab · Est. 1979 · Louisiana
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
            Heavy Structural Steel Fabrication &amp; Engineering
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-gray-700 sm:text-xl">
            Let&apos;s Build a Better Future... Together. Delivering
            mission-critical structural components for petrochemical, LNG, and
            heavy industrial facilities across North America.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-[#6535b1] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#7a4bc7]"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded border-2 border-gray-300 bg-white/85 px-6 py-3.5 text-sm font-semibold text-[#111827] backdrop-blur-sm transition-colors hover:border-[#6535b1] hover:text-[#6535b1]"
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats */}
      <section className="border-y border-gray-200 bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded border border-gray-200 bg-white px-5 py-6 text-center shadow-sm"
            >
              <p className="font-display text-2xl font-bold text-[#111827] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Capabilities */}
      <section className="bg-[#F9FAFB] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
              Core Capabilities
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#111827] sm:text-4xl">
              Engineering to Shipment — One Fabrication Standard
            </h2>
            <p className="mt-4 text-base font-normal leading-relaxed text-gray-700">
              Four integrated disciplines keep EPC programs on the critical path
              across our Gonzales and DeRidder plants.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all hover:border-[#6535b1] hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded bg-[#6535b1]/10 text-[#6535b1]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-normal leading-relaxed text-gray-700">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6535b1] transition-colors hover:text-[#7a4bc7]"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section className="border-t border-gray-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
                Featured Projects
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#111827] sm:text-4xl">
                Proven Performance Across North America
              </h2>
              <p className="mt-4 text-base font-normal leading-relaxed text-gray-700">
                From Alberta upgraders to Gulf Coast LNG terminals and refining
                complexes — structural steel delivered for the continent&apos;s
                most demanding energy programs.
              </p>
            </div>
            <Link
              href="/work-history"
              className="inline-flex shrink-0 items-center gap-2 rounded bg-[#6535b1] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#7a4bc7]"
            >
              View Interactive Work History Map
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.name}
                href="/work-history"
                className="group overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all hover:border-[#6535b1] hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={`${project.name} structural steel project`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
                    {project.tons}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#111827]">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-600">
                    {project.client}
                  </p>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-gray-700">
                    {project.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Associations */}
      {/* <section className="border-t border-gray-200 bg-[#F9FAFB] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#6535b1]">
            Industry Associations &amp; Certifications
          </p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold text-[#111827] sm:text-3xl">
            Trusted Credentials. Proven Standards.
          </h2>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
            {IMG.associations.map((logo) => (
              <li
                key={logo.src}
                className="flex h-20 w-36 items-center justify-center rounded border border-gray-200 bg-white px-4 py-3 shadow-sm sm:h-24 sm:w-44"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={80}
                  className="max-h-14 w-auto object-contain sm:max-h-16"
                />
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* 6. Final CTA */}
      <section className="bg-[#6535b1] py-14 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Partner With a Proven Structural Steel Leader
            </h2>
            <p className="mt-3 text-sm font-normal leading-relaxed text-white/85 sm:text-base">
              Share drawings with commercial operations for capacity, schedule,
              and fabrication feedback — or access your isolated project portal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-white px-5 py-3 text-sm font-semibold text-[#6535b1] transition-colors hover:bg-white/90"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/client-portal"
              className="inline-flex items-center gap-2 rounded border-2 border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Lock className="h-4 w-4" aria-hidden />
              Client Portal (FTP Login)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
