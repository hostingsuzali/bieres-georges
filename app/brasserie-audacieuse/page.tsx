import type { Metadata } from "next";
import Image from "next/image";

import { SiteShell } from "@/components/layout/SiteShell";
import { EquipeSection } from "@/components/sections/brasserie/EquipeSection";
import { ManifestoSection } from "@/components/sections/brasserie/ManifestoSection";
import { SavoirFaireSection } from "@/components/sections/brasserie/SavoirFaireSection";
import { ValeursSection } from "@/components/sections/brasserie/ValeursSection";
import { FilmStripDivider } from "@/components/ui/FilmStripDivider";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { KeywordsMarquee } from "@/components/ui/KeywordsMarquee";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";

export const metadata: Metadata = {
  title: "Brasserie audacieuse | Bières Georges",
  description:
    "L'histoire, le manifeste, les valeurs, l'équipe et le savoir-faire des Bières Georges, brasserie lyonnaise audacieuse depuis 1836.",
};

const timeline = [
  {
    year: "1836",
    title: "Georges ouvre la voie",
    text: "Une brasserie lyonnaise s'installe dans le paysage avec une idée simple : servir une bière franche, généreuse et reconnaissable.",
    image: "/assets/images/1860-1.jpeg",
    tone: "bg-orange text-cream",
  },
  {
    year: "1936",
    title: "Le rituel devient populaire",
    text: "La maison traverse les époques, les tables se remplissent, la bière Georges devient un signe de convivialité locale.",
    image: "/assets/images/1936.jpg",
    tone: "bg-green text-cream",
  },
  {
    year: "2026",
    title: "L'audace reprend la parole",
    text: "L'héritage est réactivé par une équipe contemporaine : recettes nettes, identité vive, envie de surprendre sans perdre le fil.",
    image: "/assets/images/fabrique-aujourdhui.webp",
    tone: "bg-cream text-green",
  },
];

export default function BrasserieAudacieusePage() {
  return (
    <SiteShell>
      <InternalPageHero
        eyebrow="Depuis 1836"
        title="Brasserie audacieuse"
        intro="Nous brassons l'héritage Georges comme une matière vivante : avec respect, panache et un goût net pour le présent."
        image="/assets/images/BRASSERIE.jpg"
        primary={{ label: "Lire le manifeste", href: "#manifeste" }}
        secondary={{ label: "Voir le savoir-faire", href: "#savoir-faire" }}
      />

      {/* ── Histoire (timeline) ── user likes this section, kept as-is ── */}
      <section
        id="histoire"
        className="section-padding scroll-mt-20 bg-cream px-4"
      >
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <div>
              <p className="eyebrow text-orange">Histoire</p>
              <h2 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.9] text-green sm:text-7xl">
                La ligne n&apos;est pas droite.
              </h2>
            </div>
            <p className="max-w-xl leading-relaxed text-green/65">
              Les Bières Georges avancent par reprises, secousses et retours au
              goût. La tradition n&apos;est pas un musée : c&apos;est une base
              de départ.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <article
                key={item.year}
                className={`relative overflow-hidden ${item.tone} ${
                  index === 1 ? "lg:mt-16" : ""
                } ${index === 2 ? "lg:mt-32" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover mix-blend-multiply grayscale transition duration-500 hover:grayscale-0"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-7">
                  <p className="font-display text-7xl font-bold leading-none">
                    {item.year}
                  </p>
                  <h3 className="font-display mt-5 text-3xl font-bold uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed opacity-75">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <FilmStripDivider />

      {/* ── Manifeste ── */}
      <ManifestoSection />

      {/* ── Keywords marquee ── */}
      <KeywordsMarquee />

      {/* ── Valeurs ── */}
      <ValeursSection />

      {/* ── Divider ── */}
      <FilmStripDivider />

      {/* ── Équipe ── */}
      <EquipeSection />

      {/* ── Savoir-faire ── */}
      <SavoirFaireSection />
    </SiteShell>
  );
}
