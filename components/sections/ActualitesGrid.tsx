"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Article = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
};

export function ActualitesGrid({ articles }: { articles: readonly Article[] }) {
  const categories = useMemo(
    () => Array.from(new Set(articles.map((article) => article.category))),
    [articles]
  );
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? articles.filter((article) => article.category === active)
    : articles;

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={`eyebrow rounded-full border px-4 py-2 transition-colors ${
            active === null
              ? "border-orange bg-orange text-cream"
              : "border-cream/20 text-cream/70 hover:border-orange/60 hover:text-orange"
          }`}
        >
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`eyebrow rounded-full border px-4 py-2 transition-colors ${
              active === category
                ? "border-orange bg-orange text-cream"
                : "border-cream/20 text-cream/70 hover:border-orange/60 hover:text-orange"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <a
            key={article.slug}
            href="#"
            className="group flex flex-col overflow-hidden rounded-3xl border border-cream/10 bg-cream/5 transition-colors duration-300 hover:border-orange/40 hover:bg-cream/10"
          >
            <div className="relative h-48 w-full overflow-hidden sm:h-52">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-orange px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-cream">
                {article.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs text-cream/40">
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime} de lecture</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight text-cream transition-colors duration-300 group-hover:text-orange">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/55">
                {article.excerpt}
              </p>
              <span className="eyebrow mt-6 inline-block text-orange transition-colors duration-300 group-hover:text-cream">
                Lire l&apos;article →
              </span>
            </div>
          </a>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-cream/50">
            Aucun article dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </>
  );
}
