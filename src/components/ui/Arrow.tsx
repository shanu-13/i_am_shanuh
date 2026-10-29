const paths = {
  "up-right": "M7 17 17 7M8 7h9v9",
  down: "M12 5v14M6 13l6 6 6-6",
  up: "M12 19V5M6 11l6-6 6 6",
};

/** Stroke arrow; avoids the emoji rendering some systems give ↗. */
export function Arrow({
  dir = "up-right",
  className = "h-[1em] w-[1em]",
}: {
  dir?: keyof typeof paths;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={paths[dir]} />
    </svg>
  );
}
