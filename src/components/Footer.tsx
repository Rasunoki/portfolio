import { site } from "@/data/site";

const links = [
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "GitHub",   href: site.socials.github   },
  { label: "YouTube",  href: site.socials.youtube  },
  { label: "Email",    href: `mailto:${site.email}` },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]" style={{ background: "var(--bg)" }}>
      <div className="wrap py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 bg-[var(--fg)] text-[var(--bg)] text-[10px] font-black flex items-center justify-center rounded select-none">
            {site.initials}
          </span>
          <span className="text-xs font-semibold text-[var(--fg)]">{site.name}</span>
        </div>

        <nav aria-label="Elsewhere" className="flex items-center gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted)] hover:text-[var(--blue)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-[var(--subtle)]">
          © {new Date().getFullYear()} · Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
