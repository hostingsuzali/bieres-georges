import type { Metadata } from "next";

import { BeerHeroBottles } from "@/components/beers/BeerHeroBottles";
import { BeerMenuV2 } from "@/components/beers/BeerMenuV2";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { beers, type Beer } from "@/lib/products";

export const metadata: Metadata = {
  title: "Toutes les bières V2 | Bières Georges",
  description:
    "Seconde proposition éditoriale pour le catalogue des Bières Georges : les gammes BG et Bières Georges présentées comme une carte de bar.",
};

const heroBeers = [
  beers.find((beer) => beer.slug === "ipa"),
].filter((beer): beer is Beer => Boolean(beer));

export default function AllBeersV2Page() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-cream px-4 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="container-page grid min-h-[36rem] items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10">
            <p className="eyebrow text-orange">Catalogue · Proposition V2</p>
            <h1 className="font-display mt-6 text-6xl font-bold uppercase leading-[0.92] tracking-tight text-green sm:text-8xl sm:leading-[0.9] lg:text-[7.5rem] lg:leading-[0.88]">
              Une maison,
              <br />
              <span className="text-orange">plusieurs</span>
              <br />
              caractères.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-green/65">
              Parcourez les recettes Georges comme une carte de dégustation :
              style, TAV, conditionnements et médailles en un seul regard.
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

          <BeerHeroBottles beers={heroBeers} />
        </div>
      </section>

      <section id="liste" className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-end">
            <div>
              <p className="eyebrow text-orange">La carte complète</p>
              <h2 className="font-display mt-4 text-4xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                Choisissez votre <span className="text-orange">Georges</span>
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-cream/60">
              Une gamme à la fois, chaque bière sur sa ligne : son TAV, ses
              conditionnements et ses médailles, comme sur une carte de bar.
            </p>
          </div>
          <BeerMenuV2 />
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
