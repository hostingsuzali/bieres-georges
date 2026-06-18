"use client";

import { motion } from "framer-motion";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { founderValues } from "@/lib/data";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

export function ValeursSection() {
  return (
    <section
      id="valeurs"
      className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream"
    >
      <div className="container-page">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
          <div>
            <Badge tone="green">Valeurs</Badge>
            <AnimatedHeading
              as="h2"
              text="Ce qui tient la maison debout."
              className="font-display mt-5 text-4xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7 }}
            className="max-w-md leading-relaxed text-cream/60"
          >
            Cinq convictions qui guident chaque brassin, chaque étiquette,
            chaque rencontre avec ceux qui boivent nos bières.
          </motion.p>
        </div>

        {/* Value cards — top row of 3, bottom row of 2 centered */}
        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {founderValues.slice(0, 3).map((value, index) => (
            <motion.article
              key={value.title}
              variants={fadeUp}
              className="group border border-cream/10 bg-cream/5 p-8 transition-colors duration-300 hover:bg-cream hover:text-green"
            >
              <p className="font-display text-5xl font-bold leading-none text-orange/30 transition-colors group-hover:text-orange">
                {String(index + 1).padStart(2, "0")}
              </p>
              <Icon
                name={value.icon as IconName}
                size={32}
                className="mt-6 text-orange"
              />
              <h3 className="font-display mt-5 text-2xl font-bold uppercase leading-tight">
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/65 transition-colors group-hover:text-green/60">
                {value.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
        <motion.div
          className="mx-auto mt-5 grid max-w-3xl gap-5 sm:grid-cols-2"
          variants={stagger(0.1, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {founderValues.slice(3).map((value, index) => (
            <motion.article
              key={value.title}
              variants={fadeUp}
              className="group border border-cream/10 bg-cream/5 p-8 transition-colors duration-300 hover:bg-cream hover:text-green"
            >
              <p className="font-display text-5xl font-bold leading-none text-orange/30 transition-colors group-hover:text-orange">
                {String(index + 4).padStart(2, "0")}
              </p>
              <Icon
                name={value.icon as IconName}
                size={32}
                className="mt-6 text-orange"
              />
              <h3 className="font-display mt-5 text-2xl font-bold uppercase leading-tight">
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/65 transition-colors group-hover:text-green/60">
                {value.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
