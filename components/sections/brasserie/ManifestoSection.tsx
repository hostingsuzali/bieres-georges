"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
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

  const pillars = [
    { title: ["Les héritiers", "de l'audacieux."], text: philosophy.text },
    { title: ["Les conquérants", "de la bière."], text: vision.text },
  ];

  return (
    <section id="manifeste" className="scroll-mt-20 overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════
          ACT 1 — The Declaration
          Même mise en forme que les autres sections : sur-titre + titre
          à gauche, paragraphe à droite.
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

        <div className="container-page relative z-10 px-4 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
            <div>
              <SectionLabel>Manifeste</SectionLabel>

              {/* Titre provisoire (Lorem ipsum) — en attente du texte définitif */}
              <AnimatedHeading
                as="h2"
                text="Lorem ipsum dolor sit amet."
                className="font-display mt-5 text-4xl font-bold uppercase leading-[0.9] tracking-tight sm:text-5xl lg:text-6xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-xl space-y-1 leading-relaxed text-cream/75"
            >
              <p>Nous conjuguons l&apos;héritage au présent.</p>
              <p>
                Nous brassons avec la rigueur du passé et l&apos;audace du
                futur.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          PHOTO STRIP — full-bleed visual pause with parallax
          ═══════════════════════════════════════════════════════════ */}
      <div
        ref={stripRef}
        className="relative h-48 overflow-hidden sm:h-64 lg:h-80"
      >
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
      </div>

      {/* ═══════════════════════════════════════════════════════════
          ACT 2 — The Three Pillars
          Lignes éditoriales : ni numéros, ni sur-titres, ni filets
          verticaux — seulement un filet horizontal entre les blocs.
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-cream text-green">
        <div className="container-page relative z-10 px-4">
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            {pillars.map((pillar) => (
              <motion.article
                key={pillar.title[0]}
                variants={fadeUp}
                className="grid items-start gap-6 border-b border-green/10 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20"
              >
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase leading-[0.85] sm:text-4xl lg:text-5xl">
                    {pillar.title[0]}
                    <br className="hidden lg:block" /> {pillar.title[1]}
                  </h3>
                  <span className="mt-7 block h-[3px] w-16 bg-orange" />
                </div>
                <p className="max-w-2xl self-center text-[1.05rem] leading-[1.8] text-green/70">
                  {pillar.text}
                </p>
              </motion.article>
            ))}

            {/* Troisième pilier — titre, texte et engagements */}
            <motion.article
              variants={fadeUp}
              className="grid items-start gap-6 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20"
            >
              <div>
                <h3 className="font-display text-3xl font-bold uppercase leading-[0.85] sm:text-4xl lg:text-5xl">
                  L&apos;exigence
                  <br className="hidden lg:block" /> sans concession.
                </h3>
                <span className="mt-7 block h-[3px] w-16 bg-orange" />
                <p className="mt-7 max-w-lg text-[0.95rem] leading-[1.8] text-green/65">
                  {engagements.text}
                </p>
              </div>
              <ul className="space-y-4 self-center">
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
