"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { backstage } from "@/lib/data";
import { wrap } from "@/lib/ui";
import { SectionHeading } from "../ui/SectionHeading";

// Where each ticket is "dealt" from before it lands
const scatter = [
  { x: -120, y: 80, rotate: -18 },
  { x: 120, y: 60, rotate: 14 },
  { x: -80, y: 120, rotate: 10 },
  { x: 100, y: 140, rotate: -12 },
];

function Ticket({ item, index, draggable }: { item: (typeof backstage)[number]; index: number; draggable: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, ...scatter[index] }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 70, damping: 14, delay: index * 0.12 }}
      drag={draggable}
      dragSnapToOrigin
      dragElastic={0.6}
      whileDrag={{ scale: 1.04, rotate: index % 2 ? 4 : -4, zIndex: 20, cursor: "grabbing" }}
      data-cursor={draggable ? "Drag" : undefined}
      className="group relative touch-pan-y"
    >
      <motion.div
        whileHover={{ y: -6, rotate: index % 2 ? 1.2 : -1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="ticket flex min-h-[11rem] [--cut:calc(100%-6.5rem)] sm:[--cut:calc(100%-8rem)]"
      >
        <div className="flex flex-1 flex-col justify-center bg-maroon-deep p-5 pr-4 sm:p-7">
          <p className="eyebrow">{item.eyebrow}</p>
          <h3 className="font-display mt-2 text-[clamp(1rem,2.2vw,1.45rem)] leading-[1.05] text-cream">
            {item.title}
          </h3>
          <p className="mt-3 text-[13px] leading-snug text-cream/70">{item.body}</p>
        </div>
        <div className="relative grid w-[6.5rem] shrink-0 place-items-center border-l-2 border-dashed border-maroon-deep/60 bg-rose transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:rotate-[4deg] origin-bottom-left sm:w-[8rem]">
          <span className="font-display text-[clamp(1.4rem,3vw,2rem)] text-maroon-ink">{item.stub}</span>
          <span className="absolute bottom-3 left-0 right-0 text-center text-[8px] uppercase tracking-[0.3em] text-maroon-ink/70">
            No. 00{index + 1}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Backstage() {
  const [draggable, setDraggable] = useState(false);
  useEffect(() => setDraggable(window.matchMedia("(pointer: fine)").matches), []);

  return (
    <section id="backstage" className={`${wrap} relative py-24 sm:py-32`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Off-screen" title="Backstage passes" />
        {draggable && (
          <p className="eyebrow pb-2 text-cream/60">psst… the passes are draggable</p>
        )}
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
        {backstage.map((item, i) => (
          <Ticket key={item.title} item={item} index={i} draggable={draggable} />
        ))}
      </div>
    </section>
  );
}
