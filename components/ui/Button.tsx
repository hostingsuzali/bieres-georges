"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

type Variant = "solid" | "outline" | "ghost" | "green";

type ButtonProps = Omit<
  ComponentPropsWithoutRef<typeof motion.button>,
  "children"
> & {
  variant?: Variant;
  withArrow?: boolean;
  cut?: boolean;
  children?: ReactNode;
};

const variants: Record<Variant, string> = {
  solid: "bg-orange text-cream hover:bg-orange-soft",
  green: "bg-green text-cream hover:bg-green-deep",
  outline:
    "border border-current text-dark-text hover:bg-dark-text hover:text-cream",
  ghost: "text-orange hover:text-dark-text",
};

/* When cut + outline are combined the CSS border fights clip-path at
   the chamfered corners. Use a nested-span border trick instead. */
const cutOutline =
  "bg-dark-text text-dark-text hover:text-cream";

export function Button({
  className = "",
  variant = "solid",
  withArrow = false,
  cut = false,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const isCutOutline = cut && variant === "outline";

  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`eyebrow group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 transition-colors ${
        cut ? "cut-all" : "rounded-full"
      } ${isCutOutline ? cutOutline : variants[variant]} ${className}`}
      {...props}
    >
      {isCutOutline && (
        <span
          aria-hidden
          className="cut-all pointer-events-none absolute inset-[1px] bg-cream transition-colors duration-300 group-hover:bg-dark-text"
        />
      )}
      <span className={isCutOutline ? "relative z-10 flex items-center gap-2.5" : "contents"}>
        {children}
        {withArrow && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <Icon name="arrowRight" size={16} />
          </span>
        )}
      </span>
    </motion.button>
  );
}
