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

export function Button({
  className = "",
  variant = "solid",
  withArrow = false,
  cut = false,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`eyebrow group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 transition-colors ${
        cut ? "cut-all" : "rounded-full"
      } ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {withArrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <Icon name="arrowRight" size={16} />
        </span>
      )}
    </motion.button>
  );
}
