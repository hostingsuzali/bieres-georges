"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { brasserieKeywords } from "@/lib/data";
import { EASE, inViewOnce } from "@/lib/motion";

const BREWERY_VIDEO = "/assets/videos/brasserie.mp4";
const BREWERY_VIDEO_POSTER = "/assets/images/brasserie.jpg";

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
    <div className="cut-corner relative h-full min-h-[18rem] w-full overflow-hidden bg-green-deep shadow-[0_40px_100px_-60px_rgba(6,58,52,0.55)] sm:min-h-[26rem] lg:min-h-[36rem] xl:min-h-[42rem]">
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

// Wraps the video in a scroll-linked scale-up. As the player crosses into
// the viewport the scale interpolates from 0.86 → 1; once the section is
// centered, the video sits at full size. Gives the arrival a cinematic feel.
function BrasserieVideoReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.55"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className="will-change-transform"
    >
      <BrasserieVideoPlayer />
    </motion.div>
  );
}

export function BrasserieSection() {
  return (
    <section id="brasserie" className="section-padding overflow-hidden bg-cream px-4">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE }}
              className="eyebrow text-orange"
            >
              Depuis 1836
            </motion.p>

            <AnimatedHeading
              as="h2"
              text="Brasserie"
              className="font-display mt-4 text-4xl font-bold uppercase leading-[0.92] tracking-tight text-green sm:text-5xl lg:text-7xl"
            />

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
              className="mt-6 max-w-lg text-dark-text/55 leading-relaxed"
            >
              Héritage, savoir-faire, caractère, générosité.
            </motion.p>
          </div>

          {/* full-width hero video — scrolls in with a scale-up reveal */}
          <BrasserieVideoReveal />
        </div>
      </div>

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
