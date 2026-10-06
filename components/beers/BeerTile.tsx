import Link from "next/link";

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
 * style, TAV, conditionnements en pictogrammes et médailles.
 */
export function BeerTile({ beer, entry }: BeerTileProps) {
  return (
    <Link
      href={`/toutes-les-bieres/${beer.slug}`}
      className="group grid grid-cols-[6.5rem_1fr] gap-5 border border-green/10 bg-white/50 p-5 text-green transition-colors duration-300 hover:border-orange/50 hover:bg-white/80 sm:grid-cols-[8rem_1fr] sm:p-6"
    >
      <div className="flex items-end justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beer.image}
          alt={`Bière Georges ${beer.name}`}
          className="h-44 w-auto max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105 sm:h-52"
        />
      </div>

      <div className="flex min-w-0 flex-col">
        {entry.kicker && (
          <p className="eyebrow text-orange">{entry.kicker}</p>
        )}
        <h3 className="font-display mt-1 text-2xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-3xl">
          {entry.title}
        </h3>
        {entry.subtitle && (
          <p className="mt-1 text-sm font-medium text-green/60">
            {entry.subtitle}
          </p>
        )}

        {beer.tagline && (
          <p className="mt-3 text-sm leading-snug text-dark-text/65">
            {beer.tagline}
          </p>
        )}

        <p className="eyebrow mt-3 text-green/55">
          TAV <span className="text-green">{formatAbv(beer.abv, beer.abvLabel)}</span>
        </p>

        <div className="mt-3">
          <FormatPictos formats={beer.formats} size="sm" />
        </div>

        {beer.medals.length > 0 && (
          <MedalRow ids={beer.medals} height={28} className="mt-3" />
        )}

        {beer.availability && (
          <p className="eyebrow mt-3 text-orange">{beer.availability}</p>
        )}

        <span className="eyebrow mt-auto pt-4 text-orange transition-colors group-hover:text-green">
          Voir le détail →
        </span>
      </div>
    </Link>
  );
}
