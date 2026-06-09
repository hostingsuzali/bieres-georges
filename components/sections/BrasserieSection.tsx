"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { brasserieKeywords, brasseriePillars } from "@/lib/data";
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
    <div className="cut-corner relative h-full min-h-[18rem] w-full overflow-hidden bg-green-deep shadow-[0_40px_100px_-60px_rgba(6,58,52,0.55)] sm:min-h-[22rem] lg:min-h-[28rem]">
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

type ScrollPillarItemProps = {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  keyword: string;
  line: string;
  icon: IconName;
};

function ScrollPillarItem({
  index,
  total,
  scrollYProgress,
  keyword,
  line,
  icon,
}: ScrollPillarItemProps) {
  const fillStart = index / total;
  const fillEnd = (index + 0.85) / total;
  const fill = useTransform(scrollYProgress, [fillStart, fillEnd], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [fillStart, fillEnd], [0.45, 1]);
  const borderColor = useTransform(
    fill,
    [0, 1],
    ["rgba(6, 58, 52, 0.1)", "rgba(217, 106, 58, 0.5)"],
  );
  const iconColor = useTransform(fill, [0.55, 1], ["#d96a3a", "#f6ede4"]);

  return (
    <li className="group relative flex gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4">
      <motion.div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-cream-dark sm:h-11 sm:w-11"
        style={{ borderColor }}
      >
        <motion.div
          className="absolute inset-0 bg-orange"
          style={{ scaleY: fill, transformOrigin: "bottom" }}
        />
        <motion.div className="relative z-10" style={{ color: iconColor }}>
          <Icon name={icon} size={18} />
        </motion.div>
      </motion.div>

      <motion.div className="min-w-0 pt-0.5" style={{ opacity: textOpacity }}>
        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="font-display text-[0.65rem] font-semibold tabular-nums text-orange/70 sm:text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="eyebrow text-green">{keyword}</h3>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-dark-text/65 sm:text-sm">
          {line}
        </p>
      </motion.div>
    </li>
  );
}

function BrasserieConvictionBlock() {
  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start 0.9", "end 0.25"],
  });

  return (
    <div ref={blockRef} className="flex min-h-0 flex-col">
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative border-l-2 border-orange pl-4 sm:pl-5"
      >
        <p className="font-serif text-base leading-relaxed text-green sm:text-lg">
          Bières Georges avance avec une conviction simple&nbsp;:
          <span className="italic text-orange">
            {" "}
            une bonne bière doit avoir une âme.
          </span>
        </p>
      </motion.blockquote>

      <ul className="relative mt-8 space-y-0 sm:mt-10">
        <span
          className="absolute bottom-3 left-[1.2rem] top-3 w-px bg-gradient-to-b from-orange/50 via-orange/20 to-transparent sm:left-[1.35rem]"
          aria-hidden="true"
        />

        {brasseriePillars.map((pillar, index) => (
          <ScrollPillarItem
            key={pillar.keyword}
            index={index}
            total={brasseriePillars.length}
            scrollYProgress={scrollYProgress}
            keyword={pillar.keyword}
            line={pillar.line}
            icon={pillar.icon as IconName}
          />
        ))}
      </ul>
    </div>
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

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8"
          >
            <div className="w-full lg:w-[60%]">
              <BrasserieVideoPlayer />
            </div>

            <div className="w-full lg:w-[40%]">
              <BrasserieConvictionBlock />
            </div>
          </motion.div>
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
