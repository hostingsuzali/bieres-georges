import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { StoreLocatorEmbed } from "@/components/store/StoreLocatorEmbed";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";

export const metadata: Metadata = {
  title: "Trouver les Bières Georges V2",
  description:
    "Seconde proposition de page pour localiser les Bières Georges.",
};

const featuredPlaces = [
  {
    name: "Le LYON'S",
    type: "Bar",
    address: "46 avenue Paul Santy, 69008 Lyon",
  },
  {
    name: "Le Vieux Lyon",
    type: "Restaurant",
    address: "44 rue Saint-Jean, 69005 Lyon",
  },
  {
    name: "Brasserie Georges",
    type: "Brasserie",
    address: "30 cours de Verdun Perrache, 69002 Lyon",
  },
  {
    name: "La Fabrique du Faubourg",
    type: "Brasserie & vente",
    address: "3 allée des Érables, 69200 Vénissieux",
  },
];

export default function FindUsV2Page() {
  return (
    <SiteShell>
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

      <section className="section-padding bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow text-orange">Quelques adresses</p>
              <h2 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
                Le réseau Georges
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-cream/60">
              Une sélection issue de la carte actuelle. Le réseau complet reste
              consultable dans le Store Locator.
            </p>
          </div>

          <div className="mt-12 divide-y divide-cream/15 border-y border-cream/15">
            {featuredPlaces.map((place, index) => (
              <article
                key={place.name}
                className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr_0.7fr_auto] sm:items-center"
              >
                <span className="font-display text-3xl font-bold text-cream/20">
                  0{index + 1}
                </span>
                <div>
                  <p className="eyebrow text-orange">{place.type}</p>
                  <h3 className="font-display mt-2 text-3xl font-bold uppercase">
                    {place.name}
                  </h3>
                </div>
                <p className="text-sm text-cream/60">{place.address}</p>
                <Icon name="pin" className="text-orange" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-orange text-cream">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[30rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/gammes/GAMME GMS - Visuels/Version TRACE/En situation/WEB/BIERE GEORGE PHOTO PRESSE-DSC00672.jpg"
              alt="Bière Georges disponible en magasin"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="eyebrow text-cream/70">À emporter</p>
            <h2 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] sm:text-6xl">
              La gamme disponible en magasin
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-cream/75">
              Découvrez les références GMS et leurs différents formats avant de
              rechercher le point de vente le plus proche.
            </p>
            <div className="mt-8">
              <CtaLink href="/toutes-les-bieres" variant="light">
                Explorer la gamme GMS
              </CtaLink>
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
            Devenir partenaire
          </CtaLink>
        </div>
      </section>

      <VersionSwitcher href="/trouver" targetVersion="V1" />
    </SiteShell>
  );
}
