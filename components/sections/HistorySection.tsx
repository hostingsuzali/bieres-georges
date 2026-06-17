"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

const historyCards = [
  {
    year: "1836",
    title: "La maison prend racine",
    eyebrow: "Acte fondateur",
    image: "/history/history-1.jpg",
    rotation: "-rotate-[2.5deg]",
    offset: "lg:mt-16",
    text: "Une adresse lyonnaise, un esprit franc et une exigence de comptoir qui traversent les generations.",
  },
  {
    year: "1936",
    title: "Le gout devient rituel",
    eyebrow: "Archives de salle",
    image: "/history/history-2.jpg",
    rotation: "rotate-[1.5deg]",
    offset: "lg:-mt-4",
    text: "Autour des tables, la biere rassemble. Le geste reste simple, precis, genereux.",
  },
  {
    year: "2026",
    title: "L'heritage reprend voix",
    eyebrow: "Nouvelle garde",
    image: "/history/history-3.jpg",
    rotation: "-rotate-[1deg]",
    offset: "lg:mt-24",
    text: "Les recettes gagnent en relief sans perdre leur accent d'origine: libre, vivant, lyonnais.",
  },
];

export function HistorySection() {
  return (
    <section
      id="histoire"
      className="section-padding relative overflow-hidden bg-cream px-4"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.38] [background-image:linear-gradient(rgba(7,60,52,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(7,60,52,0.045)_1px,transparent_1px),radial-gradient(circle_at_18%_20%,rgba(217,106,58,0.16),transparent_28rem),radial-gradient(circle_at_85%_62%,rgba(7,60,52,0.12),transparent_30rem)] [background-size:48px_48px,48px_48px,auto,auto]" />
      <div className="pointer-events-none absolute -right-8 top-8 font-display text-[8rem] font-bold leading-none text-green/[0.045] sm:text-[13rem] lg:right-8 lg:top-0 lg:text-[20rem]">
        1836
      </div>

      <motion.div
        variants={stagger(0.14)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="container-page relative"
      >
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <div className="eyebrow inline-flex items-center gap-3 border-y border-orange/45 py-2 text-orange">
              <span className="h-px w-10 bg-orange/70" />
              Heritage vivant
            </div>

            <h2 className="font-display mt-7 text-4xl font-bold uppercase leading-[0.9] text-green sm:text-6xl lg:text-7xl">
              Deux siecles
              <span className="block text-orange">de caractere</span>
            </h2>

            <p className="font-serif mt-5 max-w-xl text-2xl italic leading-tight text-green/75 sm:text-4xl">
              Une memoire de brasserie, relevee par une lecture contemporaine
              du gout.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative max-w-2xl justify-self-end pt-2 lg:pt-12"
          >
            <div className="absolute -left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-orange/45 to-transparent lg:block" />

            <p className="text-base leading-8 text-dark-text/72 sm:text-lg">
              Depuis Lyon, Bieres Georges cultive une histoire de transmission:
              des recettes nettes, des lieux de rencontre, une maniere de
              brasser qui respecte le temps sans le figer. Chaque generation
              ajoute sa nuance, mais la maison conserve la meme promesse:
              servir une biere avec presence, precision et panache.
            </p>

            <div className="mt-8 border-l-2 border-orange bg-cream-dark/70 px-6 py-5 shadow-[0_22px_60px_-42px_rgba(6,58,52,0.55)]">
              <p className="font-serif text-xl italic leading-snug text-green sm:text-2xl">
                &quot;Le patrimoine n&apos;est pas un decor: c&apos;est une
                exigence que l&apos;on remet en jeu a chaque brassin.&quot;
              </p>
            </div>

            <motion.div
              className="mt-9"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Button variant="green" cut withArrow>
                Explorer l&apos;histoire
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={stagger(0.12, 0.18)}
          className="relative mt-20 lg:mt-28"
        >
          <div className="absolute left-[1.15rem] top-0 h-full w-px bg-green/15 lg:left-0 lg:right-0 lg:top-1/2 lg:mx-auto lg:h-px lg:w-[88%]" />

          <div className="grid gap-10 pl-12 lg:grid-cols-3 lg:gap-8 lg:pl-0">
            {historyCards.map((card, index) => (
              <motion.article
                key={card.year}
                variants={fadeUp}
                whileHover={{ y: -10, rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`group relative ${card.offset} ${card.rotation}`}
              >
                <span className="absolute -left-[2.9rem] top-10 z-10 h-4 w-4 rounded-full border border-orange bg-cream shadow-[0_0_0_8px_#f6ede4] lg:left-1/2 lg:top-[-2.25rem] lg:-translate-x-1/2" />

                <div className="relative bg-[#fbf4ec] p-4 shadow-[0_30px_90px_-48px_rgba(6,58,52,0.8)] ring-1 ring-green/10 transition-shadow duration-500 group-hover:shadow-[0_42px_110px_-46px_rgba(6,58,52,0.9)]">
                  <div className="absolute inset-2 border border-green/10" />
                  <div className="relative overflow-hidden bg-green">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={760}
                      height={560}
                      className="aspect-[4/3] w-full object-cover sepia-[0.18] transition duration-500 group-hover:scale-105 group-hover:sepia-0"
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-deep/45 via-transparent to-transparent" />
                    <span className="eyebrow absolute left-4 top-4 bg-cream/90 px-3 py-2 text-green shadow-sm">
                      {card.eyebrow}
                    </span>
                  </div>

                  <div className="relative px-2 pb-3 pt-5">
                    <div className="flex items-start justify-between gap-4 border-b border-green/15 pb-4">
                      <span className="font-display text-5xl font-bold leading-none text-orange sm:text-6xl">
                        {card.year}
                      </span>
                      <span className="mt-2 h-px flex-1 bg-orange/35" />
                    </div>

                    <h3 className="font-display mt-5 text-2xl font-bold uppercase leading-none text-green">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-dark-text/68">
                      {card.text}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
