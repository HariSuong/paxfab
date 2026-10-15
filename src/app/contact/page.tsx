import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Printer,
  Mail,
  Clock,
  User,
  ExternalLink,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Paxfab in Gonzales and DeRidder, Louisiana for fabrication quotes, project consultation, and facility visits.",
};

const facilities = [
  {
    title: "Main Office & Plant",
    address: "39386 Babin Road, Gonzales, LA 70737",
    detail: "Executive, engineering, purchasing & project management",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=39386+Babin+Road,+Gonzales,+LA+70737",
  },
  {
    title: "Fabrication Plant",
    address: "522 Bolivar Bishop Dr., DeRidder, LA 70634",
    detail: "Heavy structural fabrication · rail-served shop",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=522+Bolivar+Bishop+Dr,+DeRidder,+LA+70634",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200 bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            Contact Us
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-ink sm:text-5xl">
            Get in Touch with Paxfab
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Whether you need a fabrication quote, project consultation, or
            facility visit, our team is ready to assist your heavy industrial
            programs.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Contact Information &amp; Facilities
              </h2>
              <p className="mt-2 text-sm text-body/70">
                Two Louisiana plants · Combined capacity ~2,750 tons/month
              </p>
            </div>

            {facilities.map((facility) => (
              <article
                key={facility.title}
                className="rounded border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-brand/30 bg-brand/10 text-brand">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {facility.title}
                    </h3>
                    <p className="mt-1 text-sm text-body">{facility.address}</p>
                    <p className="mt-1 text-xs text-body/60">{facility.detail}</p>
                    <a
                      href={facility.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand hover:text-brand-hover"
                    >
                      View on Google Maps
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            ))}

            <article className="rounded border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-brand/30 bg-brand/10 text-brand">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Phone &amp; Fax
                  </h3>
                  <a
                    href="tel:+12256446885"
                    className="mt-1 block text-sm text-body transition-colors hover:text-brand"
                  >
                    Phone: (225) 644-6885
                  </a>
                  <p className="mt-1 flex items-center gap-2 text-sm text-body">
                    <Printer className="h-3.5 w-3.5 text-brand" aria-hidden />
                    Fax: (225) 647-5268
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-brand/30 bg-brand/10 text-brand">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    General Inquiries
                  </h3>
                  <a
                    href="mailto:info@paxfab.com"
                    className="mt-1 block text-sm text-body transition-colors hover:text-brand"
                  >
                    info@paxfab.com
                  </a>
                </div>
              </div>
            </article>

            <article className="rounded border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-brand/30 bg-brand/10 text-brand">
                  <User className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Commercial Sales
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand">
                    Kevin Schumaker — Director of Sales
                  </p>
                  <a
                    href="tel:+17135949420"
                    className="mt-1 block text-sm text-body transition-colors hover:text-brand"
                  >
                    (713) 594-9420
                  </a>
                  <a
                    href="mailto:KSchuma@paxfab.com"
                    className="mt-0.5 block text-sm text-body transition-colors hover:text-brand"
                  >
                    KSchuma@paxfab.com
                  </a>
                </div>
              </div>
            </article>

            <article className="rounded border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-brand/30 bg-brand/10 text-brand">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Business Hours
                  </h3>
                  <p className="mt-1 text-sm text-body">
                    Monday – Friday: 7:00 AM – 5:00 PM (CST)
                  </p>
                </div>
              </div>
            </article>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="border-t border-gray-200 bg-muted py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Facility Map
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                Main Office — Gonzales, LA
              </h2>
              <p className="mt-2 text-sm text-body">
                39386 Babin Road, Gonzales, LA 70737
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=39386+Babin+Road,+Gonzales,+LA+70737"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover"
            >
              Open in Google Maps
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
            <iframe
              title="Paxfab Main Office — Gonzales, LA"
              src="https://maps.google.com/maps?q=39386+Babin+Road,+Gonzales,+LA+70737&z=14&output=embed"
              className="h-[360px] w-full sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
