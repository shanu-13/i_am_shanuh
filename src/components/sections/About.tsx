"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { about } from "@/lib/data";
import { easeOut, wrap } from "@/lib/ui";
import { Counter } from "../ui/Counter";
import { SectionHeading } from "../ui/SectionHeading";

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block ${accent ? "font-serif font-normal italic text-rose" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Each word lights up as you scroll past it. */
function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="max-w-5xl text-[clamp(1.6rem,4.4vw,3.6rem)] font-medium leading-[1.15] tracking-tight">
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, start + 1 / words.length]}
            accent={/^(stages|night|people)/.test(w)}
          >
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function TiltCard({ eyebrow, body, icon, index }: { eyebrow: string; body: string; icon: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: index ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: easeOut, delay: index * 0.12 }}
      className="[perspective:900px]"
    >
      <div
        ref={ref}
        className="group relative h-full overflow-hidden bg-maroon-deep p-7 transition-transform duration-300 ease-out sm:p-9"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ref.current.style.transform = `rotateY(${px * 10}deg) rotateX(${py * -10}deg)`;
          ref.current.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
          ref.current.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
        }}
        onPointerLeave={() => {
          if (ref.current) ref.current.style.transform = "";
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--gx,50%)_var(--gy,50%),rgb(212_154_154/0.18),transparent_60%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <p className="eyebrow">{eyebrow}</p>
          <span className="font-display text-2xl text-rose/40 transition-all duration-500 group-hover:rotate-12 group-hover:text-rose">
            {icon}
          </span>
        </div>
        <p className="relative mt-5 text-[15px] leading-relaxed text-cream/85 sm:text-base">{body}</p>
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className={`${wrap} relative py-24 sm:py-32`}>
      <SectionHeading eyebrow="Nice to meet you" title="Two stages, one habit" />

      <div className="mt-12 sm:mt-16">
        <ScrollStatement text={about.statement} />
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
        {about.cards.map((c, i) => (
          <TiltCard key={c.eyebrow} {...c} index={i} />
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 border-t border-cream/15 pt-12 sm:grid-cols-3 sm:gap-6">
        {about.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.8, ease: easeOut }}
          >
            <Counter
              value={s.value}
              decimals={s.decimals}
              suffix={s.suffix}
              className="font-display block text-[clamp(2.6rem,7vw,5.5rem)] text-rose tabular-nums"
            />
            <p className="mt-3 text-sm text-cream/80">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
