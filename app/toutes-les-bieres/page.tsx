import type { Metadata } from "next";

import { CatalogueLineup } from "@/components/beers/CatalogueLineup";
import { CatalogueRangeNav } from "@/components/beers/CatalogueRangeNav";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { lineups } from "@/lib/products";

export const metadata: Metadata = {
  title: "Bières emblématiques | Bières Georges",
  description:
    "Les bières emblématiques des gammes BG et Bières Georges : styles, TAV, conditionnements et médailles.",
};

export default function AllBeersPage() {
  return (
    <SiteShell>
      <InternalPageHero
        title="Bières emblématiques"
        accentFrom={1}
        image="/assets/images/verres 3 bières.jpg"
      />

      {/* flow-root : la marge négative des cartes déborde sur le bandeau sans entraîner le fond crème */}
      <div className="flow-root bg-cream pb-2">
        <CatalogueRangeNav />
      </div>

      {lineups.map((lineup, index) => (
        <CatalogueLineup
          key={lineup.id}
          lineup={lineup}
          tone={index % 2 === 0 ? "cream" : "cream-dark"}
        />
      ))}

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
