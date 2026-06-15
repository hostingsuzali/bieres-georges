"use client";

import Script from "next/script";

const ELFSIGHT_APP_ID = "555fd09f-0667-4579-8499-edd2f28f3398";

export function StoreLocatorEmbed() {
  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div className="overflow-hidden rounded-3xl border border-green/10 bg-cream-dark shadow-[0_30px_80px_-55px_rgba(6,58,52,0.5)]">
        <div
          className={`elfsight-app-${ELFSIGHT_APP_ID} min-h-[36rem] w-full`}
          data-elfsight-app-lazy
        />
      </div>
    </>
  );
}

