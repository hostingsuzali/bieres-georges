"use client";

import { motion } from "framer-motion";

type FilmStripDividerProps = {
  className?: string;
};

export function FilmStripDivider({
  className = "",
}: FilmStripDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[59px] overflow-hidden bg-green ${className}`}
    >
      <motion.div
        className="flex h-full w-max"
        animate={{ x: [0, -1534] }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src="/assets/logostrip.svg"
            alt=""
            width={1534}
            height={59}
            draggable={false}
            className="h-[59px] w-[1534px] max-w-none shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
}
