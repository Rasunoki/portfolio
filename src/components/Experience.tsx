"use client";

import { motion } from "framer-motion";
import { workExperience, education } from "@/data/experience";
import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="sec border-t border-[var(--border)]" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <SectionHeading
          label="Experience"
          title="Work History"
          subtitle="Directing, shooting, and cutting for independent artists, indie game studios, and my university since 2022."
        />

        {/* Work */}
        <div className="space-y-4 mb-14">
          {workExperience.map((exp, i) => (
            <motion.div key={exp.id}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
              className="card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-[var(--fg)]">{exp.role}</h3>
                  <p className="text-sm text-[var(--blue)] font-medium mt-0.5">{exp.company}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{exp.location}</p>
                </div>
                <span className="text-xs text-[var(--muted)] px-2.5 py-1 border border-[var(--border)] rounded-md whitespace-nowrap"
                  style={{ background: "var(--bg)" }}>
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>

              <motion.ul
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2 mb-4"
              >
                {exp.bullets.map((b, bi) => (
                  <motion.li
                    key={bi}
                    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                    className="flex gap-2.5 text-sm text-[var(--muted)]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--blue)] mt-2 shrink-0" />
                    {b}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((sk) => (
                  <span key={sk} className="text-[11px] px-2 py-0.5 border border-[var(--border)] text-[var(--muted)] rounded">
                    {sk}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-[var(--blue)]" />
            <h3 className="text-base font-semibold text-[var(--fg)]">Education</h3>
          </div>
          <div className="space-y-3">
            {education.map((edu) => (
              <motion.div key={edu.id}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35 }}
                className="card flex flex-wrap items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <h4 className="font-semibold text-sm text-[var(--fg)]">{edu.institution}</h4>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{edu.degree} · {edu.field}</p>
                  {edu.honors && (
                    <p className="text-xs text-[var(--blue)] mt-1 font-medium">{edu.honors}</p>
                  )}
                </div>
                <span className="text-xs text-[var(--muted)] px-2.5 py-1 border border-[var(--border)] rounded-md"
                  style={{ background: "var(--bg2)" }}>
                  {edu.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
