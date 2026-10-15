"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { Project } from "@/types/project";
import "leaflet/dist/leaflet.css";

type ProjectMapProps = {
  projects: Project[];
  selectedId: string | null;
  onSelect: (project: Project) => void;
};

function createRedPinIcon(active: boolean) {
  const size = active ? 36 : 28;
  const color = "#DC2626";

  return L.divIcon({
    className: "paxfab-map-pin",
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.45));
        transform: translateY(-4px);
      ">
        <svg viewBox="0 0 24 36" width="${size}" height="${Math.round(size * 1.35)}" xmlns="http://www.w3.org/2000/svg">
          <path fill="${color}" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"/>
          <circle cx="12" cy="12" r="4.5" fill="#ffffff"/>
        </svg>
      </div>
    `,
    iconSize: [size, Math.round(size * 1.35)],
    iconAnchor: [size / 2, Math.round(size * 1.35)],
    popupAnchor: [0, -Math.round(size * 1.2)],
  });
}

/** Recalculate map size when layout/drawer changes so tiles don't stay blank. */
function MapInvalidateSize({ layoutKey }: { layoutKey: string | null }) {
  const map = useMap();

  useEffect(() => {
    const run = () => {
      try {
        map.invalidateSize({ animate: false });
      } catch {
        // Map may already be tearing down during route changes.
      }
    };
    run();
    const t1 = window.setTimeout(run, 100);
    const t2 = window.setTimeout(run, 350);
    window.addEventListener("resize", run);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", run);
    };
  }, [map, layoutKey]);

  return null;
}

function FlyToSelected({ project }: { project: Project | null }) {
  const map = useMap();

  useEffect(() => {
    if (!project) return;
    map.flyTo([project.lat, project.lng], 7, { duration: 1.0 });
    const t = window.setTimeout(() => {
      try {
        map.invalidateSize({ animate: false });
      } catch {
        // ignore teardown races
      }
    }, 200);
    return () => window.clearTimeout(t);
  }, [map, project]);

  return null;
}

function MapLoadingPlaceholder() {
  return (
    <div className="flex h-full min-h-[420px] w-full items-center justify-center bg-muted">
      <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
    </div>
  );
}

/**
 * Gate MapContainer behind a client mount key so React Strict Mode /
 * Soft Navigation remounts never reuse a Leaflet-initialized DOM node
 * ("Map container is being reused by another instance").
 */
export default function ProjectMap(props: ProjectMapProps) {
  const [mountKey, setMountKey] = useState<number | null>(null);

  useEffect(() => {
    setMountKey(Date.now());
    return () => setMountKey(null);
  }, []);

  if (mountKey === null) {
    return <MapLoadingPlaceholder />;
  }

  return <ProjectMapCanvas key={mountKey} {...props} />;
}

function ProjectMapCanvas({
  projects,
  selectedId,
  onSelect,
}: ProjectMapProps) {
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  const icons = useMemo(
    () => ({
      default: createRedPinIcon(false),
      active: createRedPinIcon(true),
    }),
    [],
  );

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      minZoom={3}
      maxZoom={10}
      scrollWheelZoom
      className="h-full w-full"
      style={{ height: "100%", width: "100%", minHeight: 420 }}
    >
      {/*
        Esri World Street Map — no API key; uses {z}/{y}/{x}.
        OSM / Carto were blocked or watermarked in local probes.
      */}
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        maxZoom={19}
      />
      <MapInvalidateSize layoutKey={selectedId} />
      <FlyToSelected project={selected} />
      {projects.map((project) => (
        <Marker
          key={project.id}
          position={[project.lat, project.lng]}
          icon={selectedId === project.id ? icons.active : icons.default}
          eventHandlers={{
            click: () => onSelect(project),
          }}
        />
      ))}
    </MapContainer>
  );
}
