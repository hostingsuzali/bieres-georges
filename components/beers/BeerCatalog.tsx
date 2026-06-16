"use client";

import { useMemo, useState } from "react";

import { BeerCard } from "@/components/beers/BeerCard";
import {
  beerCollections,
  beers,
  type BeerCollection,
  type BeerRange,
} from "@/lib/products";

export function BeerCatalog() {
  const [ranges, setRanges] = useState<BeerRange[]>([]);
  const [collections, setCollections] = useState<BeerCollection[]>([]);

  const filtered = useMemo(
    () =>
      beers.filter(
        (beer) =>
          (ranges.length === 0 ||
            beer.ranges.some((range) => ranges.includes(range))) &&
          (collections.length === 0 ||
            collections.includes(beer.collection)),
      ),
    [collections, ranges],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside className="h-fit rounded-3xl border border-green/10 bg-white/40 p-6 lg:sticky lg:top-28">
        <p className="eyebrow text-orange">Filtres</p>
        <CheckboxGroup
          label="Gamme"
          values={["GMS", "CHR"]}
          selected={ranges}
          onToggle={(value) =>
            setRanges((current) =>
              current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
            )
          }
        />
        <CheckboxGroup
          label="Collection"
          values={beerCollections}
          selected={collections}
          onToggle={(value) =>
            setCollections((current) =>
              current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value],
            )
          }
        />
        <div className="mt-7 border-t border-green/10 pt-5">
          <p className="font-display text-4xl font-bold text-green">
            {filtered.length}
          </p>
          <p className="mt-1 text-sm text-green/55">bières affichées</p>
        </div>
        {(ranges.length > 0 || collections.length > 0) && (
          <button
            type="button"
            onClick={() => {
              setRanges([]);
              setCollections([]);
            }}
            className="eyebrow mt-6 text-orange hover:text-green"
          >
            Réinitialiser
          </button>
        )}
      </aside>

      <div>
        <div className="flex items-center justify-between border-b border-green/10 pb-4">
          <p className="text-sm text-green/60">
            <strong className="text-green">{filtered.length}</strong>{" "}
            {filtered.length > 1 ? "bières affichées" : "bière affichée"}
          </p>
          <p className="eyebrow text-green/45">Multi-sélection</p>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((beer) => (
            <BeerCard key={beer.slug} beer={beer} />
          ))}
        </div>
      </div>
    </div>
  );
}

type CheckboxGroupProps<T extends string> = {
  label: string;
  values: readonly T[];
  selected: readonly T[];
  onToggle: (value: T) => void;
};

function CheckboxGroup<T extends string>({
  label,
  values,
  selected,
  onToggle,
}: CheckboxGroupProps<T>) {
  return (
    <fieldset className="mt-7">
      <legend className="eyebrow mb-3 text-green/55">{label}</legend>
      <div className="space-y-2">
        {values.map((value) => {
          const isSelected = selected.includes(value);
          return (
            <label
              key={value}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors ${
                isSelected
                  ? "border-orange bg-orange/10 text-green"
                  : "border-green/10 text-green/65 hover:border-green/30"
              }`}
            >
              <span>{value}</span>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(value)}
                className="h-4 w-4 accent-orange"
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
