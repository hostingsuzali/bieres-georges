"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { BitternessScale, ColourScale } from "@/components/beers/BeerScales";
import { FormatPictos } from "@/components/beers/FormatPictos";
import { IngredientIcon } from "@/components/beers/Pictograms";
import { formatAbv, groupIngredients } from "@/lib/beer-meta";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";
import type { Beer } from "@/lib/products";

type ProductTechnicalProps = {
  beer: Beer;
};

/** Fiche technique : caractéristiques à gauche, ingrédients en pictogrammes à droite. */
export function ProductTechnical({ beer }: ProductTechnicalProps) {
  const groups = groupIngredients(beer.ingredients);

  return (
    <section className="bg-cream-dark px-4 py-14 text-green sm:py-20">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6 }}
          className="eyebrow text-orange"
        >
          Composition & caractère
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display mt-3 text-4xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-5xl"
        >
          Fiche <span className="text-orange">technique</span>
        </motion.h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Caractéristiques */}
          <motion.dl
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="divide-y divide-green/10 border-y border-green/10"
          >
            <Row label="Style">{beer.style}</Row>
            <Row label="Fermentation">{beer.fermentation}</Row>
            <Row label="TAV">
              <span className="font-display text-xl font-semibold">
                {formatAbv(beer.abv, beer.abvLabel)}
              </span>
            </Row>
            <Row label="Amertume">
              <BitternessScale value={beer.ibu} />
            </Row>
            <Row label="Couleur">
              <ColourScale value={beer.ebc} />
            </Row>
            <Row label="Conditionnements">
              <FormatPictos formats={beer.formats} size="sm" />
            </Row>
          </motion.dl>

          {/* Ingrédients */}
          <div>
            <p className="eyebrow text-green/55">Ingrédients</p>
            {groups.length === 0 ? (
              <p className="mt-4 border border-green/10 bg-cream px-4 py-3 text-sm text-green/65">
                Composition à confirmer.
              </p>
            ) : (
              <motion.ul
                className="mt-4 grid gap-3 sm:grid-cols-2"
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={inViewOnce}
              >
                {groups.map((group) => (
                  <motion.li
                    key={group.key}
                    variants={fadeUp}
                    className="border border-green/10 bg-cream px-5 py-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10">
                        <IngredientIcon
                          group={group.key}
                          className="h-6 w-6 text-orange"
                        />
                      </span>
                      <p className="font-display text-xl font-semibold uppercase leading-none">
                        {group.label}
                      </p>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm leading-snug text-green/75">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-[9rem_1fr] items-center gap-4 py-4 sm:grid-cols-[11rem_1fr]"
    >
      <dt className="eyebrow text-green/55">{label}</dt>
      <dd className="text-sm font-medium text-green">{children}</dd>
    </motion.div>
  );
}
