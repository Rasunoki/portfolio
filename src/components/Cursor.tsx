"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX = useSpring(mx, { stiffness: 3000, damping: 120 });
  const dotY = useSpring(my, { stiffness: 3000, damping: 120 });

  const ringX = useSpring(mx, { stiffness: 180, damping: 26 });
  const ringY = useSpring(my, { stiffness: 180, damping: 26 });

  const ringW = useMotionValue(28);
  const ringH = useMotionValue(28);
  const rW = useSpring(ringW, { stiffness: 280, damping: 28 });
  const rH = useSpring(ringH, { stiffness: 280, damping: 28 });

  useEffect(() => {
    // Skip on touch/coarse pointers and whenever the viewer asks for reduced motion.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button, [role='button']")) {
        ringW.set(44);
        ringH.set(44);
      }
    };

    const out = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button, [role='button']")) {
        ringW.set(28);
        ringH.set(28);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [mx, my, ringW, ringH]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: rW,
          height: rH,
          borderRadius: "50%",
          border: "1.5px solid #fff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0.75,
        }}
      />
    </>
  );
}
