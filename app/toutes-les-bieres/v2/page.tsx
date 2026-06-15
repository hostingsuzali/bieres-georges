import type { Metadata } from "next";

import { BeerCatalogV2 } from "@/components/beers/BeerCatalogV2";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { beers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Toutes les bières V2 | Bières Georges",
  description:
    "Seconde proposition éditoriale pour le catalogue des Bières Georges.",
};

const heroBeers = [
  beers.find((beer) => beer.slug === "ipa"),
  beers.find((beer) => beer.slug === "framboise"),
  beers.find((beer) => beer.slug === "very-good-triple"),
].filter(Boolean);

export default function AllBeersV2Page() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-cream px-4 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="container-page grid min-h-[36rem] items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10">
            <p className="eyebrow text-orange">Catalogue · Proposition V2</p>
            <h1 className="font-display mt-6 text-6xl font-bold uppercase leading-[0.84] tracking-tight text-green sm:text-8xl lg:text-[7.5rem]">
              Une maison,
              <br />
              <span className="text-orange">plusieurs</span>
              <br />
              caractères.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-green/65">
              Parcourez les recettes Georges comme une carte de dégustation :
              style, collection, circuit et formats en un seul regard.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaLink href="#liste" variant="green">
                Voir la carte des bières
              </CtaLink>
              <CtaLink href="/trouver" variant="outline">
                Où les trouver ?
              </CtaLink>
            </div>
          </div>

          <div className="relative flex min-h-[31rem] items-end justify-center">
            <div className="absolute inset-x-0 bottom-0 h-64 rounded-[50%] bg-orange/15 blur-2xl" />
            {heroBeers.map((beer, index) =>
              beer ? (
                <div
                  key={beer.slug}
                  className={`absolute bottom-0 ${
                    index === 0
                      ? "left-[7%] h-[72%] -rotate-6"
                      : index === 1
                        ? "left-1/2 z-10 h-[93%] -translate-x-1/2"
                        : "right-[5%] h-[77%] rotate-6"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={beer.image}
                    alt={`Bière Georges ${beer.name}`}
                    className="h-full w-auto max-w-none object-contain drop-shadow-2xl"
                  />
                </div>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-green/10 bg-orange py-4 text-cream">
        <div className="overflow-hidden">
          <p className="font-display whitespace-nowrap text-center text-2xl font-bold uppercase tracking-wide sm:text-4xl">
            Intemporelles · Audacieuses · Saisonnières · Explorations
          </p>
        </div>
      </section>

      <section id="liste" className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-end">
            <div>
              <p className="eyebrow text-orange">La carte complète</p>
              <h2 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
                Choisissez votre Georges
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-cream/60">
              Une lecture plus éditoriale du catalogue, avec des filtres
              concentrés et des références présentées comme une carte de bar.
            </p>
          </div>
          <BeerCatalogV2 />
        </div>
      </section>

      <section className="bg-cream px-4 py-16 text-green">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-cream-dark p-8 sm:p-10">
            <p className="eyebrow text-orange">Pour les particuliers</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase">
              Trouver une adresse
            </h2>
            <p className="mt-4 text-green/65">
              Bars, restaurants, cavistes et magasins à proximité.
            </p>
            <div className="mt-7">
              <CtaLink href="/trouver" variant="green">
                Voir les points de vente
              </CtaLink>
            </div>
          </div>
          <div className="rounded-3xl bg-orange p-8 text-cream sm:p-10">
            <p className="eyebrow text-cream/70">Pour les professionnels</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase">
              Construire une sélection
            </h2>
            <p className="mt-4 text-cream/75">
              Gammes CHR et GMS adaptées à votre activité.
            </p>
            <div className="mt-7">
              <CtaLink href="/travailler-avec-nous" variant="light">
                Travailler avec nous
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <VersionSwitcher href="/toutes-les-bieres" targetVersion="V1" />
    </SiteShell>
  );
}

