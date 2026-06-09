"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fadeUp, inViewOnce } from "@/lib/motion";

const channels = [
  "Bars & Restaurants",
  "Cavistes",
  "Grande Distribution",
  "Événementiel",
];

export function PartnersSection() {
  return (
    <section
      id="partenaires"
      className="relative overflow-hidden bg-cream px-4 py-28 sm:py-40 lg:py-56"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewOnce}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Badge tone="cream">Professionnels</Badge>

            <AnimatedHeading
              as="h2"
              text="Travailler avec les Bières Georges"
              accentFrom={3}
              className="mt-6 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-6xl"
            />

            <p className="mt-6 max-w-xl text-dark-text/70 leading-relaxed">
              Rejoignez le réseau des partenaires Bières Georges et proposez à
              vos clients une bière lyonnaise de caractère, brassée depuis
              1836. Nous accompagnons chaque établissement avec des solutions
              adaptées à son activité.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {channels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-full border border-orange/30 bg-orange/5 px-5 py-2 text-sm font-medium text-green"
                >
                  {channel}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <Button variant="solid" cut withArrow>
                Devenir partenaire
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-dark-text/10 bg-[#E8C6BE]">
              <Image
                src="/assets/bieres.jpg"
                alt="Bières Georges"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}