import type { Metadata } from "next";
import Image from "next/image";

import { SiteShell } from "@/components/layout/SiteShell";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "La brasserie audacieuse — V2 | Bières Georges",
  description:
    "Découvrez l'histoire, l'équipe et le savoir-faire des Bières Georges, maison lyonnaise libre depuis 1836.",
};

const chapters = [
  {
    year: "1836",
    kicker: "La première mousse",
    title: "Georges ouvre une brasserie. Pas un musée.",
    copy: "À Lyon, une bière franche s'invite à table. Une recette populaire, généreuse, et déjà un peu indocile.",
    image: "/assets/images/1860-1.jpeg",
  },
  {
    year: "1936",
    kicker: "Un siècle au comptoir",
    title: "La ville change. Le goût reste en mouvement.",
    copy: "Des générations lèvent leur verre. Georges devient un rituel lyonnais, vivant et jamais figé.",
    image: "/assets/images/1936.jpg",
  },
  {
    year: "2026",
    kicker: "Le retour du panache",
    title: "Une nouvelle garde rallume les cuves.",
    copy: "Même nom, nouvelle énergie : des recettes nettes, une identité vive et le goût très actuel de faire autrement.",
    image: "/assets/images/fabrique-aujourdhui.webp",
  },
];

const values = [
  ["01", "Libre", "On respecte les recettes, jamais les idées toutes faites."],
  ["02", "Locale", "Lyon dans l'accent, les rencontres et le cœur."],
  ["03", "Franche", "Du goût, de la lisibilité, aucune poudre aux yeux."],
  ["04", "Vivante", "Une maison qui bouge avec ceux qui la font."],
  ["05", "Audacieuse", "L'audace du fondateur, transmise de brassin en brassin."],
];

const TICKER_TEXT =
  "DU HOUBLON · DU TEMPS · DES IDÉES · DU CARACTÈRE · ";

