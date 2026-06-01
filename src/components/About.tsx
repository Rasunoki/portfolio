"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";

const strengths = [
  "Music video direction & treatment writing",
  "Cinematography & lighting design",
  "Portrait & commercial photography",
  "Color grading & post-production",
  "Brand identity & graphic design",
];

export default function About() {
  return (
    <section id="about" className="sec border-t border-[var(--border)]" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
          >
            <SectionHeading
              label="About"
              title="Who I Am"
              subtitle="A student filmmaker and creative from Valenzuela City — directing music videos, shooting photography, and designing visuals one project at a time."
            />

            <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed mb-8">
              <p>
                I&apos;m Joseph Rafael, a 3rd year BSIT student at Pamantasan ng Lungsod ng Valenzuela (PLV) from
                Valenzuela City. Since 2023, I&apos;ve been directing music videos, shooting photography, and designing
                visuals — blending my technical background with a passion for creative storytelling.
              </p>
              <p>
                What started as a curiosity for visual media has grown into something I take seriously. Whether I&apos;m
                on set directing a music video, behind the lens shooting portraits, or at my desk designing — I put the
                same care and intention into everything I create.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--fg)] text-[var(--bg)] rounded-md hover:opacity-85 transition-all">
                Work With Me <ArrowRight size={13} />
              </button>
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-[var(--border)] text-[var(--fg)] rounded-md hover:border-[var(--fg)] hover:bg-[var(--bg)] transition-all">
                See My Work
              </button>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="card p-6">
              {/* Identity */}
              <div className="flex items-center gap-4 pb-5 border-b border-[var(--border)] mb-5">
                <div className="w-12 h-12 rounded-md bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center text-sm font-black select-none shrink-0">
                  JM
                </div>
                <div>
                  <p className="font-semibold text-[var(--fg)] text-sm">Joseph Rafael A. Macasling</p>
                  <p className="text-xs text-[var(--blue)] mt-0.5">Designer · Director · Photographer</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                    <span className="text-xs text-[var(--muted)]">Available for projects</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pb-5 border-b border-[var(--border)] mb-5">
                {[
                  { v: "2023", l: "Started"      },
                  { v: "15+",  l: "Music Videos" },
                  { v: "3rd",  l: "Year BSIT"   },
                ].map((s) => (
                  <div key={s.l} className="text-center p-3 rounded-md" style={{ background: "var(--bg2)" }}>
                    <p className="text-lg font-bold text-[var(--fg)]">{s.v}</p>
                    <p className="text-[10px] text-[var(--muted)] mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* What I do */}
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--subtle)] mb-3">What I Do</p>
              <div className="space-y-2">
                {strengths.map((s) => (
                  <div key={s} className="flex items-center gap-2.5 text-sm text-[var(--fg2)]">
                    <Check size={13} className="text-[var(--blue)] shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
