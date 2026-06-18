"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import type { Beer } from "@/lib/products";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

type ProductRelatedProps = {
  beers: Beer[];
};

export function ProductRelated({ beers }: ProductRelatedProps) {
  return (
    <section className="section-padding bg-cream px-4 text-green">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Badge tone="orange">Dans le même esprit</Badge>
            <AnimatedHeading
              as="h2"
              text="Poursuivre l'exploration."
              className="font-display mt-5 text-4xl font-bold uppercase leading-[0.9] sm:text-5xl"
            />
          </div>
          <Link
            href="/toutes-les-bieres"
            className="eyebrow group inline-flex items-center gap-2 text-orange transition-colors hover:text-green"
          >
            Voir toutes les bières
            <span className="transition-transform group-hover:translate-x-1">
              <Icon name="arrowRight" size={16} />
            </span>
          </Link>
        </div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-3"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {beers.map((beer) => (
            <motion.div key={beer.slug} variants={fadeUp}>
              <Link
                href={`/toutes-les-bieres/${beer.slug}`}
                className="group flex flex-col overflow-hidden border border-green/8 bg-cream-dark transition-colors duration-300 hover:bg-green hover:text-cream"
              >
                {/* Bottle image */}
                <div className="relative flex h-56 items-end justify-center bg-cream-dark px-6 pt-6 transition-colors group-hover:bg-green-deep">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-orange/10 blur-2xl transition-opacity group-hover:opacity-50" />
                  </div>
                  <Image
                    src={beer.image}
                    alt={`Bière Georges ${beer.name}`}
                    width={200}
                    height={300}
                    className="relative z-10 h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-orange">{beer.collection}</p>
                  <h3 className="font-display mt-2 text-2xl font-bold uppercase leading-none sm:text-3xl">
                    {beer.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-green/55 transition-colors group-hover:text-cream/55">
                    {beer.style}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-green/60 transition-colors group-hover:text-cream/60">
                    {beer.description}
                  </p>
                  <p className="eyebrow mt-auto inline-flex items-center gap-2 pt-6 text-orange">
                    Découvrir
                    <span className="transition-transform group-hover:translate-x-1">
                      <Icon name="arrowRight" size={14} />
                    </span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
