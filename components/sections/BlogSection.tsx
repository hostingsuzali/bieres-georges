"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { CtaLink } from "@/components/ui/CtaLink";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

const articles = [
  {
    slug: "art-du-brassage-georges",
    category: "Brasserie",
    date: "12 juin 2026",
    title: "L'art du brassage : comment naît une Bières Georges",
    excerpt:
      "De la sélection des houblons à la mise en fût, plongez dans les coulisses de notre processus de brassage artisanal.",
    imageSrc: null as string | null,
    imagePlaceholder: "Cuves de brassage — à venir",
    readTime: "5 min",
  },
  {
    slug: "histoire-brasserie-depuis-1836",
    category: "Histoire",
    date: "3 mai 2026",
    title: "1836 : la maison qui refusait de disparaître",
    excerpt:
      "Deux siècles de caractère ne s'inventent pas. Retour sur les tournants qui ont forgé l'identité des Bières Georges.",
    imageSrc: null as string | null,
    imagePlaceholder: "Archives historiques brasserie — à venir",
    readTime: "8 min",
  },
  {
    slug: "accords-bieres-gastronomie",
    category: "Gastronomie",
    date: "18 avr. 2026",
    title: "Accords bières & cuisine : nos trois duos incontournables",
    excerpt:
      "Nos brasseurs partagent leurs associations préférées entre les Originales, les Spéciales et les plats de saison.",
    imageSrc: null as string | null,
    imagePlaceholder: "Accord bière et gastronomie — à venir",
    readTime: "4 min",
  },
];

export function BlogSection() {
  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-green px-4 py-28 sm:py-40 lg:py-56"
    >
      {/* Decorative watermark */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-72 opacity-[0.07] lg:w-[28rem]"
        aria-hidden="true"
      >
        <Image
          src="/assets/logos/sigle-stripes.png"
          alt=""
          width={792}
          height={894}
          className="h-auto w-full"
        />
      </div>

      <div className="container-page relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="green">La Gazette</Badge>

          <AnimatedHeading
            as="h2"
            text="Actualités & Articles"
            accentFrom={2}
            className="mt-6 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-cream sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 leading-relaxed text-cream/60"
          >
            Brasserie, histoire, gastronomie — les histoires qui se brassent
            derrière chaque bouteille.
          </motion.p>
        </div>

        {/* Articles grid */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.a
              key={article.slug}
              href={`/blog/${article.slug}`}
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-3xl border border-cream/10 bg-green-dark transition-colors duration-300 hover:border-orange/40 hover:bg-green-dark/80"
            >
              {/* Image area */}
              <div className="relative h-48 w-full overflow-hidden bg-cream/5 sm:h-52">
                {article.imageSrc ? (
                  <Image
                    src={article.imageSrc}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="px-6 text-center text-xs text-cream/25 italic">
                      {article.imagePlaceholder}
                    </p>
                  </div>
                )}

                {/* Category chip */}
                <span className="absolute left-4 top-4 rounded-full bg-orange px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-cream">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-7">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-cream/35">
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime} de lecture</span>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight text-cream transition-colors duration-300 group-hover:text-orange sm:text-2xl">
                  {article.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/55">
                  {article.excerpt}
                </p>

                <span className="eyebrow mt-6 inline-block text-orange transition-colors duration-300 group-hover:text-cream">
                  Lire l&apos;article →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <CtaLink href="/blog">
            Tous les articles
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
