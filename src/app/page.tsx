import 'leaflet/dist/leaflet.css';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Flame, Hammer, Ruler } from "lucide-react";
import projects from "@/data/projects.json";

const capabilities = [
  {
    title: "Structural Steel",
    description:
      "Precision-fabricated beams, columns, and plate girders engineered for petrochemical, LNG, and industrial plant structures.",
    icon: Factory,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    alt: "Structural steel beams at an industrial fabrication yard",
  },
  {
    title: "Heavy Fabrication",
    description:
      "High-tonnage assemblies and modular components built for demanding energy and process infrastructure projects.",
    icon: Hammer,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    alt: "Heavy industrial steel fabrication workshop",
  },
  {
    title: "CNC Processing",
    description:
      "Peddinghaus CNC drilling, sawing, and plate processing lines delivering repeatable accuracy at production scale.",
    icon: Ruler,
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80",
    alt: "CNC machinery processing industrial steel",
  },
  {
    title: "Welding & Assembly",
    description:
      "Certified welding procedures and fit-up assembly executed to AISC and AWS standards for critical path delivery.",
    icon: Flame,
    image:
      "https://images.unsplash.com/photo-1504328345609-9859ee39fc5e?auto=format&fit=crop&w=1200&q=80",
    alt: "Welder fabricating structural steel components",
  },
];

const metrics = [
  { value: "2,750+", label: "Tons Monthly Output" },
  { value: "190,000", label: "Sq. Ft Shop Floor" },
  { value: "100%", label: "On-Time Commitment" },
  { value: "AISC & AWS", label: "Certified Standards" },
];

function formatTons(tons: number) {
  return tons.toLocaleString("en-US");
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2000&q=80"
          alt="Industrial steel fabrication facility"
          fill
          className="object-cover"
          preload
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/95 via-charcoal/85 to-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-brand">
            Paxfab · Louisiana Fabrication
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Precision Structural Steel Fabrication for North America&apos;s
            Demanding Projects
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver/90 sm:text-xl">
            Over 2,750 tons/month fabrication capacity across two advanced
            facilities in Louisiana. Serving global EPC contractors with AISC
            quality standards.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/work-history"
              className="inline-flex items-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-white/10 bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-surface px-6 py-8 text-center sm:px-8"
            >
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-silver/70">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-charcoal py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Capabilities
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Industrial Capacity Built for Critical Path Delivery
            </h2>
            <p className="mt-4 text-base leading-relaxed text-silver/80">
              From CNC structural processing to certified welding and heavy
              assembly, Paxfab equips EPC partners with reliable tonnage and
              shop-floor discipline.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group overflow-hidden border border-white/10 bg-charcoal-deep transition-colors hover:border-brand/50"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded bg-brand/20 text-brand">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver/80">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="border-t border-white/10 bg-charcoal-deep py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Featured Work
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                Proven Performance Across North America
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver/80">
                Landmark tonnage for energy majors and EPC leaders — from Alberta
                upgraders to Gulf Coast LNG terminals.
              </p>
            </div>
            <Link
              href="/work-history"
              className="inline-flex shrink-0 items-center gap-2 rounded bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              View Interactive Project Map
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 4).map((project) => (
              <Link
                key={project.id}
                href="/work-history"
                className="group border border-white/10 bg-surface p-5 transition-colors hover:border-brand/60"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  {project.category}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white group-hover:text-white">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-silver/70">{project.client}</p>
                <p className="mt-1 text-sm text-silver/60">{project.location}</p>
                <p className="mt-5 font-display text-2xl font-bold text-white">
                  {formatTons(project.tons)}{" "}
                  <span className="text-base font-medium text-silver/60">
                    Tons
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
