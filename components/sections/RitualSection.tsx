"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { emblematicBeers } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

const accentMap: Record<
  string,
  { tile: string; idx: string; chip: string }
> = {
  cream: {
    tile: "bg-cream-dark text-green",
    idx: "text-green/10",
    chip: "border-green/15 text-green/65",
  },
  orange: {
    tile: "bg-orange text-cream",
    idx: "text-cream/15",
    chip: "border-cream/30 text-cream/85",
  },
  green: {
    tile: "bg-green text-cream",
    idx: "text-cream/10",
    chip: "border-cream/25 text-cream/85",
  },
};

// "Nos bières emblématiques" — 4 styles (Blonde / Blanche / Ambrée /
// Audacieuse) shown as a tabbed showcase. Click a style to swap the big
// hero card on the left; the tabs on the right stay readable.
export function RitualSection() {
  const [active, setActive] = useState(0);
  const current = emblematicBeers[active];
  const accent = accentMap[current.accent];

  return (
    <section
      id="emblematiques"
      className="section-padding relative overflow-hidden bg-cream px-4"
    >
      <div className="container-page">
        {/* heading */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <Badge tone="orange" dot={false}>
              Nos bières emblématiques
            </Badge>
            <AnimatedHeading
              as="h2"
              text="Des bières de caractère,"
              className="font-display mt-6 text-5xl font-bold uppercase leading-[0.92] tracking-tight text-green sm:text-7xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-serif mt-1 text-4xl italic text-orange sm:text-5xl"
            >
              pensées pour tous les moments.
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="max-w-xs text-sm leading-relaxed text-dark-text/60"
          >
            Blonde, blanche, ambrée ou créations plus audacieuses&nbsp;: chaque
            bière Georges porte une signature claire, généreuse et accessible.
          </motion.p>
        </div>

        {/* swap card + tabs */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* left — animated swap tile */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="relative overflow-hidden"
          >
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className={`tag-shape relative flex min-h-[28rem] flex-col p-7 sm:min-h-[34rem] sm:p-10 ${accent.tile}`}
            >
              {/* huge index numeral */}
              <span
                aria-hidden="true"
                className={`font-display pointer-events-none absolute right-4 top-2 text-[12rem] font-bold leading-none ${accent.idx}`}
              >
                0{active + 1}
              </span>

              {/* photo */}
              <div className="relative z-10 mt-2 aspect-[4/5] max-h-[26rem] w-full overflow-hidden">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={`Bière ${current.name}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* label strip */}
              <div className="relative z-10 mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow opacity-70">Style {active + 1}/4</p>
                  <h3 className="font-display mt-1 text-4xl font-bold uppercase leading-none sm:text-5xl">
                    {current.name}
                  </h3>
                </div>
                <span
                  className={`font-serif italic max-w-[55%] text-right text-sm leading-snug ${accent.chip} border-r-2 pr-3`}
                >
                  {current.profile}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* right — tabs */}
          <motion.ul
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="flex flex-col gap-2 self-stretch"
          >
            {emblematicBeers.map((b, i) => {
              const isActive = i === active;
              return (
                <motion.li key={b.name} variants={fadeUp} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`group relative w-full overflow-hidden border-2 px-5 py-5 text-left transition-colors sm:px-7 sm:py-6 ${
                      isActive
                        ? "border-orange bg-orange/5"
                        : "border-dark-text/10 hover:border-dark-text/30"
                    }`}
                  >
                    {/* progress fill on active */}
                    {isActive && (
                      <motion.span
                        layoutId="beer-tab"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-orange"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}

                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-display text-sm tabular-nums ${
                          isActive ? "text-orange" : "text-dark-text/35"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-green sm:text-3xl">
                        {b.name}
                      </h4>
                    </div>

                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0.55 }}
                      className="mt-2 max-w-md text-sm leading-relaxed text-dark-text/70"
                    >
                      {b.description}
                    </motion.p>
                  </button>
                </motion.li>
              );
            })}

            <motion.div
              variants={fadeUp}
              className="mt-4"
            >
              <Button variant="green" cut withArrow>
                Voir toutes les bières
              </Button>
            </motion.div>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
