import Link from "next/link";

import { lineupNeighbours } from "@/lib/products";

/** Bière précédente / suivante dans la même gamme. */
export function ProductPager({ slug }: { slug: string }) {
  const neighbours = lineupNeighbours(slug);
  if (!neighbours) return null;

  const links = [
    { direction: "previous", label: "Bière précédente", item: neighbours.previous },
    { direction: "next", label: "Bière suivante", item: neighbours.next },
  ] as const;

  return (
    <nav
      aria-label="Navigation entre les bières"
      className="border-t border-green/10 bg-cream px-4 py-12 text-green"
    >
      <div className="container-page">
        <p className="eyebrow text-center text-green/50">
          {neighbours.lineup.eyebrow} {neighbours.lineup.title}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {links.map(({ direction, label, item }) => {
            if (!item) return null;
            const isNext = direction === "next";
            return (
              <Link
                key={direction}
                href={`/toutes-les-bieres/${item.beer.slug}`}
                className={`group flex items-center gap-5 border border-green/10 bg-cream-dark p-5 transition-colors duration-300 hover:border-orange/50 ${
                  isNext ? "sm:flex-row-reverse sm:text-right" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.beer.image}
                  alt=""
                  className="h-24 w-auto shrink-0 object-contain drop-shadow-md transition-transform duration-500 group-hover:-translate-y-1"
                />
                <div className="min-w-0">
                  <p className="eyebrow text-orange">
                    {isNext ? `${label} →` : `← ${label}`}
                  </p>
                  {item.entry.kicker && (
                    <p className="eyebrow mt-2 text-green/50">{item.entry.kicker}</p>
                  )}
                  <p className="font-display mt-1 text-2xl font-semibold uppercase leading-none tracking-tight transition-colors group-hover:text-orange sm:text-3xl">
                    {item.entry.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
