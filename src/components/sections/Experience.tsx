"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience, profile } from "@/lib/data";
import { easeOut, wrap } from "@/lib/ui";
import { RollButton } from "../ui/RollButton";
import { SectionHeading } from "../ui/SectionHeading";

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // The cream panel unfolds from a rounded card into a full-bleed band
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const clipPath = useTransform(scrollYProgress, (p) => {
    const t = 1 - Math.min(1, Math.max(0, p));
    return `inset(${t * 10}% ${t * 8}% 0% ${t * 8}% round ${t * 48}px)`;
  });

  const { scrollYProgress: line } = useScroll({ target: listRef, offset: ["start 0.8", "end 0.6"] });

  return (
    <section id="experience" ref={ref} className="relative">
      <motion.div style={{ clipPath }} className="bg-cream py-24 text-maroon sm:py-32">
        <div className={`${wrap} grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Experience"
              title="My path so far"
              titleClassName="text-maroon"
              className="[&_.eyebrow]:text-maroon"
            />
            <motion.p
              className="mt-6 max-w-sm text-[15px] leading-relaxed text-maroon-ink/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Two roles, one degree in progress, and a habit of shipping on time.
            </motion.p>
            <div className="mt-8">
              <RollButton href={profile.resume} download variant="maroon" icon="down">
                Download my resume
              </RollButton>
            </div>
          </div>

          <ol ref={listRef} className="relative pl-8 sm:pl-12">
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-maroon/15 sm:left-[11px]">
              <motion.div className="h-full w-full origin-top bg-maroon" style={{ scaleY: line }} />
            </div>
            {experience.map((item, i) => (
              <motion.li
                key={item.role}
                className="group relative border-b border-maroon/20 py-8 first:pt-2"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: easeOut, delay: i * 0.1 }}
              >
                <span className="absolute -left-8 top-[0.6rem] grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-maroon bg-cream transition-colors duration-300 group-first:top-0 group-hover:bg-maroon sm:-left-12 sm:h-[23px] sm:w-[23px]" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-maroon/80">{item.period}</p>
                    <h3 className="font-display mt-2 text-[clamp(1.25rem,2.6vw,2rem)] text-maroon transition-transform duration-500 group-hover:translate-x-2">
                      {item.role}
                    </h3>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm text-maroon-ink/75 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100 max-lg:max-h-10 max-lg:opacity-100">
                      {item.note}
                    </p>
                  </div>
                  <p className="text-sm text-maroon-ink/80 sm:max-w-[11rem] sm:text-right">{item.org}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
