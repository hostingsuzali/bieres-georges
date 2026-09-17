"use client";

import { motion } from "framer-motion";

import { inViewOnce } from "@/lib/motion";

type SectionLabelProps = {
  children: React.ReactNode;
  /** `light` sur les fonds sombres (vert), `orange` sur les fonds clairs. */
  tone?: "orange" | "light";
  className?: string;
};

/**
 * Sur-titre de section — style unique pour toutes les pages
 * (Histoire, Manifeste, Valeurs, Équipe, Savoir-faire).
 */
export function SectionLabel({
  children,
  tone = "orange",
  className = "",
}: SectionLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={inViewOnce}
      transition={{ duration: 0.7 }}
      className={`eyebrow text-sm font-bold tracking-[0.25em] sm:text-base ${
        tone === "orange" ? "text-orange" : "text-cream/80"
      } ${className}`}
    >
      {children}
    </motion.p>
  );
}
