"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";
import { manifestoContent } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

export function ManifestoSection() {
  // `headline` reste dans lib/data.ts : le titre est provisoirement en Lorem ipsum.
  const { philosophy, vision, engagements } = manifestoContent;

  /* Parallax for the photo strip */
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stripProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });
  const stripY = useTransform(stripProgress, [0, 1], [-40, 40]);

  return (
    <section id="manifeste" className="scroll-mt-20 overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════
          ACT 1 — The Declaration
          Dark green, massive headline, stripes texture + arch graphic
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative bg-green-deep text-cream">
        {/* Stripes texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <Image
            src="/assets/logos/stripes-pattern.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Arch decoration — top right */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-[22rem] w-[22rem] opacity-[0.06] sm:h-[30rem] sm:w-[30rem] lg:-right-4 lg:h-[36rem] lg:w-[36rem]">
          <Image
            src="/assets/logos/arche-beige.png"
            alt=""
            width={600}
            height={600}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="container-page relative z-10 px-4 py-24 sm:py-32 lg:py-40">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.8 }}
            className="eyebrow text-orange text-sm sm:text-base font-bold tracking-[0.25em]"
          >
            Manifeste
          </motion.p>

          <AnimatedHeading
            as="h2"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            className="font-display mt-8 max-w-[18ch] text-5xl font-bold uppercase leading-[0.82] tracking-tight sm:mt-10 sm:text-7xl lg:text-8xl xl:text-[6.5rem]"
          />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
            className="mt-12 h-[3px] w-32 origin-left bg-orange sm:mt-16 sm:w-48"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 max-w-xl text-lg leading-relaxed text-cream/75 sm:mt-12 sm:text-xl space-y-1"
          >
            <p>Nous conjuguons l&apos;héritage au présent.</p>
            <p>Nous brassons avec la rigueur du passé et l&apos;audace du futur.</p>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          PHOTO STRIP — full-bleed visual pause with parallax
          ═══════════════════════════════════════════════════════════ */}
      <div ref={stripRef} className="relative h-48 overflow-hidden sm:h-64 lg:h-80">
        <motion.div style={{ y: stripY }} className="absolute inset-[-40px_0]">
          <Image
            src="/Charte Graphique_Dossier/Links/brasserie jour.jpg"
            alt="Intérieur de la brasserie Georges"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-green-deep/40" />
        </motion.div>
        {/* Decorative separator centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6 }}
            className="relative h-12 w-32 opacity-60 sm:h-14 sm:w-40"
          >
            <Image
              src="/assets/logos/separateur.png"
              alt=""
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          ACT 2 — The Three Pillars
          Cream bg, editorial rows (no numbers, no labels),
          charte shapes: arches in watermark + separateur between rows
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-cream text-green">
        {/* Trame de la charte en fond */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <Image
            src="/assets/logos/stripes-pattern.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="container-page relative z-10 px-4">
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            <motion.article
              variants={fadeUp}
              className="relative grid items-start gap-6 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20"
            >
              <div className="relative">
                {/* Arche de la charte en filigrane derrière le titre */}
                <div className="pointer-events-none absolute -left-8 -top-10 h-44 w-44 opacity-[0.09] sm:h-56 sm:w-56">
                  <Image
                    src="/assets/logos/arche-brique.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-display relative text-3xl font-bold uppercase leading-[0.85] sm:text-4xl lg:text-5xl">
                  Les héritiers
                  <br className="hidden lg:block" /> de l&apos;audacieux.
                </h3>
                <span className="mt-7 block h-[3px] w-16 bg-orange" />
              </div>
              <p className="max-w-2xl self-center text-[1.05rem] leading-[1.8] text-green/70">
                {philosophy.text}
              </p>
            </motion.article>
            {/* Séparateur de la charte graphique */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center opacity-45"
            >
              <Image
                src="/assets/logos/separateur.png"
                alt=""
                width={200}
                height={48}
                className="h-7 w-auto object-contain sm:h-9"
              />
            </motion.div>
            <motion.article
              variants={fadeUp}
              className="relative grid items-start gap-6 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20"
            >
              <div className="relative">
                {/* Arche de la charte en filigrane derrière le titre */}
                <div className="pointer-events-none absolute -left-8 -top-10 h-44 w-44 opacity-[0.09] sm:h-56 sm:w-56">
                  <Image
                    src="/assets/logos/arche-vert.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-display relative text-3xl font-bold uppercase leading-[0.85] sm:text-4xl lg:text-5xl">
                  Les conquérants
                  <br className="hidden lg:block" /> de la bière.
                </h3>
                <span className="mt-7 block h-[3px] w-16 bg-orange" />
              </div>
              <p className="max-w-2xl self-center text-[1.05rem] leading-[1.8] text-green/70">
                {vision.text}
              </p>
            </motion.article>
            {/* Séparateur de la charte graphique */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center opacity-45"
            >
              <Image
                src="/assets/logos/separateur.png"
                alt=""
                width={200}
                height={48}
                className="h-7 w-auto object-contain sm:h-9"
              />
            </motion.div>
            {/* Troisième pilier — titre, texte et engagements */}
            <motion.article
              variants={fadeUp}
              className="relative grid items-start gap-6 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20"
            >
              <div className="relative">
                <div className="pointer-events-none absolute -left-8 -top-10 h-44 w-44 opacity-[0.09] sm:h-56 sm:w-56">
                  <Image
                    src="/assets/logos/arche-brique.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-display relative text-3xl font-bold uppercase leading-[0.85] sm:text-4xl lg:text-5xl">
                  L&apos;exigence
                  <br className="hidden lg:block" /> sans concession.
                </h3>
                <span className="mt-7 block h-[3px] w-16 bg-orange" />
                <p className="mt-7 max-w-lg text-[0.95rem] leading-[1.8] text-green/65">
                  {engagements.text}
                </p>
              </div>
              <ul className="space-y-4 self-center border-l border-orange/25 pl-6 lg:pl-10">
                {engagements.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={inViewOnce}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.1,
                      ease: EASE,
                    }}
                    className="flex items-start gap-4 text-[0.95rem] leading-relaxed text-green/80"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange/12">
                      <Icon name="check" size={12} className="text-orange" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
