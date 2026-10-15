import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  HardHat,
  PencilRuler,
  Factory,
  ArrowRight,
} from "lucide-react";
import ImageGallery, {
  type GalleryImage,
} from "@/components/services/ImageGallery";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Engineering, production, quality assurance, and safety-first structural steel fabrication services from Paxfab.",
};

type ServiceSection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  icon: typeof PencilRuler;
  images: GalleryImage[];
};

// /** Real assets under public/images/ — folder names match on-disk casing. */
// const services: ServiceSection[] = [
//   {
//     id: "engineering",
//     eyebrow: "Section 01",
//     title: "Engineering",
//     summary:
//       "Detailing and coordination that protect fit-up, bolt patterns, and erection sequence before steel ever hits the shop floor.",
//     bullets: [
//       "3D structural modeling in Tekla / SDS-2 environments",
//       "Shop drawings, connection design coordination, and RFI support",
//       "Clash detection and bill-of-material accuracy for EPC packages",
//     ],
//     icon: PencilRuler,
//     images: [
//       {
//         src: "/images/the-engineering/engineering-1_133335346848059912.png",
//         alt: "Paxfab engineering — 3D structural steel detailing",
//         caption: "3D BIM / Tekla detailing",
//       },
//       {
//         src: "/images/the-engineering/engineering-right_133335347027589802.jpg",
//         alt: "Engineering coordination for structural steel packages",
//         caption: "Engineering coordination",
//       },
//       {
//         src: "/images/the-engineering/engineering-bottom_133335347160511706.jpg",
//         alt: "Shop drawings and connection detailing for fabrication",
//         caption: "Shop drawings & connections",
//       },
//     ],
//   },
//   {
//     id: "production",
//     eyebrow: "Section 02",
//     title: "Production",
//     summary:
//       "Heavy fabrication capacity across Gonzales and DeRidder — CNC processing, welding, assembly, and rail-ready staging.",
//     bullets: [
//       "Peddinghaus CNC drill lines, saws, and plate processing",
//       "Overhead crane handling for heavy beams and modular assemblies",
//       "Material tracking from receiving through outbound shipment",
//     ],
//     icon: Factory,
//     images: [
//       {
//         src: "/images/the-production/Protuction-left-1_133335357752481870.jpg",
//         alt: "Heavy structural steel fabrication on the shop floor",
//         caption: "Heavy beam production",
//       },
//       {
//         src: "/images/the-production/Protuction-left-2_133335358013523277.jpg",
//         alt: "CNC structural processing line at Paxfab",
//         caption: "CNC processing lines",
//       },
//       {
//         src: "/images/the-production/Protuction-left-3_133335359568934512.jpg",
//         alt: "Fabricated structural assemblies in production",
//         caption: "Assembly & fit-up",
//       },
//       {
//         src: "/images/the-production/Protuction-right-1_133335358357742510.jpeg",
//         alt: "Plate and beam processing in the fabrication plant",
//         caption: "Plate & beam processing",
//       },
//       {
//         src: "/images/the-production/Protuction-right-2_133335358707844694.jpeg",
//         alt: "High-capacity welding and structural production",
//         caption: "High-capacity welding",
//       },
//       {
//         src: "/images/the-production/Protuction-bottom-1_133335359147738381.jpg",
//         alt: "Completed structural steel staged for shipment",
//         caption: "Staging & outbound",
//       },
//       {
//         src: "/images/the-production/Protuction-bottom-2_133335359294613705.jpg",
//         alt: "Rail-served yard staging for heavy industrial steel",
//         caption: "Rail-ready staging",
//       },
//     ],
//   },
//   {
//     id: "quality",
//     eyebrow: "Section 03",
//     title: "Quality",
//     summary:
//       "AISC- and AWS-aligned procedures with documented inspection — from weld stamps to ultrasonic testing.",
//     bullets: [
//       "Certified welding procedures and visual weld acceptance",
//       "NDT including ultrasonic testing on critical joints",
//       "Traceability aligned with AISC and LADBS fabricator standards",
//     ],
//     icon: ClipboardCheck,
//     images: [
//       {
//         src: "/images/the-quality/the-quality_133335360668580547.jpeg",
//         alt: "AWS / AISC quality assurance and NDT inspection at Paxfab",
//         caption: "QA / NDT inspection",
//       },
//     ],
//   },
//   {
//     id: "safety",
//     eyebrow: "Section 04",
//     title: "Safety",
//     summary:
//       "A culture of PPE, controlled processes, and daily briefings — because schedule never outweighs people.",
//     bullets: [
//       "Mandatory PPE and controlled hot-work procedures",
//       "Visible safety messaging across both Louisiana plants",
//       "Toolbox talks and continuous hazard awareness on the floor",
//     ],
//     icon: HardHat,
//     // Folder on disk is case-sensitive: the-Safety
//     images: [
//       {
//         src: "/images/the-Safety/safety-left-1_133312386034313684.png",
//         alt: "Safety First culture and PPE messaging at Paxfab",
//         caption: "Safety First / Wear PPE",
//       },
//       {
//         src: "/images/the-Safety/safety-right-2_133335361182901788.jpg",
//         alt: "Shop-floor safety practices during structural steel fabrication",
//         caption: "Protected shop operations",
//       },
//     ],
//   },
// ];

