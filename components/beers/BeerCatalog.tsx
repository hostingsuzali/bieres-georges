"use client";

import { useMemo, useState } from "react";

import { BeerCard } from "@/components/beers/BeerCard";
import {
  beerCollections,
  beers,
  type BeerCollection,
  type BeerRange,
} from "@/lib/products";

type RangeFilter = "Toutes" | BeerRange;
type CollectionFilter = "Toutes" | BeerCollection;

export function BeerCatalog() {
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
    <div>
      <div className="grid gap-7 rounded-3xl border border-green/10 bg-white/35 p-5 lg:grid-cols-2 lg:p-7">
        <FilterGroup
          label="Gamme"
          values={["Toutes", "GMS", "CHR"]}
          active={range}
          onChange={(value) => setRange(value as RangeFilter)}
        />
        <FilterGroup
          label="Collection"
          values={["Toutes", ...beerCollections]}
          active={collection}
          onChange={(value) => setCollection(value as CollectionFilter)}
        />
      </div>

      <div className="mt-8 flex items-center justify-between border-b border-green/10 pb-4">
        <p className="text-sm text-green/60">
          <strong className="text-green">{filtered.length}</strong>{" "}
          {filtered.length > 1 ? "bières affichées" : "bière affichée"}
        </p>
        {(range !== "Toutes" || collection !== "Toutes") && (
          <button
            type="button"
            onClick={() => {
              setRange("Toutes");
              setCollection("Toutes");
            }}
            className="eyebrow text-orange hover:text-green"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((beer) => (
          <BeerCard key={beer.slug} beer={beer} />
        ))}
      </div>
    </div>
  );
}

type FilterGroupProps = {
  label: string;
  values: readonly string[];
  active: string;
  onChange: (value: string) => void;
};

function FilterGroup({
  label,
  values,
  active,
  onChange,
}: FilterGroupProps) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-green/55">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const selected = value === active;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(value)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                selected
                  ? "border-orange bg-orange text-cream"
                  : "border-green/15 text-green hover:border-green/40"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

