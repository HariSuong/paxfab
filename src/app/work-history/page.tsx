import type { Metadata } from "next";
import WorkHistoryExplorer from "@/components/work-history/WorkHistoryExplorer";
import projects from "@/data/projects.json";

import type { Project } from "@/types/project";

export const metadata: Metadata = {
  title: "Work History",
  description:
    "Interactive map of Paxfab structural steel project locations across North America — from Alberta to the Gulf Coast.",
};

const projectsData = projects as Project[];

export default function WorkHistoryPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
          Work History
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-gray-950 sm:text-5xl">
          Project Locations &amp; Work History
        </h1>
        <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-gray-700 sm:text-lg">
          Take a look at just a few of the areas across North America where our
          structural steel projects have taken place.
        </p>

        <div className="mt-10">
          <WorkHistoryExplorer projects={projectsData} />
        </div>
      </div>
    </section>
  );
}
