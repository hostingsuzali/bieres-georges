import Link from "next/link";

import {
  BitternessScale,
  ColourScale,
  ebcColour,
} from "@/components/beers/BeerScales";
import { FormatPictos } from "@/components/beers/FormatPictos";
import { MedalRow } from "@/components/beers/MedalRow";
import { formatAbv } from "@/lib/beer-meta";
import type { Beer, LineupEntry } from "@/lib/products";

type BeerTileProps = {
  beer: Beer;
  entry: LineupEntry;
};

/**
 * Vignette horizontale du catalogue (slide 27) : visuel, couleur · original ·
 * style, TAV, amertume, couleur, conditionnements en pictogrammes et médailles.
 */
export function BeerTile({ beer, entry }: BeerTileProps) {
  const tint = ebcColour(beer.ebc) ?? "#d96a3a";
  const isLimited = beer.collection === "Les Spéciales";

  return (
    <Link
      href={`/toutes-les-bieres/${beer.slug}`}
      className="group relative grid h-full grid-cols-[7rem_1fr] gap-5 overflow-hidden border border-green/10 bg-white/55 p-5 text-green shadow-[0_24px_60px_-48px_rgba(5,43,37,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-orange/50 hover:bg-white/85 sm:grid-cols-[8.5rem_1fr] sm:p-6"
    >
      {isLimited && (
        <span className="eyebrow absolute left-0 top-0 z-10 bg-orange px-3 py-1.5 text-[0.6rem] text-cream">
          Édition limitée
        </span>
      )}

      <div className="relative flex items-end justify-center">
        <span
          aria-hidden="true"
          style={{ backgroundColor: tint }}
          className="absolute bottom-4 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-55 sm:h-32 sm:w-32"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beer.image}
          alt={`Bière Georges ${beer.name}`}
          className="relative h-48 w-auto max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-56"
        />
      </div>

      <div className="flex min-w-0 flex-col">
        {entry.kicker && <p className="eyebrow text-orange">{entry.kicker}</p>}
        <h3 className="font-display mt-1 text-2xl font-semibold uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-orange sm:text-3xl">
          {entry.title}
        </h3>
        {entry.subtitle && (
          <p className="mt-1 text-sm font-medium text-green/60">
            {entry.subtitle}
          </p>
        )}
        {beer.tagline && (
          <p className="mt-2 font-sans text-sm italic leading-snug text-dark-text/70">
            {beer.tagline}
          </p>
        )}

        <dl className="mt-4 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
          <dt className="eyebrow text-green/50">TAV</dt>
          <dd className="font-display text-lg font-semibold leading-none text-green">
            {formatAbv(beer.abv, beer.abvLabel)}
          </dd>
          <dt className="eyebrow text-green/50">Amertume</dt>
          <dd>
            <BitternessScale value={beer.ibu} size="sm" />
          </dd>
          <dt className="eyebrow text-green/50">Couleur</dt>
          <dd>
            <ColourScale value={beer.ebc} size="sm" />
          </dd>
        </dl>

        <div className="mt-4">
          <FormatPictos formats={beer.formats} size="sm" />
        </div>

        {beer.medals.length > 0 && (
          <MedalRow ids={beer.medals} height={28} className="mt-3" />
        )}

        {beer.availability && (
          <p className="eyebrow mt-3 text-orange">{beer.availability}</p>
        )}

        <span className="eyebrow mt-auto inline-flex items-center gap-2 pt-5 text-orange transition-colors group-hover:text-green">
          Voir la fiche
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
