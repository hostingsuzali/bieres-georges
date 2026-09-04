"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";
import { historyTimeline, type HistoryEra } from "@/lib/data";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

/* Traitement graphique uniforme par période — demandé par le client :
   une écriture visuelle pour 1795-1939, une autre pour 2004-2026. */
const eraStyles: Record<
  HistoryEra,
  { frame: string; media: string; wash: string; chip: string }
> = {
  heritage: {
    frame: "border-green/15 bg-[#fbf4ec]",
    media: "grayscale sepia-[0.42] contrast-[1.08] brightness-[0.97]",
    wash: "bg-green/25 mix-blend-multiply",
    chip: "bg-green/90 text-cream",
  },
  renouveau: {
    frame: "border-orange/25 bg-cream-dark",
    media: "saturate-[1.06] contrast-[1.02]",
    wash: "bg-green-deep/20",
    chip: "bg-orange text-cream",
  },
};

const eraLabels: Record<HistoryEra, string> = {
  heritage: "1795 — 1939 · L'héritage",
  renouveau: "2004 — 2026 · Le renouveau",
};

export function HistoireSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const target = rail.children[index] as HTMLElement | undefined;
    if (!target) return;
    rail.scrollTo({
      left: target.offsetLeft - rail.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const handleScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const center = rail.scrollLeft + rail.clientWidth / 2;
    let nearest = 0;
    let shortest = Number.POSITIVE_INFINITY;
    Array.from(rail.children).forEach((node, index) => {
      const el = node as HTMLElement;
      const elCenter = el.offsetLeft - rail.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(elCenter - center);
      if (distance < shortest) {
        shortest = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  const last = historyTimeline.length - 1;

  return (
    <section
      id="histoire"
      className="section-padding relative scroll-mt-20 overflow-hidden bg-cream px-4"
    >
      {/* Formes de la charte — arche + trame */}
      <div className="pointer-events-none absolute -left-24 top-10 h-[26rem] w-[26rem] opacity-[0.07] lg:h-[34rem] lg:w-[34rem]">
        <Image
          src="/assets/logos/arche-vert.png"
          alt=""
          width={600}
          height={600}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <Image
          src="/assets/logos/stripes-pattern.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="container-page relative z-10">
        {/* ── En-tête ── */}
        <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7 }}
              className="eyebrow text-sm font-bold tracking-[0.25em] text-orange sm:text-base"
            >
              Histoire
            </motion.p>

            {/* Titre provisoire (Lorem ipsum) — en attente du texte définitif */}
            <AnimatedHeading
              as="h2"
              text="Lorem ipsum dolor sit amet, consectetur."
              className="font-display mt-5 text-5xl font-bold uppercase leading-[0.88] tracking-tight text-green sm:text-6xl lg:text-7xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-xl"
          >
            <p className="text-lg leading-relaxed text-green/75 sm:text-xl">
              Nous fabriquons des bières de caractère à Lyon depuis presque deux
              siècles.
            </p>
            <p className="font-serif mt-2 text-2xl italic leading-tight text-orange sm:text-3xl">
              Et ce n&apos;est pas fini.
            </p>

            {/* Légende des deux périodes + navigation */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {(Object.keys(eraLabels) as HistoryEra[]).map((era) => (
                <span
                  key={era}
                  className="eyebrow flex items-center gap-2 text-green/60"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      era === "heritage" ? "bg-green" : "bg-orange"
                    }`}
                  />
                  {eraLabels[era]}
                </span>
              ))}

              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  aria-label="Jalon précédent"
                  onClick={() => scrollToIndex(Math.max(active - 1, 0))}
                  disabled={active === 0}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-green/25 text-green transition-colors hover:bg-green hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-green"
                >
                  <Icon name="arrowLeft" size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Jalon suivant"
                  onClick={() => scrollToIndex(Math.min(active + 1, last))}
                  disabled={active === last}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-green/25 text-green transition-colors hover:bg-green hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-green"
                >
                  <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Slider des 12 jalons ── */}
        <motion.div
          variants={stagger(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          ref={railRef}
          onScroll={handleScroll}
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {historyTimeline.map((item, index) => {
            const style = eraStyles[item.era];
            const isOpen = open === index;

            return (
              <motion.article
                key={item.year}
                variants={fadeUp}
                className={`group relative flex min-w-[85%] shrink-0 snap-start flex-col overflow-hidden border shadow-[0_28px_80px_-52px_rgba(6,58,52,0.65)] sm:min-w-[46%] lg:min-w-[31.5%] ${style.frame}`}
              >
                {/* Visuel + millésime */}
                <div className="relative aspect-[4/5] overflow-hidden bg-green">
                  <Image
                    src={item.image}
                    alt={`${item.year} — ${item.title}`}
                    fill
                    className={`object-cover transition duration-700 group-hover:scale-[1.04] ${style.media}`}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 85vw"
                  />
                  <div className={`absolute inset-0 ${style.wash}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/85 via-green-deep/10 to-transparent" />

                  <span
                    className={`eyebrow absolute left-4 top-4 px-3 py-1.5 ${style.chip}`}
                  >
                    {item.era === "heritage" ? "Archives" : "Aujourd’hui"}
                  </span>

                  <p className="font-display absolute bottom-4 left-5 text-6xl font-bold leading-none text-cream sm:text-7xl">
                    {item.year}
                  </p>
                </div>

                {/* Titre + déclencheur */}
                <div className="flex flex-1 flex-col justify-between gap-5 p-6">
                  <h3 className="font-display text-2xl font-bold uppercase leading-[0.95] text-green">
                    {item.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="eyebrow flex items-center gap-2 self-start text-orange transition-transform duration-300 hover:translate-x-1"
                  >
                    {isOpen ? "Replier" : "Lire le récit"}
                    <Icon name={isOpen ? "close" : "arrowRight"} size={12} />
                  </button>
                </div>

                {/* Panneau révélé — survol (desktop) ou clic (tactile) */}
                <div
                  data-open={isOpen}
                  className="pointer-events-none absolute inset-0 flex translate-y-full flex-col bg-green-deep/95 p-6 text-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:translate-y-0 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0"
                >
                  <div className="flex items-baseline justify-between gap-3 border-b border-cream/15 pb-4">
                    <p className="font-display text-4xl font-bold leading-none text-orange">
                      {item.year}
                    </p>
                    <p className="eyebrow text-right text-cream/70">
                      {item.title}
                    </p>
                  </div>
                  <p className="mt-5 overflow-y-auto pr-1 text-sm leading-[1.75] text-cream/85">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ── Frise de navigation ── */}
        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-[0.55rem] h-px bg-green/15" />
          <div className="relative flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {historyTimeline.map((item, index) => (
              <button
                key={item.year}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-current={active === index}
                className="group/nav flex shrink-0 flex-col items-center gap-2 px-2"
              >
                <span
                  className={`h-[0.7rem] w-[0.7rem] shrink-0 rounded-full border transition-colors duration-300 ${
                    active === index
                      ? item.era === "heritage"
                        ? "border-green bg-green"
                        : "border-orange bg-orange"
                      : "border-green/30 bg-cream group-hover/nav:border-orange"
                  }`}
                />
                <span
                  className={`font-display text-sm font-bold transition-colors duration-300 ${
                    active === index ? "text-green" : "text-green/40"
                  }`}
                >
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
