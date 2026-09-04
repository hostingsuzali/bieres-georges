"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { useRef, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon } from "@/components/ui/Icon";
import { fadeUp, inViewOnce } from "@/lib/motion";

const ELFSIGHT_APP_ID = "555fd09f-0667-4579-8499-edd2f28f3398";

export function StoreLocatorSection() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const showMap = () => {
    setIsMapVisible(true);
    window.setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  return (
    <section
      id="locator"
      className="relative overflow-hidden bg-cream px-4 py-28 sm:py-40 lg:py-56"
    >
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      {/* Decorative sigle — top-left */}
      <div
        className="pointer-events-none absolute -left-8 -top-8 w-56 opacity-[0.07] sm:w-72 lg:w-96"
        aria-hidden="true"
      >
        <Image
          src="/assets/logos/sigle-stripes.png"
          alt=""
          width={792}
          height={894}
          className="h-auto w-full"
        />
      </div>

      {/* Decorative sigle — bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 w-56 rotate-180 opacity-[0.07] sm:w-72 lg:w-96"
        aria-hidden="true"
      >
        <Image
          src="/assets/logos/sigle-stripes.png"
          alt=""
          width={792}
          height={894}
          className="h-auto w-full"
        />
      </div>

      <div className="container-page relative z-10">
        <div className="flex flex-col items-center text-center">
          <AnimatedHeading
            as="h2"
            text="Trouver les Bières Georges"
            accentFrom={2}
            className="font-display mt-6 text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-dark-text/65 leading-relaxed"
          >
            Un point de vente proche de chez vous — en magasin ou en établissement,
            retrouvez les Bières Georges près de chez vous.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {[
            {
              title: "Les Magasins",
              desc: "Grande distribution, magasins spécialisés, cavistes",
            },
            {
              title: "Les Établissements",
              desc: "Cafés, bars, hôtels, restaurants",
            },
          ].map((block) => (
            <button
              key={block.title}
              type="button"
              onClick={isMapVisible ? undefined : showMap}
              aria-controls="georges-store-map"
              className="group rounded-3xl border border-green/10 bg-cream-dark p-8 text-left transition-colors hover:bg-orange hover:text-cream"
            >
              <h3 className="font-display text-2xl font-bold uppercase text-green transition-colors group-hover:text-cream sm:text-3xl">
                {block.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dark-text/60 transition-colors group-hover:text-cream/75">
                {block.desc}
              </p>
              <span className="eyebrow mt-6 inline-flex items-center gap-2 text-orange transition-colors group-hover:text-cream">
                Voir la carte
                <Icon name="arrowRight" size={14} />
              </span>
            </button>
          ))}
        </motion.div>

        <div className="mt-5 flex justify-center">
          <CtaLink href="/trouver" variant="outline">
            Ouvrir la carte
          </CtaLink>
        </div>

        <AnimatePresence>
          {isMapVisible && (
            <motion.div
              ref={mapRef}
              id="georges-store-map"
              initial={{ opacity: 0, height: 0, rotateX: -8 }}
              animate={{ opacity: 1, height: "auto", rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -8 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 scroll-mt-6 overflow-hidden rounded-3xl border border-dark-text/10 bg-cream-dark [transform-origin:top]"
            >
              <div className="flex items-center justify-between border-b border-dark-text/10 bg-cream px-6 py-4">
                <span className="font-display text-lg font-bold uppercase tracking-wider text-green">
                  Les magasins &amp; Les établissements
                </span>
              </div>
              <div
                className={`elfsight-app-${ELFSIGHT_APP_ID} min-h-[32rem] w-full`}
                data-elfsight-app-lazy
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
