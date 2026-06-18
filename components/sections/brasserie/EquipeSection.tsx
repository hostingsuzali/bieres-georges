"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { departmentColors, teamMembers } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, scaleIn, stagger } from "@/lib/motion";

function getInitials(name: string) {
  return name
    .split("-")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const FOUNDER_NAME = "Georges";

export function EquipeSection() {
  const founder = teamMembers.find((m) => m.name === FOUNDER_NAME);
  const others = teamMembers.filter((m) => m.name !== FOUNDER_NAME);

  return (
    <section
      id="equipe"
      className="section-padding scroll-mt-20 bg-cream px-4 text-green"
    >
      <div className="container-page">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
          <div>
            <Badge tone="orange">Équipe</Badge>
            <AnimatedHeading
              as="h2"
              text="Une nouvelle garde, pas un copier-coller."
              className="font-display mt-5 text-4xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7 }}
            className="max-w-md leading-relaxed text-green/60"
          >
            12 personnes, 7 métiers, une même exigence : faire vivre
            l&apos;héritage Georges avec l&apos;énergie d&apos;aujourd&apos;hui.
          </motion.p>
        </div>

        {/* Decorative separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-10 h-px w-full origin-left bg-green/10"
        />

        {/* Team grid */}
        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {/* Founder spotlight — spans 2 cols */}
          {founder && (
            <motion.article
              variants={scaleIn}
              className="group relative overflow-hidden sm:col-span-2 sm:row-span-2"
            >
              <div className="relative h-full min-h-[28rem] overflow-hidden bg-green-deep">
                <Image
                  src="/Charte Graphique_Dossier/Links/Georges en 2026.jpeg"
                  alt={`${founder.name} — ${founder.role}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span
                  className={`eyebrow inline-block rounded-sm px-3 py-1.5 text-xs ${departmentColors[founder.department]}`}
                >
                  {founder.department}
                </span>
                <h3 className="font-display mt-3 text-4xl font-bold uppercase text-cream">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm text-cream/70">{founder.role}</p>
              </div>
            </motion.article>
          )}

          {/* Other team members */}
          {others.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              className="group"
            >
              {/* Initials portrait */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-green/10 bg-green-deep transition-colors duration-300 group-hover:bg-green">
                <span className="font-display select-none text-5xl font-bold uppercase text-cream/15 transition-colors duration-300 group-hover:text-orange/30">
                  {getInitials(member.name)}
                </span>
              </div>
              {/* Info */}
              <div className="mt-4">
                <span
                  className={`inline-block rounded-sm px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider ${departmentColors[member.department]}`}
                >
                  {member.department}
                </span>
                <h3 className="font-display mt-2.5 text-lg font-bold uppercase leading-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-green/60">
                  {member.role}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
