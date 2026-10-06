import Image from "next/image";

import { BeerTile } from "@/components/beers/BeerTile";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { beers, type Lineup } from "@/lib/products";

type CatalogueLineupProps = {
  lineup: Lineup;
  /** Fond de la section — alterné d'une gamme à l'autre. */
  tone?: "cream" | "cream-dark";
};

/** Zone d'en-tête d'une gamme (BG / Bières Georges) puis grille de vignettes. */
export function CatalogueLineup({ lineup, tone = "cream" }: CatalogueLineupProps) {
  const items = lineup.entries.flatMap((entry) => {
    const beer = beers.find((item) => item.slug === entry.slug);
    return beer ? [{ beer, entry }] : [];
  });

  return (
    <section
      id={lineup.id}
      className={`section-padding relative scroll-mt-20 overflow-hidden px-4 ${
        tone === "cream" ? "bg-cream" : "bg-cream-dark"
      }`}
    >
      {/* Sigle décoratif — même langage que « Trouver les Bières Georges » */}
      <div
        className={`pointer-events-none absolute -top-8 w-56 opacity-[0.07] sm:w-72 lg:w-96 ${
          tone === "cream" ? "-left-8" : "-right-8 rotate-180"
        }`}
        aria-hidden="true"
      >
        <Image
          src="/assets/logos/sigle-stripes.png"
          alt=""
          width={792}
          height={894}
          className="h-auto w-full"
        />
      </div>

      <div className="container-page relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow text-orange">
              {lineup.eyebrow} {lineup.title} · {items.length} bières
            </p>
            <AnimatedHeading
              as="h2"
              text={lineup.title}
              accentFrom={1}
              className="font-display mt-4 text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-7xl"
            />
          </div>
          <div className="max-w-xl border-l-2 border-orange pl-5 text-green/70">
            <p className="leading-relaxed">{lineup.intro}</p>
            <p className="mt-3 font-medium text-green">{lineup.where}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map(({ beer, entry }, index) => (
            <SectionReveal key={entry.slug} delay={(index % 3) * 0.08} className="h-full">
              <BeerTile beer={beer} entry={entry} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
