"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { lab } from "@/lib/data";
import { easeOut, wrap } from "@/lib/ui";
import { SectionHeading } from "../ui/SectionHeading";

const swatches = [
  { hex: "#7C0E44", name: "Maroon" },
  { hex: "#AA5E7A", name: "Mauve" },
  { hex: "#D49A9A", name: "Rose" },
  { hex: "#F2DACE", name: "Cream" },
];

function FrameArt() {
  const draw = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
  };
  return (
    <svg viewBox="0 0 200 110" className="h-full w-full text-cream" fill="none" stroke="currentColor">
      <motion.rect x="10" y="10" width="180" height="90" strokeWidth="2" {...draw} transition={{ duration: 1.2 }} />
      <motion.rect x="18" y="18" width="164" height="8" fill="currentColor" stroke="none" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.6 }} style={{ originX: 0 }} />
      <motion.rect x="18" y="36" width="104" height="56" strokeWidth="1.5" strokeDasharray="5 4" {...draw} transition={{ delay: 1, duration: 1 }} />
      <motion.rect x="130" y="36" width="52" height="40" strokeWidth="2" {...draw} transition={{ delay: 1.3, duration: 0.8 }} />
    </svg>
  );
}

function ColourArt() {
  const [copied, setCopied] = useState<string | null>(null);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex gap-3">
        {swatches.map((s, i) => (
          <motion.button
            key={s.hex}
            data-cursor="Copy"
            aria-label={`Copy ${s.name} ${s.hex}`}
            onClick={() => {
              navigator.clipboard?.writeText(s.hex);
              setCopied(s.hex);
              setTimeout(() => setCopied(null), 1400);
            }}
            className="h-10 w-10 border border-cream/60 sm:h-12 sm:w-12"
            style={{ background: s.hex }}
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            whileHover={{ y: -8, rotate: i % 2 ? 8 : -8 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 + i * 0.12 }}
          />
        ))}
      </div>
      <p className="h-4 text-[11px] uppercase tracking-[0.2em] text-cream/70">
        {copied ? `${copied} copied ✓` : "tap a swatch"}
      </p>
    </div>
  );
}

const code = [`<Hero />`, `<Events count="60+" />`, `<Contact />`];

function CodeArt() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 font-mono text-[12px] text-cream sm:text-[13px]">
      {code.map((line, i) => (
        <motion.p
          key={line}
          className="overflow-hidden whitespace-nowrap"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.7, ease: "linear" }}
        >
          <span className="text-rose">{line.slice(0, 1)}</span>
          {line.slice(1, -2)}
          <span className="text-rose">{line.slice(-2)}</span>
        </motion.p>
      ))}
      <motion.span
        className="inline-block h-4 w-2 bg-rose"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

function ShipArt() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 text-sm font-bold text-rose">
      {["Responsive", "Fast", "On deadline"].map((t, i) => (
        <motion.p
          key={t}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.35 }}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <motion.path
              d="M2 8.5 6 12l8-8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.35, duration: 0.4 }}
            />
          </svg>
          {t}
        </motion.p>
      ))}
    </div>
  );
}

const arts = { frame: FrameArt, colour: ColourArt, code: CodeArt, ship: ShipArt };

function StepCard({ item, index }: { item: (typeof lab)[number]; index: number }) {
  const Art = arts[item.art];
  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden bg-maroon-deep p-5 sm:p-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: easeOut, delay: (index % 2) * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <span className="font-display pointer-events-none absolute -right-3 bottom-0 text-[7rem] leading-none text-cream/[0.04] transition-colors duration-500 group-hover:text-rose/10">
        0{index + 1}
      </span>
      <div className="relative h-36 bg-maroon p-5 sm:h-40">
        <Art />
      </div>
      <p className="eyebrow mt-6">{item.step}</p>
      <h3 className="font-display mt-2 text-[clamp(1.2rem,2vw,1.6rem)] text-cream">{item.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-cream/75">{item.body}</p>
    </motion.article>
  );
}

/** Desktop: the steps glide sideways while the section is pinned. */
function HorizontalTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const viewport = track.parentElement!.clientWidth;
      setDistance(Math.max(0, track.scrollWidth - viewport));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const [step, setStep] = useState(1);
  useEffect(
    () => smooth.on("change", (v) => setStep(Math.min(4, Math.max(1, Math.ceil(v * 4 + 0.001))))),
    [smooth],
  );

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className={wrap}>
          <div className="flex items-end justify-between gap-10">
            <SectionHeading eyebrow="Creative lab" title="From blank frame to live site" titleClassName="text-cream max-w-[14ch] text-[clamp(2.2rem,5vw,5rem)]" />
            <div className="mb-2 shrink-0 text-right">
              <p className="font-display text-5xl text-rose tabular-nums">0{step}<span className="text-cream/30">/04</span></p>
              <div className="mt-3 h-[2px] w-40 bg-cream/15">
                <motion.div className="h-full bg-rose" style={{ width: bar }} />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <motion.div ref={trackRef} className="flex w-max gap-6" style={{ x }}>
              {lab.map((item, i) => (
                <div key={item.title} className="w-[min(380px,36vw)]">
                  <StepCard item={item} index={i} />
                </div>
              ))}
              <div className="flex w-[min(380px,36vw)] items-center justify-center">
                <p className="font-serif text-4xl italic text-rose">…and it’s live ✦</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Lab() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 640px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="lab" className="relative">
      {desktop ? (
        <HorizontalTrack />
      ) : (
        <div className={`${wrap} py-24 sm:py-32`}>
          <SectionHeading eyebrow="Creative lab" title="From blank frame to live site" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {lab.map((item, i) => (
              <StepCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
