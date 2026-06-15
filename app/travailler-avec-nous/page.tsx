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
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <RangeCard
              tag="GMS"
              title="Pour les magasins"
              text="Des packshots identifiables, plusieurs formats et une sélection adaptée au libre-service."
              image="/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL/BG_PILS_33CL.png"
            />
            <RangeCard
              tag="CHR"
              title="Pour les lieux de convivialité"
              text="Des références dédiées aux bars, restaurants, cavistes et événements, en bouteilles ou en fûts."
              image="/assets/gammes/GAMME CHR - Visuels/IPA 33CL 3760268370136.png"
            />
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

function RangeCard({
  tag,
  title,
  text,
  image,
}: {
  tag: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <article className="grid min-h-[27rem] overflow-hidden rounded-3xl border border-cream/15 bg-cream/5 sm:grid-cols-[1fr_0.8fr]">
      <div className="flex flex-col justify-end p-7 sm:p-9">
        <span className="eyebrow text-orange">{tag}</span>
        <h3 className="font-display mt-3 text-3xl font-bold uppercase">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-cream/65">{text}</p>
      </div>
      <div className="flex min-h-64 items-end justify-center bg-cream-dark p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-64 max-w-full object-contain" />
      </div>
    </article>
  );
}