/** Real assets under public/images/ — folder names match on-disk casing. */
const services: ServiceSection[] = [
  {
    id: "engineering",
    eyebrow: "Section 01",
    title: "Engineering",
    paragraphs: [
      "PAX has on-staff PE, utilizes 3-D Model Detailing compatible with SDS-2/TEKLA and the latest AutoCAD detailing software for expediting of high priority orders.",
      "Upon completion of detailing, the information is re-integrated with the design model or sent to other modeling software using building information model (BIM).",
      "Detailing information is then used for our automated equipment, developing bar code tags, material procurement, shipping lists, invoicing and QA/QC requirements.",
      "All information is made available and transferred as required by our client's specifications."
    ],
    icon: PencilRuler,
    images: [
      {
        src: "/images/the-engineering/engineering-1_133335346848059912.png",
        alt: "Paxfab engineering — 3D structural steel detailing",
        caption: "3D BIM / Tekla detailing",
      },
      {
        src: "/images/the-engineering/engineering-right_133335347027589802.jpg",
        alt: "Engineering coordination for structural steel packages",
        caption: "Engineering coordination",
      },
      {
        src: "/images/the-engineering/engineering-bottom_133335347160511706.jpg",
        alt: "Shop drawings and connection detailing for fabrication",
        caption: "Shop drawings & connections",
      },
    ],
  },
  {
    id: "production",
    eyebrow: "Section 02",
    title: "Production",
    paragraphs: [
      "Using all the technology available during detailing, programming and preparing our CNC equipments, implement our work practices to maintain shop loading and most importantly, our delivery schedules.",
      "PAX utilizes a system of managing and tracking material accurately and efficiently. This allows us to provide a beneficial material tracking interface with our coating vendors and, more importantly, our customers."
    ],
    icon: Factory,
    images: [
      {
        src: "/images/the-production/Protuction-left-1_133335357752481870.jpg",
        alt: "Heavy structural steel fabrication on the shop floor",
        caption: "Heavy beam production",
      },
      {
        src: "/images/the-production/Protuction-left-2_133335358013523277.jpg",
        alt: "CNC structural processing line at Paxfab",
        caption: "CNC processing lines",
      },
      {
        src: "/images/the-production/Protuction-left-3_133335359568934512.jpg",
        alt: "Fabricated structural assemblies in production",
        caption: "Assembly & fit-up",
      },
      {
        src: "/images/the-production/Protuction-right-1_133335358357742510.jpeg",
        alt: "Plate and beam processing in the fabrication plant",
        caption: "Plate & beam processing",
      },
      {
        src: "/images/the-production/Protuction-right-2_133335358707844694.jpeg",
        alt: "High-capacity welding and structural production",
        caption: "High-capacity welding",
      },
      {
        src: "/images/the-production/Protuction-bottom-1_133335359147738381.jpg",
        alt: "Completed structural steel staged for shipment",
        caption: "Staging & outbound",
      },
      {
        src: "/images/the-production/Protuction-bottom-2_133335359294613705.jpg",
        alt: "Rail-served yard staging for heavy industrial steel",
        caption: "Rail-ready staging",
      },
    ],
  },
  {
    id: "quality",
    eyebrow: "Section 03",
    title: "Quality",
    paragraphs: [
      "PAX has an extensive quality assurance program that is committed to quality and service for our customers with annual audits by AISC (American Institute of Steel Construction) and the City of Los Angeles for its Type 1 Structural Approved License.",
      "PAX has on-staff Level 2 NACE and three AWS QC1 qualified inspectors.",
      "3rd party ASNT qualified personnel perform Non-Destructive Examination (NDE) utilizing ultrasonic, magnetic particle and liquid penetrate testing methods, as required by our client's specifications."
    ],
    icon: ClipboardCheck,
    images: [
      {
        src: "/images/the-quality/the-quality_133335360668580547.jpeg",
        alt: "AWS / AISC quality assurance and NDT inspection at Paxfab",
        caption: "QA / NDT inspection",
      },
    ],
  },
  {
    id: "safety",
    eyebrow: "Section 04",
    title: "Safety",
    paragraphs: [
      "From our weekly safety meeting and daily work task reviews, PAX is committed to operating its facilities in a safe efficient manner and in compliance with all environmental, health and safety rules and regulations.",
      "We have built a culture of safety into everything we do. Our programs and initiatives are designed so that everyone has the right knowledge, tools and training to perform at the highest level to ensure the safety of each employee and the protection of company assets."
    ],
    icon: HardHat,
    // Folder on disk is case-sensitive: the-Safety
    images: [
      {
        src: "/images/the-Safety/safety-left-1_133312386034313684.png",
        alt: "Safety First culture and PPE messaging at Paxfab",
        caption: "Safety First / Wear PPE",
      },
      {
        src: "/images/the-Safety/safety-right-2_133335361182901788.jpg",
        alt: "Shop-floor safety practices during structural steel fabrication",
        caption: "Protected shop operations",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200 bg-muted">
        <div className="absolute inset-0 bg-linear-to-r from-brand/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            Capabilities / Services
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-ink sm:text-5xl">
            Engineering to Shipment —  One Fabrication Standard
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Four integrated disciplines keep EPC programs on the critical path:
            detailing, heavy production, documented quality, and shop-floor
            safety.
          </p>
        </div>
      </section>

      {services.map((service, i) => {
        const Icon = service.icon;
        const reverse = i % 2 === 1;

        return (
          <section
            key={service.id}
            id={service.id}
            className={`border-b border-gray-200 py-16 sm:py-20 ${
              i % 2 === 0 ? "bg-white" : "bg-muted"
            }`}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
              <div className={reverse ? "lg:order-2" : undefined}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                  {service.eyebrow}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded border border-brand/30 bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                    {service.title}
                  </h2>
                </div>
                {/* <p className="mt-5 text-base leading-relaxed text-body">
                  {service.paragraphs.join("\n")}
                </p> */}
                <p className="mt-5 text-base leading-relaxed text-body">
                  <ul className="mt-6 space-y-2.5">
                    {service.paragraphs.map((paragraph) => (
                      <li
                      key={paragraph}
                      className="flex gap-2 text-sm leading-relaxed text-body"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {paragraph}
                      </li>
                    ))}
                  </ul>
                  </p>
              </div>

              <div className={reverse ? "lg:order-1" : undefined}>
                <ImageGallery
                  images={service.images}
                  label={`${service.images.length} photos`}
                />
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-brand py-14 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              Ready to scope your next steel package?
            </p>
            <p className="mt-2 text-sm text-white/80">
              Share drawings with commercial operations for capacity and
              schedule feedback.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-white px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
