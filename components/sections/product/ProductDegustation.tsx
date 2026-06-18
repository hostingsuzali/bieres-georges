"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

type ProductDegustationProps = {
  pairing: string;
  serving: string;
};

const ritualSteps = [
  {
    title: "Servir",
    text: "À 6° dans un verre tulipe propre, incliné, pour laisser la mousse se former.",
  },
  {
    title: "Observer",
    text: "La robe, l'éclat, la tenue du col — chaque bière raconte déjà son brassin.",
  },
  {
    title: "Sentir",
    text: "Faites tourner le verre, approchez le nez, laissez les arômes s'installer.",
  },
  {
    title: "Déguster",
    text: "Une gorgée franche. Attention à l'attaque, au milieu de bouche, à la finale.",
  },
];

export function ProductDegustation({
  pairing,
  serving,
}: ProductDegustationProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bgRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={bgRef} className="relative overflow-hidden text-cream">
      {/* Full-bleed background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-60px_0] z-0">
        <Image
          src="/assets/images/trinquent.jpg"
          alt="Moment de dégustation Bières Georges"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-green-deep/85" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* ── Top: heading + serving ── */}
        <div className="section-padding px-4 pb-0">
          <div className="container-page text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6 }}
              className="eyebrow text-orange"
            >
              Dégustation
            </motion.p>

            <AnimatedHeading
              as="h2"
              text="Le rituel en quatre gestes."
              className="font-display mx-auto mt-5 max-w-3xl text-4xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl"
            />

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inViewOnce}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
              className="mx-auto mt-8 h-px w-20 bg-orange"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mx-auto mt-8 max-w-xl leading-relaxed text-cream/65"
            >
              {serving}
            </motion.p>
          </div>
        </div>

        {/* ── Ritual steps grid ── */}
        <div className="px-4 pb-6 pt-14 sm:pt-16">
          <motion.div
            className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            {ritualSteps.map((step, i) => (
              <motion.article
                key={step.title}
                variants={fadeUp}
                className="group border border-cream/10 bg-cream/5 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-orange hover:text-cream"
              >
                <p className="font-display text-5xl font-bold leading-none text-orange/40 transition-colors group-hover:text-cream/30">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-5 text-2xl font-bold uppercase">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/55 transition-colors group-hover:text-cream/75">
                  {step.text}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom: pairing callout ── */}
        <div className="border-t border-cream/10 px-4 py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7 }}
            className="container-page flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-orange/30 bg-orange/10">
              <span className="font-display text-xl font-bold text-orange">
                &#10038;
              </span>
            </div>
            <div>
              <p className="eyebrow text-orange">Accord conseillé</p>
              <p className="mt-2 text-lg leading-relaxed text-cream/70">
                {pairing}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
