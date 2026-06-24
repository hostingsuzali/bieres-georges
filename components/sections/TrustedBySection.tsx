import { partners } from "@/lib/data";

const row1 = partners.slice(0, Math.ceil(partners.length / 2));
const row2 = partners.slice(Math.ceil(partners.length / 2));

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className={`flex w-max gap-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex h-20 shrink-0 items-center justify-center border border-cream/15 bg-cream/10 px-8 backdrop-blur-sm"
          >
            <span className="font-display whitespace-nowrap text-lg font-bold uppercase tracking-wide text-cream/90">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustedBySection() {
  return (
    <section className="relative overflow-hidden bg-green px-4 py-20 text-cream sm:py-24">
      <div className="container-page relative mb-6 text-center">
        <p className="eyebrow text-orange">Ils nous font confiance</p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
          Des comptoirs, des caves, des tables.
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
