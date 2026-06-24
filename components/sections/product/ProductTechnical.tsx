"use client";

import { motion } from "framer-motion";

import type { Beer } from "@/lib/products";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

type ProductTechnicalProps = {
  beer: Beer;
};

export function ProductTechnical({ beer }: ProductTechnicalProps) {
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

        <motion.ul
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {beer.ingredients.map((ingredient) => (
            <motion.li
              key={ingredient}
              variants={fadeUp}
              className="flex items-center gap-3 border border-green/10 bg-cream px-4 py-3 text-sm leading-snug text-green/75"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
              {ingredient}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
