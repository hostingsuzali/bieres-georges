"use client";

import { useMemo, useState } from "react";

import { BeerCard } from "@/components/beers/BeerCard";
import { Icon } from "@/components/ui/Icon";
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
  const [open, setOpen] = useState(false);

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
    <div>
      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="eyebrow inline-flex items-center gap-3 rounded-full border border-cream/20 bg-cream/5 px-5 py-3 text-cream transition-colors hover:border-orange hover:text-orange"
        >
          <Icon name="search" size={16} />
          Filtres
          <span className="rounded-full bg-orange px-2 py-0.5 text-cream">
            {filtered.length}
          </span>
        </button>

        {open && (
          <div className="absolute left-0 top-full z-20 mt-3 w-full max-w-xl rounded-3xl border border-cream/15 bg-green p-6 shadow-2xl">
            <div className="grid gap-5 sm:grid-cols-2">
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
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((beer) => (
          <BeerCard key={beer.slug} beer={beer} />
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
    <label className="block">
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
