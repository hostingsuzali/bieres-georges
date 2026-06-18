import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/SiteShell";
import { ProductHero } from "@/components/sections/product/ProductHero";
import { ProductProfile } from "@/components/sections/product/ProductProfile";
import { ProductDegustation } from "@/components/sections/product/ProductDegustation";
import { ProductSpecs } from "@/components/sections/product/ProductSpecs";
import { ProductRelated } from "@/components/sections/product/ProductRelated";
import { FilmStripDivider } from "@/components/ui/FilmStripDivider";
import { beers, type Beer } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const tastingByCollection = {
  "Les Originales": {
    hook: "Un repère Georges, droit dans son style et pensé pour revenir au verre.",
    notes: [
      { label: "Équilibre", description: "Un rapport malt-houblon maîtrisé pour une bière franche." },
      { label: "Fraîcheur", description: "Chaque gorgée rafraîchit, sans lourdeur ni amertume excessive." },
      { label: "Finale nette", description: "Pas de traîne. Le goût part propre, on y revient." },
    ],
    pairing: "Cuisine de comptoir, planches à partager, plats francs et généreux.",
    serving: "Servir entre 5° et 7° dans un verre tulipe propre. Incliner le verre, verser lentement, laisser la mousse se former.",
  },
  "Les Spéciales": {
    hook: "Une expression plus libre, construite pour surprendre sans perdre l'équilibre.",
    notes: [
      { label: "Aromatique", description: "Des houblons choisis pour leur expressivité et leur complexité." },
      { label: "Créative", description: "Des assemblages qui osent, sans sacrifier la buvabilité." },
      { label: "Intense", description: "Un caractère affirmé qui se mérite, gorgée après gorgée." },
    ],
    pairing: "Cuisine épicée, fromages de caractère, moments plus exploratoires.",
    serving: "Servir entre 6° et 8° dans un verre à pied. Laisser la bière respirer quelques instants avant de déguster.",
  },
} satisfies Record<Beer["collection"], { hook: string; notes: { label: string; description: string }[]; pairing: string; serving: string }>;

export function generateStaticParams() {
  return beers.map((beer) => ({ slug: beer.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const beer = beers.find((item) => item.slug === slug);

  if (!beer) {
    return {};
  }

  return {
    title: `${beer.name} | Bières Georges`,
    description: `${beer.name}, ${beer.style}. ${beer.description}`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const beer = beers.find((item) => item.slug === slug);

  if (!beer) {
    notFound();
  }

  const tasting = tastingByCollection[beer.collection];
  const related = beers
    .filter(
      (item) =>
        item.slug !== beer.slug &&
        (item.collection === beer.collection ||
          item.ranges.some((range) => beer.ranges.includes(range))),
    )
    .slice(0, 3);

  return (
    <SiteShell>
      <ProductHero beer={beer} hook={tasting.hook} />
      <ProductProfile notes={tasting.notes} />
      <FilmStripDivider />
      <ProductDegustation
        pairing={tasting.pairing}
        serving={tasting.serving}
      />
      <ProductSpecs beer={beer} />
      {related.length > 0 && <ProductRelated beers={related} />}
    </SiteShell>
  );
}