export default function BrasserieAudacieuseV2Page() {
  return (
    <SiteShell>
      <div className={styles.page}>
        {/* ═══════════════════════════ HERO ═══════════════════════════ */}
        <section className={styles.hero} aria-labelledby="v2-title">
          <div className={styles.heroPhoto}>
            <Image
              src="/assets/images/BRASSERIE.jpg"
              alt="La brasserie Bières Georges en activité"
              fill
              priority
              className={styles.cover}
              sizes="(min-width: 900px) 48vw, 100vw"
            />
          </div>

          <div className={styles.heroCopy}>
            <div className={styles.heroTopline}>
              <span>Maison lyonnaise</span>
              <span>43°N · depuis 1836</span>
            </div>
            <p className={styles.stamp}>Brasserie indépendante</p>
            <h1 id="v2-title" className={styles.heroTitle}>
              <span>Brasser</span>
              <span>hors des</span>
              <em>lignes.</em>
            </h1>
            <div className={styles.heroBottom}>
              <p>
                Une vieille maison avec des idées neuves. À Lyon, nous brassons
                l&apos;héritage avec du goût, du cran et juste ce qu&apos;il
                faut d&apos;insolence.
              </p>
              <a className={styles.circleLink} href="#histoire-v2">
                <span>Notre histoire</span>
                <b aria-hidden="true">↓</b>
              </a>
            </div>
          </div>

          <p className={styles.sideNote}>
            L&apos;abus d&apos;ennui est dangereux pour la créativité.
          </p>
        </section>

        {/* ═══════════════════════════ TICKER ═══════════════════════════ */}
        <div className={styles.ticker} aria-hidden="true">
          <div>
            {TICKER_TEXT}
            {TICKER_TEXT}
            {TICKER_TEXT}
            {TICKER_TEXT}
          </div>
        </div>

        {/* ═══════════════════════════ INTRO ═══════════════════════════ */}
        <section className={styles.intro}>
          <p className={styles.sectionIndex}>00 / Prise de position</p>
          <div className={styles.introMain}>
            <p className={styles.introStatement}>
              La tradition n&apos;est pas une recette à recopier. C&apos;est une
              matière à <strong>secouer.</strong>
            </p>
            <div className={styles.introAside}>
              <span className={styles.orangeRule} />
              <p>
                Chez Georges, le patrimoine ne prend pas la poussière. Il
                fermente, il rencontre son époque et il revient dans le verre
                avec une vraie personnalité.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════ HISTORY ═══════════════════════════ */}
        <section id="histoire-v2" className={styles.history}>
          <header className={styles.historyHeader}>
            <p className={styles.sectionIndex}>01 / Histoire mouvementée</p>
            <h2>
              190 ans.
              <br />
              Trois secousses.
            </h2>
          </header>

          <div className={styles.timeline}>
            {chapters.map((chapter, index) => (
              <article className={styles.chapter} key={chapter.year}>
                <div className={styles.chapterImage}>
                  <Image
                    src={chapter.image}
                    alt=""
                    fill
                    className={styles.cover}
                    sizes="(min-width: 900px) 44vw, 100vw"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.chapterCopy}>
                  <p>{chapter.kicker}</p>
                  <time>{chapter.year}</time>
                  <h3>{chapter.title}</h3>
                  <p className={styles.chapterText}>{chapter.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════ MANIFESTO ═══════════════════════════ */}
        <section className={styles.manifesto}>
          <div className={styles.manifestoPortrait}>
            <Image
              src="/assets/logos/georges-en-2026.png"
              alt="Portrait illustré de Georges revisité en 2026"
              fill
              className={styles.contain}
              sizes="(min-width: 900px) 40vw, 80vw"
            />
          </div>
          <div className={styles.manifestoCopy}>
            <p className={styles.sectionIndex}>02 / Manifeste</p>
            <p className={styles.quoteMark}>&ldquo;</p>
            <h2>
              On ne réveille pas une légende pour la faire parler doucement.
            </h2>
            <p>
              Nous préférons une bière qui affirme son caractère à une bière qui
              cherche à plaire à tout le monde. Des ingrédients choisis, des
              brassins suivis de près, et une curiosité qui ne descend jamais.
            </p>
            <span className={styles.signature}>
              Georges, toujours vivant.
            </span>
          </div>
        </section>

        {/* ═══════════════════════════ VALUES ═══════════════════════════ */}
        <section className={styles.values}>
          <div className={styles.valuesIntro}>
            <p className={styles.sectionIndex}>03 / Nos partis pris</p>
            <h2>
              Ce qui tient
              <br />
              la maison debout.
            </h2>
          </div>
          <div className={styles.valueList}>
            {values.map(([number, title, copy]) => (
              <article className={styles.value} key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════ CRAFT ═══════════════════════════ */}
        <section className={styles.craft}>
          <div className={styles.craftImage}>
            <Image
              src="/assets/images/pression_bar.jpg"
              alt="Une bière Georges servie à la pression"
              fill
              className={styles.cover}
              sizes="(min-width: 900px) 55vw, 100vw"
            />
            <p>
              Le geste juste,
              <br />
              jusqu&apos;au dernier col.
            </p>
          </div>
          <div className={styles.craftCopy}>
            <p className={styles.sectionIndex}>04 / Savoir-faire</p>
            <h2>
              Pas de magie.
              <br />
              Beaucoup de maîtrise.
            </h2>
            <ol>
              <li>
                <span>01</span>
                <b>Choisir</b>
                <small>
                  Des matières premières qui ont quelque chose à dire.
                </small>
              </li>
              <li>
                <span>02</span>
                <b>Brasser</b>
                <small>
                  Précisément, sans retirer la part d&apos;instinct.
                </small>
              </li>
              <li>
                <span>03</span>
                <b>Goûter</b>
                <small>
                  Encore. Puis encore. La qualité n&apos;aime pas les
                  raccourcis.
                </small>
              </li>
            </ol>
          </div>
        </section>

        {/* ═══════════════════════════ FINAL CTA ═══════════════════════════ */}
        <section className={styles.finalCta}>
          <p>Assez parlé.</p>
          <h2>
            Goûtez
            <br />
            l&apos;audace.
          </h2>
          <div className={styles.ctaLinks}>
            <a href="/toutes-les-bieres">
              Voir toutes les bières <span>↗</span>
            </a>
            <a href="/trouver">
              Trouver un point de vente <span>↗</span>
            </a>
          </div>
          <Image
            src="/assets/products/CHR_NEIPA_33CL.png"
            alt="Bouteille de NEIPA Bières Georges"
            width={330}
            height={900}
            className={styles.ctaBottle}
          />
        </section>
      </div>

      <VersionSwitcher href="/brasserie-audacieuse" targetVersion="V1" />
    </SiteShell>
  );
}
