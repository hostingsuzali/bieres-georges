"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { CtaLink } from "@/components/ui/CtaLink";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

const channels = [
  {
    label: "Magasins",
    desc: "Grande Distribution, Magasins spécialisés, Cavistes",
    href: "/travailler-avec-nous#magasins",
    imagePlaceholder: "Rayon point de vente GMS — à venir",
    imageSrc: null as string | null,
  },
  {
    label: "Établissements",
    desc: "Cafés/Bars, Hôtels, Restaurants",
    href: "/travailler-avec-nous#etablissements",
    imagePlaceholder: "Tirage pression bar avec macaron BG — à venir",
    imageSrc: null as string | null,
  },
  {
    label: "Événements",
    desc: "Associations culturelles et sportives, Festivals",
    href: "/travailler-avec-nous#evenements",
    imagePlaceholder: "Tireuse mobile festival — à venir",
    imageSrc: null as string | null,
  },
];

export function PartnersSection() {
  return (
    <section
      id="partenaires"
      className="relative overflow-hidden bg-cream px-4 py-28 sm:py-40 lg:py-56"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 w-64 opacity-[0.06] lg:w-96"
        aria-hidden="true"
      >
        <Image
          src="/assets/logos/sigle-stripes.png"
          alt=""
          width={792}
          height={894}
          className="h-auto w-full"
        />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="cream">Professionnels</Badge>

          <AnimatedHeading
            as="h2"
            text="Travailler avec les Bières Georges"
            accentFrom={3}
            className="mt-6 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 leading-relaxed text-dark-text/65"
          >
            Rejoignez le réseau de partenaires des Bières Georges — en magasin,
            en établissement ou lors d'événements.
          </motion.p>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {channels.map((channel) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              variants={fadeUp}
              className="group overflow-hidden rounded-3xl border border-green/10 bg-cream-dark transition-colors duration-300 hover:bg-orange hover:text-cream"
            >
              {/* Image area */}
              <div className="relative h-44 w-full overflow-hidden bg-green/8 sm:h-52">
                {channel.imageSrc ? (
                  <Image
                    src={channel.imageSrc}
                    alt={channel.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="px-6 text-center text-xs text-dark-text/35 italic">
                      {channel.imagePlaceholder}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="font-display text-2xl font-bold uppercase text-green transition-colors duration-300 group-hover:text-cream sm:text-3xl">
                  {channel.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark-text/60 transition-colors duration-300 group-hover:text-cream/75">
                  {channel.desc}
                </p>
                <span className="eyebrow mt-6 inline-block text-orange transition-colors duration-300 group-hover:text-cream">
                  En savoir plus →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <CtaLink href="/travailler-avec-nous">
            Et si on travaillait ensemble ?
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
