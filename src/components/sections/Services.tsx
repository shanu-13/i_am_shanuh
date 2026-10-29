"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { easeOut, wrap } from "@/lib/ui";
import { Arrow } from "../ui/Arrow";
import { SectionHeading } from "../ui/SectionHeading";

export function Services() {
  return (
    <section id="services" className={`${wrap} py-24 sm:py-32`}>
      <SectionHeading eyebrow="My services" title="What I’m good at" />

      <ul className="mt-14 border-t border-cream/20">
        {services.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: easeOut, delay: i * 0.06 }}
            className="group relative overflow-hidden border-b border-cream/20"
          >
            {/* Fill sweep */}
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-cream transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />

            <div className="relative grid gap-4 px-1 py-8 transition-colors duration-500 group-hover:text-maroon sm:px-4 md:grid-cols-[4rem_1.1fr_1.4fr_3rem] md:items-center md:gap-6 md:py-10">
              <span className="text-xs font-semibold text-cream/60 transition-colors duration-500 group-hover:text-maroon">
                0{i + 1}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,3.4vw,2.6rem)] text-rose transition-all duration-500 group-hover:translate-x-3 group-hover:text-maroon">
                {s.title}
              </h3>
              <div>
                <p className="text-[15px] leading-relaxed text-cream/80 transition-colors duration-500 group-hover:text-maroon-ink">
                  {s.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cream/25 px-3 py-1 text-[11px] uppercase tracking-wider text-cream/70 transition-colors duration-500 group-hover:border-maroon/30 group-hover:text-maroon"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="hidden h-12 w-12 place-items-center rounded-full border border-cream/30 text-xl transition-all duration-500 group-hover:rotate-45 group-hover:border-maroon group-hover:bg-maroon group-hover:text-cream md:grid">
                <Arrow className="h-5 w-5" />
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
