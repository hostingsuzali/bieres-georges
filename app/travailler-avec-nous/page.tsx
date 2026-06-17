import type { Metadata } from "next";

import { BeerCard } from "@/components/beers/BeerCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProfessionalContactPrompt } from "@/components/sections/ProfessionalContactPrompt";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { beers, type Beer } from "@/lib/products";

export const metadata: Metadata = {
  title: "Travailler avec les Bières Georges",
  description:
    "Découvrez les offres Bières Georges pour les bars, restaurants, cavistes, enseignes et événements.",
};

const channels: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Magasins",
    text: "Grande distribution, magasins spécialisés, cavistes — une offre GMS identifiable et adaptée.",
    icon: "distribution",
  },
  {
    title: "Établissements",
    text: "Cafés, bars, hôtels, restaurants — une gamme pression et bouteilles pour les lieux de convivialité.",
    icon: "bar",
  },
  {
    title: "Événements",
    text: "Associations culturelles et sportives, festivals — fûts, tireuses et formats pour chaque occasion.",
    icon: "evenement",
  },
];

const channelImages = [
  "/assets/gammes/GAMME GMS - Visuels/Version TRACE/En situation/WEB/BIERE GEORGE PHOTO PRESSE-DSC00672.jpg",
  "/assets/images/pression_bar.jpg",
  "/assets/images/pression bar_03.JPG",
];

const gmsBeers = beers.filter((beer) => beer.ranges.includes("GMS")).slice(0, 6);
const chrBeers = beers.filter((beer) => beer.ranges.includes("CHR")).slice(0, 6);
const gmsTrack = [...gmsBeers, ...gmsBeers];
const chrTrack = [...chrBeers, ...chrBeers];

export default function WorkWithUsPage() {
  return (
    <SiteShell>
      <style>{`
        @keyframes gamme-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes gamme-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .gamme-left-track { animation: gamme-left 28s linear infinite; }
        .gamme-right-track { animation: gamme-right 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .gamme-left-track,
          .gamme-right-track { animation: none; }
        }
      `}</style>
      <InternalPageHero
        eyebrow="Professionnels"
        title="Travailler avec les Bières Georges"
        intro="Une maison lyonnaise historique, des bières de caractère et des solutions adaptées à chaque métier."
        image="/assets/images/pression bar_03.JPG"
        primary={{ label: "Présenter mon projet", href: "#contact-pro" }}
        secondary={{ label: "Voir les gammes", href: "#gammes" }}
      />

      <section className="section-padding bg-cream px-4">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-orange">Nos partenaires</p>
              <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
                À chaque activité son accompagnement
              </h2>
            </div>
            <p className="max-w-xl leading-relaxed text-green/65">
              Des formats, supports et gammes à adapter selon le lieu, le
              moment de consommation et le circuit de distribution.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {channels.map((channel, index) => (
              <article
                key={channel.title}
                className="group overflow-hidden rounded-3xl bg-cream-dark text-green"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={channelImages[index]}
                    alt={channel.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <Icon name={channel.icon} size={28} className="text-orange" />
                  <h3 className="font-display mt-6 text-2xl font-bold uppercase">
                    {channel.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-green/65">
                    {channel.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gammes" className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream">
        <div className="container-page">
          <p className="eyebrow text-orange">Deux circuits</p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
            Deux gammes, une même exigence
          </h2>

          <div className="mt-12 space-y-14">
            <RangeSlider
              eyebrow="Gamme GMS"
              title="Pour les magasins"
              text="Une identité forte en rayon, plusieurs formats et une sélection pensée pour la grande distribution et les achats à emporter."
              beers={gmsTrack}
              direction="left"
              cta="Voir la gamme GMS"
            />
            <RangeSlider
              eyebrow="Gamme CHR"
              title="Pour les lieux de convivialité"
              text="Une gamme colorée et expressive pour les bars, restaurants, cavistes et événements, en bouteilles comme à la pression."
              beers={chrTrack}
              direction="right"
              cta="Voir la gamme CHR"
            />
          </div>
        </div>
      </section>

      <ProfessionalContactPrompt />

      <section className="bg-green-deep px-4 py-16 text-cream">
        <div className="container-page grid gap-8 rounded-3xl border border-cream/15 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow text-orange">Maillage interne</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Découvrir notre brasserie
            </h2>
          </div>
          <div>
            <p className="leading-relaxed text-cream/70">
              Avant de choisir une gamme, explorez l’histoire, le savoir-faire
              et l’ancrage lyonnais de la maison Georges.
            </p>
            <div className="mt-7">
              <CtaLink href="/#brasserie" variant="light">
                Découvrir notre brasserie
              </CtaLink>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function RangeSlider({
  eyebrow,
  title,
  text,
  beers,
  direction,
  cta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  beers: Beer[];
  direction: "left" | "right";
  cta: string;
}) {
  return (
    <article className="overflow-hidden border border-cream/15 bg-cream/5">
      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[0.36fr_0.64fr] lg:items-center lg:p-9">
        <div className="tag-shape bg-cream p-7 text-green shadow-[0_28px_80px_-58px_rgba(0,0,0,0.85)] sm:p-8">
          <p className="eyebrow text-orange">{eyebrow}</p>
          <h3 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95]">
            {title}
          </h3>
          <p className="mt-5 leading-relaxed text-green/65">{text}</p>
          <div className="mt-8">
            <CtaLink href="/toutes-les-bieres" variant="green">
              {cta}
            </CtaLink>
          </div>
        </div>
        <div className="overflow-hidden py-4">
          <div
            className={`flex w-max gap-5 ${
              direction === "left" ? "gamme-left-track" : "gamme-right-track"
            }`}
          >
            {beers.map((beer, index) => (
              <div
                key={`${beer.slug}-${index}`}
                className="w-[17rem] shrink-0 sm:w-[20rem]"
              >
                <BeerCard beer={beer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
