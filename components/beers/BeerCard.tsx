import type { Beer } from "@/lib/products";

export function BeerCard({ beer }: { beer: Beer }) {
  return (
    <article className="group tag-shape flex min-h-[31rem] flex-col overflow-hidden bg-cream-dark p-6 text-green transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-wrap gap-2">
        {beer.ranges.map((range) => (
          <span
            key={range}
            className={`eyebrow rounded-full px-3 py-1 ${
              range === "CHR"
                ? "bg-green text-cream"
                : "bg-orange text-cream"
            }`}
          >
            {range}
          </span>
        ))}
      </div>
      <div className="relative mt-5 flex h-64 items-end justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beer.image}
          alt={`Bière Georges ${beer.name}`}
          className="h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="eyebrow mt-6 text-orange">{beer.collection}</p>
      <h2 className="font-display mt-2 text-3xl font-bold uppercase leading-none">
        {beer.name}
      </h2>
      <p className="mt-2 text-sm font-medium text-green/65">{beer.style}</p>
      <p className="mt-4 text-sm leading-relaxed text-dark-text/65">
        {beer.description}
      </p>
      <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-green/55">
        {beer.formats.join(" · ")}
      </p>
    </article>
  );
}

