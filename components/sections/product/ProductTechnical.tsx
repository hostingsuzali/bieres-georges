"use client";

import { motion } from "framer-motion";

import { IngredientIcon } from "@/components/beers/Pictograms";
import { groupIngredients } from "@/lib/beer-meta";
import type { Beer } from "@/lib/products";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

type ProductTechnicalProps = {
  beer: Beer;
};

export function ProductTechnical({ beer }: ProductTechnicalProps) {
  const groups = groupIngredients(beer.ingredients);

  return (
    <section className="bg-cream-dark px-4 py-14 text-green sm:py-16">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6 }}
          className="eyebrow text-orange"
        >
          Composition
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display mt-3 text-3xl font-bold uppercase leading-[0.9] sm:text-4xl"
        >
          Ingrédients.
        </motion.h2>

        {groups.length === 0 ? (
          <p className="mt-8 border border-green/10 bg-cream px-4 py-3 text-sm text-green/65">
            Composition à confirmer.
          </p>
        ) : (
          <motion.ul
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            {groups.map((group) => (
              <motion.li
                key={group.key}
                variants={fadeUp}
                className="border border-green/10 bg-cream px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <IngredientIcon
                    group={group.key}
                    className="h-8 w-8 shrink-0 text-orange"
                  />
                  <p className="eyebrow text-green">{group.label}</p>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm leading-snug text-green/75">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
