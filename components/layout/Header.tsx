"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { useAgeVerification } from "@/lib/age-context";
import { EASE } from "@/lib/motion";
import { navLinks } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { verified, hydrated } = useAgeVerification();
  // Slide the header down only once the visitor has confirmed they are 18+.
  const play = hydrated && verified;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={play ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(246,237,228,0.92)"
            : "rgba(246,237,228,0)",
          boxShadow: scrolled
            ? "0 10px 30px -20px rgba(6,58,52,0.5)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className="backdrop-blur-[2px]"
        style={{ WebkitBackdropFilter: "blur(2px)" }}
      >
        <div className="container-page flex items-center justify-between py-4">
          <a href="#hero" className="block">
            <Image
              src="/assets/logos/logo-bieres-georges.svg"
              alt="Bières Georges"
              width={92}
              height={47}
              priority
              className="h-10 w-auto"
            />
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => {
              const children = "children" in link ? link.children : undefined;

              return (
                <div key={link.label} className="group/nav relative">
                  <a
                    href={link.href}
                    className="eyebrow group/link relative block whitespace-nowrap text-[0.62rem] text-dark-text/80 transition-colors hover:text-orange"
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

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-text/15 text-dark-text transition-colors hover:bg-dark-text hover:text-cream"
          >
            <Icon name="menu" size={20} />
          </button>
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
            <div className="container-page flex items-center justify-between py-4">
              <Image
                src="/assets/logos/logo-bieres-georges.svg"
                alt="Bières Georges"
                width={92}
                height={47}
                className="h-10 w-auto brightness-0 invert"
              />
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-green"
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
                    className="font-display block text-3xl font-semibold transition-colors hover:text-orange sm:text-5xl"
                  >
                    {link.label}
                  </a>
                  {"children" in link && (
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
