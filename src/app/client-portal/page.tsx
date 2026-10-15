import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/portal/LoginForm";

export const metadata: Metadata = {
  title: "Client Portal",
  description:
    "Secure client & contractor document portal for EPC partners — isolated project file access via Paxfab storage.",
};

async function ClientPortalContent() {
  const session = await getSession();
  if (session) {
    redirect("/client-portal/dashboard");
  }

  return <LoginForm />;
}

function PortalFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-slate-400">
      <Loader2 className="h-8 w-8 animate-spin text-[#6535b1]" aria-hidden />
      <span className="sr-only">Loading portal…</span>
    </div>
  );
}

export default function ClientPortalPage() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-purple-50/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(101,53,177,0.06),_transparent_55%)]" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <Suspense fallback={<PortalFallback />}>
          <ClientPortalContent />
        </Suspense>
      </div>
    </section>
  );
}
