import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Structural steel, heavy fabrication, CNC processing, and certified welding services from Paxfab.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        Services
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        Fabrication Services for EPC Delivery
      </h1>
      <p className="mt-6 text-base leading-relaxed text-silver/80">
        Structural steel, heavy fabrication, CNC processing, welding, and
        assembly — engineered for schedule-critical industrial programs across
        the United States and Canada.
      </p>
      <p className="mt-4 text-sm text-silver/50">
        Full capabilities page under development.
      </p>
    </section>
  );
}
