"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

import {
  BitternessScale,
  ColourScale,
  ebcColour,
} from "@/components/beers/BeerScales";
import { FormatPictos } from "@/components/beers/FormatPictos";
import { MedalRow } from "@/components/beers/MedalRow";
import { CtaLink } from "@/components/ui/CtaLink";
import { formatAbv } from "@/lib/beer-meta";
import { summarizeMedals } from "@/lib/medals";
import { EASE } from "@/lib/motion";
import type { Beer } from "@/lib/products";

type ProductHeroProps = {
  beer: Beer;
};

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export function ProductHero({ beer }: ProductHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const tint = ebcColour(beer.ebc) ?? "#d96a3a";

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
            {beer.availability && (
              <motion.p {...reveal(0)} className="eyebrow text-orange">
                {beer.availability}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className={`font-display text-6xl font-bold uppercase leading-[0.78] tracking-tight sm:text-7xl lg:text-8xl xl:text-[7rem] ${beer.availability ? "mt-6" : ""}`}
            >
              {beer.name}
            </motion.h1>

            <motion.p
              {...reveal(0.2)}
              className="mt-5 font-sans text-xl font-medium italic text-orange sm:text-2xl"
            >
              {beer.tagline ?? beer.style}
            </motion.p>

            <motion.p
              {...reveal(0.3)}
              className="mt-5 max-w-lg text-base leading-relaxed text-cream/65 sm:text-lg"
            >
              {[beer.description, beer.tastingNote].filter(Boolean).join(" ")}
            </motion.p>

            {/* Fiche express — TAV, amertume, couleur, fermentation */}
            <motion.dl
              {...reveal(0.4)}
              className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-4"
            >
              <Stat label="TAV">
                <span className="font-display text-3xl font-bold leading-none text-orange">
                  {formatAbv(beer.abv, beer.abvLabel)}
                </span>
              </Stat>
              <Stat label="Amertume">
                <BitternessScale value={beer.ibu} tone="light" />
              </Stat>
              <Stat label="Couleur">
                <ColourScale value={beer.ebc} tone="light" />
              </Stat>
              <Stat label="Fermentation">
                <span className="text-sm font-semibold uppercase tracking-wide text-cream/85">
                  {beer.fermentation}
                </span>
              </Stat>
            </motion.dl>

            {/* Conditionnements — pictogrammes */}
            <motion.div {...reveal(0.5)} className="mt-7">
              <p className="eyebrow mb-3 text-cream/50">Conditionnements</p>
              <FormatPictos formats={beer.formats} tone="light" />
            </motion.div>

            {/* Médailles */}
            {beer.medals.length > 0 && (
              <motion.div {...reveal(0.55)} className="mt-7">
                <p className="eyebrow mb-3 text-cream/50">Médailles</p>
                <MedalRow ids={beer.medals} height={52} />
                <p className="mt-3 text-xs leading-relaxed text-cream/55">
                  {summarizeMedals(beer.medals)}
                </p>
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div {...reveal(0.6)} className="mt-9 flex flex-wrap gap-3">
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
                <div
                  style={{ backgroundColor: tint }}
                  className="h-56 w-56 rounded-full opacity-40 blur-[80px] sm:h-72 sm:w-72"
                />
              </div>
              <div className="pointer-events-none absolute bottom-[12%] left-1/2 -translate-x-1/2">
                <div className="h-36 w-36 rounded-full bg-orange/55 blur-[40px]" />
              </div>

              <Image
                src={beer.image}
                alt={`Bière Georges ${beer.name}`}
                width={520}
                height={840}
                priority
                className="relative z-10 mx-auto h-[26rem] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] sm:h-[34rem] lg:h-[42rem] xl:h-[48rem]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-3 bg-green-deep p-4">
      <dt className="eyebrow text-cream/50">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
