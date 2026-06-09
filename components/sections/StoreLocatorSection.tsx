"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { useRef, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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

      <motion.div
        initial={{ opacity: 0, x: -28, rotate: -12 }}
        whileInView={{ opacity: 0.32, x: 0, rotate: -7 }}
        viewport={inViewOnce}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -left-16 top-1/2 hidden w-52 -translate-y-1/2 md:block lg:left-4 lg:w-64 xl:left-10 xl:w-72"
        aria-hidden="true"
      >
        <Image
          src="/assets/Bieres%20OU%20gouter%20l'audace%20icon.png"
          alt=""
          width={500}
          height={466}
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28, rotate: 12 }}
        whileInView={{ opacity: 0.32, x: 0, rotate: 7 }}
        viewport={inViewOnce}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-16 top-1/2 hidden w-52 -translate-y-1/2 md:block lg:right-4 lg:w-64 xl:right-10 xl:w-72"
        aria-hidden="true"
      >
        <Image
          src="/assets/Bieres%20OU%20gouter%20l'audace%20icon.png"
          alt=""
          width={500}
          height={466}
          className="h-auto w-full"
        />
      </motion.div>

      <div className="container-page relative z-10">
        <div className="flex flex-col items-center text-center">
          <Badge tone="cream">Points de vente</Badge>
          <AnimatedHeading
            as="h2"
            text="Où goûter l'audace ?"
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
            Bars, restaurants, caves, épiceries fines ou lieux de convivialité —
            Bières Georges se découvre dans des adresses choisies avec soin.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-9 flex justify-center"
        >
          <Button
            variant="solid"
            withArrow={!isMapVisible}
            cut
            onClick={isMapVisible ? undefined : showMap}
            aria-controls="georges-store-map"
            aria-expanded={isMapVisible}
            disabled={isMapVisible}
            className={isMapVisible ? "cursor-default opacity-70" : ""}
          >
            {isMapVisible ? "Carte affichée" : "Voir la carte"}
          </Button>
        </motion.div>

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
