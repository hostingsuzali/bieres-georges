import { BeerTile } from "@/components/beers/BeerTile";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { beers, type Lineup } from "@/lib/products";

type CatalogueLineupProps = {
  lineup: Lineup;
  /** Fond de la section — alterné d'une gamme à l'autre. */
  tone?: "cream" | "cream-dark";
};

/** Zone d'en-tête d'une gamme (BG / Bières Georges) puis grille de vignettes. */
export function CatalogueLineup({ lineup, tone = "cream" }: CatalogueLineupProps) {
  return (
    <section
      id={lineup.id}
      className={`section-padding scroll-mt-20 px-4 ${
        tone === "cream" ? "bg-cream" : "bg-cream-dark"
      }`}
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow text-orange">
              {lineup.eyebrow} {lineup.title}
            </p>
            <AnimatedHeading
              as="h2"
              text={lineup.title}
              accentFrom={1}
              className="font-display mt-4 text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-7xl"
            />
          </div>
          <div className="max-w-xl text-green/70">
            <p className="leading-relaxed">{lineup.intro}</p>
            <p className="mt-3 font-medium text-green">{lineup.where}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lineup.entries.map((entry) => {
            const beer = beers.find((item) => item.slug === entry.slug);
            if (!beer) return null;
            return <BeerTile key={entry.slug} beer={beer} entry={entry} />;
          })}
        </div>
      </div>
    </section>
  );
}
