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

const variants = {
  orange: "bg-orange text-cream hover:bg-orange-soft",
  green: "bg-green text-cream hover:bg-green-deep",
  light: "bg-cream text-green hover:bg-white",
  outline: "border border-current text-green hover:bg-green hover:text-cream",
};

export function CtaLink({
  href,
  children,
  variant = "orange",
  withArrow = true,
  className = "",
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={`eyebrow group cut-all inline-flex items-center justify-center gap-2.5 px-7 py-3.5 transition-all hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <Icon name="arrowRight" size={16} />
        </span>
      )}
    </Link>
  );
}

