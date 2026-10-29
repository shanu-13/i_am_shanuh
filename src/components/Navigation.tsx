"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/data";
import { useActiveSection } from "@/lib/useActiveSection";
import { useApp, useScrollTo } from "./providers/Providers";
import { Arrow } from "./ui/Arrow";
import { Magnetic } from "./ui/Magnetic";

const ids = nav.map((n) => n.id);

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 15_000);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-cream/60">
      <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose align-middle" />
      India · {time || "--:--"} IST
    </p>
  );
}

export function Socials({ className = "" }: { className?: string }) {
  const items = [
    { label: "gh", href: profile.socials.github, name: "GitHub" },
    { label: "in", href: profile.socials.linkedin, name: "LinkedIn" },
    { label: <Arrow className="h-4 w-4" />, href: `mailto:${profile.email}`, name: "Email" },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map((s) => (
        <Magnetic key={s.name} strength={0.5}>
          <a
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={s.name}
            className="grid h-10 w-10 place-items-center rounded-full bg-cream text-xs font-bold text-maroon transition-colors duration-300 hover:bg-rose"
          >
            {s.label}
          </a>
        </Magnetic>
      ))}
    </div>
  );
}

export function Navigation() {
  const active = useActiveSection(ids);
  const scrollTo = useScrollTo();
  const { introDone } = useApp();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const { lenis } = useApp();
  useEffect(() => {
    if (open) lenis?.stop();
    else if (introDone) lenis?.start();
  }, [open, lenis, introDone]);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col justify-between px-7 py-9 lg:flex xl:w-[250px] xl:px-9"
        initial={{ x: -40, opacity: 0 }}
        animate={introDone ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <div className="absolute inset-y-0 right-0 w-px bg-cream/15">
          <motion.div className="h-full w-full origin-top bg-rose" style={{ scaleY: progress }} />
        </div>

        <div>
          <button
            onClick={() => go("home")}
            className="font-serif text-4xl text-cream transition-colors hover:text-rose"
          >
            {profile.logo}
          </button>

          <nav className="mt-14">
            <ul className="space-y-4">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={introDone ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.06 }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className={`group flex items-center font-display text-[13px] font-bold tracking-[0.14em] transition-colors ${
                      active === item.id ? "text-rose" : "text-cream hover:text-rose"
                    }`}
                  >
                    <span className="flex">
                      {active === item.id && (
                        <motion.span
                          layoutId="nav-dash"
                          className="mr-2 block h-px w-4 bg-rose"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-rose transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="space-y-6">
          <Socials />
          <Clock />
        </div>
      </motion.aside>

      {/* Mobile / tablet top bar */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-cream/10 bg-maroon/75 px-5 backdrop-blur-md sm:px-8 lg:hidden"
        initial={{ y: -80 }}
        animate={introDone ? { y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <button onClick={() => go("home")} className="font-serif text-3xl text-cream">
          {profile.logo}
        </button>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <span className="hidden xs:inline">{open ? "Close" : "Menu"}</span>
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-cream">
            <motion.span
              className="absolute h-[2px] w-4 rounded bg-maroon"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
            />
            <motion.span
              className="absolute h-[2px] w-4 rounded bg-maroon"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
            />
          </span>
        </button>
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-rose"
          style={{ scaleX: progress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-maroon-deep px-5 pb-8 pt-24 sm:px-8 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 32px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.button
                    onClick={() => go(item.id)}
                    className={`font-display flex items-baseline gap-3 py-1 text-left text-[clamp(1.9rem,9vw,4rem)] ${
                      active === item.id ? "text-rose" : "text-cream"
                    }`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-sans text-xs font-normal text-rose">0{i + 1}</span>
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-10 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="space-y-1 text-sm text-cream/80">
                <a href={`mailto:${profile.email}`} className="block">{profile.email}</a>
                <a href={profile.phoneHref} className="block">{profile.phone}</a>
              </div>
              <Socials />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
