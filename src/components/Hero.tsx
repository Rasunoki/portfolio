"use client";

import { motion } from "framer-motion";
import { Mail, Link2, GitFork, ArrowRight, Download } from "lucide-react";

const stats = [
  { value: "2023", label: "Started"       },
  { value: "15+",  label: "Videos Directed" },
  { value: "PLV",  label: "BSIT Student"  },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-14 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle ambient orbs — single color, no gradient */}
      <div
        className="orb float-a"
        style={{
          width: 500, height: 500,
          top: "-100px", left: "-80px",
          background: "var(--blue)",
          opacity: 0.04,
        }}
      />
      <div
        className="orb float-b"
        style={{
          width: 380, height: 380,
          top: "35%", right: "-100px",
          background: "var(--blue)",
          opacity: 0.03,
        }}
      />

      <div className="wrap w-full py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 mb-10"
          >
            <span className="pulse-dot w-2 h-2 rounded-full bg-[var(--green)]" />
            <span className="text-sm text-[var(--muted)]">Available for new projects</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-[clamp(3rem,8vw,5.5rem)] font-bold tracking-tight leading-[1.0] text-[var(--fg)] mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Joseph <span className="italic">Rafael</span>
            <br />
            A. Macasling
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-lg font-medium text-[var(--blue)] mb-6"
          >
            Designer · Music Video Director · Photographer
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-[var(--muted)] leading-relaxed max-w-xl mb-10"
          >
            A student filmmaker from Valenzuela City — directing music videos,
            shooting photography, and designing visuals since 2023.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--fg)] text-[var(--bg)] rounded-lg hover:opacity-85 transition-all"
            >
              View My Work <ArrowRight size={14} />
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-[var(--border)] text-[var(--fg)] rounded-lg hover:border-[var(--fg)] hover:bg-[var(--bg2)] transition-all"
            >
              <Download size={14} /> Download CV
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="flex items-center gap-10 pb-12 border-b border-[var(--border)] mb-10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="text-2xl font-bold text-[var(--fg)]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.38 }}
            className="flex items-center gap-6"
          >
            {[
              { icon: <Mail size={14} />,    href: "mailto:josephrmacasling@gmail.com",            label: "Email"    },
              { icon: <Link2 size={14} />,   href: "https://www.linkedin.com/in/joseph-rafael-macasling-1b1027412", label: "LinkedIn" },
              { icon: <GitFork size={14} />, href: "https://github.com/Rasunoki",           label: "GitHub"   },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--blue)] transition-colors duration-200"
              >
                {s.icon} {s.label}
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
