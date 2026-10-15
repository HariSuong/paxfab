"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  label?: string;
};

const FALLBACK =
  "/images/the-production/Protuction-left-1_133335357752481870.jpg";

export default function ImageGallery({ images, label }: ImageGalleryProps) {
  const slides =
    images.length > 0
      ? images
      : [{ src: FALLBACK, alt: "Industrial fabrication" }];
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused || lightboxOpen || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, lightboxOpen, count]);

  useEffect(() => {
    if (!lightboxOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, count]);

  const current = slides[index];

  return (
    <>
      <div
        className="group relative overflow-hidden rounded border border-gray-200 bg-muted shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {label ? (
          <p className="absolute left-3 top-3 z-10 rounded bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {label}
          </p>
        ) : null}

        <button
          type="button"
          className="relative block aspect-[16/10] w-full cursor-zoom-in text-left"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open enlarged view: ${current.alt}`}
        >
          <Image
            src={current.src || FALLBACK}
            alt={current.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70" />
          <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded bg-brand text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" aria-hidden />
          </span>
          {current.caption ? (
            <span className="absolute bottom-3 left-3 max-w-[70%] text-left text-xs text-white/90">
              {current.caption}
            </span>
          ) : null}
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded bg-white/90 text-ink shadow-sm transition-colors hover:bg-brand hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded bg-white/90 text-ink shadow-sm transition-colors hover:bg-brand hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === index
                      ? "w-5 bg-brand"
                      : "bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-[70] inline-flex h-11 w-11 items-center justify-center rounded bg-white/10 text-white transition-colors hover:bg-brand"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 z-[70] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-white/10 text-white transition-colors hover:bg-brand sm:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 z-[70] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-white/10 text-white transition-colors hover:bg-brand sm:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          ) : null}

          <div
            className="relative h-[70vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src || FALLBACK}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="100vw"
              preload
            />
          </div>

          <p className="absolute bottom-5 left-1/2 max-w-xl -translate-x-1/2 text-center text-sm text-white/80">
            {current.alt}
            {count > 1 ? (
              <span className="mt-1 block text-xs text-white/50">
                {index + 1} / {count} · Esc to close
              </span>
            ) : (
              <span className="mt-1 block text-xs text-white/50">
                Esc to close
              </span>
            )}
          </p>
        </div>
      ) : null}
    </>
  );
}
