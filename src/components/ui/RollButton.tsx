"use client";

import { Arrow } from "./Arrow";
import { Magnetic } from "./Magnetic";

type Props = {
  children: string;
  href?: string;
  onClick?: () => void;
  variant?: "cream" | "maroon" | "ink";
  icon?: "up-right" | "down";
  className?: string;
  type?: "button" | "submit";
  download?: boolean;
  disabled?: boolean;
};

const styles = {
  cream: "bg-cream text-maroon",
  maroon: "bg-maroon text-cream",
  ink: "bg-maroon-ink text-cream",
};
const fills = {
  cream: "bg-rose",
  maroon: "bg-maroon-ink",
  ink: "bg-maroon",
};

/** Button whose label rolls up on hover while a fill wipes in from below. */
export function RollButton({
  children,
  href,
  onClick,
  variant = "cream",
  icon = "up-right",
  className = "",
  type = "button",
  download,
  disabled,
}: Props) {
  const inner = (
    <>
      <span
        className={`absolute inset-0 origin-bottom scale-y-0 rounded-[inherit] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100 ${fills[variant]}`}
      />
      <span className="relative block h-6 overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-6">
          {[0, 1].map((i) => (
            <span key={i} className="flex h-6 items-center justify-center gap-2" aria-hidden={i === 1}>
              {children}
              <Arrow dir={icon} className="h-4 w-4" />
            </span>
          ))}
        </span>
      </span>
    </>
  );

  const cls = `group relative inline-flex h-12 items-center justify-center overflow-hidden px-6 text-sm font-bold tracking-wide disabled:opacity-60 ${styles[variant]} ${className}`;

  return (
    <Magnetic strength={0.25} className={className.includes("w-full") ? "w-full" : ""}>
      {href ? (
        <a href={href} className={cls} download={download} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={cls} disabled={disabled}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
