"use client";

import { motion } from "framer-motion";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { articles } from "@/lib/data";
import { EASE, fadeUp, inViewOnce, stagger } from "@/lib/motion";

export function JournalSection() {
  return (
    <section id="journal" className="section-padding bg-cream px-4">
      <div className="container-page">
        {/* heading — two-tone, centered */}
        <div className="flex flex-col items-center text-center">
          <Badge tone="orange" dot={false}>
            Journal
          </Badge>

          <div className="mt-6">
            <AnimatedHeading
              as="h2"
              text="Histoires de bière."
              className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-green sm:text-5xl lg:text-6xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-serif mt-1 text-3xl italic text-orange sm:text-4xl lg:text-5xl"
            >
              Histoires de Lyon.
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-6 max-w-xl text-dark-text/65 leading-relaxed"
          >
            Un regard éditorial sur la brasserie, les coulisses, les rencontres,
            les savoir-faire et les lieux qui donnent à Bières Georges son
            caractère.
          </motion.p>
        </div>

        {/* cards */}
        <motion.div
          variants={stagger(0.14, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.article
              key={article.title}
              variants={fadeUp}
              whileHover="hover"
              className="group flex flex-col overflow-hidden bg-cream-dark text-green"
            >
              {/* photo */}
              <div className="relative aspect-[5/4] overflow-hidden">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="h-full w-full object-cover"
                />
                {/* corner index */}
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center bg-orange font-display text-sm font-bold text-cream">
                  {article.index}
                </span>
              </div>

              {/* body */}
              <div className="relative flex flex-1 flex-col p-6">
                <div className="eyebrow flex items-center gap-2 text-orange">
                  <span>{article.category}</span>
                  <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                  <span className="text-dark-text/55">{article.date}</span>
                </div>
                <h3 className="font-display mt-3 text-2xl font-bold uppercase leading-[1.05] sm:text-3xl">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark-text/65">
                  {article.excerpt}
                </p>

                <a
                  href="#"
                  className="eyebrow mt-6 inline-flex items-center gap-2 text-orange"
                >
                  <span className="border-b border-dashed border-current pb-1">
                    Lire l'article
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <Icon name="arrowRight" size={14} />
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <a
            href="#journal"
            className="group eyebrow inline-flex items-center gap-2 text-orange"
          >
            <span className="border-b-2 border-dashed border-orange/60 pb-1.5">
              Voir le journal
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Icon name="arrowRight" size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
