"use client";

import { motion } from "framer-motion";
import { nav, profile } from "@/lib/data";
import { wrap } from "@/lib/ui";
import { Arrow } from "../ui/Arrow";
import { useScrollTo } from "../providers/Providers";

export function Footer() {
  const scrollTo = useScrollTo();
  const letters = Array.from(profile.name.toUpperCase());

  const cols = [
    {
      title: "Navigate",
      links: nav.slice(1).map((n) => ({ label: n.label, onClick: () => scrollTo(`#${n.id}`) })),
    },
    {
      title: "Reach me",
      links: [
        { label: profile.email, href: `mailto:${profile.email}` },
        { label: profile.phone, href: profile.phoneHref },
      ],
    },
    {
      title: "Follow",
      links: [
        { label: "GitHub", href: profile.socials.github },
        { label: "LinkedIn", href: profile.socials.linkedin },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-cream/15 pt-20">
      <div className={wrap}>
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-serif text-5xl text-cream">{profile.logo}</p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-cream/75">
              Frontend developer and event host. Building sites that work and rooms that run on time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {cols.map((col) => (
              <div key={col.title} className={col.title === "Reach me" ? "col-span-2 sm:col-span-1" : ""}>
                <p className="eyebrow mb-4">{col.title}</p>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"href" in l ? (
                        <a
                          href={l.href}
                          target={l.href?.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="break-all transition-colors hover:text-rose"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <button onClick={l.onClick} className="transition-colors hover:text-rose">
                          {l.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Curtain call: giant name */}
      <motion.div
        className="mt-16 select-none overflow-hidden px-2"
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        <div className="flex justify-center">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              className="font-display inline-block text-[clamp(2.5rem,12vw,14rem)] leading-[0.8] text-rose lg:text-[10vw]"
              variants={{
                hidden: { y: "100%" },
                show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: "-12%", color: "#f2dace", transition: { type: "spring", stiffness: 400, damping: 12 } }}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className={`${wrap} flex flex-col items-center justify-between gap-3 border-t border-cream/15 py-6 text-xs text-cream/70 sm:flex-row`}>
        <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
        <button onClick={() => scrollTo(0)} className="group flex items-center gap-2 hover:text-rose">
          Back to top
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1"><Arrow dir="up" className="h-3.5 w-3.5" /></span>
        </button>
      </div>
    </footer>
  );
}
