"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { historyMilestones } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

// "L'audace depuis 1836" — a horizontal timeline of historical milestones
// rendered as overlapping polaroid-style photo cards on a dark green stage.
// Each card holds at a slight rotation; on hover it lifts back to upright.
export function ProductBannerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax across the timeline as it scrolls into view.
  const trackX = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      ref={ref}
      id="history"
      className="relative overflow-hidden bg-green-deep text-cream"
    >
      <div className="container-page section-padding relative">
        {/* heading */}
        <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Badge tone="green" dot={false}>
              Notre histoire
            </Badge>

            <AnimatedHeading
              as="h2"
              text="L'audace depuis 1836."
              className="font-display mt-6 text-4xl font-bold uppercase leading-[0.92] tracking-tight sm:text-5xl lg:text-7xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-serif mt-1 text-3xl italic text-orange sm:text-4xl lg:text-5xl"
            >
              Une histoire brassée dans le temps.
            </motion.p>
          </div>

          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="text-cream/75 leading-relaxed"
            >
              Fondée à Lyon en 1836, la maison Georges s'inscrit dans une
              tradition brassicole rare, populaire et exigeante. Au fil des
              générations, elle a conservé ce qui fait sa force&nbsp;: le goût
              du travail bien fait, le sens du partage et l'envie de rester
              libre.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
              className="font-serif text-xl italic text-orange sm:text-2xl"
            >
              Bières Georges ne cherche pas à suivre les modes. Elle préfère
              créer son propre rythme.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            >
              <Button variant="solid" cut withArrow>
                Lire notre histoire
              </Button>
            </motion.div>
          </div>
        </div>

        {/* polaroid timeline */}
        <motion.div
          variants={stagger(0.18, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-20"
        >
          <motion.div
            style={{ x: trackX }}
            className="grid items-end gap-8 sm:gap-10 md:grid-cols-3"
          >
            {historyMilestones.map((m, i) => {
              // alternating tilt for a vintage scrapbook feel — desktop only.
              // On mobile (stacked, narrow), the rotation overflows; we keep
              // them straight and rely on the photo's natural sepia for charm.
              const tiltClass =
                i === 0
                  ? "md:-rotate-3"
                  : i === 2
                    ? "md:rotate-3"
                    : "";
              return (
                <motion.figure
                  key={m.year}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  style={{ originY: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`relative bg-cream p-3 pb-14 text-green shadow-[0_30px_60px_-40px_rgba(0,0,0,0.7)] transition-transform hover:rotate-0 sm:p-4 sm:pb-16 ${tiltClass}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-green-deep">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image}
                      alt={`${m.year} — ${m.title}`}
                      className="h-full w-full object-cover sepia-[0.25]"
                    />
                  </div>

                  {/* polaroid caption */}
                  <figcaption className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-2xl font-bold leading-none text-green sm:text-3xl">
                        {m.year}
                      </p>
                      <p className="eyebrow mt-1 text-orange">{m.title}</p>
                    </div>
                    <p className="font-serif max-w-[55%] text-right text-[0.7rem] italic leading-snug text-green/65">
                      {m.line}
                    </p>
                  </figcaption>
                </motion.figure>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
