import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSession } from "@/lib/auth";
import PortalDashboard from "@/components/portal/PortalDashboard";

export const metadata: Metadata = {
  title: "Project Repository",
  description:
    "Authenticated Paxfab client portal — download and upload project drawings with per-client isolation.",
};

async function DashboardContent() {
  const session = await getSession();
  if (!session) {
    redirect("/client-portal");
  }

  return <PortalDashboard user={session} />;
}

function DashboardFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center gap-2 text-slate-500">
      <Loader2 className="h-6 w-6 animate-spin text-[#6535b1]" aria-hidden />
      Loading project repository…
    </div>
  );
}

export default function ClientPortalDashboardPage() {
  return (
    <section className="relative min-h-[70vh] bg-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#6535b1]/5 to-transparent" />
      <div className="relative w-full">
        <Suspense fallback={<DashboardFallback />}>
          <DashboardContent />
        </Suspense>
      </div>
    </section>
  );
}
