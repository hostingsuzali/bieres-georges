"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";

type ExpandableTextProps = {
  /** Always-visible text */
  summary: string;
  /** Extra text revealed on toggle */
  expanded: string;
  className?: string;
};

export function ExpandableText({
  summary,
  expanded,
  className = "",
}: ExpandableTextProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <p className="leading-relaxed">{summary}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            {expanded.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mt-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange transition-colors hover:text-orange/80"
      >
        <span>{open ? "Voir moins" : "Voir plus"}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="inline-block text-base"
        >
          ↓
        </motion.span>
      </button>
    </div>
  );
}
