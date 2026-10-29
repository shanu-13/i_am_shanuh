"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "./SplitReveal";

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={className}>
      <motion.p
        className="eyebrow mb-3 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="h-px w-10 origin-left bg-current"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {eyebrow}
      </motion.p>
      <SplitReveal
        as="h2"
        text={title}
        className={`font-display h-section ${titleClassName || "text-cream"}`}
      />
    </div>
  );
}
