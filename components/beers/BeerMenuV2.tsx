"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { FormatPictos } from "@/components/beers/FormatPictos";
import { MedalRow } from "@/components/beers/MedalRow";
import { formatAbv } from "@/lib/beer-meta";
import { EASE, fadeUp, stagger } from "@/lib/motion";
import { beers, lineups, type Beer, type LineupEntry } from "@/lib/products";

/**
 * Catalogue V2 présenté comme une carte de bar : un onglet par gamme, puis une
 * ligne par bière avec TAV, conditionnements et médailles.
 */
export function BeerMenuV2() {
  const [activeId, setActiveId] = useState(lineups[0].id);
  const lineup = lineups.find((item) => item.id === activeId) ?? lineups[0];
  const rows = lineup.entries.flatMap((entry) => {
    const beer = beers.find((item) => item.slug === entry.slug);
    return beer ? [{ beer, entry }] : [];
  });

  return (
    <div>
      <div role="tablist" aria-label="Gammes" className="flex flex-wrap gap-3">
        {lineups.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`menu-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={`font-display rounded-full border px-5 py-3 text-lg font-semibold uppercase tracking-tight transition-colors sm:text-xl ${
                isActive
                  ? "border-orange bg-orange text-cream"
                  : "border-cream/20 text-cream/70 hover:border-cream/50 hover:text-cream"
              }`}
            >
              {item.eyebrow} {item.title}
              <span className="ml-2 font-sans text-sm font-medium opacity-70">
                {item.entries.length}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={lineup.id}
          id={`menu-${lineup.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${lineup.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-10"
        >
          <div className="grid gap-4 border-b border-cream/15 pb-8 lg:grid-cols-2 lg:items-end">
            <p className="max-w-xl leading-relaxed text-cream/70">
              {lineup.intro}
            </p>
            <p className="font-medium text-cream lg:text-right">
              {lineup.where}
            </p>
          </div>

          <motion.ul variants={stagger(0.05)} initial="hidden" animate="visible">
            {rows.map(({ beer, entry }) => (
              <MenuRow key={entry.slug} beer={beer} entry={entry} />
            ))}
          </motion.ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MenuRow({ beer, entry }: { beer: Beer; entry: LineupEntry }) {
  return (
    <motion.li variants={fadeUp} className="border-b border-cream/10">
      <Link
        href={`/toutes-les-bieres/${beer.slug}`}
        className="group grid grid-cols-[3.5rem_1fr] gap-4 py-7 sm:grid-cols-[5rem_1fr] sm:gap-7"
      >
        <div className="flex items-end justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beer.image}
            alt={`Bière Georges ${beer.name}`}
            className="h-24 w-auto object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-32"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-4">
            <div className="min-w-0">
              {entry.kicker && (
                <p className="eyebrow text-orange">{entry.kicker}</p>
              )}
              <h3 className="font-display mt-1 text-2xl font-semibold uppercase leading-none tracking-tight transition-colors group-hover:text-orange sm:text-4xl">
                {entry.title}
                {entry.subtitle && (
                  <span className="ml-3 align-middle font-sans text-sm font-medium normal-case tracking-normal text-cream/55">
                    {entry.subtitle}
                  </span>
                )}
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="hidden flex-1 border-b border-dotted border-cream/25 sm:block"
            />
            <p className="font-display shrink-0 text-xl font-semibold text-orange sm:text-3xl">
              {formatAbv(beer.abv, beer.abvLabel)}
            </p>
          </div>

          {beer.tagline && (
            <p className="mt-2 font-sans italic text-cream/65">{beer.tagline}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <FormatPictos formats={beer.formats} tone="light" size="sm" />
            {beer.medals.length > 0 && (
              <MedalRow ids={beer.medals} height={30} />
            )}
            {beer.availability && (
              <span className="eyebrow text-orange">{beer.availability}</span>
            )}
            <span className="eyebrow ml-auto inline-flex items-center gap-2 text-cream/50 transition-colors group-hover:text-orange">
              Fiche produit
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
