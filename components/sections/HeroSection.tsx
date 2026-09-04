"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useAgeVerification } from "@/lib/age-context";
import { EASE } from "@/lib/motion";

const BG_PHOTO = "/Charte Graphique_Dossier/Links/Biere Georges Montée Choulans.jpg";

export function HeroSection() {
  const { verified, hydrated } = useAgeVerification();
  const play = hydrated && verified;

  return (
    <section
      id="hero"
      className="relative flex min-h-[44rem] items-center justify-center overflow-hidden bg-green-deep px-4 py-32 sm:min-h-screen"
    >
      {/* Full-bleed background photo */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_PHOTO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-deep/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_25%,rgba(5,43,37,0.6)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-green-deep to-transparent" />
      </div>

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Wordmark — brique color, large */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
        >
          <Image
            src="/assets/logos/logo-classique-brique.png"
            alt="Bières Georges"
            width={1093}
            height={465}
            priority
            className="w-[min(82vw,22rem)] sm:w-[min(70vw,30rem)] lg:w-[38rem]"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="font-display mt-7 text-lg font-bold uppercase tracking-[0.22em] text-orange sm:text-xl lg:text-2xl"
        >
          Brasserie audacieuse depuis{" "}
          <span className="text-cream">1836</span>
        </motion.p>
      </div>
    </section>
  );
}
