"use client";

import { motion, type Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate when scrolled into view (default) or when `play` turns true */
  play?: boolean;
  as?: "h1" | "h2" | "h3" | "span" | "p";
};

const container: Variants = {
  hidden: {},
  show: (c: { delay: number; stagger: number }) => ({
    transition: { delayChildren: c.delay, staggerChildren: c.stagger },
  }),
};

const char: Variants = {
  hidden: { y: "115%", rotate: 8 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Masked character-by-character reveal. Words never break mid-word. */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  play,
  as = "span",
}: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : { animate: play ? "show" : "hidden" };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      custom={{ delay, stagger }}
      variants={container}
      {...trigger}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {Array.from(word).map((c, ci) => (
            <span
              key={ci}
              className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
            >
              <motion.span variants={char} className="inline-block origin-bottom-left">
                {c}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
