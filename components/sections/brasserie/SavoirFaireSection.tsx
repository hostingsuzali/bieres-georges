"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { savoirFaireContent } from "@/lib/data";
import { EASE, inViewOnce } from "@/lib/motion";

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
  const [open, setOpen] = useState(false);

  return (
    <section
      id="savoir-faire"
      className="scroll-mt-20 overflow-hidden bg-cream-dark text-green"
    >
      <div className="grid lg:grid-cols-2">
        {/* Photo */}
        <div className="min-h-[28rem] lg:min-h-0">
          <ParallaxImage
            src={savoirFaireContent.image}
            alt={savoirFaireContent.title}
          />
        </div>

        {/* Copy — single block matching client presentation */}
        <div className="section-padding flex items-center px-4">
          <div className="mx-auto max-w-xl lg:px-8 xl:px-14">
            <SectionLabel>{savoirFaireContent.eyebrow}</SectionLabel>

            <AnimatedHeading
              as="h2"
              text={savoirFaireContent.title}
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

            {/* Intro highlight */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-7 text-base font-medium leading-relaxed text-green sm:text-lg"
            >
              {savoirFaireContent.intro}
            </motion.p>

            {/* Body paragraphs + punchline — collapsed behind "Voir plus" */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="savoir-faire-more"
                  id="savoir-faire-more"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-green/75 sm:text-[0.95rem]">
                    {savoirFaireContent.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Punchline / Quote callout */}
                  <div className="mt-8 border-l-2 border-orange py-1 pl-5">
                    <p className="font-sans text-lg font-medium italic text-orange sm:text-xl">
                      « {savoirFaireContent.punchline} »
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-controls="savoir-faire-more"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange transition-colors hover:text-orange/80"
            >
              <span>{open ? "Voir moins" : "Voir plus"}</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="inline-block text-base"
              >
                ↓
              </motion.span>
            </button>
          </div>
        </div>
      </div>


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
