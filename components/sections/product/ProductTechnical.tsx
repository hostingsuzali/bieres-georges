"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { Beer } from "@/lib/products";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

type ProductTechnicalProps = {
  beer: Beer;
};

/* ── Visual scale bar ────────────────────────────────────────── */
function SpecBar({
  label,
  value,
  max,
  unit,
  delay = 0,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  delay?: number;
}) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow text-cream/60">{label}</span>
        <span className="font-display text-2xl font-bold tabular-nums text-cream sm:text-3xl">
          {value}
          <span className="ml-1 text-sm font-normal text-cream/35">
            {unit}
          </span>
        </span>
      </div>
      <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-orange"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={inViewOnce}
          transition={{ duration: 1, ease: EASE, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

/* ── Format chip ─────────────────────────────────────────────── */
function FormatChip({ format }: { format: string }) {
  const isFut =
    format.toLowerCase().startsWith("fût") || format.toLowerCase() === "fût";
  return (
    <span
      className={`font-display inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-bold uppercase tracking-wide ${
        isFut
          ? "border-orange/40 bg-orange/10 text-orange"
          : "border-cream/15 bg-cream/5 text-cream/80"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 opacity-50"
      >
        {isFut ? (
          <>
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
            <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
          </>
        ) : (
          <>
            <path d="M10 2h4v4l2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10l2-4V2z" />
            <path d="M8 14h8" />
          </>
        )}
      </svg>
      {format}
    </span>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export function ProductTechnical({ beer }: ProductTechnicalProps) {
  return (
    <section className="overflow-hidden bg-green-deep text-cream">
      {/* ── Split layout: Bottle LEFT · Specs RIGHT ── */}
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        {/* ─ Left: Bottle + visual scales ─ */}
        <div className="relative flex flex-col justify-center bg-green-deep px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
          {/* Subtle glow behind bottle */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-64 w-64 rounded-full bg-orange/15 blur-[100px]" />
          </div>

          {/* Bottle image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto mb-12"
          >
            <Image
              src={beer.image}
              alt={`Bière Georges ${beer.name}`}
              width={280}
              height={460}
              className="relative z-10 mx-auto h-[16rem] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:h-[20rem] lg:h-[22rem]"
            />
          </motion.div>

          {/* Visual scale bars */}
          <div className="relative z-10 mx-auto w-full max-w-sm space-y-7">
            <SpecBar label="Alcool" value={beer.abv} max={12} unit="%" delay={0} />
            <SpecBar label="Couleur (EBC)" value={beer.ebc} max={80} unit="" delay={0.1} />
            <SpecBar label="Amertume (IBU)" value={beer.ibu} max={80} unit="" delay={0.2} />
          </div>
        </div>

        {/* ─ Right: All specs details ─ */}
        <div className="border-t border-cream/10 bg-green px-6 py-16 sm:px-10 sm:py-20 lg:border-l lg:border-t-0 lg:px-14 lg:py-24">
          {/* Section header */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.6 }}
            className="eyebrow text-orange"
          >
            Fiche technique
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mt-4 text-4xl font-bold uppercase leading-[0.9] sm:text-5xl"
          >
            Tout ce qu&apos;il
            <br />
            faut savoir.
          </motion.h2>

          <motion.div
            className="mt-12 space-y-10"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            {/* Temperature */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-5"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-orange/30 bg-orange/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange"
                >
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
              </div>
              <div>
                <p className="eyebrow text-orange">Température de service</p>
                <p className="font-display mt-1 text-3xl font-bold">
                  {beer.temperature}
                </p>
              </div>
            </motion.div>

            {/* Formats */}
            <motion.div variants={fadeUp}>
              <p className="eyebrow text-orange">Conditionnements</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {beer.formats.map((format) => (
                  <FormatChip key={format} format={format} />
                ))}
              </div>
            </motion.div>

            {/* Food pairing */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange/20 bg-orange/5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-orange"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                </div>
                <p className="eyebrow text-orange">Accords & mets</p>
              </div>
              <p className="mt-3 pl-14 text-[0.95rem] leading-relaxed text-cream/65">
                {beer.pairing}
              </p>
            </motion.div>

            {/* Distribution */}
            <motion.div variants={fadeUp}>
              <p className="eyebrow text-orange">Distribution</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {beer.ranges.map((range) => (
                  <span
                    key={range}
                    className={`eyebrow rounded-sm px-3 py-1.5 text-xs font-bold ${
                      range === "CHR"
                        ? "bg-cream/10 text-cream"
                        : "bg-orange/20 text-orange"
                    }`}
                  >
                    {range === "CHR"
                      ? "Cafés · Hôtels · Restaurants"
                      : "Grande distribution"}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Ingredients */}
            <motion.div
              variants={fadeUp}
              className="border-t border-cream/10 pt-8"
            >
              <p className="eyebrow text-orange">Caractéristiques</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">
                {beer.ingredients}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
