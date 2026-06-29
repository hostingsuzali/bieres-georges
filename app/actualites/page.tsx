import type { Metadata } from "next";
import Image from "next/image";

import { SiteShell } from "@/components/layout/SiteShell";
import { ActualitesGrid } from "@/components/sections/ActualitesGrid";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { blogArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Actualités — Bières Georges",
  description:
    "Brasserie, histoire, gastronomie : le journal des Bières Georges, des coulisses de la brasserie aux histoires lyonnaises.",
};

const [featured, ...rest] = blogArticles;

export default function ActualitesPage() {
  return (
    <SiteShell>
      <InternalPageHero
        eyebrow="Journal"
        title="Actualités & Histoires"
        intro="Un regard éditorial sur la brasserie, les coulisses, les rencontres et les savoir-faire qui donnent à Bières Georges son caractère."
        image="/assets/images/BRASSERIE.jpg"
        primary={{ label: "Lire le dernier article", href: `#${featured.slug}` }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
      />

      <section className="section-padding bg-cream px-4">
        <div className="container-page">
          <p className="eyebrow text-orange">À la une</p>
          <a
            id={featured.slug}
            href="#"
            className="group mt-4 grid scroll-mt-24 gap-0 overflow-hidden rounded-3xl bg-cream-dark text-green lg:grid-cols-2"
          >
            <div className="relative aspect-[5/4] overflow-hidden lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="eyebrow flex items-center gap-2 text-orange">
                <span>{featured.category}</span>
                <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                <span className="text-green/55">{featured.date}</span>
                <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                <span className="text-green/55">{featured.readTime} de lecture</span>
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold uppercase leading-[1.0] sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-green/65">
                {featured.excerpt}
              </p>
              <span className="eyebrow mt-7 inline-flex items-center gap-2 text-orange">
                <span className="border-b border-dashed border-current pb-1">
                  Lire l&apos;article
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrowRight" size={14} />
                </span>
              </span>
            </div>
          </a>
        </div>
      </section>

      <section className="section-padding bg-green-deep px-4 text-cream">
        <div className="container-page">
          <p className="eyebrow text-orange">Tous les articles</p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
            Le journal de la maison
          </h2>

          <ActualitesGrid articles={rest} />
        </div>
      </section>

      <section className="bg-orange px-4 py-16 text-cream">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <p className="eyebrow">Une question, une suggestion ?</p>
          <h2 className="font-display max-w-2xl text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
            Écrivez à la rédaction
          </h2>
          <CtaLink href="/contact" variant="light">
            Nous contacter
          </CtaLink>
        </div>
      </section>
    </SiteShell>
  );
}
