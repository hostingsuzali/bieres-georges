"use client";

import { motion } from "framer-motion";

import { brasserieKeywords } from "@/lib/data";

type KeywordsMarqueeProps = {
  className?: string;
};

export function KeywordsMarquee({ className = "" }: KeywordsMarqueeProps) {
  const words = [...brasserieKeywords, ...brasserieKeywords, ...brasserieKeywords];

  return (
    <div
      className={`relative overflow-hidden border-y border-green/10 bg-cream py-5 ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />

      <motion.ul
        className="flex w-max items-center gap-10 sm:gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {words.map((word, i) => (
          <li
            key={`${word}-${i}`}
            className="font-display flex items-center gap-10 whitespace-nowrap text-2xl font-bold uppercase tracking-wide text-green sm:gap-16 sm:text-4xl lg:text-5xl"
          >
            {word}
            <span className="text-orange/70">&#10038;</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
