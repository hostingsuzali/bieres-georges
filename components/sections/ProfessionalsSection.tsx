"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { partnershipTypes, proPoints } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

const fields = [
  { name: "nom", label: "Nom", type: "text", placeholder: "Votre nom" },
  { name: "entreprise", label: "Entreprise", type: "text", placeholder: "Nom de l'établissement" },
  { name: "email", label: "Email", type: "email", placeholder: "vous@exemple.fr" },
  { name: "telephone", label: "Téléphone", type: "tel", placeholder: "06 00 00 00 00" },
];

export function ProfessionalsSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (label: string) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label],
    );

  return (
    <section id="professionals" className="section-padding bg-cream px-4">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        {/* left */}
        <div>
          <Badge tone="orange">Pour les professionnels</Badge>
          <AnimatedHeading
            as="h2"
            text="Brassons ensemble"
            className="font-display mt-6 text-4xl font-semibold uppercase leading-[0.92] tracking-tight text-green sm:text-5xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-serif mt-1 text-2xl italic text-orange sm:text-3xl lg:text-4xl"
          >
            Une bière de caractère pour vos établissements.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-6 max-w-md text-dark-text/70 leading-relaxed"
          >
            Vous êtes restaurateur, caviste, hôtelier, organisateur d'événements
            ou distributeur&nbsp;? Bières Georges accompagne les professionnels
            avec une offre claire, fiable et adaptée à leurs besoins.
          </motion.p>

          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {partnershipTypes.map((t) => (
              <motion.div
                key={t.label}
                variants={fadeUp}
                className="flex flex-col items-center gap-2 rounded-2xl border border-dark-text/10 bg-cream-dark px-3 py-5 text-center"
              >
                <Icon name={t.icon as IconName} size={24} className="text-orange" />
                <span className="eyebrow text-dark-text/70">{t.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.ul
            variants={stagger(0.12, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="mt-9 space-y-5"
          >
            {proPoints.map((point) => (
              <motion.li key={point.title} variants={fadeUp} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green text-cream">
                  <Icon name="check" size={16} />
                </span>
                <div>
                  <h3 className="font-medium text-green">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-dark-text/60">
                    {point.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* right — form ticket */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="tag-shape relative border border-dark-text/10 bg-green p-7 text-cream sm:p-9"
        >
          {/* ticket notch */}
          <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-cream/30 bg-green">
            <span className="font-display text-lg italic">B</span>
          </div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[26rem] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-orange text-cream"
                >
                  <Icon name="check" size={30} />
                </motion.span>
                <h3 className="font-display mt-5 text-2xl font-semibold">
                  Demande envoyée !
                </h3>
                <p className="mt-2 max-w-xs text-sm text-cream/70">
                  Merci, notre équipe revient vers vous sous 48h.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-3"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="eyebrow text-cream/60">{field.label}</span>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="mt-2 w-full rounded-xl border border-cream/20 bg-green-deep/40 px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-orange"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-5">
                  <span className="eyebrow text-cream/60">Type de partenariat</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {partnershipTypes.map((t) => {
                      const isOn = selected.includes(t.label);
                      return (
                        <motion.button
                          key={t.label}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggle(t.label)}
                          className={`eyebrow rounded-full border px-4 py-2 transition-colors ${
                            isOn
                              ? "border-orange bg-orange text-cream"
                              : "border-cream/25 text-cream/70 hover:border-cream/50"
                          }`}
                        >
                          {t.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <label className="mt-5 block">
                  <span className="eyebrow text-cream/60">Message</span>
                  <textarea
                    rows={3}
                    placeholder="Parlez-nous de votre projet…"
                    className="mt-2 w-full resize-none rounded-xl border border-cream/20 bg-green-deep/40 px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-orange"
                  />
                </label>

                <Button type="submit" variant="solid" withArrow className="mt-6 w-full">
                  Devenir partenaire
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
