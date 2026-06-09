"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

const occasions = [
  "Événements privés",
  "Réceptions",
  "Festivals",
  "Soirées d'entreprise",
  "Entre amis",
];

// "Une tireuse pour vos moments forts" — a half-and-half magazine spread:
// a full-bleed pression-bar photo on the left, the offer + tag chips on
// the right. The photo zooms slowly on scroll for a cinematic feel.
export function TireuseSection() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      id="tireuse"
      className="relative overflow-hidden bg-cream text-green"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        {/* left — full-bleed photo with overlapping number tag */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative min-h-[24rem] overflow-hidden bg-green-deep lg:min-h-[42rem]"
        >
          <motion.div style={{ scale: photoScale, y: photoY }} className="h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/pression_bar.jpg"
              alt="Une bière Georges servie à la pression au bar"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* corner tag */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="absolute bottom-6 left-6 flex items-center gap-3 bg-orange px-5 py-3 text-cream sm:bottom-10 sm:left-10"
          >
            <span className="font-display text-3xl font-bold leading-none">
              5L → 30L
            </span>
            <span className="eyebrow text-cream/85">
              Fûts
              <br />
              disponibles
            </span>
          </motion.div>

          {/* small floating badge in the upper corner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            className="absolute right-6 top-6 hidden h-24 w-24 items-center justify-center rounded-full border border-cream/40 bg-green-deep/55 text-cream backdrop-blur-sm sm:flex sm:right-10 sm:top-10"
          >
            <p className="text-center font-serif text-xs italic leading-tight">
              À la pression,
              <br />
              comme au bar.
            </p>
          </motion.div>
        </motion.div>

        {/* right — copy */}
        <div className="flex items-center bg-green-deep px-4 py-16 text-cream sm:px-10 lg:py-24">
          <div className="container-page max-w-xl">
            <Badge tone="green" dot={false}>
              À la pression
            </Badge>

            <AnimatedHeading
              as="h2"
              text="Une tireuse"
              className="font-display mt-6 text-5xl font-bold uppercase leading-[0.92] tracking-tight sm:text-7xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-serif mt-1 text-3xl italic text-orange sm:text-5xl"
            >
              pour vos moments forts.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mt-7 max-w-md text-cream/70 leading-relaxed"
            >
              Bières Georges accompagne vos instants de partage avec des
              solutions de tirage adaptées. Une expérience généreuse, conviviale
              et simple à mettre en place.
            </motion.p>

            {/* occasions chips */}
            <motion.ul
              variants={stagger(0.07, 0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
              className="mt-8 flex flex-wrap gap-2"
            >
              {occasions.map((o) => (
                <motion.li
                  key={o}
                  variants={fadeUp}
                  className="eyebrow flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-cream/85"
                >
                  <Icon name="check" size={14} className="text-orange" />
                  {o}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="mt-10"
            >
              <Button variant="solid" cut withArrow>
                Demander une tireuse
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
