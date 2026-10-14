import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Portal",
  description:
    "Secure client portal for EPC partners to access project drawings and file transfers.",
};

export default function ClientPortalPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand/20 text-brand">
        <Lock className="h-7 w-7" aria-hidden />
      </div>
      <h1 className="font-display text-3xl font-bold text-white">
        Client Portal (FTP Login)
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-silver/80">
        Secure authentication for EPC partners is under construction. Need
        project access? Contact your Paxfab Project Coordinator.
      </p>
      <Link
        href="/contact"
        className="mt-8 rounded bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
      >
        Contact Project Coordination
      </Link>
    </section>
  );
}
