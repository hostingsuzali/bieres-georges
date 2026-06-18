import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "orange" | "green" | "light" | "outline";
  withArrow?: boolean;
  className?: string;
};

const base =
  "eyebrow group cut-all inline-flex items-center justify-center gap-2.5 px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5";

const variants = {
  orange: "bg-orange text-cream hover:bg-orange-soft",
  green: "bg-green text-cream hover:bg-green-deep",
  light: "bg-cream text-green hover:bg-white",
  /* outline uses a nested-span trick — see below */
  outline: "bg-green text-green hover:text-cream",
};

export function CtaLink({
  href,
  children,
  variant = "orange",
  withArrow = true,
  className = "",
}: CtaLinkProps) {
  const isOutline = variant === "outline";

  return (
    <Link
      href={href}
      className={`${base} relative ${variants[variant]} ${className}`}
    >
      {/* For "outline" variant: an inner fill span sits 1px inside the
          outer polygon, creating a perfect border that follows the
          clip-path rather than fighting it. */}
      {isOutline && (
        <span
          aria-hidden
          className="cut-all pointer-events-none absolute inset-[1px] bg-cream transition-colors duration-300 group-hover:bg-green"
        />
      )}

      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {withArrow && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <Icon name="arrowRight" size={16} />
          </span>
        )}
      </span>
    </Link>
  );
}
