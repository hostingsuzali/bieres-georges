"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { CtaLink } from "@/components/ui/CtaLink";
import type { Beer } from "@/lib/products";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

type ProductSpecsProps = {
  beer: Beer;
};

export function ProductSpecs({ beer }: ProductSpecsProps) {
  const specs = [
    {
      label: "Style",
      value: beer.style,
      detail: "Le profil brassicole qui définit le caractère de cette bière.",
    },
    {
      label: "Formats",
      value: beer.formats.join(" · "),
      detail: "Disponible en plusieurs contenances selon les circuits.",
    },
    {
      label: "Gammes",
      value: beer.ranges.join(" & "),
      detail:
        beer.ranges.length > 1
          ? "Présente en grande distribution et en CHR."
          : `Disponible en circuit ${beer.ranges[0]}.`,
    },
    {
      label: "Collection",
      value: beer.collection,
      detail:
        beer.collection === "Les Originales"
          ? "Les bières historiques et emblématiques de la maison."
          : "Des créations audacieuses en édition spéciale.",
    },
  ];

  return (
    <section className="overflow-hidden bg-cream-dark text-green">
      {/* ── Header row ── */}
      <div className="section-padding px-4 pb-0">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6 }}
              className="eyebrow text-orange"
            >
              Fiche technique
            </motion.p>
            <AnimatedHeading
              as="h2"
              text="Tout ce qu'il faut savoir."
              className="font-display mt-4 text-4xl font-bold uppercase leading-[0.9] sm:text-5xl lg:text-6xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xs text-sm leading-relaxed text-green/50"
          >
            Les disponibilités détaillées seront précisées avec votre
            interlocuteur commercial.
          </motion.p>
        </div>
      </div>

      {/* ── Specs — horizontal scroll on mobile, grid on desktop ── */}
      <div className="mt-12 px-4 sm:mt-14">
        <motion.div
          className="container-page"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {/* Mobile: horizontal scroll strip */}
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
            {specs.map((spec, i) => (
              <motion.article
                key={spec.label}
                variants={fadeUp}
                className="group flex w-[75vw] shrink-0 flex-col border-t-2 border-orange bg-cream p-6"
              >
                <p className="font-display text-4xl font-bold leading-none text-orange/25">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="eyebrow mt-4 text-orange">{spec.label}</p>
                <p className="font-display mt-3 text-2xl font-bold uppercase leading-tight">
                  {spec.value}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-green/50">
                  {spec.detail}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Desktop: full-width stacked rows with alternating accent */}
          <div className="hidden sm:block">
            {specs.map((spec, i) => (
              <motion.article
                key={spec.label}
                variants={fadeUp}
                className="group grid grid-cols-[4rem_1fr_1.2fr] items-baseline gap-6 border-b border-green/10 py-7 transition-colors duration-200 first:border-t lg:grid-cols-[5rem_10rem_1fr_1.4fr] lg:gap-8 lg:py-8"
              >
                {/* Number */}
                <p className="font-display text-3xl font-bold leading-none text-orange/30 transition-colors group-hover:text-orange lg:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </p>

                {/* Label — hidden on sm, visible lg */}
                <p className="eyebrow hidden text-orange lg:block">
                  {spec.label}
                </p>

                {/* Value */}
                <div>
                  <p className="eyebrow text-orange sm:hidden lg:hidden">
                    {spec.label}
                  </p>
                  <p className="font-display text-2xl font-bold uppercase leading-tight sm:text-3xl lg:text-4xl">
                    {spec.value}
                  </p>
                </div>

                {/* Detail */}
                <p className="hidden text-sm leading-relaxed text-green/50 sm:block">
                  {spec.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom CTA + separator ── */}
      <div className="px-4 pb-16 pt-12 sm:pb-20 sm:pt-14">
        <div className="container-page flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <CtaLink href="/trouver" variant="green">
              Trouver un point de vente
            </CtaLink>
            <CtaLink href="/travailler-avec-nous" variant="outline">
              Vous êtes professionnel ?
            </CtaLink>
          </motion.div>

          <div className="opacity-15">
            <Image
              src="/assets/logos/separateur.png"
              alt=""
              width={200}
              height={40}
              className="h-auto w-28"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
