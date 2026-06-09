"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { brasserieKeywords } from "@/lib/data";
import { EASE, inViewOnce } from "@/lib/motion";

const BREWERY_VIDEO = "/assets/videos/brasserie.mp4";
const BREWERY_VIDEO_POSTER = "/assets/images/brasserie.jpg";

// Theme palette used by the scroll-driven swap.
const CREAM = "#f6ede4";
const GREEN_DEEP = "#052b25";
const ORANGE = "#d96a3a";
const GREEN = "#063a34";
const CREAM_70 = "rgba(246, 237, 228, 0.7)";
const DARK_TEXT_55 = "rgba(6, 58, 52, 0.55)";
const FRAME_GOLD = "#d4b87a"; // golden beige
const FRAME_GOLD_TRANSPARENT = "rgba(212, 184, 122, 0)";

function BrasserieVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    void video.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative h-full min-h-[18rem] w-full overflow-hidden bg-green-deep sm:min-h-[26rem] lg:min-h-[36rem] xl:min-h-[42rem]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={BREWERY_VIDEO_POSTER}
        playsInline
        controls={isPlaying}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={BREWERY_VIDEO} type="video/mp4" />
      </video>

      {!isPlaying && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 via-green-deep/25 to-green-deep/10" />

          <button
            type="button"
            onClick={handlePlay}
            aria-label="Lire la vidéo de la brasserie"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream/70 bg-green-deep/75 text-cream backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:border-orange hover:bg-orange sm:h-20 sm:w-20">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8"
              >
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export function BrasserieSection() {
  // The theme swap is driven by the scroll position of the WHOLE colored
  // block (heading + video). The marquee below sits outside this ref so it
  // keeps its cream background.
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stage } = useScroll({
    target: stageRef,
    offset: ["start 0.85", "center 0.45"],
  });

  // Section bg: cream → deep green.
  const sectionBg = useTransform(stage, [0, 1], [CREAM, GREEN_DEEP]);

  // Text colors: green → cream (heading + italic), dark-text → cream/70
  // (paragraph). They each get an opacity dip in the middle so the swap
  // reads as a fade-out / fade-in rather than a hard transition.
  const headingColor = useTransform(stage, [0, 0.55, 1], [GREEN, GREEN, CREAM]);
  const italicColor = useTransform(stage, [0, 0.55, 1], [ORANGE, ORANGE, ORANGE]);
  const paragraphColor = useTransform(
    stage,
    [0, 0.55, 1],
    [DARK_TEXT_55, DARK_TEXT_55, CREAM_70],
  );
  const textOpacity = useTransform(stage, [0, 0.35, 0.6, 1], [1, 0, 0, 1]);

  // Golden-beige frame around the video: invisible until the player is
  // roughly in view, then fades in to a thick gold matte.
  const frameColor = useTransform(
    stage,
    [0.2, 0.8],
    [FRAME_GOLD_TRANSPARENT, FRAME_GOLD],
  );

  // Scale-in reveal stays — same scroll target so timing is in sync.
  const scale = useTransform(stage, [0, 1], [0.72, 1]);
  const revealY = useTransform(stage, [0, 1], [80, 0]);
  const revealOpacity = useTransform(stage, [0, 0.5], [0.35, 1]);
  const blur = useTransform(stage, [0, 0.7], [10, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section id="brasserie" className="overflow-hidden">
      <motion.div
        ref={stageRef}
        style={{ backgroundColor: sectionBg }}
        className="section-padding px-4 transition-colors"
      >
        <div className="container-page">
          <div className="flex flex-col gap-10 lg:gap-12">
            <motion.div
              style={{ opacity: textOpacity }}
              className="mx-auto flex max-w-3xl flex-col items-center text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease: EASE }}
                className="eyebrow text-orange"
              >
                Depuis 1836
              </motion.p>

              <motion.h2
                style={{ color: headingColor }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
                className="font-display mt-4 text-4xl font-bold uppercase leading-[0.92] tracking-tight sm:text-5xl lg:text-7xl"
              >
                Brasserie
              </motion.h2>

              <motion.p
                style={{ color: italicColor }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="font-serif mt-1 text-3xl italic sm:text-4xl lg:text-5xl"
              >
                audacieuse
              </motion.p>

              <motion.p
                style={{ color: paragraphColor }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                className="mt-6 max-w-lg leading-relaxed"
              >
                Héritage, savoir-faire, caractère, générosité.
              </motion.p>
            </motion.div>

            {/* full-width hero video — scale-up reveal + golden-beige frame */}
            <motion.div
              style={{ scale, opacity: revealOpacity, y: revealY, filter }}
              className="will-change-transform"
            >
              <motion.div
                style={{ backgroundColor: frameColor }}
                className="cut-corner p-2 transition-colors sm:p-3 md:p-4"
              >
                <BrasserieVideoPlayer />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* keyword marquee — Héritage · Savoir-faire · Caractère · Générosité · Audace */}
      <div className="relative mt-16 overflow-hidden border-y border-green/10 bg-green/[0.04] py-5">
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
