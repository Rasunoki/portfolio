"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";

const { videoId, title, subtitle } = site.showreel;

export default function Showreel() {
  const [playing, setPlaying] = useState(false);
  // maxres is not generated for every upload; fall back to the always-present hq frame.
  const [thumb, setThumb] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  );

  return (
    <section
      id="showreel"
      className="sec border-t border-[var(--border)]"
      style={{ background: "var(--bg2)" }}
    >
      <div className="wrap">
        <SectionHeading
          label="Showreel"
          title="Watch My Work"
          subtitle="A curated selection of my best music video and visual direction work."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full overflow-hidden rounded-xl border border-[var(--border)]"
          style={{ aspectRatio: "16 / 9" }}
        >
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /*
             * The iframe only mounts on click — the poster costs one image
             * instead of the ~1MB of YouTube player scripts an eager embed pulls in.
             */
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group"
              style={{ background: "var(--surface)" }}
              aria-label={`Play showreel: ${title}`}
            >
              <Image
                src={thumb}
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1100px) 1036px, 100vw"
                className="object-cover"
                onError={() =>
                  setThumb(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
                }
              />
              <div className="absolute inset-0 bg-black/55" />

              <div className="relative z-10 flex flex-col items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play size={30} className="text-black ml-1.5" fill="currentColor" />
                </div>
                <div className="text-center px-4">
                  <p className="text-base font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/60 mt-0.5">{subtitle}</p>
                </div>
              </div>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
