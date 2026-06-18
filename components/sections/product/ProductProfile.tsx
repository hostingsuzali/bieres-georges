"use client";

import { motion } from "framer-motion";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

type Note = { label: string; description: string };

type ProductProfileProps = {
  notes: readonly Note[];
};

export function ProductProfile({ notes }: ProductProfileProps) {
  return (
    <section className="section-padding bg-cream px-4 text-green">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div>
            <Badge tone="orange">Profil</Badge>
            <AnimatedHeading
              as="h2"
              text="Le caractère dans le verre."
              className="font-display mt-5 text-4xl font-bold uppercase leading-[0.9] sm:text-6xl lg:text-7xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7 }}
            className="max-w-lg leading-relaxed text-green/60"
          >
            Chaque bière Georges porte un caractère lisible, net, sans faux-semblant.
            Trois notes pour cadrer l&apos;expérience.
          </motion.p>
        </div>

        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-3"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {notes.map((note, index) => (
            <motion.article
              key={note.label}
              variants={fadeUp}
              className="group relative overflow-hidden border border-green/8 bg-cream-dark p-8 transition-colors duration-300 hover:bg-green hover:text-cream"
            >
              <p className="font-display text-6xl font-bold leading-none text-orange/20 transition-colors group-hover:text-orange/40">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-5 text-3xl font-bold uppercase leading-none">
                {note.label}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-green/55 transition-colors group-hover:text-cream/65">
                {note.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
