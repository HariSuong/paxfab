import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Paxfab's Louisiana fabrication facilities, capacity, and mission serving North American EPC contractors.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        About Paxfab
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        Two Louisiana Facilities. One Commitment to Capacity.
      </h1>
      <p className="mt-6 text-base leading-relaxed text-silver/80">
        PAX, LLC (Paxfab) fabricates heavy structural steel for petrochemical,
        LNG, and industrial energy projects. Combined shop capacity of
        approximately 2,750 tons per month is supported by full Peddinghaus CNC
        structural systems and on-site rail spurs at Gonzales and DeRidder.
      </p>
      <p className="mt-4 text-sm text-silver/50">
        Detailed facility specifications coming soon.
      </p>
    </section>
  );
}
