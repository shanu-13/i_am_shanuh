"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { languages, profile } from "@/lib/data";
import { easeOut, wrap } from "@/lib/ui";
import { RollButton } from "../ui/RollButton";
import { SectionHeading } from "../ui/SectionHeading";
import { SplitReveal } from "../ui/SplitReveal";

function InfoRow({
  icon,
  title,
  value,
  href,
  onClick,
  index,
}: {
  icon: string;
  title: string;
  value: string;
  href?: string;
  onClick?: () => void;
  index: number;
}) {
  const Tag = href ? "a" : "button";
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: easeOut }}
    >
      <Tag
        href={href}
        onClick={onClick}
        className="group relative flex w-full items-center gap-4 overflow-hidden border border-cream/25 p-4 text-left sm:p-5"
      >
        <span className="absolute inset-0 origin-left scale-x-0 bg-maroon-deep transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
        <span className="relative grid h-11 w-11 shrink-0 place-items-center bg-cream font-serif text-xl italic text-maroon transition-transform duration-500 group-hover:-rotate-12">
          {icon}
        </span>
        <span className="relative min-w-0">
          <span className="block text-sm font-bold">{title}</span>
          <span className="block break-words text-sm text-cream/75">{value}</span>
        </span>
      </Tag>
    </motion.div>
  );
}

const field =
  "w-full border-2 border-maroon-ink/70 bg-transparent px-4 py-3 text-[15px] text-maroon-ink placeholder:text-maroon-ink/55 outline-none transition-all duration-300 focus:border-maroon-ink focus:bg-cream/40 focus:shadow-[4px_4px_0_var(--color-maroon-ink)]";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    e.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className={`${wrap} py-24 sm:py-32`}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading eyebrow="Contact" title="Reach out" />
          <div className="mt-10 space-y-3">
            <InfoRow
              index={0}
              icon="@"
              title={copied ? "Copied to clipboard ✓" : "Write to me"}
              value={profile.email}
              onClick={() => {
                navigator.clipboard?.writeText(profile.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
            />
            <InfoRow index={1} icon="☎" title="Call me" value={profile.phone} href={profile.phoneHref} />
            <InfoRow index={2} icon="Aa" title="Speak with me" value={languages} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: easeOut }}
          className="relative bg-rose p-6 text-maroon-ink shadow-[12px_12px_0_var(--color-maroon-deep)] sm:p-9"
        >
          <SplitReveal
            as="h3"
            text="Got an idea? Let’s build it."
            className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] text-maroon-ink"
          />
          <p className="mt-3 text-[15px]">Tell me about the project and your deadline.</p>

          <form onSubmit={submit} className="mt-7 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em]">Name</span>
              <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em]">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em]">Message</span>
              <textarea name="message" required rows={4} placeholder="What are we building?" className={`${field} resize-none`} />
            </label>
            <div className="relative pt-1">
              <RollButton type="submit" variant="ink" className="w-full">
                Send message
              </RollButton>
              <AnimatePresence>
                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-center text-sm font-semibold"
                    role="status"
                  >
                    Your mail app is opening. Talk soon ✦
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
