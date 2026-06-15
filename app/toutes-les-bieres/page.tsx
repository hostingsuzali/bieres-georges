import type { Metadata } from "next";

import { BeerCatalog } from "@/components/beers/BeerCatalog";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";

export const metadata: Metadata = {
  title: "Toutes les bières | Bières Georges",
  description:
    "Découvrez les bières Georges et filtrez le catalogue par gamme CHR, GMS et collection.",
};

export default function AllBeersPage() {
  return (
    <SiteShell>
      <InternalPageHero
        eyebrow="Le catalogue"
        title="Toutes les Bières Georges"
        intro="Des recettes historiques aux créations les plus audacieuses, explorez les références disponibles pour les particuliers et les professionnels."
        image="/assets/images/verres 3 bières.jpg"
        primary={{ label: "Explorer le catalogue", href: "#catalogue" }}
        secondary={{ label: "Trouver un point de vente", href: "/trouver" }}
      />

      <section id="catalogue" className="section-padding scroll-mt-20 bg-cream px-4">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow text-orange">Choisissez votre gamme</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
              Une bière pour chaque moment
            </h2>
            <p className="mt-5 leading-relaxed text-green/65">
              Filtrez les références par circuit de distribution ou par
              collection. Les disponibilités détaillées seront précisées avec le
              catalogue commercial définitif.
            </p>
          </div>
          <div className="mt-10">
            <BeerCatalog />
          </div>
        </div>
      </section>

      <section className="bg-orange px-4 py-16 text-cream sm:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase">
              Vous êtes professionnel ?
            </h2>
            <p className="mt-2 max-w-2xl text-cream/75">
              Découvrez les solutions adaptées aux bars, restaurants, cavistes,
              enseignes et événements.
            </p>
          </div>
          <CtaLink href="/travailler-avec-nous" variant="light">
            Découvrir l’offre professionnelle
          </CtaLink>
        </div>
      </section>
      <VersionSwitcher href="/toutes-les-bieres/v2" targetVersion="V2" />
    </SiteShell>
  );
}
