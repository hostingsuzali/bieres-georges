"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useAgeVerification } from "@/lib/age-context";
import { EASE } from "@/lib/motion";

type Mode = "ask" | "refused";

// Full-screen age gate, mandated by French law for alcohol sites (loi Évin).
// The verified state lives in `AgeVerificationProvider` so the rest of the
// page can hold its entry animations until the visitor clicks "Oui".
export function AgeVerification() {
  const { verified, hydrated, grantAccess } = useAgeVerification();
  const [mode, setMode] = useState<Mode>("ask");

  const open = hydrated && !verified;

  // Lock body scroll while the gate is up so the page behind it can't move.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="age-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-green px-4 text-cream"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
        >
          {/* faint engraving texture so the gate visually matches the rest */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-[0.06] mix-blend-screen"
            style={{
              backgroundImage: "url(/assets/backgrounds/brewery-etching.png)",
              backgroundSize: "cover",
            }}
          />

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative z-10 w-full max-w-lg text-center"
          >
            <Image
              src="/assets/logos/logo-bieres-georges.svg"
              alt="Bières Georges"
              width={140}
              height={72}
              priority
              className="mx-auto h-14 w-auto brightness-0 invert"
            />

            <AnimatePresence mode="wait">
              {mode === "ask" && (
                <motion.div
                  key="ask"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="font-serif mt-7 text-xl italic text-orange sm:text-2xl">
                    Avant d'entrer.
                  </p>

                  <h2
                    id="age-gate-title"
                    className="font-display mt-2 text-3xl font-bold uppercase leading-[1] tracking-tight sm:text-5xl"
                  >
                    Avez-vous
                    <br />
                    <span className="text-orange">18 ans ou plus</span>&nbsp;?
                  </h2>

                  <p className="mt-6 text-sm leading-relaxed text-cream/70">
                    La vente d'alcool aux mineurs est interdite. Pour accéder au
                    site, merci de confirmer votre âge.
                  </p>

                  <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button
                      variant="solid"
                      cut
                      onClick={grantAccess}
                      className="w-full sm:w-auto"
                    >
                      Oui, j'ai 18 ans ou plus
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setMode("refused")}
                      className="w-full text-cream/70 hover:text-cream sm:w-auto"
                    >
                      Non, je suis mineur
                    </Button>
                  </div>

                  <p className="mt-10 border-t border-cream/15 pt-5 text-[0.65rem] uppercase tracking-[0.18em] text-cream/45">
                    L'abus d'alcool est dangereux pour la santé.
                    <br className="sm:hidden" /> À consommer avec modération.
                  </p>
                </motion.div>
              )}

              {mode === "refused" && (
                <motion.div
                  key="refused"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="font-serif mt-7 text-xl italic text-orange sm:text-2xl">
                    Désolé.
                  </p>

                  <h2 className="font-display mt-2 text-3xl font-bold uppercase leading-[1] tracking-tight sm:text-5xl">
                    Accès <span className="text-orange">réservé</span>
                    <br />
                    aux majeurs.
                  </h2>

                  <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
                    La consultation de ce site est interdite aux personnes de
                    moins de 18 ans. Revenez nous voir un peu plus tard.
                  </p>

                  <div className="mt-9">
                    <Button
                      variant="ghost"
                      onClick={() => setMode("ask")}
                      className="text-cream/70 hover:text-cream"
                    >
                      Retour
                    </Button>
                  </div>

                  <p className="mt-10 border-t border-cream/15 pt-5 text-[0.65rem] uppercase tracking-[0.18em] text-cream/45">
                    L'abus d'alcool est dangereux pour la santé.
                    <br className="sm:hidden" /> À consommer avec modération.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
