"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Badge } from "@/components/ui/Badge";
import { CtaLink } from "@/components/ui/CtaLink";
import type { Beer } from "@/lib/products";
import { EASE } from "@/lib/motion";

type ProductHeroProps = {
  beer: Beer;
  hook: string;
};

export function ProductHero({ beer, hook }: ProductHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bottleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-green-deep text-cream"
    >
      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <Image
          src="/assets/logos/stripes-pattern.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* ── Top bar: collection + style ── */}
      <div className="container-page relative z-10 flex flex-wrap items-center justify-between gap-4 px-4 pt-32 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Badge tone="green">{beer.collection}</Badge>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="font-serif text-xl italic text-orange sm:text-2xl"
        >
          {beer.style}
        </motion.p>
      </div>

      {/* ── Center stage: name + bottle ── */}
      <div className="container-page relative px-4">
        <div className="relative flex flex-col items-center pt-10 sm:pt-14 lg:pt-10">
          {/* Giant name behind bottle */}
          <motion.h1
            style={{ y: nameY, opacity: nameOpacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="font-display pointer-events-none select-none text-center text-[7rem] font-bold uppercase leading-[0.78] tracking-tight sm:text-[11rem] lg:text-[16rem] xl:text-[20rem]"
          >
            {beer.name}
          </motion.h1>

          {/* Bottle — overlaps the name */}
          <motion.div
            style={{ scale: bottleScale, y: bottleY }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="relative z-10 -mt-[4rem] sm:-mt-[7rem] lg:-mt-[11rem] xl:-mt-[14rem]"
          >
            {/* Glow layers */}
            <div className="pointer-events-none absolute bottom-[10%] left-1/2 -translate-x-1/2">
              <div className="h-64 w-64 rounded-full bg-orange/40 blur-[100px] sm:h-80 sm:w-80" />
            </div>
            <div className="pointer-events-none absolute bottom-[15%] left-1/2 -translate-x-1/2">
              <div className="h-40 w-40 rounded-full bg-orange/60 blur-[50px]" />
            </div>

            <Image
              src={beer.image}
              alt={`Bière Georges ${beer.name}`}
              width={480}
              height={780}
              priority
              className="relative z-10 mx-auto h-[24rem] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)] sm:h-[30rem] lg:h-[36rem] xl:h-[42rem]"
            />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom panel: description + specs + CTAs ── */}
      <div className="relative z-10 border-t border-cream/10 bg-green-deep/80 px-4 pb-14 pt-10 backdrop-blur-sm sm:pb-16 sm:pt-12">
        <div className="container-page">
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="mx-auto max-w-2xl text-center text-base leading-relaxed text-cream/65 sm:text-lg"
          >
            {beer.description} {hook}
          </motion.p>

          {/* Specs strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {beer.ranges.map((range) => (
              <span
                key={range}
                className={`eyebrow rounded-sm px-3 py-1.5 text-xs font-bold ${
                  range === "CHR"
                    ? "bg-cream/10 text-cream"
                    : "bg-orange/20 text-orange"
                }`}
              >
                {range}
              </span>
            ))}
            <span className="h-4 w-px bg-cream/20" />
            <span className="eyebrow text-cream/40">
              {beer.formats.join(" · ")}
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <CtaLink href="/trouver">Où la trouver ?</CtaLink>
            <CtaLink href="/toutes-les-bieres" variant="light">
              Toutes les bières
            </CtaLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
