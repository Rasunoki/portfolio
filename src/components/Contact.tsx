"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Link2, GitFork, Send, CheckCircle, Phone, AlertCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";

/**
 * Form endpoint. Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) to POST
 * submissions. Left unset, the form falls back to opening a pre-filled email
 * in the visitor's mail client — so it always does something useful rather
 * than failing silently against a placeholder URL.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const info = [
  { icon: <Mail size={14} />,    label: "Email",    value: site.email,                                        href: `mailto:${site.email}`  },
  { icon: <Link2 size={14} />,   label: "LinkedIn", value: "linkedin.com/in/joseph-rafael-macasling-1b1027412", href: site.socials.linkedin },
  { icon: <GitFork size={14} />, label: "GitHub",   value: "github.com/Rasunoki",                             href: site.socials.github     },
  { icon: <Phone size={14} />,   label: "Phone",    value: site.phone,                                        href: site.phoneHref          },
  {
    icon: (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    label: "Facebook",
    value: "facebook.com/josephrafael.macasling",
    href: site.socials.facebook,
  },
];

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm]     = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Bots fill hidden fields; humans never see this one.
  const [honeypot, setHoneypot] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const openMailClient = () => {
    const subject = form.subject || `Portfolio enquiry from ${form.name}`;
    const body = `${form.message}\n\n—\n${form.name}\n${form.email}`;
    window.location.href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return; // silently drop bot submissions

    // No endpoint configured — hand off to the visitor's mail client.
    if (!ENDPOINT) {
      openMailClient();
      setStatus("sent");
      setForm(EMPTY);
      return;
    }

    setStatus("sending");
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? "sent" : "error");
      if (r.ok) setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const inp =
    "w-full px-3.5 py-2.5 text-sm rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] placeholder:text-[var(--subtle)] focus:outline-none focus:border-[var(--blue)] transition-colors";

  return (
    <section id="contact" className="sec border-t border-[var(--border)]" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <SectionHeading
          label="Contact"
          title="Let's Create Together"
          subtitle="Looking to direct your music video, shoot your campaign, or design your brand? Let's talk. I respond within 24–48 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 space-y-2.5"
          >
            {info.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") || s.href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="card flex items-center gap-4 p-4 group"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] group-hover:border-[var(--blue)] group-hover:text-[var(--blue)] transition-all shrink-0">
                  {s.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--subtle)] font-semibold">
                    {s.label}
                  </p>
                  <p className="text-sm text-[var(--fg)] truncate">{s.value}</p>
                </div>
              </a>
            ))}

            <div className="mt-2 px-4 py-3 rounded-md border-l-2 border-[var(--blue)] bg-[var(--blue-bg)]">
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Typically replies within{" "}
                <span className="font-semibold text-[var(--fg)]">24–48 hours</span>. Email is fastest
                for urgent matters.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-3"
          >
            {status === "sent" ? (
              <div className="card flex flex-col items-center justify-center text-center p-12" role="status">
                <CheckCircle size={40} className="text-[var(--green)] mb-4" />
                <h3 className="text-base font-semibold text-[var(--fg)] mb-2">
                  {ENDPOINT ? "Message Sent" : "Email Ready"}
                </h3>
                <p className="text-sm text-[var(--muted)] mb-5">
                  {ENDPOINT
                    ? "Thank you — I will get back to you shortly."
                    : "Your mail app should have opened with the message ready to send."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs font-semibold text-[var(--blue)] hover:underline"
                >
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="card p-6 space-y-4" noValidate={false}>
                {/* Honeypot — visually hidden, ignored by humans */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cf-name" className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                      Name <span className="text-[var(--blue)]">*</span>
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      placeholder="Your full name"
                      className={inp}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                      Email <span className="text-[var(--blue)]">*</span>
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="your@email.com"
                      className={inp}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-subject" className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    id="cf-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="Music video / Photography shoot / Design project"
                    className={inp}
                  />
                </div>

                <div>
                  <label htmlFor="cf-message" className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase tracking-wide">
                    Message <span className="text-[var(--blue)]">*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="Tell me about the project or what you would like to discuss…"
                    className={`${inp} resize-none`}
                  />
                </div>

                <div aria-live="polite">
                  {status === "error" && (
                    <p className="flex items-start gap-2 text-xs text-red-500">
                      <AlertCircle size={13} className="shrink-0 mt-0.5" />
                      <span>
                        Something went wrong. Please email{" "}
                        <a href={`mailto:${site.email}`} className="underline font-semibold">
                          {site.email}
                        </a>{" "}
                        directly.
                      </span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold bg-[var(--fg)] text-[var(--bg)] rounded-md hover:opacity-85 disabled:opacity-50 transition-all"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={13} /> {ENDPOINT ? "Send Message" : "Compose Email"}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
