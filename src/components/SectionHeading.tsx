"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45 }}
      className="mb-10"
    >
      <p className="section-label text-xs font-semibold uppercase tracking-[0.14em] text-[var(--blue)] mb-3">
        {label}
      </p>
      <h2
        className="font-display text-2xl sm:text-[2rem] font-bold text-[var(--fg)] tracking-tight leading-tight mb-3"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
