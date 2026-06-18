import Image from "next/image";

import { partners } from "@/lib/data";

export function TrustedBySection() {
  return (
    <section className="relative overflow-hidden bg-cream-dark px-4 py-20 text-green sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-green/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-green/10" />
      <div
        className="pointer-events-none absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 opacity-[0.06]"
        aria-hidden="true"
      >
        <Image
          src="/assets/logos/sigle-brique.png"
          alt=""
          width={792}
          height={894}
          className="h-auto w-full"
        />
      </div>

      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div>
            <p className="eyebrow text-orange">Ils nous font confiance</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
              Des comptoirs, des caves, des tables.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex min-h-24 items-center justify-center border border-green/10 bg-cream px-4 py-5 text-center shadow-[0_18px_60px_-48px_rgba(6,58,52,0.7)]"
              >
                <span className="font-display text-xl font-bold uppercase leading-none text-green/75">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-hidden border-y border-green/10 bg-green-deep py-3">
          <Image
            src="/assets/logostrip.svg"
            alt=""
            width={1827}
            height={59}
            className="h-auto min-w-[54rem] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
