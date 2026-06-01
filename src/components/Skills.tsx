"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    title: "Video & Film",
    items: ["Music Video Direction", "Treatment Writing", "Cinematography", "Lighting Design", "Video Editing", "Color Grading", "DaVinci Resolve", "Adobe Premiere Pro"],
  },
  {
    title: "Photography",
    items: ["Portrait Photography", "Commercial Photography", "Fashion Photography", "On-Set Art Direction", "Photo Retouching", "Adobe Lightroom", "Capture One"],
  },
  {
    title: "Design",
    items: ["Brand Identity", "Logo Design", "Graphic Design", "Typography", "Art Direction", "Adobe Photoshop", "Adobe Illustrator", "Figma"],
  },
  {
    title: "Production",
    items: ["Pre-Production Planning", "On-Set Coordination", "Talent Direction", "Client Communication", "Project Management", "Budget Management"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="sec border-t border-[var(--border)]" style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeading
          label="Skills"
          title="What I Work With"
          subtitle="Tools, disciplines, and skills I use to bring creative projects from concept to completion."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {groups.map((g, gi) => (
            <motion.div key={g.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.07, duration: 0.38 }}
              className="card p-6"
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--blue)] mb-4 pb-3 border-b border-[var(--border)]">
                {g.title}
              </h3>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--fg2)]">
                    <span className="w-1 h-1 rounded-full bg-[var(--border)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
