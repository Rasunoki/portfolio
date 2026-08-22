"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { sections } from "@/data/site";
import { useMounted } from "@/hooks/useMounted";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 240, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight whichever section currently occupies the middle of the viewport. */
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      // A band across the middle of the screen, so a section counts as "active"
      // only once it is genuinely what the viewer is looking at.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Close the mobile drawer on Escape. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]" : ""
      }`}
    >
      <div className="wrap flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="w-7 h-7 bg-[var(--fg)] text-[var(--bg)] text-[11px] font-black flex items-center justify-center rounded select-none">
            JM
          </span>
          <span className="text-sm font-semibold text-[var(--fg)] hidden sm:block tracking-tight">
            J. R. Macasling
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Sections">
          {sections.map((s) => {
            const on = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                aria-current={on ? "true" : undefined}
                className={`relative px-3.5 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                  on
                    ? "text-[var(--fg)] font-medium"
                    : "text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--bg2)]"
                }`}
              >
                {s.label}
                {on && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[var(--blue)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--bg2)] transition-all duration-200"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold bg-[var(--fg)] text-[var(--bg)] rounded-lg hover:opacity-85 transition-all"
          >
            Resume
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--bg2)] transition-all duration-200"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-[var(--blue)]"
      />

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl"
        >
          <nav className="wrap py-3 flex flex-col gap-0.5" aria-label="Sections">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                aria-current={activeId === s.id ? "true" : undefined}
                className={`text-left px-3 py-2.5 text-sm rounded-lg transition-all ${
                  activeId === s.id
                    ? "text-[var(--fg)] font-medium bg-[var(--bg2)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--bg2)]"
                }`}
              >
                {s.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 py-2.5 text-sm font-semibold text-center bg-[var(--fg)] text-[var(--bg)] rounded-lg hover:opacity-85 transition-all"
            >
              Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
