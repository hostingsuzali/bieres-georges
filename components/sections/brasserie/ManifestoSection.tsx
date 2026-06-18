"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Icon } from "@/components/ui/Icon";
import { manifestoContent } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

export function ManifestoSection() {
  const { headline, philosophy, vision, engagements } = manifestoContent;

  return (
    <section
      id="manifeste"
      className="relative scroll-mt-20 overflow-hidden bg-orange text-cream"
    >
      {/* ── Top: full-width headline band ── */}
      <div className="relative border-b border-cream/15 px-4 pb-14 pt-20 sm:pb-20 sm:pt-28">
        {/* Brewery etching watermark — dramatic, faded */}
        <div className="pointer-events-none absolute -right-16 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 opacity-[0.07] sm:h-[40rem] sm:w-[40rem] lg:-right-10 lg:h-[50rem] lg:w-[50rem]">
          <Image
            src="/assets/images/brewery-etching.png"
            alt=""
            width={800}
            height={800}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="container-page relative">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6 }}
            className="eyebrow text-cream/70"
          >
            Manifeste
          </motion.p>

          <AnimatedHeading
            as="h2"
            text={headline}
            className="font-display mt-6 max-w-6xl text-4xl font-bold uppercase leading-[0.85] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          />

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="mt-10 h-px w-24 origin-left bg-cream/30 sm:mt-12 sm:w-32"
          />
        </div>
      </div>

      {/* ── Bottom: 3 pillars in a split grid ── */}
      <div className="px-4 py-14 sm:py-20">
        <motion.div
          className="container-page grid gap-0 lg:grid-cols-3"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {/* Philosophy */}
          <motion.div
            variants={fadeUp}
            className="border-b border-cream/15 py-8 lg:border-b-0 lg:border-r lg:py-0 lg:pr-10"
          >
            <span className="font-display text-5xl font-bold leading-none text-cream/20">
              01
            </span>
            <p className="font-serif mt-4 text-2xl italic text-cream">
              {philosophy.title}
            </p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-cream/70">
              {philosophy.text}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={fadeUp}
            className="border-b border-cream/15 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-0"
          >
            <span className="font-display text-5xl font-bold leading-none text-cream/20">
              02
            </span>
            <p className="font-serif mt-4 text-2xl italic text-cream">
              {vision.title}
            </p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-cream/70">
              {vision.text}
            </p>
          </motion.div>

          {/* Engagements */}
          <motion.div variants={fadeUp} className="pt-8 lg:pl-10 lg:pt-0">
            <span className="font-display text-5xl font-bold leading-none text-cream/20">
              03
            </span>
            <p className="font-serif mt-4 text-2xl italic text-cream">
              {engagements.title}
            </p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-cream/70">
              {engagements.text}
            </p>
            <ul className="mt-6 space-y-3">
              {engagements.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-cream/85"
                >
                  <Icon
                    name="check"
                    size={16}
                    className="mt-0.5 shrink-0 text-cream"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Georges signature strip ── */}
      <div className="border-t border-cream/15 px-4 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container-page flex items-center justify-between gap-6"
        >
          <p className="font-serif text-lg italic text-cream/50 sm:text-xl">
            &ldquo;Le patrimoine ne prend pas la poussière. Il fermente.&rdquo;
          </p>
          <div className="relative h-20 w-20 shrink-0 opacity-25 lg:h-24 lg:w-24">
            <Image
              src="/assets/logos/georges-hofherr.png"
              alt=""
              width={200}
              height={200}
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
