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
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
className="pointer-events-none absolute left-2 top-5 w-48 sm:left-4 sm:top-8 sm:w-60 lg:left-6 lg:top-12 lg:w-72"        aria-hidden="true"
      >
        <Image
          src="/assets/images/BG-Beige.png"
          alt=""
          width={499}
          height={417}
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
className="pointer-events-none absolute bottom-5 right-2 w-64 sm:bottom-8 sm:right-4 sm:w-60 lg:bottom-12 lg:right-6 lg:w-72"        aria-hidden="true"
      >
        <Image
          src="/assets/images/BG-Beige.png"
          alt=""
          width={359}
          height={457}
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
