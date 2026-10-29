"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/lib/data";
import { easeOut, wrap } from "@/lib/ui";
import { useApp, useScrollTo } from "../providers/Providers";
import { RollButton } from "../ui/RollButton";
import { SplitReveal } from "../ui/SplitReveal";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 0c.6 6.4 5 11.4 12 12-7 .6-11.4 5.6-12 12-.6-6.4-5-11.4-12-12 7-.6 11.4-5.6 12-12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function ScrollBadge({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      data-cursor="Scroll"
      aria-label="Scroll to about"
      className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-cream">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[10px] font-semibold uppercase">
          <textPath href="#circle" textLength="236" lengthAdjust="spacing">
            Scroll to explore ✦ Scroll to explore ✦
          </textPath>
        </text>
      </svg>
      <motion.span
        className="text-xl text-rose"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.span>
    </button>
  );
}

function Portrait({ mx, my, play }: { mx: MotionValue<number>; my: MotionValue<number>; play: boolean }) {
  const circleX = useTransform(mx, (v) => v * -30);
  const circleY = useTransform(my, (v) => v * -30);
  const archX = useTransform(mx, (v) => v * 18);
  const archY = useTransform(my, (v) => v * 18);
  const rotY = useTransform(mx, (v) => v * 14);
  const rotX = useTransform(my, (v) => v * -14);

  return (
    <div className="relative mx-auto aspect-[0.85] w-[min(78vw,420px)] [perspective:1000px] lg:w-full lg:max-w-[460px]">
      {/* Gingham sun */}
      <motion.div
        className="absolute left-[-6%] top-[2%] aspect-square w-[88%]"
        style={{ x: circleX, y: circleY }}
        initial={{ scale: 0, rotate: -90 }}
        animate={play ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1.4, ease: easeOut, delay: 0.5 }}
      >
        <div className="gingham h-full w-full animate-spin-slow rounded-full opacity-90" />
      </motion.div>

      {/* Arch */}
      <motion.div
        className="absolute bottom-0 right-[4%] h-[86%] w-[64%] [transform-style:preserve-3d]"
        style={{ x: archX, y: archY, rotateX: rotX, rotateY: rotY }}
        initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" }}
        animate={play ? { clipPath: "inset(0% 0 0 0 round 999px 999px 0 0)" } : {}}
        transition={{ duration: 1.3, ease: easeOut, delay: 0.7 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-full border-2 border-cream bg-maroon-deep">
          {!profile.portrait && (
            <div className="flex h-full flex-col items-center justify-end pb-[12%]">
              <span className="font-serif text-[clamp(4rem,14vw,7rem)] italic leading-none text-rose/80">
                RAS
              </span>
              <span className="mt-4 text-[10px] uppercase tracking-[0.25em] text-cream/60">
                [ your cut-out portrait ]
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-ink/50 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Cut-out portrait, breaking out of the top of the arch */}
      {profile.portrait && (
        <motion.div
          className="absolute bottom-0 right-[-7%] aspect-[766/1000] w-[86%]"
          style={{ x: archX, y: archY, rotateX: rotX, rotateY: rotY }}
          initial={{ opacity: 0, y: 60 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: easeOut, delay: 1.2 }}
        >
          <Image
            src={profile.portrait}
            alt={profile.fullName}
            fill
            priority
            sizes="(min-width:1024px) 400px, 70vw"
            className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(74,6,38,0.55)]"
          />
        </motion.div>
      )}

      {/* Second sticker */}
      <motion.div
        className="absolute bottom-[16%] left-[-4%] z-10"
        initial={{ scale: 0 }}
        animate={play ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.6 }}
      >
        <div className="animate-float rounded-full bg-rose px-4 py-2 font-serif text-base italic text-maroon-ink shadow-[5px_5px_0_var(--color-maroon-ink)] sm:text-lg">
          on stage tonight ✦
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[6%] top-[-4%] text-cream"
        initial={{ opacity: 0, scale: 0 }}
        animate={play ? { opacity: 1, scale: 1, rotate: 360 } : {}}
        transition={{ duration: 1.4, delay: 1.2, ease: easeOut }}
      >
        <Sparkle className="h-10 w-10 sm:h-12 sm:w-12" />
      </motion.div>
      <motion.div
        className="absolute bottom-[8%] right-[-6%] text-rose"
        animate={play ? { rotate: [0, 180], scale: [0.8, 1.1, 0.8] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle className="h-6 w-6" />
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { introDone: play } = useApp();
  const scrollTo = useScrollTo();
  const ref = useRef<HTMLElement>(null);

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: play ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: easeOut, delay },
  });

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:py-16"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-rose/10 blur-[120px]" />

      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10`}>
        <motion.div style={{ y: textY, opacity: fade }}>
          <h1 className="font-display text-[clamp(2.6rem,13vw,5.5rem)] text-cream lg:text-[clamp(3.4rem,6.3vw,8rem)]">
            <SplitReveal text="Hello," play={play} delay={0.1} className="block" />
            <SplitReveal text={`I’m ${profile.firstName}`} play={play} delay={0.3} className="block" />
          </h1>

          <div className="relative -mt-[0.1em] w-fit">
            <motion.span
              className="block font-serif text-[clamp(4.5rem,24vw,10rem)] italic leading-[0.95] text-rose lg:text-[clamp(5.5rem,11vw,10.5rem)]"
              initial={{ clipPath: "inset(0 100% 0 0)", x: -30 }}
              animate={play ? { clipPath: "inset(0 0% 0 0)", x: 0 } : {}}
              transition={{ duration: 1.4, ease: easeOut, delay: 0.6 }}
            >
              {profile.name}
            </motion.span>
            <svg viewBox="0 0 300 16" className="mt-1 w-[78%] text-cream" fill="none" aria-hidden>
              <motion.path
                d="M2 8 Q 14.5 0 27 8 T 52 8 T 77 8 T 102 8 T 127 8 T 152 8 T 177 8 T 202 8 T 227 8 T 252 8 T 277 8 T 298 8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={play ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 1.1 }}
              />
            </svg>
          </div>

          <motion.p className="mt-8 text-lg sm:text-xl" {...fadeUp(1.2)}>
            <strong className="font-bold">Software developer</strong> by day,{" "}
            <em className="font-serif text-[1.2em] italic text-rose">event host by night.</em>
          </motion.p>
          <motion.p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/75" {...fadeUp(1.3)}>
            Sixty-plus sites shipped, a 300-person fest coordinated, one rule: make it work for the
            people on the other side of the screen.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5" {...fadeUp(1.45)}>
            <RollButton onClick={() => scrollTo("#work")}>See what I’ve shipped</RollButton>
            <div className="flex flex-col gap-1 text-sm text-cream/80 xs:flex-row xs:gap-6">
              <a href={profile.phoneHref} className="transition-colors hover:text-rose">
                {profile.phone}
              </a>
              <a href={`mailto:${profile.email}`} className="break-all transition-colors hover:text-rose">
                {profile.email}
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: portraitY, rotate: portraitRotate }}>
          <Portrait mx={mx} my={my} play={play} />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 right-5 hidden sm:block lg:right-10"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={play ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <ScrollBadge onClick={() => scrollTo("#about")} />
      </motion.div>
    </section>
  );
}
