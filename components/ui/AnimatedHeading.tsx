"use client";

import { motion } from "framer-motion";

import { inViewOnce, stagger, wordUp } from "@/lib/motion";

const tagMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type AnimatedHeadingProps = {
  text: string;
  className?: string;
  as?: keyof typeof tagMap;
  /** Split point — words after this index render in the accent color. */
  accentFrom?: number;
  accentClassName?: string;
};

// Reveals a heading word-by-word with a clipped slide-up, keeping the
// vintage display type feeling deliberate and crafted.
export function AnimatedHeading({
  text,
  className = "",
  as = "h2",
  accentFrom,
  accentClassName = "text-orange",
}: AnimatedHeadingProps) {
  const MotionTag = tagMap[as];
  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={wordUp}
            className={`inline-block ${
              accentFrom !== undefined && i >= accentFrom ? accentClassName : ""
            }`}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
