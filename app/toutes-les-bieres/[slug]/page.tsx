import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/SiteShell";
import { ProductHero } from "@/components/sections/product/ProductHero";
import { ProductTechnical } from "@/components/sections/product/ProductTechnical";
import { ProductRelated } from "@/components/sections/product/ProductRelated";
import { beers } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

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
      <ProductHero beer={beer} />
      <ProductTechnical beer={beer} />
      {related.length > 0 && <ProductRelated beers={related} />}
    </SiteShell>
  );
}
