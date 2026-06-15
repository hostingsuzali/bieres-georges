import type { Metadata } from "next";

import { BeerCard } from "@/components/beers/BeerCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { StoreLocatorEmbed } from "@/components/store/StoreLocatorEmbed";
import { CtaLink } from "@/components/ui/CtaLink";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { beers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Trouver les Bières Georges",
  description:
    "Localisez un bar, restaurant, caviste ou magasin proposant les Bières Georges.",
};

const featuredGms = beers
  .filter((beer) => beer.ranges.includes("GMS"))
  .slice(0, 4);

export default function FindUsPage() {
  return (
    <SiteShell>
      <InternalPageHero
        eyebrow="Points de vente"
        title="Trouver les Bières Georges"
        intro="Repérez les bars, restaurants, caves et magasins où retrouver nos bières, puis découvrez les références pensées pour la grande distribution."
        image="/assets/images/trinquent.jpg"
        primary={{ label: "Afficher la carte", href: "#carte" }}
        secondary={{ label: "Voir les bières GMS", href: "#gamme-gms" }}
      />

      <section id="carte" className="section-padding scroll-mt-20 bg-cream px-4">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-orange">Près de chez vous</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
              Un point de vente à portée de verre
            </h2>
            <p className="mt-5 leading-relaxed text-green/65">
              Recherchez une adresse, un code postal ou un établissement dans la
              carte interactive.
            </p>
          </div>
          <StoreLocatorEmbed />
        </div>
      </section>

      <section id="gamme-gms" className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow text-orange">Gamme GMS</p>
              <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
                Les Georges à emporter
              </h2>
              <p className="mt-5 leading-relaxed text-cream/65">
                Une sélection accessible en magasins, dans plusieurs styles et
                formats.
              </p>
            </div>
            <CtaLink href="/toutes-les-bieres" variant="light">
              Voir toute la gamme
            </CtaLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGms.map((beer) => (
              <BeerCard key={beer.slug} beer={beer} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orange px-4 py-16 text-cream">
        <div className="container-page flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase">
              Vous souhaitez distribuer nos bières ?
            </h2>
            <p className="mt-2 text-cream/75">
              Présentez-nous votre établissement ou votre réseau.
            </p>
          </div>
          <CtaLink href="/travailler-avec-nous" variant="light">
            Devenir partenaire
          </CtaLink>
        </div>
      </section>
    </SiteShell>
  );
}

