export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]" style={{ background: "var(--bg)" }}>
      <div className="wrap py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 bg-[var(--fg)] text-[var(--bg)] text-[10px] font-black flex items-center justify-center rounded select-none">
            JM
          </span>
          <span className="text-xs font-semibold text-[var(--fg)]">Joseph Rafael A. Macasling</span>
        </div>
        <p className="text-xs text-[var(--subtle)]">
          © {new Date().getFullYear()} · Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
