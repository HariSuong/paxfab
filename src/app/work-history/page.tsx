import type { Metadata } from "next";
import Link from "next/link";
import projects from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Work History",
  description:
    "Explore Paxfab project history across North America — interactive map coming soon.",
};

export default function WorkHistoryPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        Work History
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        Project Portfolio Across North America
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver/80">
        Interactive map with project detail drawers is planned for the next
        phase. Below is a preview of verified fabrication programs.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className="border border-white/10 bg-surface p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-brand">
              {project.category}
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-white">
              {project.name}
            </h2>
            <p className="mt-1 text-sm text-silver/70">{project.client}</p>
            <p className="text-sm text-silver/60">{project.location}</p>
            <p className="mt-3 font-display text-lg text-white">
              {project.tons.toLocaleString("en-US")} Tons
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-silver/50">
        Need project references?{" "}
        <Link href="/contact" className="text-brand hover:underline">
          Contact our engineering team
        </Link>
        .
      </p>
    </section>
  );
}
