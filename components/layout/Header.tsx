"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { useAgeVerification } from "@/lib/age-context";
import { EASE } from "@/lib/motion";
import { navLinks } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const { verified, hydrated } = useAgeVerification();
  // Slide the header down only once the visitor has confirmed they are 18+.
  const play = hydrated && verified;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={play ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        className="border-b border-green/10 bg-cream/95 shadow-[0_10px_30px_-24px_rgba(6,58,52,0.65)] backdrop-blur-md"
        style={{ WebkitBackdropFilter: "blur(2px)" }}
      >
        <div className="container-page flex items-center justify-between py-4">
          {/* Left — Bières Georges wordmark */}
          <Link href="/" aria-label="Bières Georges — accueil">
            <Image
              src="/assets/logos/logo-classique-brique.png"
              alt="Bières Georges"
              width={1093}
              height={465}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navLinks.map((link) => {
              const children = "children" in link ? link.children : undefined;

              return (
                <div key={link.label} className="group/nav relative">
                  <a
                    href={link.href}
                    className="group/link relative block max-w-[7.5rem] text-center text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.1em] text-dark-text/75 transition-colors hover:text-orange"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-orange transition-all duration-300 group-hover/link:w-full" />
                  </a>

                  {children && (
                    <div className="invisible absolute left-1/2 top-full min-w-36 -translate-x-1/2 pt-5 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                      <div className="rounded-2xl border border-dark-text/10 bg-cream/95 p-2 shadow-xl backdrop-blur-md">
                        {children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="eyebrow block rounded-xl px-4 py-3 text-center text-dark-text/75 transition-colors hover:bg-green hover:text-cream"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right — La Fabrique du Faubourg + hamburger */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logos/logo-ff-brique.png"
              alt="La Fabrique du Faubourg"
              width={1510}
              height={484}
              priority
              className="hidden h-9 w-auto sm:block"
            />
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-text/15 text-dark-text transition-colors hover:bg-dark-text hover:text-cream"
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-green text-cream"
          >
            <div className="flex items-center justify-between border-b border-green/10 bg-cream px-5 py-4 sm:px-8">
              <div className="flex flex-col gap-1.5">
                <Image
                  src="/assets/logos/logo-classique-brique.png"
                  alt="Bières Georges"
                  width={1093}
                  height={465}
                  className="h-8 w-auto"
                />
                <Image
                  src="/assets/logos/logo-ff-brique.png"
                  alt="La Fabrique du Faubourg"
                  width={1510}
                  height={484}
                  className="h-5 w-auto"
                />
              </div>
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-green/20 text-green transition-colors hover:bg-green hover:text-cream"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <nav className="container-page flex flex-1 flex-col justify-center gap-1 py-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display block text-2xl font-semibold transition-colors hover:text-orange sm:text-3xl"
                  >
                    {link.label}
                  </a>
                  {link.children && (
                    <div className="mt-1 flex gap-4">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="eyebrow text-cream/60 transition-colors hover:text-orange"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
