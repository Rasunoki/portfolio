"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { photos, categories, type GalleryPhoto } from "@/data/gallery";

/** Matches the masonry breakpoints in globals.css. */
const GRID_SIZES = "(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw";

export default function Gallery() {
  const [active, setActive]     = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);
  const closeRef                = useRef<HTMLButtonElement>(null);
  const lastFocused             = useRef<HTMLElement | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);
  const currentIndex = lightbox ? filtered.findIndex((p) => p.id === lightbox.id) : -1;

  const prev = useCallback(() => {
    setLightbox((cur) => {
      if (!cur) return cur;
      const i = filtered.findIndex((p) => p.id === cur.id);
      return i > 0 ? filtered[i - 1] : cur;
    });
  }, [filtered]);

  const next = useCallback(() => {
    setLightbox((cur) => {
      if (!cur) return cur;
      const i = filtered.findIndex((p) => p.id === cur.id);
      return i < filtered.length - 1 ? filtered[i + 1] : cur;
    });
  }, [filtered]);

  const open = (photo: GalleryPhoto) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setLightbox(photo);
  };

  const close = useCallback(() => {
    setLightbox(null);
    // Return focus to the thumbnail the viewer came from.
    lastFocused.current?.focus();
  }, []);

  /* Keyboard control + scroll lock while the lightbox is open. */
  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { e.preventDefault(); close(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev();  }
      if (e.key === "ArrowRight") { e.preventDefault(); next();  }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, prev, next]);

  return (
    <>
      <section
        id="gallery"
        className="sec border-t border-[var(--border)]"
        style={{ background: "var(--bg)" }}
      >
        <div className="wrap">
          <SectionHeading
            label="Gallery"
            title="Selected Stills"
            subtitle="Stills shot on location and between takes — portraits, street frames, and moments that did not need a set."
          />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter photos by category">
            {categories.map((cat) => {
              const on = active === cat;
              const n = cat === "All" ? photos.length : photos.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  aria-pressed={on}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                    on
                      ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]"
                      : "bg-transparent text-[var(--muted)] border-[var(--border)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
                  }`}
                >
                  {cat} <span className="opacity-50 ml-1">({n})</span>
                </button>
              );
            })}
          </div>

          {/* Masonry grid — column count comes from .masonry in globals.css */}
          <div className="masonry">
            {filtered.map((photo, i) => (
              <motion.button
                key={photo.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                // Stagger is capped so late items in a long grid do not sit blank.
                transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
                className="block w-full cursor-pointer group relative overflow-hidden rounded-lg border border-[var(--border)] text-left"
                onClick={() => open(photo)}
                aria-label={`Open photo: ${photo.alt}`}
              >
                <div
                  className="w-full bg-[var(--bg2)] relative overflow-hidden"
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={GRID_SIZES}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Hover / focus overlay */}
                  <div className="absolute inset-0 bg-[var(--fg)]/0 group-hover:bg-[var(--fg)]/60 group-focus-visible:bg-[var(--fg)]/60 transition-all duration-300 flex items-end p-4">
                    <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 transition-all duration-300">
                      <p className="text-xs font-semibold text-white line-clamp-2">{photo.alt}</p>
                      <p className="text-[10px] text-white/60 mt-0.5">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full bg-[var(--surface)] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  width={lightbox.width}
                  height={lightbox.height}
                  sizes="(min-width: 900px) 896px, 100vw"
                  // Cap the height so tall portraits still fit above the caption.
                  className="w-full h-auto max-h-[72vh] object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 px-1">
                <div>
                  <p className="text-sm font-semibold text-white">{lightbox.alt}</p>
                  <p className="text-xs text-white/40 mt-0.5">{lightbox.category}</p>
                </div>
                <p className="text-xs text-white/30 shrink-0">
                  {currentIndex + 1} / {filtered.length}
                </p>
              </div>

              <p className="mt-2 px-1 text-[10px] uppercase tracking-widest text-white/25">
                Esc to close · ← → to browse
              </p>
            </motion.div>

            <button
              ref={closeRef}
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-white" />
            </button>

            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
            )}

            {currentIndex < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
