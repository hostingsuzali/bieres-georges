"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { Beer } from "@/lib/products";
import { EASE, inViewOnce } from "@/lib/motion";

const placements = [
  {
    className: "left-[8%] bottom-5 h-[58%] -rotate-7 lg:left-[4%] lg:h-[62%]",
    delay: 0.1,
    floatDelay: 0,
  },
  {
    className:
      "left-1/2 bottom-0 z-10 h-[78%] -translate-x-1/2 lg:h-[84%]",
    delay: 0.22,
    floatDelay: 0.4,
  },
  {
    className: "right-[7%] bottom-7 h-[61%] rotate-6 lg:right-[2%] lg:h-[66%]",
    delay: 0.34,
    floatDelay: 0.8,
  },
];

export function BeerHeroBottles({ beers }: { beers: Beer[] }) {
  const isSingle = beers.length === 1;

  return (
    <div className="relative flex min-h-[28rem] items-end justify-center sm:min-h-[34rem] lg:min-h-[38rem]">
      <div className="absolute inset-x-4 bottom-2 h-56 rounded-[50%] bg-orange/14 blur-2xl sm:h-72" />
      <div className="absolute bottom-2 left-1/2 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-green/20 to-transparent" />

      {beers.map((beer, index) => {
        const placement = isSingle
          ? {
              className:
                "left-1/2 bottom-0 z-10 h-[92%] sm:h-[100%] lg:h-[108%]",
              delay: 0.12,
              floatDelay: 0,
            }
          : placements[index];
        const initialRotate = isSingle ? -3 : index === 1 ? 0 : index === 0 ? -12 : 12;
        const finalRotate = isSingle ? 0 : index === 1 ? 0 : index === 0 ? -7 : 6;

        return (
          <motion.div
            key={beer.slug}
            initial={{
              opacity: 0,
              x: isSingle ? "-50%" : 0,
              y: 54,
              rotate: initialRotate,
            }}
            whileInView={{
              opacity: 1,
              x: isSingle ? "-50%" : 0,
              y: 0,
              rotate: finalRotate,
            }}
            viewport={inViewOnce}
            transition={{ duration: 0.8, ease: EASE, delay: placement.delay }}
            className={`absolute ${placement.className}`}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5.2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: placement.floatDelay,
              }}
              whileHover={{ y: -16, scale: 1.035 }}
              className="relative h-full"
            >
              <Image
                src={beer.image}
                alt={`Biere Georges ${beer.name}`}
                width={360}
                height={880}
                priority
                sizes="(min-width: 1024px) 28vw, 58vw"
                className="h-full w-auto max-w-none object-contain drop-shadow-[0_34px_28px_rgba(5,43,37,0.26)]"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
