"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp, inViewOnce } from "@/lib/motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: SectionRevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
