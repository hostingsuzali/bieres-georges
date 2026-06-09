import type { HTMLAttributes } from "react";

type Tone = "orange" | "green" | "cream";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  dot?: boolean;
};

const tones: Record<Tone, string> = {
  orange: "border-orange/40 text-orange bg-orange/5",
  green: "border-cream/25 text-cream/90 bg-cream/5",
  cream: "border-dark-text/15 text-dark-text/70 bg-cream",
};

export function Badge({
  className = "",
  tone = "orange",
  dot = true,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${tones[tone]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
    </span>
  );
}
