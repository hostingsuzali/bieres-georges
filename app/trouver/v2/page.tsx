import type { Metadata } from "next";

import { BeerCard } from "@/components/beers/BeerCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { StoreLocatorEmbed } from "@/components/store/StoreLocatorEmbed";
import { CtaLink } from "@/components/ui/CtaLink";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { beers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Trouver les Bières Georges V2",
  description:
    "Seconde proposition de page pour localiser les Bières Georges.",
};

const partnerLogos = [
  "Le LYON'S",
  "Le Vieux Lyon",
  "Brasserie Georges",
  "La Fabrique du Faubourg",
  "Caves Hoffmann",
  "Halles Paul Bocuse",
  "Maison Pradel",
  "Auberge Quai 7",
];
const marqueeLogos = [...partnerLogos, ...partnerLogos];
const featuredGms = beers.filter((beer) => beer.ranges.includes("GMS"));

export default function FindUsV2Page() {
  return (
    <SiteShell>
      <style>{`
        @keyframes partner-logo-strip {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partner-logo-track {
          animation: partner-logo-strip 26s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-logo-track { animation: none; }
        }
      `}</style>
      <section className="bg-cream px-4 pb-16 pt-32 sm:pt-40">
        <div className="container-page">
          <div className="mb-10 grid gap-7 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow text-orange">Points de vente · V2</p>
              <h1 className="font-display mt-5 text-6xl font-bold uppercase leading-[0.86] text-green sm:text-8xl">
                Georges
                <br />
                près de
                <br />
                <span className="text-orange">chez vous.</span>
              </h1>
            </div>
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-green/65">
                Cette version donne la priorité à la recherche : la carte est
                visible immédiatement, suivie d’une sélection d’adresses.
              </p>
              <div className="mt-7">
                <CtaLink href="#carte-v2" variant="green">
                  Rechercher une adresse
                </CtaLink>
              </div>
            </div>
          </div>

          <div id="carte-v2" className="scroll-mt-24">
            <StoreLocatorEmbed />
          </div>
        </div>
      </section>

      <section id="gamme-gms" className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow text-orange">Gamme GMS</p>
              <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
                Nos bières en grande distribution
              </h2>
              <p className="mt-5 leading-relaxed text-cream/65">
                Une sélection accessible en magasins, dans plusieurs styles et
                formats.
              </p>
            </div>
          </div>
          <div className="mt-10 -mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex w-max gap-5 scroll-smooth">
              {featuredGms.map((beer) => (
                <div
                  key={beer.slug}
                  className="w-[17rem] shrink-0 sm:w-[20rem]"
                >
                  <BeerCard beer={beer} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <CtaLink href="/toutes-les-bieres" variant="light">
              Voir toute la gamme
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="section-padding bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-orange">Réseau partenaire</p>
            <h2 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
              Ils nous font déjà confiance
            </h2>
            <p className="mt-5 leading-relaxed text-cream/60">
              Un repère rassurant pour montrer la présence de la marque sur des
              lieux de consommation et de distribution variés.
            </p>
          </div>

          <div className="mt-12 overflow-hidden border-y border-cream/15 py-7">
            <div className="partner-logo-track flex w-max gap-5">
              {marqueeLogos.map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex h-24 w-64 shrink-0 items-center justify-center rounded-3xl border border-cream/15 bg-cream/5 px-8 text-center"
                >
                  <span className="font-display text-2xl font-bold uppercase leading-none">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-16">
        <div className="container-page flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase text-green">
              Votre établissement manque à la carte ?
            </h2>
            <p className="mt-2 text-green/65">
              Échangeons sur la distribution des Bières Georges.
            </p>
          </div>
          <CtaLink href="/travailler-avec-nous" variant="green">
            Et si on travaillait ensemble ?
          </CtaLink>
        </div>
      </section>

      <VersionSwitcher href="/trouver" targetVersion="V1" />
    </SiteShell>
  );
}
