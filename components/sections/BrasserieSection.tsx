"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { brasserieKeywords } from "@/lib/data";
import { EASE, inViewOnce } from "@/lib/motion";

const BREWERY_VIDEO_POSTER = "/assets/images/brasserie.jpg";

function BrasserieVideoPlayer() {
  return (
    <div className="cut-corner relative h-full min-h-[18rem] w-full overflow-hidden bg-green-deep shadow-[0_40px_100px_-60px_rgba(6,58,52,0.55)] sm:min-h-[26rem] lg:min-h-[36rem] xl:min-h-[42rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BREWERY_VIDEO_POSTER}
        alt="La brasserie Bières Georges"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/55 via-transparent to-green-deep/10" />
      <span className="eyebrow absolute bottom-6 left-6 rounded-full border border-cream/30 bg-green-deep/65 px-4 py-2 text-cream backdrop-blur-sm">
        Dans les coulisses de la brasserie
      </span>
    </div>
  );
}

// Scroll-linked, cinematic arrival for the video — pure scale + lift + blur,
// no opacity ramp (the surrounding stage handles the atmosphere change).
function BrasserieVideoReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 0.45"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.7], [10, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, filter }}
      className="will-change-transform"
    >
      <BrasserieVideoPlayer />
    </motion.div>
  );
}

// The "stage" — the page background flips from cream to deep green as the
// visitor arrives, like the house lights dimming before a screening. Text
// colors interpolate alongside the background so they stay legible.
function BrasserieStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "start 0.3"],
  });

  const bg = useTransform(
    scrollYProgress,
    [0, 1],
    ["#f6ede4", "#052b25"],
  );
  const titleColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#073c34", "#f6ede4"],
  );
  const bodyColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(6, 58, 52, 0.55)", "rgba(246, 237, 228, 0.7)"],
  );

  return (
    <motion.div
      ref={stageRef}
      style={{ backgroundColor: bg }}
      className="section-padding relative overflow-hidden px-4"
    >
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow text-orange"
            >
              Depuis 1836
            </motion.p>

            <motion.div style={{ color: titleColor }}>
              <AnimatedHeading
                as="h2"
                text="Brasserie"
                className="font-display mt-4 text-4xl font-bold uppercase leading-[0.92] tracking-tight sm:text-5xl lg:text-7xl"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="font-serif mt-1 text-3xl italic text-orange sm:text-4xl lg:text-5xl"
            >
              audacieuse
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              style={{ color: bodyColor }}
              className="mt-6 max-w-lg leading-relaxed"
            >
              Héritage, savoir-faire, caractère, générosité.
            </motion.p>
          </div>

          <BrasserieVideoReveal />
        </div>
      </div>
    </motion.div>
  );
}

export function BrasserieSection() {
  return (
    <section id="brasserie" className="overflow-hidden bg-cream">
      <BrasserieStage />

      {/* keyword marquee — sits back on cream, framing the dark stage above */}
      <div className="relative overflow-hidden border-y border-green/10 bg-cream py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />

        <motion.ul
          className="flex w-max items-center gap-10 sm:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[...brasserieKeywords, ...brasserieKeywords, ...brasserieKeywords].map(
            (word, i) => (
              <li
                key={`${word}-${i}`}
                className="font-display flex items-center gap-10 whitespace-nowrap text-2xl font-bold uppercase tracking-wide text-green sm:gap-16 sm:text-4xl lg:text-5xl"
              >
                {word}
                <span className="text-orange/70">✦</span>
              </li>
            ),
          )}
        </motion.ul>
      </div>
    </section>
  );
}
