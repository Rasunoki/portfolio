"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const wipe: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Decided once per page load and cached, so useSyncExternalStore always reads
 * the same snapshot — re-reading sessionStorage after the intro finishes would
 * flip the value mid-render.
 */
let decision: boolean | null = null;

function shouldPlayIntro() {
  if (decision === null) {
    decision =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !sessionStorage.getItem("intro-done");
  }
  return decision;
}

// The intro is client-only: the server snapshot is always false, so the page
// markup ships without it and no hydration mismatch is possible.
const subscribe = () => () => {};
const serverSnapshot = () => false;

export default function IntroAnimation() {
  const play = useSyncExternalStore(subscribe, shouldPlayIntro, serverSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const show = play && !dismissed;

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDismissed(true), 3200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show]);

  const skip = () => setDismissed(true);

  return (
    <AnimatePresence onExitComplete={() => sessionStorage.setItem("intro-done", "1")}>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          style={{ background: "#0a0a0a" }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: wipe } }}
        >
          {/* Subtle ambient light — no gradient, single color */}
          <div
            className="orb float-a"
            style={{
              width: 600, height: 600,
              top: "-160px", left: "-120px",
              background: "#4f8ef7",
              opacity: 0.07,
            }}
          />
          <div
            className="orb float-b"
            style={{
              width: 460, height: 460,
              bottom: "-100px", right: "-100px",
              background: "#4f8ef7",
              opacity: 0.05,
            }}
          />

          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            onClick={skip}
            className="absolute top-6 right-8 text-xs tracking-[0.2em] uppercase transition-colors"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            Skip
          </motion.button>

          {/* Center content */}
          <div className="relative z-10 text-center px-6">

            {/* JM badge */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: "backOut" }}
              className="mx-auto mb-10 w-16 h-16 rounded-2xl flex items-center justify-center text-black text-xl font-black bg-white"
            >
              JM
            </motion.div>

            {/* Name line 1 */}
            <div style={{ overflow: "hidden", marginBottom: "4px" }}>
              <motion.p
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease }}
                className="font-bold text-white leading-none"
                style={{
                  fontSize: "clamp(2.6rem, 7.5vw, 5.2rem)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Joseph <span style={{ fontStyle: "italic" }}>Rafael</span>
              </motion.p>
            </div>

            {/* Name line 2 */}
            <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
              <motion.p
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.42, ease }}
                className="font-bold text-white leading-none"
                style={{
                  fontSize: "clamp(2.6rem, 7.5vw, 5.2rem)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                A. Macasling
              </motion.p>
            </div>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.75, ease }}
              className="mx-auto mb-6 h-px w-52 origin-center bg-white/20"
            />

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="text-sm font-semibold tracking-[0.22em] uppercase text-[#4f8ef7]"
            >
              Designer · Director · Photographer
            </motion.p>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.25 }}
              className="mt-2.5 text-xs tracking-[0.25em] uppercase"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Philippines
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.0, ease: "linear", delay: 0.15 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-white/20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
