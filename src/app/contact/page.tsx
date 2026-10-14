import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Paxfab facilities in Gonzales and DeRidder, Louisiana for RFQ and project coordination.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        Contact Us
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        Request a Quote
      </h1>
      <p className="mt-6 text-base leading-relaxed text-silver/80">
        Reach our Gonzales or DeRidder teams for RFQs, drawing packages, and
        project coordination. Email{" "}
        <a href="mailto:info@paxfab.com" className="text-brand hover:underline">
          info@paxfab.com
        </a>{" "}
        or call (225) 644-6885 / (337) 462-4950.
      </p>
      <p className="mt-4 text-sm text-silver/50">
        RFQ form coming in a later phase.
      </p>
    </section>
  );
}
