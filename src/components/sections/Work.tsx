"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { work } from "@/lib/data";
import { easeInOut, easeOut, wrap } from "@/lib/ui";
import { Arrow } from "../ui/Arrow";
import { SectionHeading } from "../ui/SectionHeading";

/** Stylised stand-in for a site screenshot. Scrolls like a real page on hover. */
function MockSite({ variant }: { variant: number }) {
  const accent = variant ? "bg-rose" : "bg-cream";
  return (
    <div className="space-y-3 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className={`h-3 w-16 ${accent}`} />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-2 w-8 bg-cream/30" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] gap-3 pt-3">
        <div className="space-y-2">
          <div className="h-5 w-full bg-cream/80" />
          <div className="h-5 w-3/4 bg-cream/80" />
          <div className="mt-3 h-2 w-full bg-cream/25" />
          <div className="h-2 w-5/6 bg-cream/25" />
          <div className={`mt-3 h-6 w-24 ${accent}`} />
        </div>
        <div className={`aspect-square ${variant ? "rounded-full" : ""} ${accent} opacity-80`} />
      </div>
      <div className="grid grid-cols-3 gap-3 pt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className={`aspect-[4/3] ${i % 2 ? "bg-mauve/60" : "bg-cream/20"}`} />
            <div className="h-1.5 w-4/5 bg-cream/25" />
          </div>
        ))}
      </div>
      <div className={`mt-4 h-24 ${variant ? "bg-mauve/50" : "bg-rose/40"}`} />
      <div className="grid grid-cols-4 gap-2 pt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-cream/15" />
        ))}
      </div>
      <div className="h-16 bg-maroon-ink/70" />
    </div>
  );
}

function WorkCard({ item, index }: { item: (typeof work)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], index % 2 ? [80, -80] : [30, -30]);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      data-cursor="View"
      style={{ y }}
      className={`group block ${index % 2 ? "md:mt-24" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="relative overflow-hidden border border-cream/20 bg-maroon-deep"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: easeInOut, delay: index * 0.1 } },
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-cream/15 bg-maroon-ink px-4 py-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-cream/30 transition-colors duration-300 group-hover:bg-rose" />
          ))}
          <span className="ml-3 truncate rounded-full bg-maroon-deep px-3 py-1 text-[11px] text-cream/60">
            {item.url}
          </span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width:768px) 45vw, 100vw"
              className="object-cover object-top transition-transform duration-[2.5s] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-x-0 top-0 transition-transform duration-[3s] ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:-translate-y-[40%]">
              <MockSite variant={index} />
            </div>
          )}
          <div className="absolute inset-0 bg-maroon/0 transition-colors duration-500 group-hover:bg-maroon/10" />
          <span className="absolute bottom-4 left-4 rounded-full bg-cream px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-maroon">
            {item.year}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="mt-5 flex items-start justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
      >
        <div>
          <h3 className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] text-cream transition-colors group-hover:text-rose">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-cream/70">{item.meta}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/30 transition-all duration-500 group-hover:rotate-45 group-hover:bg-cream group-hover:text-maroon">
          <Arrow className="h-4 w-4" />
        </span>
      </motion.div>
    </motion.a>
  );
}

export function Work() {
  return (
    <section id="work" className={`${wrap} py-24 sm:py-32`}>
      <SectionHeading eyebrow="Portfolio" title="Selected work" />
      <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-8 lg:gap-12">
        {work.map((item, i) => (
          <WorkCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
