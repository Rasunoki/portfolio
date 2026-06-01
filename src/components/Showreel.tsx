"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "./SectionHeading";

// Replace with your actual YouTube video ID
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ → VIDEO_ID = "dQw4w9WgXcQ"
const VIDEO_ID = "YOUR_YOUTUBE_VIDEO_ID";

export default function Showreel() {
  const [playing, setPlaying] = useState(false);

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
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group"
              style={{ background: "var(--surface)" }}
              aria-label="Play showreel"
            >
              {/*
                Optional: add a thumbnail image behind the play button.
                Place your thumbnail at /public/showreel-thumb.jpg and uncomment:

                <img
                  src="/showreel-thumb.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Showreel thumbnail"
                />
                <div className="absolute inset-0 bg-black/40" />
              */}

              {/* Play button */}
              <div className="relative z-10 flex flex-col items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-[var(--fg)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play size={30} className="text-[var(--bg)] ml-1.5" fill="currentColor" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[var(--fg)]">2024 Showreel</p>
                  <p className="text-sm text-[var(--muted)] mt-0.5">Click to play</p>
                </div>
              </div>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
