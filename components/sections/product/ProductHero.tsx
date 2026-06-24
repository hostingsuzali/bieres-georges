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
};

export function ProductHero({ beer }: ProductHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

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

      {/* ── Split layout: Content LEFT · Bottle RIGHT ── */}
      <div className="container-page relative z-10 px-4 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          {/* ─ Left: Copy ─ */}
          <div className="order-2 lg:order-1">
            {/* Collection + Style */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <Badge tone="green">{beer.collection}</Badge>
              <span className="h-4 w-px bg-cream/20" />
              <span className="font-serif text-lg italic text-orange sm:text-xl">
                {beer.style}
              </span>
            </motion.div>

            {/* Beer name — large display */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="font-display mt-6 text-6xl font-bold uppercase leading-[0.78] tracking-tight sm:text-7xl lg:text-8xl xl:text-[7rem]"
            >
              {beer.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-7 max-w-lg text-base leading-relaxed text-cream/65 sm:text-lg"
            >
              {beer.description} {beer.tastingNote}
            </motion.p>

            {/* Quick specs strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <span className="font-display text-2xl font-bold text-orange">
                {beer.abv}%
              </span>
              <span className="h-4 w-px bg-cream/20" />
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
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <CtaLink href="/trouver">Où la trouver ?</CtaLink>
              <CtaLink href="/toutes-les-bieres" variant="light">
                Toutes les bières
              </CtaLink>
            </motion.div>
          </div>

          {/* ─ Right: Bottle ─ */}
          <div className="order-1 flex justify-center lg:order-2">
            <motion.div
              style={{ y: bottleY, scale: bottleScale }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="relative"
            >
              {/* Glow layers */}
              <div className="pointer-events-none absolute bottom-[8%] left-1/2 -translate-x-1/2">
                <div className="h-56 w-56 rounded-full bg-orange/35 blur-[80px] sm:h-72 sm:w-72" />
              </div>
              <div className="pointer-events-none absolute bottom-[12%] left-1/2 -translate-x-1/2">
                <div className="h-36 w-36 rounded-full bg-orange/55 blur-[40px]" />
              </div>

              <Image
                src={beer.image}
                alt={`Bière Georges ${beer.name}`}
                width={420}
                height={680}
                priority
                className="relative z-10 mx-auto h-[22rem] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] sm:h-[28rem] lg:h-[34rem] xl:h-[38rem]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
