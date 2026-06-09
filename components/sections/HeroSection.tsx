"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

const HERO_PHOTO = "/assets/backgrounds/hero-back.png";

export function HeroSection() {
  const beerTransition = {
    duration: 1.65,
    ease: EASE,
    times: [0, 0.38, 1],
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-4 pt-24 pb-16"
    >
      {/* layered background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_PHOTO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-cream/55 via-cream/35 to-cream/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,transparent_0%,var(--color-cream)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream/80 to-transparent" />
      </div>

      {/* left hand + amber bottle — pinned to the left edge */}
      <motion.div
        initial={{ x: "28vw", y: 90, rotate: -6, opacity: 0 }}
        animate={{
          x: ["28vw", "28vw", "0vw"],
          y: [90, 0, 0],
          rotate: [-6, -6, 0],
          opacity: [0, 1, 1],
        }}
        transition={{ ...beerTransition, delay: 0.1 }}
        className="absolute left-0 top-[10%] z-10 hidden w-[26vw] max-w-[26rem] min-w-[14rem] md:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ delay: 1.8, duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/assets/beers/hero-left-hand-beer.png"
            alt="Main tenant une bière ambrée Georges"
            width={520}
            height={820}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* right hand + IPA bottle — pinned to the right edge, sitting lower */}
      <motion.div
        initial={{ x: "-28vw", y: 90, rotate: 6, opacity: 0 }}
        animate={{
          x: ["-28vw", "-28vw", "0vw"],
          y: [90, 0, 0],
          rotate: [6, 6, 0],
          opacity: [0, 1, 1],
        }}
        transition={{ ...beerTransition, delay: 0.18 }}
        className="absolute right-0 top-[26%] z-10 hidden w-[24vw] max-w-[24rem] min-w-[13rem] md:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
        >
          <Image
            src="/assets/beers/hero-right-hand-beer.png"
            alt="Main tenant une IPA Georges"
            width={520}
            height={820}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* centre content */}
      <div className="relative z-20 mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
          className="font-serif text-2xl italic text-orange sm:text-3xl"
        >
          Bières Georges
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } } }}
          className="font-display mt-2 text-5xl font-bold uppercase leading-[0.9] tracking-tight text-green sm:text-7xl"
        >
          {["Brasserie", "lyonnaise"].map((line) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
              }}
              className="block"
            >
              depuis <span className="text-orange">1836</span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.72, duration: 0.7, ease: EASE }}
          className="mx-auto mt-6 max-w-md text-dark-text/70 leading-relaxed"
        >
          Une bière de caractère, brassée avec exigence, héritage et audace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.92, duration: 0.7, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button variant="green" cut className="px-9">
            Découvrir nos bières
          </Button>
          <Button variant="ghost" withArrow className="px-2">
            Notre histoire
          </Button>
        </motion.div>
      </div>

      {/* bottles for small screens — flanking, smaller */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between md:hidden">
        <motion.div
          initial={{ x: "25vw", y: 50, rotate: -5, opacity: 0 }}
          animate={{
            x: ["25vw", "25vw", "0vw"],
            y: [50, 0, 0],
            rotate: [-5, -5, 0],
            opacity: [0, 1, 1],
          }}
          transition={{ ...beerTransition, delay: 0.1 }}
          className="w-[34%]"
        >
          <Image
            src="/assets/beers/hero-left-hand-beer.png"
            alt=""
            width={300}
            height={470}
            className="h-auto w-full drop-shadow-xl"
          />
        </motion.div>
        <motion.div
          initial={{ x: "-25vw", y: 50, rotate: 5, opacity: 0 }}
          animate={{
            x: ["-25vw", "-25vw", "0vw"],
            y: [50, 0, 0],
            rotate: [5, 5, 0],
            opacity: [0, 1, 1],
          }}
          transition={{ ...beerTransition, delay: 0.18 }}
          className="w-[32%]"
        >
          <Image
            src="/assets/beers/hero-right-hand-beer.png"
            alt=""
            width={300}
            height={470}
            className="h-auto w-full drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
