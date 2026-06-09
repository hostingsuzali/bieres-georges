"use client";

import { motion } from "framer-motion";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EASE, inViewOnce } from "@/lib/motion";

// "Manifeste" — a two-column editorial: a tall photo of the brewery on the
// left and the manifesto statement + CTA on the right.
export function FounderVisionSection() {
  return (
    <section
      id="manifeste"
      className="section-padding relative overflow-hidden bg-cream px-4"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* left — tall photo with overlapping label tag */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          <div className="tag-shape relative aspect-[4/5] overflow-hidden bg-green">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/BRASSERIE.jpg"
              alt="La brasserie Bières Georges à Lyon"
              className="h-full w-full object-cover"
            />
            {/* slight dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-deep/40 via-transparent to-transparent" />
          </div>

          {/* overlapping orange ticket with the year */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="absolute -bottom-6 -left-4 flex items-center gap-3 bg-orange px-5 py-3 text-cream sm:-left-6"
          >
            <span className="font-display text-3xl font-bold leading-none">
              1836
            </span>
            <span className="eyebrow text-cream/85">
              Maison fondée
              <br />à Lyon
            </span>
          </motion.div>
        </motion.div>

        {/* right — manifesto copy */}
        <div>
          <Badge tone="orange" dot={false}>
            Manifeste
          </Badge>

          <AnimatedHeading
            as="h2"
            text="Une brasserie lyonnaise,"
            className="font-display mt-6 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-green sm:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-serif mt-1 text-4xl italic text-orange sm:text-5xl"
          >
            libre depuis 1836.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="mt-8 h-px w-20 origin-left bg-orange"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="mt-8 max-w-md text-dark-text/75 leading-relaxed"
          >
            Depuis près de deux siècles, Bières Georges cultive un goût franc,
            généreux et singulier. Ancrée à Lyon, la brasserie perpétue un
            savoir-faire historique tout en affirmant une vision contemporaine
            de la bière.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="font-serif mt-5 max-w-md text-lg italic text-green sm:text-xl"
          >
            Ici, chaque recette raconte une rencontre entre tradition, caractère
            et liberté.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="mt-9"
          >
            <Button variant="green" cut withArrow>
              Découvrir la maison
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
