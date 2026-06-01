"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { photos, categories, type GalleryPhoto } from "@/data/gallery";

const aspectClass = {
  portrait:  "aspect-[2/3]",
  landscape: "aspect-[3/2]",
  square:    "aspect-square",
};

export default function Gallery() {
  const [active, setActive]     = useState("All");
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  const currentIndex = lightbox ? filtered.findIndex((p) => p.id === lightbox.id) : -1;

  const prev = () => {
    if (currentIndex > 0) setLightbox(filtered[currentIndex - 1]);
  };
  const next = () => {
    if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1]);
  };

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
            subtitle="A selection of stills from music video productions, portrait sessions, and commercial shoots."
          />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                  active === cat
                    ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]"
                    : "bg-transparent text-[var(--muted)] border-[var(--border)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="bg-white rounded-2xl p-4">
          <div
            className="gap-3"
            style={{
              columns: "var(--cols, 3)",
              columnGap: "0.75rem",
              // @ts-expect-error css variable
              "--cols": "3",
            }}
          >
            <style>{`
              @media (max-width: 640px)  { #gallery-grid { columns: 1 !important; } }
              @media (max-width: 1024px) { #gallery-grid { columns: 2 !important; } }
            `}</style>
            <div id="gallery-grid" style={{ columns: 3, columnGap: "0.75rem" }}>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  style={{ breakInside: "avoid", marginBottom: "0.75rem" }}
                  className="cursor-pointer group relative overflow-hidden rounded-lg border border-[var(--border)]"
                  onClick={() => setLightbox(photo)}
                >
                  <div
                    className={`w-full ${aspectClass[photo.aspect]} bg-[var(--bg2)] relative overflow-hidden`}
                  >
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[var(--fg)]/0 group-hover:bg-[var(--fg)]/60 transition-all duration-300 flex items-end p-4">
                      <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-xs font-semibold text-white">{photo.alt}</p>
                        <p className="text-[10px] text-white/60 mt-0.5">{photo.category}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Content */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image area */}
              <div
                className={`w-full ${aspectClass[lightbox.aspect]} bg-[var(--surface)] rounded-xl overflow-hidden border border-white/10`}
              >
                <img src={lightbox.src} alt={lightbox.alt} className="w-full h-full object-cover" />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <p className="text-sm font-semibold text-white">{lightbox.alt}</p>
                  <p className="text-xs text-white/40 mt-0.5">{lightbox.category}</p>
                </div>
                <p className="text-xs text-white/30">{currentIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-white" />
            </button>

            {/* Prev */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
            )}

            {/* Next */}
            {currentIndex < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
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
