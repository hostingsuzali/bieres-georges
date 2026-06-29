"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { CtaLink } from "@/components/ui/CtaLink";
import { ExpandableText } from "@/components/ui/ExpandableText";
import { Icon } from "@/components/ui/Icon";
import { savoirFaireBlocks } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

function ParallaxImage({
  src,
  alt,
  reverse,
}: {
  src: string;
  alt: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${
        reverse ? "tag-shape" : "cut-corner"
      } aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[36rem]`}
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/30 via-transparent to-transparent" />
    </div>
  );
}

export function SavoirFaireSection() {
  return (
    <section
      id="savoir-faire"
      className="scroll-mt-20 overflow-hidden bg-cream-dark text-green"
    >
      {savoirFaireBlocks.map((block, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            key={block.eyebrow}
            className={`grid lg:grid-cols-2 ${
              index > 0 ? "border-t border-green/10" : ""
            }`}
          >
            {/* Photo — left on even, right on odd */}
            <div
              className={`min-h-[24rem] lg:min-h-0 ${
                isReversed ? "order-1 lg:order-2" : "order-1"
              }`}
            >
              <ParallaxImage
                src={block.image}
                alt={block.title}
                reverse={isReversed}
              />
            </div>

            {/* Copy */}
            <div
              className={`section-padding flex items-center px-4 ${
                isReversed ? "order-2 lg:order-1" : "order-2"
              }`}
            >
              <div className="mx-auto max-w-xl lg:px-8 xl:px-14">
                <Badge tone="orange">{block.eyebrow}</Badge>

                <AnimatedHeading
                  as="h3"
                  text={block.title}
                  className="font-display mt-5 text-3xl font-bold uppercase leading-[0.9] sm:text-4xl lg:text-5xl"
                />

                {/* Animated divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                  className="mt-7 h-px w-20 origin-left bg-orange"
                />

                {/* Body + expandable "voir plus" */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="mt-7"
                >
                  <ExpandableText
                    summary={block.body}
                    expanded={block.expanded}
                    className="text-green/70"
                  />
                </motion.div>

                {/* Highlight list */}
                <motion.ul
                  className="mt-8 space-y-3"
                  variants={stagger(0.1, 0.3)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={inViewOnce}
                >
                  {block.highlights.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      className="flex items-start gap-3 text-sm leading-relaxed text-green/75"
                    >
                      <Icon
                        name="check"
                        size={16}
                        className="mt-0.5 shrink-0 text-orange"
                      />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        );
      })}

      {/* Maillage interne — blocs visuels pleine largeur */}
      <div className="border-t border-green/10 bg-cream px-4 py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow text-center text-orange">Poursuivre la découverte</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-3xl font-bold uppercase leading-[0.95] text-green sm:text-5xl">
            La suite de l&apos;histoire
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="grid gap-6 rounded-3xl bg-green-deep p-8 text-cream sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
              <Icon name="caviste" size={36} className="text-orange" />
              <div>
                <h3 className="font-display text-2xl font-bold uppercase leading-[0.95] sm:text-3xl">
                  Nos bières emblématiques
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">
                  Quatre caractères, une même exigence : explorez la gamme
                  Georges, des Originales aux Spéciales.
                </p>
                <div className="mt-6">
                  <CtaLink href="/toutes-les-bieres" variant="light">
                    Voir les bières
                  </CtaLink>
                </div>
              </div>
            </article>

            <article className="grid gap-6 rounded-3xl border border-green/15 bg-cream-dark p-8 text-green sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
              <Icon name="bar" size={36} className="text-orange" />
              <div>
                <h3 className="font-display text-2xl font-bold uppercase leading-[0.95] sm:text-3xl">
                  Travailler avec nous
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-green/65">
                  Bars, cavistes, grande distribution ou événements : construisons
                  un accompagnement adapté à votre activité.
                </p>
                <div className="mt-6">
                  <CtaLink href="/travailler-avec-nous" variant="green">
                    Travailler avec nous
                  </CtaLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
