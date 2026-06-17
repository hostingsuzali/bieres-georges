"use client";

import { useEffect, useState } from "react";

import { PartnerInquiryForm } from "@/components/forms/PartnerInquiryForm";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function ProfessionalContactPrompt() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <section id="contact-pro" className="section-padding scroll-mt-24 bg-cream px-4">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-orange">Pourquoi Georges ?</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-6xl">
              Une marque qui a du répondant
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-green/65">
              Une histoire lyonnaise depuis 1836, des recettes lisibles et un
              accompagnement commercial à construire selon vos besoins.
            </p>
            <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left text-green/70 sm:grid-cols-2">
              {[
                "Une histoire lyonnaise depuis 1836",
                "Des recettes lisibles et différenciantes",
                "Une gamme adaptée à plusieurs circuits",
                "Un accompagnement selon vos besoins",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-cream-dark px-4 py-3">
                  <Icon name="check" className="shrink-0 text-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button variant="green" cut withArrow onClick={() => setOpen(true)}>
                Présenter mon projet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-green-deep/75 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Demande professionnelle"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-green shadow-[0_40px_120px_-45px_rgba(0,0,0,0.8)]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-green-deep text-cream transition-colors hover:border-orange hover:text-orange"
              aria-label="Fermer le formulaire"
            >
              <Icon name="close" size={18} />
            </button>
            <div className="p-2 sm:p-3">
              <PartnerInquiryForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
