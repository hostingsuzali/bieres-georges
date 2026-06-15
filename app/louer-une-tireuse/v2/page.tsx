import type { Metadata } from "next";

import { RentalRequestForm } from "@/components/forms/RentalRequestForm";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";

export const metadata: Metadata = {
  title: "Louer une tireuse V2 | Bières Georges",
  description:
    "Seconde proposition de parcours pour louer une tireuse Bières Georges.",
};

const formulas = [
  {
    title: "Format intime",
    guests: "Jusqu'à 30 personnes",
    volume: "Fût 5 à 10 L",
    text: "Pour les anniversaires, repas et soirées entre proches.",
  },
  {
    title: "Grande tablée",
    guests: "30 à 80 personnes",
    volume: "Fût 20 L",
    text: "Pour les mariages, réceptions et événements d'entreprise.",
  },
  {
    title: "Grand événement",
    guests: "80 personnes et +",
    volume: "Fût 30 L et plus",
    text: "Pour les festivals, associations et grands rassemblements.",
  },
];

export default function RentTapV2Page() {
  return (
    <SiteShell>
      <section className="bg-green-deep px-4 pb-16 pt-32 text-cream sm:pt-40">
        <div className="container-page grid overflow-hidden rounded-3xl border border-cream/15 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[34rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/pression_bar.jpg"
              alt="Une bière Georges servie à la pression"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <p className="eyebrow text-orange">Location événementielle · V2</p>
              <h1 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
                La pression,
                <br />
                chez vous.
              </h1>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-cream p-7 text-green sm:p-12">
            <p className="eyebrow text-orange">Votre événement commence ici</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
              Dites-nous quand, où et pour combien
            </h2>
            <p className="mt-5 leading-relaxed text-green/65">
              Cette variante place la demande de réservation au cœur du premier
              écran, puis guide vers la formule adaptée.
            </p>
            <div className="mt-8">
              <CtaLink href="#demande-v2" variant="green">
                Préparer ma demande
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream px-4">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow text-orange">Choisir son volume</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase text-green sm:text-6xl">
              Une formule pour chaque fête
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {formulas.map((formula, index) => (
              <article
                key={formula.title}
                className={`relative overflow-hidden rounded-3xl p-7 sm:p-9 ${
                  index === 1
                    ? "bg-orange text-cream lg:-translate-y-4"
                    : "bg-cream-dark text-green"
                }`}
              >
                <span
                  className={`font-display text-6xl font-bold ${
                    index === 1 ? "text-cream/20" : "text-green/10"
                  }`}
                >
                  0{index + 1}
                </span>
                <h3 className="font-display mt-8 text-3xl font-bold uppercase">
                  {formula.title}
                </h3>
                <p className="eyebrow mt-5">{formula.guests}</p>
                <p className="mt-2 text-xl font-semibold">{formula.volume}</p>
                <p
                  className={`mt-5 text-sm leading-relaxed ${
                    index === 1 ? "text-cream/75" : "text-green/65"
                  }`}
                >
                  {formula.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="demande-v2" className="section-padding scroll-mt-20 bg-orange px-4">
        <div className="container-page grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-start">
          <div className="text-cream lg:sticky lg:top-28">
            <p className="eyebrow text-cream/70">Réservation</p>
            <h2 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
              Votre moment, votre pression
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cream/75">
              Une demande rapide, suivie d’une confirmation des disponibilités,
              du tarif et des conditions avant paiement Stripe.
            </p>
          </div>
          <RentalRequestForm />
        </div>
      </section>

      <section className="section-padding bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow text-orange">Prise en main</p>
              <h2 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] sm:text-6xl">
                Brancher. Rafraîchir. Servir.
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                "Installer la tireuse sur une surface stable.",
                "Brancher le fût et laisser refroidir.",
                "Incliner le verre et servir franchement.",
              ].map((item, index) => (
                <li
                  key={item}
                  className="rounded-2xl border border-cream/15 p-6 text-sm leading-relaxed text-cream/70"
                >
                  <Icon name="check" className="mb-8 text-orange" />
                  <span className="eyebrow block text-orange">
                    Étape {index + 1}
                  </span>
                  <span className="mt-3 block">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-16">
        <div className="container-page flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase text-green">
              Besoin d’une offre professionnelle ?
            </h2>
            <p className="mt-2 text-green/65">
              Événement récurrent, gros volume ou partenariat sur mesure.
            </p>
          </div>
          <CtaLink href="/travailler-avec-nous" variant="green">
            Nous présenter le projet
          </CtaLink>
        </div>
      </section>

      <VersionSwitcher href="/louer-une-tireuse" targetVersion="V1" />
    </SiteShell>
  );
}
