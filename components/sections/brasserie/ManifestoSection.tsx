"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { manifestoContent } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

export function ManifestoSection() {
  const { headline, philosophy, vision, engagements } = manifestoContent;

  return (
    <section
      id="manifeste"
      className="section-padding relative scroll-mt-20 overflow-hidden bg-orange px-4 text-cream"
    >
      {/* Decorative brewery etching watermark */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 opacity-[0.06]">
        <Image
          src="/assets/images/brewery-etching.png"
          alt=""
          width={800}
          height={800}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="container-page relative">
        {/* Hero headline */}
        <Badge tone="green">Manifeste</Badge>

        <AnimatedHeading
          as="h2"
          text={headline}
          className="font-display mt-8 max-w-5xl text-4xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        />

        {/* Animated divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="mt-12 h-px w-32 origin-left bg-cream/40"
        />

        {/* Three pillars grid */}
        <motion.div
          className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {/* Philosophy */}
          <motion.div variants={fadeUp} className="border-t border-cream/20 pt-6">
            <p className="font-serif text-2xl italic text-cream">
              {philosophy.title}
            </p>
            <p className="mt-5 text-base leading-relaxed text-cream/75">
              {philosophy.text}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div variants={fadeUp} className="border-t border-cream/20 pt-6">
            <p className="font-serif text-2xl italic text-cream">
              {vision.title}
            </p>
            <p className="mt-5 text-base leading-relaxed text-cream/75">
              {vision.text}
            </p>
          </motion.div>

          {/* Engagements */}
          <motion.div variants={fadeUp} className="border-t border-cream/20 pt-6">
            <p className="font-serif text-2xl italic text-cream">
              {engagements.title}
            </p>
            <p className="mt-5 text-base leading-relaxed text-cream/75">
              {engagements.text}
            </p>
            <ul className="mt-7 space-y-3">
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

        {/* Georges portrait — subtle decorative float */}
       
      </div>
    </section>
  );
}
