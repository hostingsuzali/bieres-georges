import type { Metadata } from "next";

import { PartnerInquiryForm } from "@/components/forms/PartnerInquiryForm";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { InternalPageHero } from "@/components/ui/InternalPageHero";

export const metadata: Metadata = {
  title: "Travailler avec les Bières Georges",
  description:
    "Découvrez les offres Bières Georges pour les bars, restaurants, cavistes, enseignes et événements.",
};

const channels: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Bars & Restaurants",
    text: "Bières bouteilles et pression, accompagnement de carte et visibilité sur le lieu.",
    icon: "bar",
  },
  {
    title: "Cavistes",
    text: "Une gamme de caractère, des formats variés et des références saisonnières.",
    icon: "caviste",
  },
  {
    title: "Grande distribution",
    text: "Une offre GMS identifiable, adaptée aux rayons et aux temps forts commerciaux.",
    icon: "distribution",
  },
  {
    title: "Événementiel",
    text: "Fûts, tireuses et formats pensés pour les événements privés et professionnels.",
    icon: "evenement",
  },
];

export default function WorkWithUsPage() {
  return (
    <SiteShell>
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
          <div className="max-w-3xl">
            <p className="eyebrow text-orange">Nos partenaires</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
              À chaque activité son accompagnement
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {channels.map((channel) => (
              <article
                key={channel.title}
                className="tag-shape bg-cream-dark p-7 text-green"
              >
                <Icon name={channel.icon} size={32} className="text-orange" />
                <h3 className="font-display mt-8 text-2xl font-bold uppercase">
                  {channel.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-green/65">
                  {channel.text}
                </p>
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
          <div className="mt-12 space-y-8">
            <article className="overflow-hidden rounded-3xl bg-cream text-green">
              <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
                <div className="relative min-h-[24rem] overflow-hidden lg:min-h-[34rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/gammes/GAMME GMS - Visuels/Version TRACE/En situation/WEB/BIERE GEORGE PHOTO PRESSE-DSC00672.jpg"
                    alt="Bière Georges de la gamme GMS"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="eyebrow text-orange">Gamme GMS</span>
                  <h3 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95]">
                    Pour les magasins
                  </h3>
                  <p className="mt-5 leading-relaxed text-green/65">
                    Une identité forte en rayon, plusieurs formats et une
                    sélection pensée pour la grande distribution et les achats
                    à emporter.
                  </p>
                  <div className="mt-8">
                    <CtaLink href="/toutes-les-bieres" variant="green">
                      Voir la gamme GMS
                    </CtaLink>
                  </div>
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-3xl border border-cream/15 bg-black/20">
              <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="eyebrow text-orange">Gamme CHR</span>
                  <h3 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95]">
                    Pour les lieux de convivialité
                  </h3>
                  <p className="mt-5 leading-relaxed text-cream/65">
                    Une gamme colorée et expressive pour les bars, restaurants,
                    cavistes et événements, en bouteilles comme à la pression.
                  </p>
                  <div className="mt-8">
                    <CtaLink href="/toutes-les-bieres" variant="light">
                      Voir la gamme CHR
                    </CtaLink>
                  </div>
                </div>
                <div className="relative order-first min-h-[24rem] overflow-hidden lg:order-last lg:min-h-[34rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/bieres.jpg"
                    alt="La gamme CHR des Bières Georges"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream px-4">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow text-orange">Pourquoi Georges ?</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
              Une marque qui a du répondant
            </h2>
            <ul className="mt-8 space-y-5 text-green/70">
              {[
                "Une histoire lyonnaise depuis 1836",
                "Des recettes lisibles et différenciantes",
                "Une gamme adaptée à plusieurs circuits",
                "Un accompagnement commercial à construire selon vos besoins",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" className="shrink-0 text-orange" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <CtaLink href="/toutes-les-bieres" variant="green">
                Explorer les bières
              </CtaLink>
            </div>
          </div>
          <div id="contact-pro" className="scroll-mt-24">
            <PartnerInquiryForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
