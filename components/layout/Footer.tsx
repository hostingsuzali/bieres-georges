"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

const footerColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "#hero" },
      { label: "Nos bières", href: "#emblematiques" },
      { label: "Collections", href: "#collections" },
      { label: "Notre histoire", href: "#history" },
    ],
  },
  {
    title: "La maison",
    links: [
      { label: "Points de vente", href: "#locator" },
      { label: "Professionnels", href: "#professionals" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "mailto:bonjour@bieresgeorges.fr" },
    ],
  },
  {
    title: "Suivez-nous",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-green-deep/10 bg-cream text-green-deep [font-family:var(--font-poppins)]">
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="container-page grid gap-14 pb-16 pt-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:pb-20 md:pt-16"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-7 sm:flex-row sm:items-center"
        >
          <a
            href="#hero"
            aria-label="Retour en haut de page"
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-green-deep/15 transition-colors hover:border-orange"
          >
            <Image
              src="/assets/logos/rounded-footer.png"
              alt="Bières Georges"
              width={373}
              height={374}
              className="h-auto w-16"
            />
          </a>

          <div className="w-full max-w-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-green-deep/55">
              Recevoir les nouvelles de la brasserie
            </p>
            <p className="mb-3 text-sm text-green-deep/60">
              Brassins éphémères, actualités, événements et histoires de la
              maison Georges.
            </p>
            <form
              className="flex rounded-full border border-green-deep/15 bg-white/35 p-1"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Votre adresse email
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Votre email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-green-deep/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-green-deep px-5 py-3 text-xs font-medium text-cream transition-colors hover:bg-orange sm:px-6"
              >
                S’inscrire
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
        >
          {footerColumns.map((column) => (
            <motion.div key={column.title} variants={fadeUp}>
              <h3 className="text-xs font-medium text-green-deep/45">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-orange"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.9 }}
        className="container-page flex min-h-[25rem] items-end justify-center pb-8 sm:min-h-[32rem] md:min-h-[38rem]"
      >
        <Image
          src="/assets/logos/largefooter.png"
          alt="La Fabrique du Faubourg"
          width={589}
          height={141}
          className="h-auto w-full max-w-[70rem]"
        />
      </motion.div>

      <div className="border-t border-green-deep/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-center text-[0.65rem] text-green-deep/55 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Bières Georges. Tous droits réservés.</p>
          <p className="uppercase tracking-[0.12em]">
            L’abus d’alcool est dangereux pour la santé. À consommer avec
            modération.
          </p>
        </div>
      </div>
    </footer>
  );
}
