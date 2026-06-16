import type { Metadata } from "next";

import { BeerCard } from "@/components/beers/BeerCard";
import { RentalRequestForm } from "@/components/forms/RentalRequestForm";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { beers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Louer une tireuse | Bières Georges",
  description:
    "Préparez la location d'une tireuse Bières Georges pour votre événement.",
};

const draftBeers = beers
  .filter((beer) => beer.ranges.includes("CHR") && beer.formats.includes("Fût"))
  .slice(0, 3);
const draftBeerSlider = [...draftBeers, ...draftBeers, ...draftBeers];

const steps = [
  {
    number: "01",
    title: "Renseignez votre événement",
    text: "Date, lieu, nombre de personnes et type d'occasion.",
  },
  {
    number: "02",
    title: "Choisissez votre formule",
    text: "Tireuse, volume de fûts et bières selon les disponibilités.",
  },
  {
    number: "03",
    title: "Confirmez la réservation",
    text: "Validation, caution et paiement sécurisé par Stripe.",
  },
  {
    number: "04",
    title: "Profitez de l'événement",
    text: "Retrait ou livraison selon la zone, installation et retour.",
  },
];

export default function RentTapPage() {
  return (
    <SiteShell>
      <style>{`
        @keyframes tireuse-product-slider {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tireuse-product-track {
          animation: tireuse-product-slider 24s linear infinite;
        }
        .tireuse-journey-step {
          opacity: 0;
          transform: translateX(-2rem);
          animation: tireuse-step-in both ease-out;
          animation-timeline: view();
          animation-range: entry 15% cover 35%;
        }
        @keyframes tireuse-step-in {
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tireuse-product-track { animation: none; }
          .tireuse-journey-step { opacity: 1; transform: none; animation: none; }
        }
      `}</style>
      <InternalPageHero
        eyebrow="Location événementielle"
        title="Louer une tireuse à bière"
        intro="Servez les Bières Georges à la pression lors de vos événements. Préparez votre demande en quelques étapes."
        image="/assets/images/pression_bar.jpg"
        primary={{ label: "Préparer ma réservation", href: "#reservation" }}
        secondary={{ label: "Voir le mode d'emploi", href: "#mode-emploi" }}
      />

      <section className="section-padding bg-cream px-4">
        <div className="container-page">
          <p className="eyebrow text-orange">Comment ça marche ?</p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
            Le parcours de réservation
          </h2>
          <div className="relative mt-12 max-w-4xl">
            <div className="absolute bottom-8 left-7 top-8 hidden w-px bg-green/15 sm:block" />
            {steps.map((step) => (
              <article
                key={step.number}
                className="tireuse-journey-step relative mb-6 grid gap-5 rounded-3xl bg-cream-dark p-6 sm:grid-cols-[4rem_1fr] sm:p-8"
              >
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-orange font-display text-2xl font-bold text-cream">
                  {step.number.replace("0", "")}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase text-green">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-green/65">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reservation" className="section-padding scroll-mt-20 bg-cream-dark px-4">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow text-orange">Votre événement</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
              Préparer une demande de réservation
            </h2>
            <p className="mt-5 leading-relaxed text-green/65">
              Ce formulaire constitue la première étape du parcours. Les
              disponibilités et le prix final seront confirmés avant paiement.
            </p>
          </div>
          <div className="mt-10">
            <RentalRequestForm />
          </div>
        </div>
      </section>

      <section id="mode-emploi" className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/Pression bar_02.JPG"
              alt="Service d'une bière Georges à la pression"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-orange">Mode d’emploi</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Une installation simple
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                "Placez la tireuse sur une surface stable et ventilée.",
                "Branchez le fût et les raccords selon le guide fourni.",
                "Laissez la tireuse atteindre la bonne température.",
                "Inclinez le verre, ouvrez franchement puis redressez pour former la mousse.",
              ].map((item, index) => (
                <li key={item} className="flex gap-4 text-cream/75">
                  <span className="font-display text-xl font-bold text-orange">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="mt-8 flex gap-3 rounded-2xl border border-cream/15 p-5 text-sm text-cream/65">
              <Icon name="check" className="shrink-0 text-orange" />
              Une fiche illustrée définitive accompagnera chaque location après
              validation du modèle de tireuse.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream px-4">
        <div className="container-page">
          <p className="eyebrow text-orange">Gamme CHR</p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
            Les bières disponibles en fût
          </h2>
          <div className="mt-10 overflow-hidden">
            <div className="tireuse-product-track flex w-max gap-5">
              {draftBeerSlider.map((beer, index) => (
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
            <CtaLink href="/toutes-les-bieres" variant="green">
              Voir toutes les bières
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="bg-orange px-4 py-16 text-cream">
        <div className="container-page">
          <h2 className="font-display text-4xl font-bold uppercase">
            Informations à confirmer
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-cream/80">
            Tarifs, caution, capacités exactes, zone de livraison, délais,
            modalités de retrait et références disponibles seront ajoutés dès
            validation commerciale.
          </p>
        </div>
      </section>
      <VersionSwitcher href="/louer-une-tireuse/v2" targetVersion="V2" />
    </SiteShell>
  );
}
