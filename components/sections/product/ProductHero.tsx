"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

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
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-green-deep text-cream"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <Image
          src="/assets/logos/stripes-pattern.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="container-page relative z-10 px-4 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          {/* ─ Left: Copy ─ */}
          <div className="order-2 lg:order-1">
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

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="font-display mt-6 text-6xl font-bold uppercase leading-[0.78] tracking-tight sm:text-7xl lg:text-8xl xl:text-[7rem]"
            >
              {beer.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-7 max-w-lg text-base leading-relaxed text-cream/65 sm:text-lg"
            >
              {beer.description} {beer.tastingNote}
            </motion.p>

            {/* Compact specs row */}
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
            </motion.div>

            {/* Inline spec pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream/60">
                Alcool <strong className="text-orange">{beer.abv}%</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream/60">
                EBC <strong className="text-orange">{beer.ebc}/5</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream/60">
                IBU <strong className="text-orange">{beer.ibu}/5</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream/60">
                {beer.fermentation}
              </span>
            </motion.div>

            {/* Formats — horizontal scroll */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              className="mt-5 overflow-x-auto scrollbar-none"
            >
              <div className="flex gap-2">
                {beer.formats.map((format) => {
                  const isFut = format.toLowerCase().includes("fût");
                  return (
                    <span
                      key={format}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                        isFut
                          ? "border-orange/40 bg-orange/10 text-orange"
                          : "border-cream/15 bg-cream/5 text-cream/80"
                      }`}
                    >
                      {format}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Toggle details (distribution) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="mt-5"
            >
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange/80 transition-colors hover:text-orange"
              >
                <span>{showDetails ? "Masquer" : "Voir plus"}</span>
                <motion.span
                  animate={{ rotate: showDetails ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="inline-block text-sm"
                >
                  ↓
                </motion.span>
              </button>

              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex flex-wrap gap-3">
                    {beer.ranges.map((range) => (
                      <span
                        key={range}
                        className={`eyebrow rounded-sm px-3 py-1.5 text-xs font-bold ${
                          range === "CHR"
                            ? "bg-cream/10 text-cream"
                            : "bg-orange/20 text-orange"
                        }`}
                      >
                        {range === "CHR"
                          ? "Cafés · Hôtels · Restaurants"
                          : "Grande distribution"}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <CtaLink href="/trouver">Où la trouver ?</CtaLink>
              <CtaLink href="/toutes-les-bieres" variant="light">
                Toutes les bières
              </CtaLink>
            </motion.div>
          </div>

          {/* ─ Right: Bottle ─ */}
          <div className="order-1 flex justify-center lg:order-2 lg:sticky lg:top-28">
            <motion.div
              style={{ y: bottleY, scale: bottleScale }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="relative"
            >
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
