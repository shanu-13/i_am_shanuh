"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Ctx = {
  lenis: Lenis | null;
  introDone: boolean;
  setIntroDone: (v: boolean) => void;
};

const AppContext = createContext<Ctx>({
  lenis: null,
  introDone: false,
  setIntroDone: () => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    setLenis(instance);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
    };
  }, []);

  // Hold the page still while the curtain is down
  useEffect(() => {
    if (introDone) {
      lenis?.start();
      document.documentElement.style.overflow = "";
    } else {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [introDone, lenis]);

  return (
    <AppContext.Provider value={{ lenis, introDone, setIntroDone }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

export function useScrollTo() {
  const { lenis } = useApp();
  return useCallback(
    (target: string | number) => {
      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.6,
          force: true,
          offset: typeof target === "string" && window.innerWidth < 1024 ? -64 : 0,
        });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );
}
