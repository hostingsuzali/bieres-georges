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

const gmsSlides = [
  "/assets/gammes/GAMME GMS - Visuels/Version TRACE/En situation/WEB/BIERE GEORGE PHOTO PRESSE-DSC00672.jpg",
  "/assets/gammes/GAMME GMS - Visuels/Version TRACE/En situation/WEB/BIERE GEORGE PHOTO PRESSE-DSC00678.jpg",
  "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL/BG_PILS_33CL.png",
  "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Canettes 44CL/BG_NEIPA_44CL.png",
];

const chrSlides = [
  "/assets/bieres.jpg",
  "/assets/gammes/GAMME CHR - Visuels/COFFRET CHR 6X33CL (Face) 3760268370310.png",
  "/assets/gammes/GAMME CHR - Visuels/IPA 33CL 3760268370136.png",
  "/assets/gammes/GAMME CHR - Visuels/VERY GOOD TRIPLE 75CL 3760268370679.png",
];

const gmsTrack = [...gmsSlides, ...gmsSlides];
const chrTrack = [...chrSlides, ...chrSlides];

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
              images={gmsTrack}
              direction="left"
              cta="Voir la gamme GMS"
            />
            <RangeSlider
              eyebrow="Gamme CHR"
              title="Pour les lieux de convivialité"
              text="Une gamme colorée et expressive pour les bars, restaurants, cavistes et événements, en bouteilles comme à la pression."
              images={chrTrack}
              direction="right"
              cta="Voir la gamme CHR"
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
  images,
  direction,
  cta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  images: string[];
  direction: "left" | "right";
  cta: string;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-cream/15 bg-cream/5">
      <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
        <div>
          <p className="eyebrow text-orange">{eyebrow}</p>
          <h3 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95]">
            {title}
          </h3>
          <p className="mt-5 leading-relaxed text-cream/65">{text}</p>
          <div className="mt-8">
            <CtaLink href="/toutes-les-bieres" variant="light">
              {cta}
            </CtaLink>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-cream-dark py-5">
          <div
            className={`flex w-max gap-5 ${
              direction === "left" ? "gamme-left-track" : "gamme-right-track"
            }`}
          >
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative h-72 w-[24rem] shrink-0 overflow-hidden rounded-2xl bg-cream"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-contain p-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
