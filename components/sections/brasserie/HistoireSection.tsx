"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { historyTimeline, type HistoryEra } from "@/lib/data";
import { EASE, inViewOnce } from "@/lib/motion";

/* Traitement uniforme des visuels par période, demandé par le client :
   duotone « archives » pour 1795-1939, couleur pour 2004-2026. */
const eraMedia: Record<HistoryEra, string> = {
  heritage: "grayscale sepia-[0.42] contrast-[1.08] brightness-[0.97]",
  renouveau: "saturate-[1.06] contrast-[1.02]",
};

export function HistoireSection() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const last = historyTimeline.length - 1;
  const item = historyTimeline[active];

  const go = useCallback(
    (index: number) => {
      setActive(Math.min(Math.max(index, 0), last));
      setExpanded(false);
    },
    [last],
  );

  return (
    <section
      id="histoire"
      className="section-padding relative scroll-mt-20 overflow-hidden bg-cream px-4"
    >
      <div className="container-page relative z-10">
        {/* ── En-tête ── */}
        <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
          <div>
            <SectionLabel>Histoire</SectionLabel>
            {/* Titre provisoire (Lorem ipsum) — en attente du texte définitif */}
            <AnimatedHeading
              as="h2"
              text="Lorem ipsum dolor sit amet."
              className="font-display mt-5 text-4xl font-bold uppercase leading-[0.9] tracking-tight text-green sm:text-5xl lg:text-6xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-xl"
          >
            <p className="leading-relaxed text-green/70">
              Nous fabriquons des bières de caractère à Lyon depuis presque deux
              siècles.
            </p>
            <p className="font-serif mt-1 text-xl italic leading-tight text-orange sm:text-2xl">
              Et ce n&apos;est pas fini.
            </p>
          </motion.div>
        </div>

        {/* ── Frise horizontale : 12 dates sur une seule ligne ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.7 }}
          className="mt-12 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-14"
        >
          <div className="relative flex min-w-[36rem] items-end justify-between gap-1">
            {/* la ligne de la frise, au niveau des repères */}
            <div className="absolute bottom-[0.3rem] left-2 right-2 h-px bg-green/20" />

            {historyTimeline.map((milestone, index) => {
              const isActive = index === active;
              return (
                <button
                  key={milestone.year}
                  type="button"
                  onClick={() => go(index)}
                  aria-current={isActive}
                  aria-label={`${milestone.year} — ${milestone.title}`}
                  className="group relative flex flex-1 flex-col items-center gap-2.5"
                >
                  <span
                    className={`font-display text-[0.8rem] transition-colors duration-300 sm:text-sm ${
                      isActive
                        ? "font-bold text-green"
                        : "font-semibold text-green/40 group-hover:text-green/70"
                    }`}
                  >
                    {milestone.year}
                  </span>
                  <span
                    className={`h-[0.6rem] w-[0.6rem] rounded-full border transition-all duration-300 ${
                      isActive
                        ? "scale-125 border-orange bg-orange"
                        : "border-green/35 bg-cream group-hover:border-orange"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Panneau de contenu : un seul bloc, révélé au clic ── */}
        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.44fr)_1fr] lg:gap-12"
            >
              {/* Visuel */}
              <div className="relative aspect-[4/3] overflow-hidden bg-green">
                <Image
                  src={item.image}
                  alt={`${item.year} — ${item.title}`}
                  fill
                  className={`object-cover ${eraMedia[item.era]}`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority={active === 0}
                />
              </div>

              {/* Contenu */}
              <div className="max-w-xl">
                <p className="font-display text-5xl font-bold leading-none text-green sm:text-6xl">
                  {item.year}
                </p>
                <h3 className="font-serif mt-3 text-2xl italic leading-tight text-orange sm:text-3xl">
                  {item.title}
                </h3>

                <p
                  className={`mt-5 text-[0.95rem] leading-[1.75] text-green/70 ${
                    expanded ? "" : "line-clamp-4"
                  }`}
                >
                  {item.text}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    aria-expanded={expanded}
                    className="eyebrow flex items-center gap-2 text-orange transition-transform duration-300 hover:translate-x-1"
                  >
                    {expanded ? "Réduire" : "En savoir plus"}
                    <Icon name="arrowRight" size={12} />
                  </button>

                  {/* Navigation */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="Date précédente"
                      onClick={() => go(active - 1)}
                      disabled={active === 0}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-green/25 text-green transition-colors hover:bg-green hover:text-cream disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-green"
                    >
                      <Icon name="arrowLeft" size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label="Date suivante"
                      onClick={() => go(active + 1)}
                      disabled={active === last}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-green/25 text-green transition-colors hover:bg-green hover:text-cream disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-green"
                    >
                      <Icon name="arrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
