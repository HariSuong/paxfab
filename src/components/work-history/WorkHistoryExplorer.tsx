"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { MapPin, X, Factory, User, ImageOff } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Project } from "@/types/project";
import "leaflet/dist/leaflet.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80";

const ProjectMap = dynamic(() => import("./ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center bg-charcoal-deep text-sm text-silver/60">
      Loading interactive map…
    </div>
  ),
});

type WorkHistoryExplorerProps = {
  projects: Project[];
};

function formatTons(tons: number) {
  return tons.toLocaleString("en-US");
}

function ProjectDrawerImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [stage, setStage] = useState<"primary" | "fallback" | "placeholder">(
    "primary",
  );

  useEffect(() => {
    setStage("primary");
  }, [src]);

  if (stage === "placeholder") {
    return (
      <div className="relative flex aspect-[16/10] w-full shrink-0 items-center justify-center bg-gradient-to-br from-brand/40 via-charcoal to-charcoal-deep">
        <div className="flex flex-col items-center gap-2 text-silver/50">
          <ImageOff className="h-8 w-8 text-brand/80" aria-hidden />
          <span className="text-xs uppercase tracking-[0.16em]">
            Project visual
          </span>
        </div>
      </div>
    );
  }

  const imageSrc = stage === "primary" ? src || FALLBACK_IMAGE : FALLBACK_IMAGE;

  return (
    <div className="relative aspect-[16/10] w-full shrink-0 bg-charcoal-deep">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="340px"
        onError={() => {
          setStage((current) => {
            if (current === "primary" && src !== FALLBACK_IMAGE) {
              return "fallback";
            }
            return "placeholder";
          });
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
    </div>
  );
}

export default function WorkHistoryExplorer({
  projects,
}: WorkHistoryExplorerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [projects, selectedId],
  );

  function selectProject(project: Project) {
    setSelectedId(project.id);
  }

  function clearSelection() {
    setSelectedId(null);
  }

  return (
    <div className="space-y-10">
      {/* Map + Drawer */}
      <div className="relative overflow-hidden border border-white/10 bg-charcoal-deep lg:grid lg:grid-cols-[340px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden h-[560px] flex-col border-r border-white/10 bg-charcoal lg:flex">
          <ProjectDrawer
            project={selected}
            onClose={clearSelection}
            desktop
          />
        </aside>

        <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[560px]">
          <ProjectMap
            projects={projects}
            selectedId={selectedId}
            onSelect={selectProject}
          />
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[400] rounded bg-charcoal/90 px-3 py-2 text-center text-[11px] text-silver/70 backdrop-blur-sm lg:left-auto lg:right-3 lg:max-w-xs lg:text-left">
            {projects.length} project locations across the U.S. &amp; Canada
          </div>
        </div>

        {/* Mobile bottom sheet */}
        {selected ? (
          <div className="fixed inset-x-0 bottom-0 z-[500] max-h-[70vh] overflow-y-auto border-t border-brand/40 bg-charcoal shadow-[0_-12px_40px_rgba(0,0,0,0.5)] lg:hidden">
            <ProjectDrawer project={selected} onClose={clearSelection} />
          </div>
        ) : null}
      </div>

      {/* Project list */}
      <div>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Project Directory
            </h2>
            <p className="mt-2 text-sm text-silver/70">
              Browse by name or tonnage — select a card to highlight it on the
              map.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-silver/45">
            Sorted by steel tonnage
          </p>
        </div>

        <div className="hidden overflow-x-auto border border-white/10 md:block">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface text-[11px] uppercase tracking-[0.16em] text-silver/55">
              <tr>
                <th className="px-4 py-3 font-semibold">Project</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="hidden px-4 py-3 font-semibold md:table-cell">
                  Location
                </th>
                <th className="px-4 py-3 font-semibold text-right">Tons</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const active = project.id === selectedId;
                return (
                  <tr
                    key={project.id}
                    onClick={() => selectProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectProject(project);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={active}
                    className={`cursor-pointer border-t border-white/10 transition-colors ${
                      active
                        ? "bg-brand/20"
                        : "bg-charcoal hover:bg-surface"
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-white">{project.name}</p>
                      <p className="mt-0.5 text-xs text-brand md:hidden">
                        {project.location}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-silver/80">
                      {project.client}
                    </td>
                    <td className="hidden px-4 py-3.5 text-silver/70 md:table-cell">
                      {project.location}
                    </td>
                    <td className="px-4 py-3.5 text-right font-display text-base font-bold text-white">
                      {formatTons(project.tons)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:hidden">
          {projects.map((project) => {
            const active = project.id === selectedId;
            return (
              <button
                key={`card-${project.id}`}
                type="button"
                onClick={() => selectProject(project)}
                className={`border p-4 text-left transition-colors ${
                  active
                    ? "border-brand bg-brand/15"
                    : "border-white/10 bg-charcoal hover:border-brand/50"
                }`}
              >
                <p className="font-display text-lg font-semibold text-white">
                  {project.name}
                </p>
                <p className="mt-1 text-sm text-silver/70">{project.client}</p>
                <p className="mt-1 text-xs text-silver/55">{project.location}</p>
                <p className="mt-3 font-display text-xl font-bold text-white">
                  {formatTons(project.tons)}{" "}
                  <span className="text-sm font-medium text-silver/50">
                    Tons
                  </span>
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectDrawer({
  project,
  onClose,
  desktop = false,
}: {
  project: Project | null;
  onClose: () => void;
  desktop?: boolean;
}) {
  if (!project) {
    return (
      <div
        className={`flex flex-1 flex-col justify-center p-6 ${
          desktop ? "h-full" : ""
        }`}
      >
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center border border-brand/40 bg-brand/15 text-brand">
          <MapPin className="h-5 w-5" aria-hidden />
        </div>
        <p className="font-display text-xl font-semibold text-white">
          Select a Project
        </p>
        <p className="mt-3 text-sm leading-relaxed text-silver/75">
          Click on any red pin on the map to view project details.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${desktop ? "h-full" : ""}`}>
      <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-brand px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            {project.category}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight text-white">
            {project.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <ProjectDrawerImage
        src={project.image}
        alt={`${project.name} industrial project`}
      />

      <div className="space-y-4 overflow-y-auto p-5">
        <DetailRow
          icon={<User className="h-4 w-4" aria-hidden />}
          label="Customer / General Contractor"
          value={project.client}
        />
        <DetailRow
          icon={<MapPin className="h-4 w-4" aria-hidden />}
          label="Location"
          value={project.location}
        />
        <DetailRow
          icon={<Factory className="h-4 w-4" aria-hidden />}
          label="Steel Tonnage"
          value={`${formatTons(project.tons)} Tons`}
          emphasize
        />
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  emphasize = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
        <span className="text-brand">{icon}</span>
        {label}
      </p>
      <p
        className={`mt-1.5 ${
          emphasize
            ? "font-display text-2xl font-bold text-white"
            : "text-sm leading-relaxed text-silver/90"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
