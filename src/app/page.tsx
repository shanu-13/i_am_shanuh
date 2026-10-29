import { Cursor } from "@/components/Cursor";
import { Navigation } from "@/components/Navigation";
import { Preloader } from "@/components/Preloader";
import { About } from "@/components/sections/About";
import { Backstage } from "@/components/sections/Backstage";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Lab } from "@/components/sections/Lab";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Marquee } from "@/components/ui/Marquee";
import { marquee } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
        <div className="grain" />
      </div>
      <Navigation />

      <main className="lg:pl-[220px] xl:pl-[250px]">
        <Hero />

        {/* Crossed tapes */}
        <div className="relative z-10 -my-4 py-10 sm:py-14">
          <Marquee
            items={marquee}
            baseVelocity={2}
            className="font-display -rotate-2 bg-cream py-3 text-[clamp(1rem,2.6vw,1.8rem)] text-maroon sm:py-4"
          />
          <Marquee
            items={marquee.slice().reverse()}
            baseVelocity={-2}
            className="font-display absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-rose py-3 text-[clamp(1rem,2.6vw,1.8rem)] text-maroon-ink opacity-90 sm:py-4"
          />
        </div>

        <About />
        <Experience />
        <Services />
        <Lab />
        <Work />
        <Backstage />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
