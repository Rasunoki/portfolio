"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Link2, GitFork, Send, CheckCircle, Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";

const info = [
  { icon: <Mail size={14} />,    label: "Email",    value: "josephrmacasling@gmail.com",        href: "mailto:josephrmacasling@gmail.com"             },
  { icon: <Link2 size={14} />,   label: "LinkedIn", value: "linkedin.com/in/joseph-rafael-macasling-1b1027412", href: "https://www.linkedin.com/in/joseph-rafael-macasling-1b1027412" },
  { icon: <GitFork size={14} />, label: "GitHub",   value: "github.com/Rasunoki",           href: "https://github.com/Rasunoki"        },
  { icon: <Phone size={14} />,   label: "Phone",    value: "+63 951 546 5994",              href: "tel:+639515465994"                  },
  { icon: <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, label: "Facebook", value: "facebook.com/josephrafael.macasling", href: "https://www.facebook.com/josephrafael.macasling" },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      setStatus(r.ok ? "sent" : "error");
      if (r.ok) setForm({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus("error"); }
  };

  const inp = "w-full px-3.5 py-2.5 text-sm rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] placeholder:text-[var(--subtle)] focus:outline-none focus:border-[var(--blue)] transition-colors";

  return (
    <section id="contact" className="sec border-t border-[var(--border)]" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <SectionHeading
          label="Contact"
          title="Let's Create Together"
          subtitle="Looking to direct your music video, shoot your campaign, or design your brand? Let's talk. I respond within 24–48 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="lg:col-span-2 space-y-2.5">

            {info.map((s) => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith("mailto") || s.href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-4 group">
                <span className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] group-hover:border-[var(--blue)] group-hover:text-[var(--blue)] transition-all shrink-0">
                  {s.icon}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--subtle)] font-semibold">{s.label}</p>
                  <p className="text-sm text-[var(--fg)]">{s.value}</p>
                </div>
              </a>
            ))}

            <div className="mt-2 px-4 py-3 rounded-md border-l-2 border-[var(--blue)] bg-[var(--blue-bg)]">
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Typically replies within <span className="font-semibold text-[var(--fg)]">24–48 hours</span>.
                Email is fastest for urgent matters.
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-3">

            {status === "sent" ? (
              <div className="card flex flex-col items-center justify-center text-center p-12">
                <CheckCircle size={40} className="text-[var(--green)] mb-4" />
                <h3 className="text-base font-semibold text-[var(--fg)] mb-2">Message Sent</h3>
                <p className="text-sm text-[var(--muted)] mb-5">Thank you — I&apos;ll get back to you shortly.</p>
                <button onClick={() => setStatus("idle")}
                  className="text-xs font-semibold text-[var(--blue)] hover:underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="card p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                      Name <span className="text-[var(--blue)]">*</span>
                    </label>
                    <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="Your full name" className={inp} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                      Email <span className="text-[var(--blue)]">*</span>
                    </label>
                    <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="your@email.com" className={inp} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={onChange} placeholder="Music video / Photography shoot / Design project / Collaboration" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                    Message <span className="text-[var(--blue)]">*</span>
                  </label>
                  <textarea name="message" value={form.message} onChange={onChange} required rows={5}
                    placeholder="Tell me about the opportunity or what you'd like to discuss…"
                    className={`${inp} resize-none`} />
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-500">Something went wrong. Please email josephrmacasling@gmail.com directly.</p>
                )}
                <button type="submit" disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold bg-[var(--fg)] text-[var(--bg)] rounded-md hover:opacity-85 disabled:opacity-50 transition-all">
                  {status === "sending"
                    ? <><span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" /> Sending…</>
                    : <><Send size={13} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
