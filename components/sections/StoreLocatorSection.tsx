"use client";

import { motion } from "framer-motion";
import Script from "next/script";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, inViewOnce } from "@/lib/motion";

const ELFSIGHT_APP_ID = "555fd09f-0667-4579-8499-edd2f28f3398";

export function StoreLocatorSection() {
  return (
    <section id="locator" className="section-padding bg-cream px-4">
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      <div className="container-page">
        <div className="flex flex-col items-center text-center">
          <Badge tone="cream">Points de vente</Badge>
          <AnimatedHeading
            as="h2"
            text="Où goûter l'audace ?"
            accentFrom={2}
            className="font-display mt-6 text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-dark-text/65 leading-relaxed"
          >
            Bars, restaurants, caves, épiceries fines ou lieux de convivialité —
            Bières Georges se découvre dans des adresses choisies avec soin.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-12 overflow-hidden rounded-3xl border border-dark-text/10 bg-cream-dark"
        >
          <div
            className={`elfsight-app-${ELFSIGHT_APP_ID} min-h-[32rem] w-full`}
            data-elfsight-app-lazy
          />
        </motion.div>
      </div>
    </section>
  );
}
