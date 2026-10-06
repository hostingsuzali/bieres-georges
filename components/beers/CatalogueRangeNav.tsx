import { beers, hasVisual, lineups, type Beer } from "@/lib/products";

/**
 * Deux cartes d'accès rapide aux gammes, posées à cheval sur le bandeau de
 * page : nombre de bières et aperçu des bouteilles.
 */
export function CatalogueRangeNav() {
  return (
    <nav aria-label="Gammes" className="relative z-20 -mt-10 px-4 sm:-mt-14">
      <div className="container-page grid gap-4 sm:grid-cols-2">
        {lineups.map((lineup) => {
          const preview = lineup.entries
            .map((entry) => beers.find((beer) => beer.slug === entry.slug))
            .filter((beer): beer is Beer => beer !== undefined && hasVisual(beer))
            .slice(0, 3);

          return (
            <a
              key={lineup.id}
              href={`#${lineup.id}`}
              className="group flex items-end justify-between gap-6 overflow-hidden border border-green/10 bg-cream p-6 text-green shadow-[0_30px_70px_-45px_rgba(5,43,37,0.7)] transition-colors duration-300 hover:border-orange/60 sm:p-7"
            >
              <div>
                <p className="eyebrow text-orange">
                  {lineup.eyebrow} · {lineup.entries.length} bières
                </p>
                <p className="font-display mt-2 text-3xl font-semibold uppercase leading-none tracking-tight sm:text-4xl">
                  {lineup.title}
                </p>
                <p className="eyebrow mt-4 inline-flex items-center gap-2 text-green/55 transition-colors group-hover:text-orange">
                  Voir la gamme
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </p>
              </div>

              <div className="flex h-24 shrink-0 items-end -space-x-4 sm:h-28">
                {preview.map((beer, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={beer.slug}
                    src={beer.image}
                    alt=""
                    style={{ zIndex: 3 - index }}
                    className="relative h-full w-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:-translate-y-1"
                  />
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
