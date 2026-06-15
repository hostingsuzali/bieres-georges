"use client";

import { useMemo, useState } from "react";

import {
  beerCollections,
  beers,
  type BeerCollection,
  type BeerRange,
} from "@/lib/products";

type RangeFilter = "Toutes" | BeerRange;
type CollectionFilter = "Toutes" | BeerCollection;

export function BeerCatalogV2() {
  const [range, setRange] = useState<RangeFilter>("Toutes");
  const [collection, setCollection] =
    useState<CollectionFilter>("Toutes");

  const filtered = useMemo(
    () =>
      beers.filter(
        (beer) =>
          (range === "Toutes" || beer.ranges.includes(range)) &&
          (collection === "Toutes" || beer.collection === collection),
      ),
    [collection, range],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside className="h-fit rounded-3xl border border-cream/15 bg-cream/5 p-6 lg:sticky lg:top-28">
        <p className="eyebrow text-orange">Affiner</p>
        <FilterSelect
          label="Gamme"
          value={range}
          values={["Toutes", "GMS", "CHR"]}
          onChange={(value) => setRange(value as RangeFilter)}
        />
        <FilterSelect
          label="Collection"
          value={collection}
          values={["Toutes", ...beerCollections]}
          onChange={(value) => setCollection(value as CollectionFilter)}
        />
        <div className="mt-7 border-t border-cream/15 pt-5">
          <p className="font-display text-4xl font-bold text-orange">
            {filtered.length}
          </p>
          <p className="mt-1 text-sm text-cream/55">références affichées</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setRange("Toutes");
            setCollection("Toutes");
          }}
          className="eyebrow mt-6 text-cream/60 hover:text-orange"
        >
          Tout afficher
        </button>
      </aside>

      <div className="divide-y divide-cream/15 border-y border-cream/15">
        {filtered.map((beer, index) => (
          <article
            key={beer.slug}
            className="group grid gap-5 py-7 sm:grid-cols-[4rem_10rem_1fr_auto] sm:items-center lg:grid-cols-[5rem_12rem_1fr_auto]"
          >
            <span className="font-display text-3xl font-bold text-cream/20">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex h-44 items-center justify-center rounded-2xl bg-cream-dark p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={beer.image}
                alt={`Bière Georges ${beer.name}`}
                className="h-full max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {beer.ranges.map((item) => (
                  <span
                    key={item}
                    className="eyebrow rounded-full border border-orange/40 px-3 py-1 text-orange"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold uppercase sm:text-4xl">
                {beer.name}
              </h2>
              <p className="mt-2 text-sm text-cream/55">
                {beer.style} · {beer.collection}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70">
                {beer.description}
              </p>
            </div>
            <p className="eyebrow sm:max-w-28 sm:text-right text-cream/45">
              {beer.formats.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-6 block">
      <span className="eyebrow text-cream/50">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-cream/20 bg-green-deep px-4 py-3 text-sm text-cream outline-none focus:border-orange"
      >
        {values.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}

