"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./providers/Providers";

const curtain =
  "repeating-linear-gradient(90deg, #4a0626 0 18px, #5e0a33 18px 40px, #4a0626 40px 58px)";

/** Opening night: a counter runs, then the stage curtains part. */
export function Preloader() {
  const { setIntroDone } = useApp();
  const [phase, setPhase] = useState<"count" | "open" | "gone">("count");
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      setIntroDone(true);
      return;
    }
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
      onComplete: () => {
        setPhase("open");
        setTimeout(() => setIntroDone(true), 450);
        setTimeout(() => setPhase("gone"), 1500);
      },
    });
    return () => controls.stop();
  }, [setIntroDone]);

  if (phase === "gone") return null;

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden" aria-hidden>
      {/* Curtains */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        style={{ background: curtain }}
        animate={phase === "open" ? { x: "-100%", skewY: -4 } : { x: 0 }}
        transition={{ duration: 1.1, ease }}
      >
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent" />
      </motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2"
        style={{ background: curtain }}
        animate={phase === "open" ? { x: "100%", skewY: 4 } : { x: 0 }}
        transition={{ duration: 1.1, ease }}
      >
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
      </motion.div>

      {/* Valance */}
      <motion.div
        className="absolute inset-x-0 top-0 h-14 bg-maroon-ink sm:h-20"
        style={{
          maskImage: "radial-gradient(circle at 50% 100%, transparent 22px, #000 23px)",
          maskSize: "64px 100%",
          WebkitMaskImage: "radial-gradient(circle at 50% 100%, transparent 22px, #000 23px)",
          WebkitMaskSize: "64px 100%",
        }}
        animate={phase === "open" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      />

      <AnimatePresence>
        {phase === "count" && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-hidden">
              <motion.p
                className="font-serif text-6xl italic text-cream sm:text-8xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                Shanuh
              </motion.p>
            </div>
            <motion.p
              className="mt-4 text-[11px] uppercase tracking-[0.4em] text-rose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tonight’s show is about to begin
            </motion.p>
            <span
              ref={countRef}
              className="font-display absolute bottom-6 right-5 text-[22vw] leading-none text-cream/10 sm:bottom-8 sm:right-10 sm:text-[12rem]"
            >
              000
            </span>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-maroon-deep">
              <motion.div
                className="h-full origin-left bg-rose"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
