"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

const CATS = ["All", "Music Video", "Photography", "Design", "Branding", "Other"] as const;

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="sec border-t border-[var(--border)]" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading
          label="Work"
          title="Projects & Highlights"
          subtitle="A selection of music videos, photography, and design work — each built around a clear creative vision."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((cat) => {
            const n = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            if (cat !== "All" && n === 0) return null;
            const on = active === cat;
            return (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                  on
                    ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]"
                    : "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
                }`}>
                {cat} <span className="opacity-50 ml-1">({n})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
