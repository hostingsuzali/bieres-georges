import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { SiteShell } from "@/components/layout/SiteShell";
import { StoreLocatorEmbed } from "@/components/store/StoreLocatorEmbed";
import { CtaLink } from "@/components/ui/CtaLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { contactInfo } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact — Bières Georges",
  description:
    "Une question, une idée de collaboration, une envie de visiter la brasserie ? Contactez la maison Bières Georges.",
};

const infoCards: { title: string; text: string; icon: IconName; href?: string }[] = [
  {
    title: "Adresse",
    text: contactInfo.address,
    icon: "pin",
    href: "https://maps.google.com/?q=" + encodeURIComponent(contactInfo.address),
  },
  {
    title: "Email",
    text: contactInfo.email,
    icon: "mail",
    href: `mailto:${contactInfo.email}`,
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <InternalPageHero
        eyebrow="Contact"
        title="Parlons ensemble"
        intro="Une question sur nos bières, une envie de collaborer ou simplement l'envie de nous dire bonjour : la maison Georges vous écoute."
        image="/assets/images/trinquent.jpg"
        primary={{ label: "Écrire un message", href: "#formulaire" }}
        secondary={{ label: "Travailler avec nous", href: "/travailler-avec-nous" }}
      />

      <section className="section-padding bg-cream px-4">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-orange">À votre écoute</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] text-green sm:text-5xl">
              De vive voix ou par écrit
            </h2>
            <p className="mt-5 leading-relaxed text-green/65">
              Que vous soyez amateur de bières, professionnel ou journaliste,
              une seule porte d&apos;entrée : nous écrire ci-contre. Nous
              revenons vers vous au plus vite.
            </p>

            <div className="mt-8 space-y-4">
              {infoCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.href?.startsWith("http") ? "_blank" : undefined}
                  rel={card.href?.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-start gap-4 rounded-2xl bg-cream-dark px-5 py-4 transition-colors hover:bg-green hover:text-cream"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-cream">
                    <Icon name={card.icon} size={18} />
                  </span>
                  <span>
                    <span className="eyebrow block text-orange">{card.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-green/75 group-hover:text-cream/85">
                      {card.text}
                    </span>
                  </span>
                </a>
              ))}

              <div className="flex items-start gap-4 rounded-2xl bg-cream-dark px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-cream">
                  <Icon name="diamond" size={18} />
                </span>
                <span>
                  <span className="eyebrow block text-orange">Suivez-nous</span>
                  <span className="mt-2 flex gap-3">
                    {contactInfo.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-green/15 text-green transition-colors hover:border-orange hover:text-orange"
                      >
                        <Icon name={social.icon} size={16} />
                      </a>
                    ))}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section id="carte" className="section-padding scroll-mt-20 bg-green-deep px-4 text-cream">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-orange">Nous rendre visite</p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
              La brasserie au cœur de Lyon
            </h2>
            <p className="mt-5 leading-relaxed text-cream/65">
              {contactInfo.address}
            </p>
          </div>
          <StoreLocatorEmbed />
        </div>
      </section>

      <section className="bg-orange px-4 py-16 text-cream">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <p className="eyebrow">Vous êtes un professionnel ?</p>
          <h2 className="font-display max-w-2xl text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
            Construisons votre projet ensemble
          </h2>
          <CtaLink href="/travailler-avec-nous" variant="light">
            Travailler avec les Bières Georges
          </CtaLink>
        </div>
      </section>
    </SiteShell>
  );
}
