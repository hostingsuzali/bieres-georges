import type { Metadata } from "next";

import { BeerCard } from "@/components/beers/BeerCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { StoreLocatorEmbed } from "@/components/store/StoreLocatorEmbed";
import { CtaLink } from "@/components/ui/CtaLink";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { beers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Trouver les Bières Georges",
  description:
    "Localisez un bar, restaurant, caviste ou magasin proposant les Bières Georges.",
};

const featuredGms = beers
  .filter((beer) => beer.ranges.includes("GMS"))
  .slice(0, 4);
const gmsSliderBeers = [...featuredGms, ...featuredGms];

export default function FindUsPage() {
  return (
    <SiteShell>
      <style>{`
        @keyframes trouver-gms-slider {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .trouver-gms-track {
          animation: trouver-gms-slider 24s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .trouver-gms-track { animation: none; }
        }
      `}</style>
      <InternalPageHero
        eyebrow="Points de vente"
        title="Trouver les Bières Georges"
        intro="Repérez les bars, restaurants, caves et magasins où retrouver nos bières, puis découvrez les références pensées pour la grande distribution."
        image="/assets/images/trinquent.jpg"
        primary={{ label: "Voir nos bières", href: "/toutes-les-bieres" }}
      />

      <section id="carte" className="section-padding scroll-mt-20 bg-cream px-4">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-orange">Près de chez vous</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
              Un point de vente proche de chez vous
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
                La gamme disponible en GMS
              </h2>
              <p className="mt-5 leading-relaxed text-cream/65">
                Une sélection accessible en magasins, dans plusieurs styles et
                formats.
              </p>
            </div>
          </div>
          <div className="mt-10 overflow-hidden">
            <div className="trouver-gms-track flex w-max gap-5">
              {gmsSliderBeers.map((beer, index) => (
                <div
                  key={`${beer.slug}-${index}`}
                  className="w-[19rem] shrink-0 sm:w-[21rem]"
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

      <section className="bg-orange text-cream">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[24rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/gammes/GAMME GMS - Visuels/Version TRACE/En situation/WEB/BIERE GEORGE PHOTO PRESSE-DSC00672.jpg"
              alt="Bière Georges disponible chez les partenaires"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-16 sm:px-10 lg:px-16">
            <h2 className="font-display text-4xl font-bold uppercase">
              Vous souhaitez distribuer nos bières ?
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/75">
              Bars, restaurants, cavistes, magasins ou lieux événementiels :
              construisons ensemble une présence Georges adaptée à votre réseau.
            </p>
            <div className="mt-8">
              <CtaLink href="/travailler-avec-nous" variant="light">
                Et si nous travaillions ensemble ?
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <VersionSwitcher href="/trouver/v2" targetVersion="V2" />
    </SiteShell>
  );
}
