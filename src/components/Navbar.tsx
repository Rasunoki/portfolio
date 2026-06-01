"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";

const links = [
  { label: "Showreel",   href: "#showreel"   },
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Gallery",    href: "#gallery"    },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted,  setMounted]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]"
          : ""
      }`}
    >
      <div className="wrap flex items-center justify-between h-14">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
        >
          <span className="w-7 h-7 bg-[var(--fg)] text-[var(--bg)] text-[11px] font-black flex items-center justify-center rounded select-none">
            JM
          </span>
          <span className="text-sm font-semibold text-[var(--fg)] hidden sm:block tracking-tight">
            J. R. Macasling
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="px-3.5 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--fg)] rounded-lg hover:bg-[var(--bg2)] transition-all duration-200"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--bg2)] transition-all duration-200"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
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
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--bg2)] transition-all duration-200"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
          <div className="wrap py-3 flex flex-col gap-0.5">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-left px-3 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--bg2)] rounded-lg transition-all"
              >
                {l.label}
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
          </div>
        </div>
      )}
    </header>
  );
}
